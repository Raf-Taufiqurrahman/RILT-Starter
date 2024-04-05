<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
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
                'name' => 'required|unique:roles',
                'selectedPermission' => 'required|array|min:1'
            ];
        elseif($method === 'PUT')
            return [
                'name' => 'required|unique:roles,name,' . $this->role->id,
                'selectedPermission' => 'required|array|min:1',
            ];
    }

    public function messages()
    {
        return [
            'name.required' => 'kolom nama akses group tidak boleh kosong.',
            'name.unique' => 'nama akses group sudah ada, silahkan gunakan nama lainnya.',
            'selectedPermission.required' => 'kolom hak akses tidak boleh kosong.',
            'selectedPermission.min' => 'kolom hak akses minimal harus 1 data',
        ];
    }
}
