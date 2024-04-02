import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function AppLayout({children}) {

   // define state sidebarOpen
    const [sidebarOpen, setSidebarOpen] = useState(
        localStorage.getItem('sidebarOpen') === 'true' ? true : false
    );

    // define react hooks
    useEffect(() => {
        localStorage.setItem('sidebarOpen', sidebarOpen);
    }, [sidebarOpen])

    // define function toggleSidebar
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className='min-h-screen flex overflow-y-auto'>
            <Sidebar sidebarOpen={sidebarOpen}/>
            <div className='flex-1 flex-col overflow-y-auto h-screen'>
                <Navbar toggleSidebar={toggleSidebar}/>
                <div className='w-full py-8 px-4 md:px-6 min-h-screen overflow-y-auto mb-14 md:mb-0 text-white'>
                    {children}
                </div>
            </div>
        </div>
    )
}
