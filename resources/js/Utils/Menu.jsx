import { usePage } from '@inertiajs/react';
import { IconLayout2, IconUserBolt, IconUserShield, IconUsers } from '@tabler/icons-react';
import React from 'react'

export default function Menu() {

    // define use page
    const { url } = usePage();

    // define menu navigations
    const menuNavigation = [
        {
            title: 'Overview',
            details: [
                {
                    title : 'Dashboard',
                    href : '/apps/dashboard',
                    active: url.startsWith('/apps/dashboard') ? true : false,
                    icon : <IconLayout2 size={20} strokeWidth={1.5}/>,
                },
            ]
        },
        {
            title: 'User Management',
            details : [
                {
                    title : 'Hak Akses',
                    href : '/apps/permissions',
                    active: url.startsWith('/apps/permissions') ? true : false,
                    icon : <IconUserBolt size={20} strokeWidth={1.5}/>,
                },
                {
                    title : 'Akses Group',
                    href : '/apps/roles',
                    active: url.startsWith('/apps/roles') ? true : false,
                    icon : <IconUserShield size={20} strokeWidth={1.5}/>,
                },
                {
                    title : 'Pengguna',
                    icon : <IconUsers size={20} strokeWidth={1.5}/>,
                    subdetails: [
                        {
                            title: 'Data Pengguna',
                            href: '/apps/users',
                            active: url === '/apps/users' ? true : false,
                        },
                        {
                            title: 'Tambah Data Pengguna',
                            href: '/apps/users/create',
                            active: url === '/apps/users/create' ? true : false,
                        },
                    ]
                }
            ]
        }
    ]

    return menuNavigation;
}
