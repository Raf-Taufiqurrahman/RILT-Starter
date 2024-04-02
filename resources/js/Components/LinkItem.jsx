import React from 'react'
import { Link, usePage } from '@inertiajs/react'
export default function LinkItem({href, icon, link, title, ...props}) {
    // destruct url from usepage
    const { url } = usePage();

    // destruct auth from usepage props
    const { auth } = usePage().props;

    return (
        <div>
            <Link
                href={href}
                className={`${url.startsWith(href) ? 'border-r-2 border-r-gray-500 bg-gray-900 text-white' : '' } flex items-center font-medium gap-x-3.5 px-4 py-3 text-gray-500 hover:border-r-2 hover:border-r-gray-50 hover:text-gray-100 capitalize hover:cursor-pointer text-sm`}
                {...props}
            >
                {icon} {title}
            </Link>
        </div>
    )
}
