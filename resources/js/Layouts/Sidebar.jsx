import LinkItem from "@/Components/LinkItem";
import { usePage } from "@inertiajs/react";
import { IconBrandReact } from "@tabler/icons-react";
import Menu from "@/Utils/Menu";
import React from "react";
import LinkItemDropdown from "@/Components/LinkItemDropdown";

export default function Sidebar({ sidebarOpen }) {
    // define props
    const { auth } = usePage().props;

    // get menu from utils
    const menuNavigation = Menu();

    return (
        <div
            className={`${sidebarOpen ? 'w-[260px]' : 'w-[100px]'} hidden md:block min-h-screen overflow-y-auto border-r bg-gray-950 border-gray-900 transition-all duration-300`}>
            {sidebarOpen ?
                <>
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
                                    <LinkItemDropdown title={detail.title} icon={detail.icon} key={indexDetail} data={detail.subdetails}/>
                                    :
                                    <LinkItem title={detail.title} icon={detail.icon} href={detail.href} key={indexDetail}/>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            :
                <>
                    <div className="flex justify-center items-center px-6 py-2 h-16 border-b border-gray-900">
                        <IconBrandReact size={20} strokeWidth={1.5} className="text-gray-400"/>
                    </div>
                </>
            }
        </div>
    );
}
