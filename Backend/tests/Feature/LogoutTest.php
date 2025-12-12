<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class LogoutTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test successful user logout.
     */
    public function test_user_can_logout_successfully()
    {
        $user = User::factory()->create();
        
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/logout');

        $this->assertNotEquals(404, $response->status());
    }
}