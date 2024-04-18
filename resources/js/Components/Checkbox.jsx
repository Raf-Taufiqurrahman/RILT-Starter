export default function Checkbox({ label, ...props }) {
    return (
        <div className="flex flex-row items-center gap-2">
            <input
                {...props}
                type="checkbox"
                className={'rounded-md bg-gray-950 border-gray-800 checked:bg-teal-500'}
            />
            <label className="text-sm text-gray-400">{label}</label>
        </div>
    );
}
