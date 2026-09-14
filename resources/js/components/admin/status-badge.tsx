import { cn } from '@/lib/utils';
import type { RegistrationStatus } from '@/types/registration';

const STATUS_CONFIG: Record<
    RegistrationStatus,
    { label: string; className: string; dot: string }
> = {
    pending: {
        label: 'Pending',
        className: 'bg-amber-50 text-amber-700 border border-amber-200',
        dot: 'bg-amber-400',
    },
    lolos: {
        label: 'Diterima',
        className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        dot: 'bg-emerald-500',
    },
    ditolak: {
        label: 'Ditolak',
        className: 'bg-red-50 text-red-600 border border-red-200',
        dot: 'bg-red-400',
    },
};

export function StatusBadge({ status }: { status: RegistrationStatus }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
                config.className,
            )}
        >
            <span className={cn('size-1.5 rounded-full', config.dot)} />
            {config.label}
        </span>
    );
}
