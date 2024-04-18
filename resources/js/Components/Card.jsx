import React from 'react'

export default function Card({icon, title, children, footer, className, form}) {
    return (
        <>
            <form onSubmit={form}>
                <div className={`p-4 bg-gray-950 border-gray-900 rounded-t-lg border ${className}`}>
                    <div className='flex items-center gap-2 font-semibold text-sm text-gray-200'>
                        {icon} {title}
                    </div>
                </div>
                <div className='bg-gray-950 p-4'>
                    {children}
                </div>
                <div className={`p-4 bg-gray-950 border-gray-900 rounded-b-lg border ${className}`}>
                    {footer}
                </div>
            </form>
        </>
    )
}
