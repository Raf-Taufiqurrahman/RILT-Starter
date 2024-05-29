import Card from '@/Components/Card';
import Table from '@/Components/Table';
import Widget from '@/Components/Widget';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { IconBox,IconChartBar,IconPackage,IconUsers,IconWallet } from '@tabler/icons-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function Dashboard({ auth }) {

    const products = [
        {
            id: 1,
            name: 'Buku Tulis Sidu',
            stock: 5
        },
        {
            id: 2,
            name: 'Pulpen Pilot',
            stock: 3
        },
        {
            id: 3,
            name: 'Shampo Metal Fortis',
            stock: 2
        },
        {
            id: 4,
            name: 'Susu Ultra Milk',
            stock: 4
        }
    ];

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
          {
            label: 'Buku Tulis Sidu',
            data: labels.map((_, index) => (index + 1) * 2),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Pulpen Pilot',
            data: labels.map((_, index) => (index + 1) * 3),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Shampo Metal Fortis',
            data: labels.map((_, index) => (index + 1) * 4),
            backgroundColor: 'rgba(0, 128, 0, 0.5)',
          },
          {
            label: 'Susu Ultra Milk',
            data: labels.map((_, index) => (index + 1) * 5),
            backgroundColor: 'rgba(255, 165, 0, 0.5)',
          },
        ],
    };

    return (
        <>
            <Head title='Dashboard'/>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <Widget
                    title={'Produk'}
                    subtitle={'Total Produk'}
                    color={'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'}
                    icon={<IconBox size={'20'} strokeWidth={'1.5'}/>}
                    total={40}
                />
                <Widget
                    title={'Pendapatan'}
                    subtitle={'Total Pendapatan Hari Ini'}
                    color={'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'}
                    icon={<IconWallet size={'20'} strokeWidth={'1.5'}/>}
                    total={<><sup>Rp</sup> 1.000K</>}
                />
                <Widget
                    title={'Pelanggan'}
                    subtitle={'Total Pelanggan'}
                    color={'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'}
                    icon={<IconUsers size={'20'} strokeWidth={'1.5'}/>}
                    total={4}
                />
            </div>
            <div className='grid grid-cols-4 mt-5 gap-4 items-start'>
                <div className='col-span-4 md:col-span-2'>
                    <Table.Card
                        title={'Data Produk Dengan Stok Dibawah Limit'}
                        icon={<IconPackage size={20} strokeWidth={1.5}/>}
                    >
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th className='w-10'>No</Table.Th>
                                    <Table.Th>Nama Produk</Table.Th>
                                    <Table.Th className={'text-center'}>Stok</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {products.map((product, i) => (
                                    <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                        <Table.Td className='text-center'>
                                            {++i}
                                        </Table.Td>
                                        <Table.Td>
                                            {product.name}
                                        </Table.Td>
                                        <Table.Td className={'text-center'}>
                                            <span className='rounded-full px-2.5 py-1 text-xs tracking-tight font-medium transition-colors focus:outline-none gap-1 capitalize border border-rose-500/40 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'>
                                                {product.stock
                                            }</span>
                                        </Table.Td>
                                    </tr>
                                    ))
                                }
                            </Table.Tbody>
                        </Table>
                    </Table.Card>
                </div>
                <div className='col-span-4 md:col-span-2'>
                    <div className={`p-4 rounded-t-lg border bg-white dark:bg-gray-950 dark:border-gray-900`}>
                        <div className='flex items-center gap-2 font-semibold text-sm text-gray-700 dark:text-gray-200'>
                            Grafik Penjualan Produk
                        </div>
                    </div>
                    <div className='p-4 rounded-b-lg border border-t-0 bg-white dark:bg-gray-950 dark:border-gray-900'>
                        <Bar className='min-w-full' data={data} />
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = page => <AppLayout children={page}/>
