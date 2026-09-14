import { cn } from '@/lib/utils';

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: number;
    color: string;
    onClick?: () => void;
    isActive?: boolean;
}

export function StatCard({
    icon,
    label,
    value,
    color,
    onClick,
    isActive,
}: StatCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'flex items-center gap-3.5 rounded-2xl border bg-white p-4 text-left transition-all hover:shadow-md active:scale-[0.98]',
                isActive
                    ? 'border-[#14532D] ring-2 ring-[#14532D]/20 shadow-sm'
                    : 'border-[#D5DDD4] shadow-xs',
            )}
        >
            <div className={cn('flex size-11 items-center justify-center rounded-xl', color)}>
                {icon}
            </div>
            <div>
                <p className="text-2xl font-extrabold leading-none text-gray-900">{value}</p>
                <p className="mt-1 text-xs font-semibold text-gray-500">{label}</p>
            </div>
        </button>
    );
}
