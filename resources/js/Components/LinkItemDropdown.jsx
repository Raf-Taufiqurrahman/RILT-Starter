import React, { useState } from 'react'
import { Link } from '@inertiajs/react'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
export default function LinkItemDropdown({icon, title}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button
                className={`min-w-full flex items-center font-medium gap-x-3.5 px-4 py-3 text-gray-500 hover:border-r-2 hover:border-r-gray-50 hover:text-gray-100 capitalize hover:cursor-pointer text-sm justify-between`}
                onClick={() => setIsOpen(!isOpen)}>
                <div className='flex items-center gap-x-3.5'>{icon}{title}</div>
                {isOpen ? (
                    <IconChevronUp size={18} strokeWidth={1.5}/>
                ) : (
                    <IconChevronDown size={18} strokeWidth={1.5}/>
                )}
            </button>
            {isOpen &&
                <>
                    <Link href="/apps/profile" className='min-w-full flex items-center font-medium gap-x-3.5 px-4 py-3 text-gray-500 hover:border-r-2 hover:border-r-gray-50 hover:text-gray-100 capitalize hover:cursor-pointer text-sm'>
                        Profile
                    </Link>
                    <Link href="/apps/profile" className='min-w-full flex items-center font-medium gap-x-3.5 px-4 py-3 text-gray-500 hover:border-r-2 hover:border-r-gray-50 hover:text-gray-100 capitalize hover:cursor-pointer text-sm'>
                        Profile
                    </Link>
                </>
            }
        </>
    )
}
