import React from 'react'
import { Listbox } from '@headlessui/react'
import { IconChevronDown, IconCircle, IconCircleFilled } from '@tabler/icons-react'
export default function ListBox({selected, data, setSelected, label, errors}) {

    const preview = selected.length ?
        selected.length >= 4 ? `jumlah hak akses terpilih ${selected.length}` :
        selected.map((item) => item.name).join(', ')
        :
        'Pilh Hak Akses'

    return (
        <div className='flex flex-col gap-2'>
            <label className='text-gray-600 text-sm'>{label}</label>
            <Listbox value={selected} onChange={setSelected} multiple by="id">
                <Listbox.Button className={'w-full px-3 py-1.5 border bg-gray-900 text-sm rounded-md focus:outline-none focus:ring-0 text-gray-500 focus:border-gray-700 border-gray-800 flex justify-between items-center gap-8'}>
                    {preview}
                    <IconChevronDown size={20} strokeWidth={1.5}/>
                </Listbox.Button>
                <Listbox.Options className={'bg-gray-950 p-4 border border-gray-900 rounded-lg flex flex-wrap gap-2'}>
                    {data.map((item) => (
                        <Listbox.Option key={item.id} value={item}>
                            {({ selected }) => (
                                <div
                                    className='text-gray-400 cursor-pointer hover:bg-gray-800 px-3 py-1.5 rounded-lg flex items-center gap-2 bg-gray-900 border-gray-800 text-sm'>
                                    {selected ? <IconCircleFilled size={15} strokeWidth={1.5} className='text-teal-500' /> : <IconCircle size={15} strokeWidth={1.5}/>}
                                    {item.name}
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
            {errors && (
                <small className='text-xs text-red-500'>{errors}</small>
            )}
        </div>
    )
}
