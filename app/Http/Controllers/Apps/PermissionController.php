<?php

namespace App\Http\Controllers\Apps;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class PermissionController extends Controller implements HasMiddleware
{

    /**
     * middleware
     */
    public static function middleware()
    {
        return [
            new Middleware('permission:permission-data')
        ];
    }

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
