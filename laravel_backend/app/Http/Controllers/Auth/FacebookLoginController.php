<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
 
use Illuminate\Support\Facades\Http;

class FacebookLoginController extends Controller
{
    public function redirectToFacebook()
    {
        return Socialite::driver('facebook')->redirect();
    }

    
    public function handleFacebookCallback(Request $request)
{
    \Log::info('Facebook Callback Request:', $request->all());

    $accessToken = $request->input('access_token');

    if (!$accessToken) {
        return response()->json(['error' => 'Access token is required'], 400);
    }

    $response = Http::get("https://graph.facebook.com/me?fields=id,name,email,picture&access_token={$accessToken}");

    \Log::info('Facebook API Response:', $response->json());

    if ($response->failed()) {
        return response()->json(['error' => 'Invalid Facebook token'], 401);
    }

    $fbUser = $response->json();

    if (!isset($fbUser['id']) || !isset($fbUser['email'])) {
        return response()->json(['error' => 'Missing required Facebook data'], 400);
    }

    try {
        $user = User::updateOrCreate(
            ['email' => $fbUser['email']],
            [
                'name' => $fbUser['name'],
                'facebook_id' => $fbUser['id'],
                'password' => bcrypt(uniqid()),
            ]
        );

        \Log::info('User saved:', $user->toArray());

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    } catch (\Exception $e) {
        \Log::error('Error saving user:', ['error' => $e->getMessage()]);
        return response()->json(['error' => 'Failed to save user data'], 500);
    }
}

    

    
}
