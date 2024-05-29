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
                'password' => 'required|min:4|confirmed',
                'selectedRoles' => 'required|array|min:1',
            ];
        elseif($method === 'PUT')
            return [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,'. $this->user->id,
                'password' => 'nullable|min:4|confirmed',
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
            'password.min' => 'kolom kata sandi minimal 4 huruf',
            'password.confirmed' => 'kolom konfirmasi kata sandi tidak sesuai',

            'selectedRoles.required' => 'kolom akses group tidak boleh kosong.',
            'selectedRoles.min' => 'kolom akses group minimal harus 1 data',

        ];
    }
}
