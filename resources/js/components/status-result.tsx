import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

export type RegistrationStatusType = 'lolos' | 'pending' | 'ditolak';

export interface RegistrationDetailData {
    name: string;
    nim: string;
    division: string;
    submittedAt: string;
    studyProgram?: string;
    email?: string;
    whatsapp?: string;
}

interface StatusResultProps {
    status: RegistrationStatusType;
    data: RegistrationDetailData;
    customMessage?: string;
    className?: string;
}

export function StatusResult({
    status,
    data,
    customMessage,
    className,
}: StatusResultProps) {
    const config = {
        lolos: {
            title: 'LOLOS',
            badgeBg: 'bg-[#14532D] text-white',
            boxBg: 'bg-[#D6E6D3] border-[#A2C29B] text-[#14532D]',
            icon: CheckCircle2,
            iconColor: 'text-[#14532D]',
            defaultMessage:
                'Selamat! Kamu dinyatakan LOLOS SELEKSI UKM Android Developer Community, silakan menunggu informasi selanjutnya terkait jadwal wawancara melalui WhatsApp atau Email.',
        },
        pending: {
            title: 'PENDING',
            badgeBg: 'bg-amber-600 text-white',
            boxBg: 'bg-[#FEF8E7] border-amber-300 text-amber-900',
            icon: Clock,
            iconColor: 'text-amber-600',
            defaultMessage:
                'Pendaftaranmu sedang dalam tahap peninjauan dan verifikasi oleh tim pengurus UKM Android Developer Community. Mohon pantau email dan WhatsApp secara berkala.',
        },
        ditolak: {
            title: 'TIDAK LOLOS',
            badgeBg: 'bg-red-600 text-white',
            boxBg: 'bg-[#FDF2F2] border-red-200 text-red-950',
            icon: XCircle,
            iconColor: 'text-red-600',
            defaultMessage:
                'Mohon maaf, kamu belum lolos seleksi UKM Android Developer Community periode ini. Terima kasih atas antusiasmemu, tetap semangat belajar dan berkarya!',
        },
    }[status];

    const Icon = config.icon;

    return (
        <div
            className={cn(
                'animate-in space-y-3 duration-300 fade-in-50',
                className,
            )}
        >
            <div
                className={cn(
                    'relative overflow-hidden rounded-xl border p-3.5 shadow-xs transition-all sm:p-4',
                    config.boxBg,
                )}
            >
                <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                        <Icon
                            className={cn(
                                'size-5 stroke-[2.5]',
                                config.iconColor,
                            )}
                        />
                    </div>
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                            <span
                                className={cn(
                                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-[10.5px] font-black tracking-wider uppercase',
                                    config.badgeBg,
                                )}
                            >
                                {config.title}
                            </span>
                            <span className="text-[11px] font-semibold opacity-75">
                                Status Seleksi Pendaftaran
                            </span>
                        </div>
                        <p className="text-xs leading-relaxed font-medium sm:text-[13px]">
                            {customMessage || config.defaultMessage}
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border border-[#DCE5DB] bg-white p-3.5 shadow-xs sm:p-4">
                <div className="mb-2.5 flex items-center justify-between border-b border-gray-100 pb-1.5 text-[11px] font-bold tracking-wider text-[#14532D] uppercase">
                    <span>Detail Informasi Pendaftar</span>
                    <span className="text-[10px] font-normal text-gray-400 normal-case">
                        Data terverifikasi
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3.5">
                    <div className="space-y-0.5">
                        <div className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                            NAMA LENGKAP
                        </div>
                        <div className="text-sm font-extrabold tracking-tight text-[#14532D]">
                            {data.name}
                        </div>
                    </div>

                    <div className="space-y-0.5">
                        <div className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                            NIM
                        </div>
                        <div className="font-mono text-sm font-bold text-gray-900">
                            {data.nim}
                        </div>
                    </div>

                    <div className="space-y-0.5">
                        <div className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                            DIVISI PILIHAN
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 sm:text-sm">
                            <span className="inline-block size-1.5 rounded-full bg-[#14532D]" />
                            {data.division}
                        </div>
                    </div>

                    <div className="space-y-0.5">
                        <div className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                            DIKIRIM PADA
                        </div>
                        <div className="text-xs font-semibold text-gray-700 sm:text-sm">
                            {data.submittedAt}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
