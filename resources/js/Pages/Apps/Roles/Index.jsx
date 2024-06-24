import React from 'react'
import { Head, useForm, usePage } from '@inertiajs/react'
import { IconDatabaseOff, IconCirclePlus, IconTrash, IconUserShield, IconPencilCog, IconPencilCheck } from '@tabler/icons-react';
import AppLayout from '@/Layouts/AppLayout'
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import ListBox from '@/Components/ListBox';
import Modal from '@/Components/Modal';
import Pagination from '@/Components/Pagination';
import Search from '@/Components/Search';
import Table from '@/Components/Table'
import hasAnyPermission from '@/Utils/Permissions';
export default function Index() {

    // destruct roles from props
    const { roles, permissions, errors, } = usePage().props;

    // define form helper inertia
    const { data, setData, transform, post} = useForm({
        id: '',
        name: '',
        selectedPermission : [],
        isUpdate: false,
        isOpen: false,
    });

    // define set permissions value
    const setSelectedPermission = (value) => {
        setData('selectedPermission', value)
    }

    // transform data before submit
    transform((data) => ({
        ...data,
        selectedPermission: data.selectedPermission.map(permission => permission.id),
        _method : data.isUpdate === true ? 'put' : 'post'
    }))

    // define function create new role
    const saveRole = async (e) => {
        e.preventDefault();

        post(route('apps.roles.store'), {
            onSuccess: () => {
                setData({
                    selectedPermission : [],
                    name: '',
                    isOpen: false,
                })
            }
        });
    }

    // define function update role by id
    const updateRole = async (e) => {
        e.preventDefault();

        post(route('apps.roles.update', data.id), {
            onSuccess : () => {
                setData({
                    id : '',
                    name : '',
                    selectedPermission : [],
                    isUpdate : false,
                    isOpen: false,
                });
            }
        })
    }

    return (
        <>
            <Head title='Akses Group'/>
            <div className='mb-2'>
                <div className='flex justify-between items-center gap-2'>
                    {hasAnyPermission(['roles-create']) &&
                        <Button
                            type={'button'}
                            icon={<IconCirclePlus size={20} strokeWidth={1.5}/>}
                            variant={'gray'}
                            label={'Tambah Data Akses Group'}
                            onClick={() => setData('isOpen', true)}
                        />
                    }
                    <div className='w-full md:w-4/12'>
                        <Search
                            url={route('apps.roles.index')}
                            placeholder='Cari data berdasarkan nama akses group...'
                        />
                    </div>
                </div>
            </div>
            <Modal
                show={data.isOpen}
                onClose={() =>
                    setData({
                        isOpen : false,
                        id: '',
                        name: '',
                        selectedPermission : [],
                        isUpdate : false,
                    })
                }
                title={`${data.isUpdate === true ? 'Ubah Data Role' : 'Tambah Data Baru'}`}
                icon={<IconUserShield size={20} strokeWidth={1.5}/>}
            >
                <form onSubmit={data.isUpdate === true ? updateRole : saveRole}>
                    <div className='mb-4'>
                        <Input
                            label={'Nama akses group'}
                            type={'text'}
                            placeholder={'Masukan nama akses group'}
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            errors={errors.name}
                        />
                    </div>
                    <div className='mb-4'>
                        <ListBox
                            label={'Pilih hak akses'}
                            data={permissions}
                            selected={data.selectedPermission}
                            setSelected={setSelectedPermission}
                            errors={errors.selectedPermission}
                        />
                    </div>
                    <Button
                        type={'submit'}
                        icon={<IconPencilCheck size={20} strokeWidth={1.5}/>}
                        variant={'gray'}
                        label={'Simpan'}
                    />
                </form>
            </Modal>
            <Table.Card title={'Data Akses Group'}>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-10'>No</Table.Th>
                            <Table.Th>Nama Akses Group</Table.Th>
                            <Table.Th>Hak Akses</Table.Th>
                            <Table.Th className='w-40'></Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {roles.data.length ?
                            roles.data.map((role, i) => (
                                <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                    <Table.Td className='text-center'>
                                        {++i + (roles.current_page-1) * roles.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        {role.name}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex flex-wrap gap-2'>
                                            {
                                                role.name == 'super-admin' ?
                                                <span className="rounded-full px-2.5 py-0.5 text-xs tracking-tight font-medium transition-colors focus:outline-none flex items-center gap-1 capitalize border border-teal-500/40 bg-teal-500/10 text-teal-500 hover:bg-teal-500/20">
                                                   Semua hak akses
                                                </span>
                                            :
                                                role.permissions.map((permission, index) => (
                                                <span className="rounded-full px-2.5 py-0.5 text-xs tracking-tight font-medium transition-colors focus:outline-none flex items-center gap-1 capitalize border border-teal-500/40 bg-teal-500/10 text-teal-500 hover:bg-teal-500/20" key={index}>
                                                    {permission.name}
                                                </span>
                                            ))}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex gap-2'>
                                            {hasAnyPermission(['roles-update']) &&
                                                <Button
                                                    type={'modal'}
                                                    icon={<IconPencilCog size={16} strokeWidth={1.5}/>}
                                                    variant={'orange'}
                                                    onClick={() =>
                                                        setData({
                                                            id: role.id,
                                                            selectedPermission: role.permissions,
                                                            name: role.name,
                                                            isUpdate: true,
                                                            isOpen : !data.isOpen,
                                                        })
                                                    }
                                                />
                                            }
                                            {hasAnyPermission(['roles-delete']) &&
                                                <Button
                                                    type={'delete'}
                                                    icon={<IconTrash size={16} strokeWidth={1.5}/>}
                                                    variant={'rose'}
                                                    url={route('apps.roles.destroy', role.id)}
                                                />
                                            }
                                        </div>
                                    </Table.Td>
                                </tr>
                            )) :
                            <Table.Empty colSpan={4} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={24} strokeWidth={1.5} className='text-gray-500 dark:text-white'/>
                                    </div>
                                    <span className='text-gray-500'>Data akses group</span> <span className='text-rose-500 underline underline-offset-2'>tidak ditemukan.</span>
                                </>
                            }/>
                        }
                    </Table.Tbody>
                </Table>
            </Table.Card>
            {roles.last_page !== 1 && (<Pagination links={roles.links}/>)}
        </>
    )
}
Index.layout = page => <AppLayout children={page}/>
