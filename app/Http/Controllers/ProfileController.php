<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Customer;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Pest\ArchPresets\Custom;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Backpage/Profile/Edit', [
            'title' => 'Profile Pengguna',
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $role = $request->user()->role;

        DB::beginTransaction();
        try {
            $request->user()->fill($request->validated());

            if ($request->user()->isDirty('email')) {
                $request->user()->email_verified_at = null;
            }

            $request->user()->save();

            if ($role === 'CUSTOMER') {
                $customer = Customer::where('user_id', $request->user()->id)->first();
                $customer->update(
                    [
                        'phone_number' => $request->phone_number,
                        'province_code' => $request->province_code,
                        'province_name' => $request->province_name,
                        'city_code' => $request->city_code,
                        'city_name' => $request->city_name,
                        'sub_district' => $request->sub_district,
                        'village' => $request->village,
                        'address' => $request->address,
                    ]
                );
            }

            DB::commit();

            if ($role === 'CUSTOMER') {
                return Redirect::route('frontpage.customer.profile');
            }

            return Redirect::route('profile.edit');
        } catch (\Exception $e) {
            DB::rollBack();

            if ($role === 'CUSTOMER') {
                return Redirect::route('frontpage.customer.profile')->with('error', $e->getMessage());
            }

            return Redirect::route('profile.edit')->with('error', $e->getMessage());
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
