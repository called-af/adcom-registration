import { CheckCircle, Clock, Users, XCircle } from 'lucide-react';
import type { RegistrationStats as StatsType, RegistrationStatus } from '@/types/registration';
import { StatCard } from './stat-card';

interface RegistrationStatsProps {
    stats: StatsType;
    statusFilter: string;
    onStatusFilterChange: (status: string) => void;
}

export function RegistrationStats({
    stats,
    statusFilter,
    onStatusFilterChange,
}: RegistrationStatsProps) {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
                icon={<Users className="size-5 text-[#14532D]" />}
                label="Total Pendaftar"
                value={stats.total}
                color="bg-[#E7EEE6]"
                onClick={() => onStatusFilterChange('')}
                isActive={statusFilter === ''}
            />
            <StatCard
                icon={<Clock className="size-5 text-amber-600" />}
                label="Menunggu Review"
                value={stats.pending}
                color="bg-amber-50"
                onClick={() => onStatusFilterChange('pending')}
                isActive={statusFilter === 'pending'}
            />
            <StatCard
                icon={<CheckCircle className="size-5 text-emerald-600" />}
                label="Diterima (Lolos)"
                value={stats.lolos}
                color="bg-emerald-50"
                onClick={() => onStatusFilterChange('lolos')}
                isActive={statusFilter === 'lolos'}
            />
            <StatCard
                icon={<XCircle className="size-5 text-red-500" />}
                label="Ditolak"
                value={stats.ditolak}
                color="bg-red-50"
                onClick={() => onStatusFilterChange('ditolak')}
                isActive={statusFilter === 'ditolak'}
            />
        </div>
    );
}
