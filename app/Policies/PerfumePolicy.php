<?php

namespace App\Policies;

use App\Models\Perfume;
use App\Models\User;

class PerfumePolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Perfume $perfume): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Perfume $perfume): bool
    {
        return true;
    }

    public function delete(User $user, Perfume $perfume): bool
    {
        return true;
    }
}
