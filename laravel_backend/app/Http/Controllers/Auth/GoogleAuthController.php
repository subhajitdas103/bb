<?php
namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
class GoogleAuthController extends Controller
{
    public function handleGoogleLogin(Request $request)

        {
            Log::info('Google Login Request:', $request->all()); // Check incoming request
        
            $accessToken = $request->input('access_token');
            
            if (!$accessToken) {
                return response()->json(['message' => 'Access token missing'], 400);
            }
        
            // Fetch user info from Google
            $googleUser = Http::withHeaders([
                'Authorization' => "Bearer {$accessToken}",
            ])->get('https://www.googleapis.com/oauth2/v3/userinfo')->json();
        
            Log::info('Google User Info:', $googleUser);
        
            if (!isset($googleUser['email'])) {
                return response()->json(['message' => 'Invalid token'], 401);
            }
        
            // Find or create user
            $user = User::updateOrCreate(
                ['email' => $googleUser['email']],
                [
                    'name' => $googleUser['name'],
                    'google_id' => $googleUser['sub'],
                    'avatar' => $googleUser['picture'],
                    'password' => bcrypt(uniqid()),
                ]
            );
        
            // Generate Laravel authentication token
            $token = $user->createToken('google-token')->plainTextToken;
        
            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        }
        
    


}
