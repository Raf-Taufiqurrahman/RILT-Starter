import Widget from '@/Components/Widget';
import AppLayout from '@/Layouts/AppLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { IconBox, IconTags, IconVersions, IconWallet } from '@tabler/icons-react';

export default function Dashboard({ auth }) {
    return (
        <AppLayout>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <Widget
                    title={'Products'}
                    subtitle={'Total Products'}
                    color={'bg-gray-800 text-gray-200'}
                    icon={<IconBox size={'20'} strokeWidth={'1.5'}/>}
                    total={100}
                />
                <Widget
                    title={'Profits'}
                    subtitle={'Total Profits Today'}
                    color={'bg-gray-800 text-gray-200'}
                    icon={<IconWallet size={'20'} strokeWidth={'1.5'}/>}
                    total={
                        <>
                            <sup>Rp</sup> 10.000.000
                        </>
                    }
                />
                <Widget
                    title={'Units'}
                    subtitle={'Total Units'}
                    color={'bg-gray-800 text-gray-200'}
                    icon={<IconVersions size={'20'} strokeWidth={'1.5'}/>}
                    total={4}
                />
            </div>
        </AppLayout>
    );
}