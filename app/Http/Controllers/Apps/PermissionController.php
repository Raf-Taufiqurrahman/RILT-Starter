<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __invoke()
    {
        $permissions = Permission::query()
            ->when(request()->search, fn($query) => $query->where('name', 'like', '%'. request()->search .'%'))
            ->select('id', 'name')
            ->latest()
            ->paginate(7)
            ->withQueryString();

        // render view
        return inertia('Apps/Permissions/Index', [
            'permissions' => $permissions
        ]);
    }
}
