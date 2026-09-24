import {
    Check,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    UserCheck,
    Users,
    X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Registration } from '@/types/registration';
import { StatusBadge } from './status-badge';

interface RegistrationTableProps {
    registrations: Registration[];
    allFilteredCount: number;
    currentPage: number;
    totalPages: number;
    perPage: number;
    onPageChange: (page: number) => void;
    onSelectRegistration: (reg: Registration) => void;
    onAccept: (id: number) => void;
    onRejectClick: (reg: Registration) => void;
}

export function RegistrationTable({
    registrations,
    allFilteredCount,
    currentPage,
    totalPages,
    perPage,
    onPageChange,
    onSelectRegistration,
    onAccept,
    onRejectClick,
}: RegistrationTableProps) {
    const fromIndex = (currentPage - 1) * perPage;

    if (registrations.length === 0) {
        return (
            <div className="overflow-hidden rounded-[24px] border border-[#D5DDD4] bg-white p-16 text-center shadow-sm">
                <Users className="mx-auto mb-3 size-10 text-gray-300" />
                <p className="text-sm font-semibold text-gray-700">
                    Tidak ada pendaftar yang cocok.
                </p>
                <p className="mt-1 text-xs text-gray-400">
                    Coba ubah kata kunci pencarian atau filter status.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-[24px] border border-[#D5DDD4] bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">
                    <thead>
                        <tr className="border-b border-[#E8EDE7] bg-[#F7FAF6]">
                            <th className="px-4 py-3.5 text-left text-[11px] font-bold tracking-wider text-[#14532D] uppercase">
                                #
                            </th>
                            <th className="px-4 py-3.5 text-left text-[11px] font-bold tracking-wider text-[#14532D] uppercase">
                                Calon Anggota
                            </th>
                            <th className="px-4 py-3.5 text-left text-[11px] font-bold tracking-wider text-[#14532D] uppercase">
                                Program Studi
                            </th>
                            <th className="px-4 py-3.5 text-left text-[11px] font-bold tracking-wider text-[#14532D] uppercase">
                                Divisi
                            </th>
                            <th className="px-4 py-3.5 text-left text-[11px] font-bold tracking-wider text-[#14532D] uppercase">
                                Status Seleksi
                            </th>
                            <th className="px-4 py-3.5 text-left text-[11px] font-bold tracking-wider text-[#14532D] uppercase">
                                Konfirmasi Penerimaan
                            </th>
                            <th className="px-4 py-3.5 text-left text-[11px] font-bold tracking-wider text-[#14532D] uppercase">
                                Detail
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F4EF]">
                        {registrations.map((reg, idx) => (
                            <tr
                                key={reg.id}
                                className="transition-colors hover:bg-[#F7FAF6]"
                            >
                                <td className="px-4 py-3.5 text-xs font-medium text-gray-400">
                                    {fromIndex + idx + 1}
                                </td>
                                <td className="px-4 py-3.5">
                                    <p className="font-bold text-gray-900">{reg.name}</p>
                                    <p className="font-mono text-xs text-gray-500">
                                        {reg.nim} · {reg.angkatan}
                                    </p>
                                </td>
                                <td className="px-4 py-3.5 text-xs font-medium text-gray-600">
                                    {reg.study_program}
                                </td>
                                <td className="px-4 py-3.5 font-semibold text-gray-800 text-xs">
                                    {reg.division}
                                </td>
                                <td className="px-4 py-3.5">
                                    <StatusBadge status={reg.status} />
                                </td>
                                <td className="px-4 py-3.5">
                                    {/* Direct Accept / Reject Action Buttons */}
                                    <div className="flex items-center gap-1.5">
                                        {reg.status !== 'lolos' ? (
                                            <button
                                                onClick={() => onAccept(reg.id)}
                                                title="Terima / Loloskan pendaftar ini"
                                                className="inline-flex items-center gap-1 rounded-lg bg-[#14532D] px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#0E3D20] active:scale-95 shadow-xs"
                                            >
                                                <Check className="size-3.5" />
                                                <span>Terima</span>
                                            </button>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                                                <UserCheck className="size-4" />
                                                Diterima
                                            </span>
                                        )}

                                        {reg.status !== 'ditolak' && (
                                            <button
                                                onClick={() => onRejectClick(reg)}
                                                title="Tolak pendaftar ini"
                                                className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 p-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-100 active:scale-95"
                                            >
                                                <X className="size-3.5" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-3.5">
                                    <button
                                        onClick={() => onSelectRegistration(reg)}
                                        className="inline-flex items-center gap-1 rounded-lg border border-[#B7CDB0] bg-[#E7EEE6] px-2.5 py-1.5 text-xs font-bold text-[#14532D] transition-colors hover:bg-[#DDE7DB] active:scale-[0.98]"
                                    >
                                        <ExternalLink className="size-3" />
                                        Detail
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-[#E8EDE7] px-4 py-3">
                    <p className="text-xs text-gray-500">
                        Menampilkan{' '}
                        <span className="font-semibold text-gray-800">
                            {fromIndex + 1}–
                            {Math.min(fromIndex + perPage, allFilteredCount)}
                        </span>{' '}
                        dari{' '}
                        <span className="font-semibold text-gray-800">
                            {allFilteredCount}
                        </span>{' '}
                        data
                    </p>
                    <div className="flex items-center gap-1.5">
                        <button
                            disabled={currentPage <= 1}
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                            className={cn(
                                'inline-flex size-8 items-center justify-center rounded-lg border border-[#D5DDD4] bg-white text-gray-600 transition-colors',
                                currentPage <= 1
                                    ? 'cursor-not-allowed opacity-40'
                                    : 'hover:bg-[#E7EEE6]',
                            )}
                        >
                            <ChevronLeft className="size-4" />
                        </button>
                        <span className="text-xs font-semibold text-gray-700">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            disabled={currentPage >= totalPages}
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                            className={cn(
                                'inline-flex size-8 items-center justify-center rounded-lg border border-[#D5DDD4] bg-white text-gray-600 transition-colors',
                                currentPage >= totalPages
                                    ? 'cursor-not-allowed opacity-40'
                                    : 'hover:bg-[#E7EEE6]',
                            )}
                        >
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
