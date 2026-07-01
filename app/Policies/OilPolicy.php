<?php

namespace App\Policies;

use App\Models\Oil;
use App\Models\User;

class OilPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Oil $oil): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Oil $oil): bool
    {
        return true;
    }

    public function delete(User $user, Oil $oil): bool
    {
        return true;
    }
}
