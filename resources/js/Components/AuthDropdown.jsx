import React, { useState, useRef, useEffect } from 'react'
import { Menu, Transition  } from '@headlessui/react'
import { Link, usePage } from '@inertiajs/react'
import { IconLogout, IconUserCog, IconChevronUp, IconChevronDown, IconCornerDownRight  } from '@tabler/icons-react'
import { useForm } from '@inertiajs/react'
import MenuLink from '@/Utils/Menu'
import LinkItem from './LinkItem'
export default function AuthDropdown({auth, isMobile}) {

    // define usefrom
    const { post } = useForm();

    // define url from usepage
    const { url } = usePage();

    // define state isToggle
    const [isToggle, setIsToggle] = useState(false);
    // define state isOpen
    const [isOpen, setIsOpen] = useState(false);
    // define ref dropdown
    const dropdownRef = useRef(null);

    // define method handleClickOutside
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsToggle(false);
        }
    };

    // get menu from utils
    const menuNavigation = MenuLink();

    // define useEffect
    useEffect(() => {
        // add event listener
        document.addEventListener("mousedown", handleClickOutside);

        // remove event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // define function logout
    const logout = async (e) => {
        e.preventDefault();

        post(route('logout'));
    }

    return (
        <>
            {isMobile === false ?
                <Menu className='relative z-10' as="div">
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
                        <Menu.Items className='absolute bg-gray-950 rounded-lg w-48 border border-gray-900 mt-2 py-2 right-0 z-[100]'>
                            <div className='flex flex-col gap-1.5 divide-y divide-gray-900'>
                                <Menu.Item>
                                    <Link href="/apps/profile" className='px-3 py-1.5 text-sm text-gray-400 flex items-center gap-2 hover:text-gray-200'>
                                        <IconUserCog strokeWidth={'1.5'} size={'20'}/> Profile
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <button onClick={logout} className='px-3 py-1.5 text-sm text-gray-400 flex items-center gap-2 hover:text-gray-200'>
                                        <IconLogout strokeWidth={'1.5'} size={'20'}/>
                                        Logout
                                    </button>
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
                :
                <>
                    <button className="flex items-center group" onClick={() => setIsToggle(!isToggle)}>
                        <img src={auth.user.avatar} alt={auth.user.name} className='w-10 h-10 rounded-full border border-gray-800'/>
                    </button>
                    <div ref={dropdownRef} className={`${isToggle ?'translate-x-0 opacity-100' : '-translate-x-full'} fixed top-0 left-0 z-50 w-[300px] h-full transition-all duration-300 transform bg-gray-950 border-r border-gray-900`}>
                        <div className="flex justify-center items-center px-6 py-2 h-16">
                            <div className="text-2xl font-bold text-gray-200 text-center leading-loose tracking-wider">
                                STARTER KIT
                            </div>
                        </div>
                        <div className="w-full p-3 flex items-center gap-4 border-b bg-gray-950/50 border-gray-900 border-t">
                            <img
                                src={auth.user.avatar}
                                className="w-12 h-12 rounded-full border border-gray-800"
                            />
                            <div className="flex flex-col gap-0.5">
                                <div className="text-gray-50 text-sm font-semibold capitalize">
                                    {auth.user.name}
                                </div>
                                <div className="text-gray-400 text-xs">
                                    {auth.user.email}
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col overflow-y-auto">
                            {menuNavigation.map((item, index) => (
                                <div key={index}>
                                    <div className="text-gray-500 text-xs py-3 px-4 font-bold uppercase">
                                        {item.title}
                                    </div>
                                    {item.details.map((detail, indexDetail) => (
                                        detail.hasOwnProperty('subdetails') ?
                                        <>
                                            <button
                                                className={`min-w-full flex items-center font-medium gap-x-3.5 px-4 py-3 text-gray-500 hover:border-r-2 hover:border-r-gray-50 hover:text-gray-100 capitalize hover:cursor-pointer text-sm justify-between`}
                                                onClick={() => setIsOpen(!isOpen)}>
                                                <div className='flex items-center gap-x-3.5'>{detail.icon}{detail.title}</div>
                                                {isOpen ? (
                                                    <IconChevronUp size={18} strokeWidth={1.5}/>
                                                ) : (
                                                    <IconChevronDown size={18} strokeWidth={1.5}/>
                                                )}
                                            </button>
                                            {isOpen &&
                                                detail.subdetails.map((data, i) => (
                                                    <Link
                                                        key={i}
                                                        href={data.href}
                                                        className={`${url === data.href ? 'border-r-2 border-r-gray-500 bg-gray-900 text-white' : '' } min-w-full flex items-center font-medium gap-x-3.5 px-5 py-3 text-gray-500 hover:border-r-2 hover:border-r-gray-50 hover:text-gray-100 capitalize hover:cursor-pointer text-sm line-clamp-1`}
                                                        onClick={() => setIsToggle(!isToggle)}>
                                                        <IconCornerDownRight size={18} strokeWidth={1.5}/> {data.title}
                                                    </Link>
                                                ))
                                            }
                                        </>
                                        :
                                        <Link
                                            href={detail.href}
                                            className={`${url.startsWith(detail.href) ? 'border-r-2 border-r-gray-500 bg-gray-900 text-white' : '' } flex items-center font-medium gap-x-3.5 px-4 py-3 text-gray-500 hover:border-r-2 hover:border-r-gray-50 hover:text-gray-100 capitalize hover:cursor-pointer text-sm`}
                                            key={indexDetail}
                                            onClick={() => setIsToggle(!isToggle)}
                                        >
                                            {detail.icon} {detail.title}
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            }
        </>
    )
}
