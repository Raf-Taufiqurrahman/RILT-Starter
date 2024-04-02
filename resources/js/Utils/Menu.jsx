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
                {title : 'Dashboard', href : '/apps/dashboard', active: url.startsWith('/apps/dashboard') ? true : false, icon : <IconLayout2 size={20} strokeWidth={1.5}/>},
            ]
        },
        {
            title: 'User Management',
            details : [
                {title : 'Akses', href : '/apps/permissions', icon : <IconUserBolt size={20} strokeWidth={1.5}/>},
                {title : 'Akses Group', href : '/apps/roles', icon : <IconUserShield size={20} strokeWidth={1.5}/>},
                {title : 'Pengguna', href : '/apps/users', icon : <IconUsers size={20} strokeWidth={1.5}/>}
            ]
        }
    ]

    return menuNavigation;
}
