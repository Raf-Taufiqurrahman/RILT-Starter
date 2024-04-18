<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $method = $this->method();

        if($method === 'POST')
            return [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:4|confirmation',
                'selectedRoles' => 'required|array|min:1',
            ];
        elseif($method === 'PUT')
            return [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,'. $this->user->id,
                'password' => 'required|min:4',
                'selectedRoles' => 'required|array|min:1',
            ];
    }

    public function messages()
    {
        return [
            'name.required' => 'kolom nama pengguna tidak boleh kosong.',
            'email.required' => 'kolom email pengguna tidak boleh kosong.',
            'email.unique' => 'email pengguna sudah ada, silahkan gunakan nama lainnya.',
            'password.required' => 'kolom kata sandi tidak boleh kosong',

            'selectedPermission.required' => 'kolom hak akses tidak boleh kosong.',
            'selectedPermission.min' => 'kolom hak akses minimal harus 1 data',
        ];
    }
}
