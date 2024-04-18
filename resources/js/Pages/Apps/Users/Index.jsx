import AppLayout from '@/Layouts/AppLayout'
import React from 'react'
import { Head, usePage } from '@inertiajs/react'
import Button from '@/Components/Button'
import { IconDatabaseOff, IconCirclePlus, IconTrash, IconUsers, IconPencilCog } from '@tabler/icons-react';
import Search from '@/Components/Search';
import Table from '@/Components/Table';
export default function Index() {

    // destruct users from props
    const { users } = usePage().props;

    return (
        <>
            <Head title='Pengguna'/>
            <div className='mb-2'>
                <div className='flex justify-between items-center gap-2'>
                    <Button
                        type={'link'}
                        href={route('apps.users.create')}
                        icon={<IconCirclePlus size={20} strokeWidth={1.5}/>}
                        className={'bg-gray-950 border border-gray-800 hover:bg-gray-900'}
                        label={'Tambah Data Pengguna'}
                        onClick={() => setData('isOpen', true)}
                        added={true}
                    />
                    <div className='w-full md:w-4/12'>
                        <Search
                            url={route('apps.users.index')}
                            placeholder={'Cari data berdasarkan nama pengguna atau email'}
                        />
                    </div>
                </div>
            </div>
            <Table.Card
                title={'Data Pengguna'}
                icon={<IconUsers size={20} strokeWidth={1.5}/>}
            >
                <Table>
                    <Table.Thead>
                        <tr>
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
                                <tr className='hover:bg-gray-900' key={i}>
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
                                            <Button
                                                type={'edit'}
                                                icon={<IconPencilCog size={16} strokeWidth={1.5}/>}
                                                className={'bg-orange-950 border-orange-800 text-gray-300 border hover:bg-orange-900'}
                                                href={route('apps.users.edit', user.id)}
                                            />
                                            <Button
                                                type={'delete'}
                                                icon={<IconTrash size={16} strokeWidth={1.5}/>}
                                                className={'bg-rose-950 border-rose-800 text-gray-300 border hover:bg-rose-900'}
                                                url={route('apps.users.destroy', user.id)}
                                            />
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))
                            :
                            <Table.Empty colSpan={5} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={20} strokeWidth={1.5}/>
                                    </div>
                                    <span className='text-gray-500'>Data pengguna</span><span className='text-rose-500 underline underline-offset-2'>tidak ditemukan.</span>
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
