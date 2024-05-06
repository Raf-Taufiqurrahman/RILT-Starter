import React from 'react'
import { Head, usePage, useForm } from '@inertiajs/react'
import Card from '@/Components/Card'
import AppLayout from '@/Layouts/AppLayout'
import { IconUsersPlus, IconPencilPlus, IconUserShield } from '@tabler/icons-react'
import Input from '@/Components/Input'
import Button from '@/Components/Button'
import Checkbox from '@/Components/Checkbox'
export default function Create() {
    // destruct props roles from use page
    const { roles } = usePage().props;

    const {data, setData, post, errors} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        selectedRoles: [],
    });

    const setSelectedRoles = (e) => {
        let items = data.selectedRoles

        items.push(e.target.value)

        setData('selectedRoles', items);
    }

    const saveUser = async (e) => {
        e.preventDefault();

        post(route('apps.users.store'));
    }

    return (
        <>
            <Head title={'Tambah Data Pengguna'}/>
            <Card
                title={'Tambah Data Pengguna'}
                icon={<IconUsersPlus size={20} strokeWidth={1.5}/>}
                footer={
                    <>
                        <Button
                            type={'submit'}
                            label={'Simpan'}
                            icon={<IconPencilPlus size={20} strokeWidth={1.5}/>}
                            className={'bg-gray-950 border-gray-800 text-gray-200 border hover:bg-gray-900'}
                        />
                    </>
                }
                form={saveUser}
            >
                <div className='mb-4 flex flex-col md:flex-row justify-between gap-4'>
                    <div className='w-full md:w-1/2'>
                        <Input
                            type={'text'}
                            label={'Nama Pengguna'}
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <Input
                            type={'email'}
                            label={'Email Pengguna'}
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                    </div>
                </div>
                <div className='mb-4 flex flex-col md:flex-row gap-4'>
                    <div className='w-full md:w-1/2'>
                        <Input
                            type={'password'}
                            label={'Kata Sandi'}
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <Input
                            type={'password'}
                            label={'Konfirmasi Kata Sandi'}
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                        />
                    </div>
                </div>
                <div className={`p-4 bg-gray-950 border-gray-900 rounded-t-lg border`}>
                    <div className='flex items-center gap-2 font-semibold text-sm text-gray-400'>
                        <IconUserShield size={20} strokeWidth={1.5}/> Akses Group
                    </div>
                </div>
                <div className='bg-gray-900 p-4 rounded-b-lg'>
                    <div className='flex flex-row flex-wrap gap-4'>
                        {roles.map((role, i) => (
                            <Checkbox label={role.name} value={role.name} onChange={setSelectedRoles} key={i}/>
                        ))}
                    </div>
                </div>
            </Card>
        </>
    )
}

Create.layout = page => <AppLayout children={page}/>
