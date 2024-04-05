import React from 'react'

const Card = ({icon, title, className, children}) => {
    return (
        <>
            <div className={`p-4 bg-gray-950 border-gray-900 rounded-t-lg border ${className}`}>
                <div className='flex items-center gap-2 font-semibold text-sm text-gray-400'>
                    {icon} {title}
                </div>
            </div>
            <div className='bg-gray-950 rounded-b-lg'>
                {children}
            </div>
        </>

    )
}

const Table = ({ children }) => {
    return (
        <div className="w-full overflow-hidden overflow-x-auto border-collapse rounded-xl">
            <table className="w-full text-sm border-collapse">
                {children}
            </table>
        </div>
    );
};

const Thead = ({ className, children }) => {
    return (
        <thead className={`${className} border-b border-gray-900 bg-gray-950`}>{children}</thead>
    );
};

const Tbody = ({ className, children }) => {
    return (
        <tbody className={`${className} divide-y divide-gray-900 bg-gray-950`}>
            {children}
        </tbody>
    );
};

const Td = ({ className, children}) => {
    return (
        <td
            className={`${className} whitespace-nowrap p-4 align-middle text-gray-400`}
        >
            {children}
        </td>
    );
};

const Th = ({ className, children }) => {
    return (
        <th
            scope="col"
            className={`${className} h-12 px-4 text-left align-middle font-medium text-gray-400`}
        >
            {children}
        </th>
    );
};

const Empty = ({colSpan, message, children}) => {
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        {children}
                        <div className="mt-5">
                            {message}
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

Table.Card = Card;
Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Td = Td;
Table.Th = Th;
Table.Empty = Empty;

export default Table;
