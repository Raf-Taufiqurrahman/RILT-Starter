import React from 'react'
import { usePage } from '@inertiajs/react';
import { IconAlignLeft, IconBell, IconChevronRight, IconMoon } from '@tabler/icons-react'
import AuthDropdown from '@/Components/AuthDropdown';
import Menu from '@/Utils/Menu';

export default function Navbar({ toggleSidebar }) {
    // destruct auth from props
    const { auth } = usePage().props;

    // destruct url from usePage
    const { url } = usePage();

    // get menu from utils
    const menuNavigation = Menu();

    // recreate array from menu navigations
    const links = menuNavigation.flatMap((item) => item.details)

    return (
        <div className='py-8 px-4 md:px-6 flex justify-between items-center min-w-full bg-gray-950 sticky top-0 z-20 h-16 border-b border-gray-900'>
            <div className='flex items-center gap-4'>
                <button className='text-gray-400' onClick={toggleSidebar}>
                    <IconAlignLeft size={18} strokeWidth={1.5}/>
                </button>
                <div className='flex flex-row items-center gap-1 md:border-l-2 md:border-double px-4 border-gray-900'>
                    {links.map((link, i) => (
                        link.active === true && <span className='font-semibold text-gray-400' key={i}>{link.title}</span>
                    ))}
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div className='flex flex-row items-center gap-1 md:border-r-2 md:border-double px-4 border-gray-900'>
                    <div className='flex flex-row gap-2'>
                        <button className='text-gray-400 hover:bg-gray-900 p-2 rounded-md'>
                            <IconMoon strokeWidth={1.5} size={18}/>
                        </button>
                        <button className='relative group hover:bg-gray-900 p-2 rounded-md'>
                            <div className='absolute text-[8px] font-semibold bg-rose-500 top-0 -right-2 rounded-full px-1 py-0.5 text-white group-hover:scale-125 duration-300 ease-in'>
                                20
                            </div>
                            <IconBell strokeWidth={1.5} size={18} className='text-gray-400'/>
                        </button>
                    </div>
                </div>
                <AuthDropdown auth={auth}/>
            </div>
        </div>
    )
}
