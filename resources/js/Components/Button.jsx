import React from 'react'
import { Link } from '@inertiajs/react'
import { useForm } from '@inertiajs/react';
import { clsx } from 'clsx';
import Swal from 'sweetalert2'
export default function Button({className, icon, label, type, href, url, id, variant = '', ...props}) {

    const { delete: destroy } = useForm();

    const deleteData = async (url) => {
        Swal.fire({
            title: 'Apakah kamu yakin ingin menghapus data ini ?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, tolong hapus!',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(url)

                Swal.fire({
                    title: 'Success!',
                    text: 'Data berhasil dihapus!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    // style button modal, edit, delete
    const styleActionButton = 'px-3 py-2 flex items-center gap-1 rounded-lg text-sm font-semibold border';

    // style button link, button, submit, bulk
    const styleButton = 'px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-semibold text-gray-200 border';

    // variant color button
    const variants = {
        rose: 'bg-white text-rose-500 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-950',
        roseBlack: 'bg-white text-rose-500 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:hover:bg-gray-900',
        orange: 'bg-white text-orange-500 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-950',
        gray: ' bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900',
    }[variant];

    return (
        <>
            {type === 'link' &&
                <Link href={href} className={clsx(styleButton, className, variants)}>
                    {icon} <span className="hidden lg:block">{label}</span>
                </Link>
            }
            {type === 'button' &&
                <button className={clsx(styleButton, className, variants)} {...props}>
                    {icon} <span className="hidden md:block">{label}</span>
                </button>
            }
            {type === 'submit' &&
                <button type='submit' className={clsx(styleButton, className, variants)} {...props}>
                    {icon} <span className="hidden sm:block">{label}</span>
                </button>
            }
            {type === 'delete' &&
                <button onClick={() => deleteData(url)} className={clsx(styleActionButton, className, variants)} {...props}>
                    {icon}
                </button>
            }
            {type === 'modal' &&
                <button className={clsx(styleActionButton, className, variants)} {...props}>{icon}</button>
            }
            {type === 'edit' &&
                <Link href={href} className={clsx(styleActionButton, className, variants)} {...props}>
                    {icon}
                </Link>
            }
            {type === 'bulk' &&
                <button {...props} className={clsx(styleActionButton, className, variants)}>
                    {icon} <span className="hidden lg:block">{label}</span>
                </button>
            }
        </>
    )
}
