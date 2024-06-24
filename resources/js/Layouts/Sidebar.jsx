import React from "react";
import Menu from "@/Utils/Menu"
import LinkItem from "@/Components/LinkItem";
import LinkItemDropdown from "@/Components/LinkItemDropdown";
import { usePage } from "@inertiajs/react";
import { IconBrandReact } from "@tabler/icons-react";
import { clsx } from "clsx";
export default function Sidebar({ sidebarOpen }) {

    // define props
    const { auth } = usePage().props;

    // get menu from utils
    const menuNavigation = Menu();

    return (
        <div
            className={clsx(sidebarOpen ? 'w-[260px]' : 'w-[100px]', 'hidden md:block min-h-screen overflow-y-auto border-r transition-all duration-300 bg-white dark:bg-gray-950 dark:border-gray-900')}>
            {sidebarOpen ?
                <>
                    <div className="flex justify-center items-center px-6 py-2 h-16">
                        <div className="text-2xl font-bold text-center leading-loose tracking-wider text-gray-900 dark:text-gray-200">
                            STARTER KIT
                        </div>
                    </div>
                    <div className="w-full p-3 flex items-center gap-4 border-b border-t dark:bg-gray-950/50 dark:border-gray-900">
                        <img
                            src={auth.user.avatar}
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="flex flex-col gap-0.5">
                            <div className="text-sm font-semibold capitalize text-gray-700 dark:text-gray-50">
                                {auth.user.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {auth.user.email}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col overflow-y-auto">
                        {menuNavigation.map((item, index) => (
                            <div key={index}>
                                {item.permissions &&
                                    <div className="text-gray-500 text-xs py-3 px-4 font-bold uppercase">
                                        {item.title}
                                    </div>
                                }
                                {item.details.map((detail, indexDetail) => (
                                    detail.hasOwnProperty('subdetails') ?
                                        <LinkItemDropdown
                                            key={indexDetail}
                                            title={detail.title}
                                            icon={detail.icon}
                                            data={detail.subdetails}
                                            access={detail.permissions}
                                            sidebarOpen={sidebarOpen}
                                        />
                                    :
                                        <LinkItem
                                            key={indexDetail}
                                            title={detail.title}
                                            icon={detail.icon}
                                            href={detail.href}
                                            access={detail.permissions}
                                            sidebarOpen={sidebarOpen}
                                        />
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            :
                <>
                    <div className="flex justify-center items-center px-6 py-2 h-16 border-b dark:border-gray-900">
                        <IconBrandReact size={20} strokeWidth={1.5} className="dark:text-white"/>
                    </div>
                    <div className='w-full px-6 py-3 flex justify-center items-center gap-4 border-b bg-white dark:bg-gray-950/50 dark:border-gray-900'>
                        <img src={auth.user.avatar} className='w-8 h-8 rounded-full'/>
                    </div>
                    <div className='w-full flex flex-col overflow-y-auto items-center justify-center'>
                        {menuNavigation.map((link, i) => (
                            <div className='flex flex-col min-w-full items-center' key={i}>
                                {link.details.map((detail, x) =>
                                    detail.hasOwnProperty('subdetails') ?
                                        <LinkItemDropdown
                                            sidebarOpen={sidebarOpen}
                                            key={x}
                                            data={detail.subdetails}
                                            icon={detail.icon}
                                            href={detail.href}
                                            access={detail.permissions}
                                        />
                                    :
                                        <LinkItem
                                            sidebarOpen={sidebarOpen}
                                            key={x}
                                            access={detail.permissions}
                                            icon={detail.icon}
                                            href={detail.href}
                                        />
                                )}
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    );
}
