import React, { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { IconChevronDown, IconChevronUp, IconCornerDownRight  } from '@tabler/icons-react'
export default function LinkItemDropdown({icon, title, data}) {

    // destruct url from usepage
    const { url } = usePage();

    // define state
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
            {isOpen ?
                <>
                    {data.map((data, i) => (
                        <Link
                            key={i}
                            href={data.href}
                            className={`${url === data.href ? 'border-r-2 border-r-gray-500 bg-gray-900 text-white' : '' } min-w-full flex items-center font-medium gap-x-3.5 px-5 py-3 text-gray-500 hover:border-r-2 hover:border-r-gray-50 hover:text-gray-100 capitalize hover:cursor-pointer text-sm line-clamp-1`}>
                            <IconCornerDownRight size={18} strokeWidth={1.5}/> {data.title}
                        </Link>
                    ))}
                </>
                :
                <></>
            }
        </>
    )
}
