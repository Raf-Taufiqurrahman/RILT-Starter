import React, { useState } from 'react'
import { Menu, Transition  } from '@headlessui/react'
import { Link } from '@inertiajs/react'
import { IconLogout, IconUserCog  } from '@tabler/icons-react'
import { useForm } from '@inertiajs/react'
export default function AuthDropdown({auth}) {

    // define usefrom
    const { post } = useForm();


    // define function logout
    const logout = async (e) => {
        e.preventDefault();

        post(route('logout'));
    }

    return (
        <Menu className='relative z-50' as="div">
            <Menu.Button className='flex items-center rounded-full'>
                <img src={auth.user.avatar} alt={auth.user.name} className='w-10 h-10 rounded-full border border-gray-800'/>
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className='absolute bg-gray-950 rounded-lg w-48 border border-gray-900 mt-2 py-2 right-0 z-50'>
                    <div className='flex flex-col gap-1.5 divide-y divide-gray-900'>
                        <Menu.Item>
                            <Link href="/apps/profile" className='px-3 py-1.5 text-sm text-gray-400 flex items-center gap-2 hover:text-sky-500'>
                                <IconUserCog strokeWidth={'1.5'} size={'20'}/> Profile
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <button onClick={logout} className='px-3 py-1.5 text-sm text-gray-400 flex items-center gap-2 hover:text-sky-500'>
                                <IconLogout strokeWidth={'1.5'} size={'20'}/>
                                Logout
                            </button>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
