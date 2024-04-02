import { useForm } from '@inertiajs/react';
import { IconSearch } from '@tabler/icons-react';
import React from 'react'
export default function Search({url, placeholder}) {

    // define use form inertia
    const {data, setData, get} = useForm({
        search : '',
    })

    // define method searchData
    const searchData = (e) => {
        e.preventDefault();

        get(`${url}?search=${data.search}`)
    }

    console.log(searchData);

    return (
        <form onSubmit={searchData}>
            <div className='relative'>
                <input
                    type='text'
                    value={data.search}
                    onChange={e => setData('search', e.target.value)}
                    className='py-2 px-4 pr-11 block w-full rounded-lg text-sm border border-gray-900 focus:outline-none focus:ring-0 focus:ring-gray-500 focus:border-gray-800 text-gray-200 bg-gray-950'
                    placeholder={placeholder}/>
                <div className='absolute inset-y-0 right-0 flex items-center pointer-events-none pr-4'>
                    <IconSearch className='text-gray-500 w-5 h-5'/>
                </div>
            </div>
        </form>
    )
}
