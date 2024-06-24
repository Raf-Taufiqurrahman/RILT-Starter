import React from 'react'
import { Head, useForm, usePage } from '@inertiajs/react'
import Button from '@/Components/Button'
import Search from '@/Components/Search';
import Table from '@/Components/Table';
import Checkbox from '@/Components/Checkbox';
import Swal from 'sweetalert2';
import AppLayout from '@/Layouts/AppLayout'
import hasAnyPermission from '@/Utils/Permissions';
import { IconDatabaseOff, IconCirclePlus, IconTrash, IconPencilCog } from '@tabler/icons-react';

export default function Index() {

    // destruct users from props
    const { users } = usePage().props;

    const {data, setData, delete: destroy, reset } = useForm({
        selectedUser : [],
    })

    // method selected user
    const setSelectedUser = (e) => {

        let items = data.selectedUser

        if(items.some((id) => id === e.target.value))
            items = items.filter((id) => id !== e.target.value);
        else
            items.push(e.target.value);

        setData('selectedUser', items);
    }

    // method bulk delete
    const deleteData = async (id) => {
        Swal.fire({
            title: 'Apakah kamu yakin ingin menghapus data ini ?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, tolong hapus!',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('apps.users.destroy', [id]))

                Swal.fire({
                    title: 'Success!',
                    text: 'Data berhasil dihapus!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });

                setData('selectedUser', []);
            }
        })
    }

    return (
        <>
            <Head title='Pengguna'/>
            <div className='mb-2'>
                <div className='flex justify-between items-center gap-2'>
                    <div className='flex flex-row gap-2 items-center'>
                        {hasAnyPermission(['users-create']) &&
                            <Button
                                type={'link'}
                                href={route('apps.users.create')}
                                icon={<IconCirclePlus size={20} strokeWidth={1.5}/>}
                                variant={'gray'}
                                label={'Tambah Data Pengguna'}
                                onClick={() => setData('isOpen', true)}
                            />
                        }
                        {hasAnyPermission(['users-delete']) && data.selectedUser.length > 0 &&
                            <Button
                                type={'bulk'}
                                icon={<IconTrash size={20} strokeWidth={1.5}/>}
                                variant={'roseBlack'}
                                label={`Hapus ${data.selectedUser.length} data yang dipilih`}
                                onClick={() => deleteData(data.selectedUser)}
                            />
                        }
                    </div>
                    <div className='w-full md:w-4/12'>
                        <Search
                            url={route('apps.users.index')}
                            placeholder={'Cari data berdasarkan nama pengguna atau email'}
                        />
                    </div>
                </div>
            </div>
            <Table.Card title={'Data Pengguna'}>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className={'w-10'}>
                                <Checkbox
                                     onChange={(e) => {
                                        const allUserIds = users.data.map((user) => user.id.toString());
                                        setData('selectedUser', e.target.checked ? allUserIds : []);
                                    }}
                                    checked={data.selectedUser.length === users.data.length}
                                />
                            </Table.Th>
                            <Table.Th className={'w-10'}>No</Table.Th>
                            <Table.Th>Nama Pengguna</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Group Akses</Table.Th>
                            <Table.Th></Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {users.data.length ?
                            users.data.map((user, i) => (
                                <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                    <Table.Td>
                                        <Checkbox
                                            key={i}
                                            value={user.id}
                                            onChange={setSelectedUser}
                                            checked={data.selectedUser.includes(user.id.toString())}
                                        />
                                    </Table.Td>
                                    <Table.Td className={'text-center'}>
                                        {++i + (users.current_page-1) * users.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        {user.name}
                                    </Table.Td>
                                    <Table.Td>
                                        {user.email}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex flex-wrap gap-2'>
                                            {user.roles.map((role, index) => (
                                                <span className="rounded-full px-2.5 py-0.5 text-xs tracking-tight font-medium transition-colors focus:outline-none flex items-center gap-1 capitalize border border-teal-500/40 bg-teal-500/10 text-teal-500 hover:bg-teal-500/20" key={index}>
                                                    {role.name}
                                                </span>
                                            ))}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex gap-2'>
                                        {hasAnyPermission(['users-edit']) &&
                                            <Button
                                                type={'edit'}
                                                icon={<IconPencilCog size={16} strokeWidth={1.5}/>}
                                                variant={'orange'}
                                                href={route('apps.users.edit', user.id)}
                                            />
                                        }
                                        {hasAnyPermission(['users-delete']) &&
                                            <Button
                                                type={'delete'}
                                                icon={<IconTrash size={16} strokeWidth={1.5}/>}
                                                variant={'rose'}
                                                url={route('apps.users.destroy', user.id)}
                                            />
                                        }
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))
                            :
                            <Table.Empty colSpan={6} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={24} strokeWidth={1.5} className='text-gray-500 dark:text-white'/>
                                    </div>
                                    <span className='text-gray-500'>Data pengguna</span> <span className='text-rose-500 underline underline-offset-2'>tidak ditemukan.</span>
                                </>
                            }/>
                        }
                    </Table.Tbody>
                </Table>
            </Table.Card>
        </>
    )
}

Index.layout = page => <AppLayout children={page}/>
