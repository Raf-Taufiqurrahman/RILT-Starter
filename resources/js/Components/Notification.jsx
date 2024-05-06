import React from 'react'
import { Menu, Transition  } from '@headlessui/react'
import { IconBell, IconDots, IconCircleCheck, IconPackage, IconCashBanknote, IconPhoto, IconCircleCheckFilled, IconMessage  } from '@tabler/icons-react'
export default function Notification() {

    const data = [
        {
            user: 'Rafi Taufiqurrahman',
            title: 'Your order has been shiped.',
            time: '1h',
            is_read: 1,
            icon: <IconPhoto size={24} strokeWidth={1.5} className='text-gray-400'/>
        },
        {
            user: 'John Doe',
            title: 'Your payment was successfull.',
            time: '15m',
            is_read: 0,
            icon: <IconCashBanknote size={24} strokeWidth={1.5} className='text-gray-400'/>
        },
        {
            user: 'Bob Brown',
            title: 'A new product is avaliable.',
            time: '1d',
            is_read: 1,
            icon: <IconPackage size={24} strokeWidth={1.5} className='text-gray-400'/>
        },
        {
            user: 'Charlie Davis',
            title: 'Your account has been approved.',
            time: '1w',
            is_read: 1,
            icon: <IconBell size={24} strokeWidth={1.5} className='text-gray-400'/>
        },
        {
            user: 'George Hill',
            title: 'Your message has been replied.',
            time: '3d',
            is_read: 0,
            icon: <IconMessage size={24} strokeWidth={1.5} className='text-gray-400'/>
        },
    ]


    return (
        <Menu className='relative z-50' as="div">
            <Menu.Button className='flex items-center rounded-md group p-2'>
                <div className='absolute text-[8px] font-semibold border border-rose-500/40 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 top-0 -right-2 rounded-md px-1.5 py-0.5 group-hover:scale-125 duration-300 ease-in'>
                    {data.length}
                </div>
                <IconBell strokeWidth={1.5} size={18} className='text-gray-400'/>
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className='absolute bg-gray-950 rounded-lg w-[500px] border border-gray-900 md:right-0 z-[100]'>
                    <div className='flex justify-between items-center gap-2 p-4 border-b border-gray-900'>
                        <div className='text-gray-200 text-lg font-bold'>Notifications</div>
                        <IconDots className='text-gray-200' size={24}/>
                    </div>
                    <div className='p-4'>
                        <div className='flex flex-col gap-2 items-start h-60 overflow-y-auto'>
                            {data.map((data, i) => (
                                <div className='flex items-center justify-between w-full hover:bg-gray-900 p-4 rounded-lg' key={i}>
                                    <div className='flex items-center gap-4'>
                                        {data.icon}
                                        <div>
                                            <div className='text-gray-200 font-semibold text-sm'>
                                                {data.user} <sup className='text-xs font-mono text-gray-400 ml-1'>{data.time}</sup>
                                            </div>
                                            <div className='text-gray-500 text-sm'>{data.title}</div>
                                        </div>
                                    </div>
                                    {data.is_read == 1 ? <IconCircleCheckFilled size={20} strokeWidth={1.5} className='text-gray-400'/> : <IconCircleCheck size={20} strokeWidth={1.5} className='text-gray-400'/>}
                                </div>
                            ))}
                        </div>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
