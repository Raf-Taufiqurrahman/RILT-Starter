import Pagination from '@/Components/Pagination';
import Search from '@/Components/Search';
import Table from '@/Components/Table'
import AppLayout from '@/Layouts/AppLayout'
import { Head, usePage } from '@inertiajs/react'
import { IconDatabaseOff } from '@tabler/icons-react';
import React from 'react'
export default function Index() {

    // destruct permissions from props
    const { permissions } = usePage().props;

    return (
        <>
            <Head title='Has Akses'/>
            <div className='mb-5'>
                <Search
                    url={'/apps/permissions'}
                    placeholder='Cari data berdasarkan nama hak akses...'
                />
            </div>
            <Table>
                <Table.Thead>
                    <tr>
                        <Table.Th className='w-10'>No</Table.Th>
                        <Table.Th>Nama Hak Akses</Table.Th>
                    </tr>
                </Table.Thead>
                <Table.Tbody>
                    {permissions.data.length ?
                        permissions.data.map((permission, i) => (
                            <tr className='hover:bg-gray-900' key={i}>
                                <Table.Td className='text-center'>
                                    {++i + (permissions.current_page-1) * permissions.per_page}
                                </Table.Td>
                                <Table.Td>
                                    {permission.name}
                                </Table.Td>
                            </tr>
                        )) :
                        <Table.Empty colSpan={2} message={
                            <>
                                <div className='flex justify-center items-center text-center mb-2'>
                                    <IconDatabaseOff size={20} strokeWidth={1.5}/>
                                </div>
                                <span className='text-gray-500'>Data hak akses</span> <span className='text-rose-500 underline underline-offset-2'>tidak ditemukan.</span>
                            </>
                        }/>
                    }
                </Table.Tbody>
            </Table>
            {permissions.last_page !== 1 && (<Pagination links={permissions.links}/>)}
        </>
    )
}
Index.layout = page => <AppLayout children={page}/>
