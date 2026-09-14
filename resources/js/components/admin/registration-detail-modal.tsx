import { Check, Clock, Mail, Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Registration } from '@/types/registration';
import { StatusBadge } from './status-badge';

interface RegistrationDetailModalProps {
    registration: Registration;
    onClose: () => void;
    onAccept: (id: number) => void;
    onReject: (id: number) => void;
    onPending: (id: number) => void;
}

function DetailItem({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div>
            <p className="text-[11px] font-bold tracking-wider text-[#14532D] uppercase">
                {label}
            </p>
            <div className="mt-0.5 text-sm font-medium text-gray-800">{value}</div>
        </div>
    );
}

export function RegistrationDetailModal({
    registration,
    onClose,
    onAccept,
    onReject,
    onPending,
}: RegistrationDetailModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="w-full max-w-xl overflow-hidden rounded-[26px] border border-[#D5DDD4] bg-white shadow-2xl shadow-emerald-950/25"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative overflow-hidden bg-[#14532D] px-6 py-5 text-white">
                    <div className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-emerald-500/20 blur-2xl" />
                    <div className="flex items-start justify-between">
                        <div className="relative z-10">
                            <span className="inline-block rounded-md bg-emerald-700/60 px-2 py-0.5 text-[10px] font-bold tracking-widest text-emerald-200 uppercase">
                                Detail Pendaftar
                            </span>
                            <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
                                {registration.name}
                            </h2>
                            <p className="mt-0.5 font-mono text-xs text-emerald-100/90">
                                NIM: {registration.nim} · Angkatan {registration.angkatan}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-full p-1 text-emerald-200 hover:bg-white/10 hover:text-white transition-colors"
                        >
                            <X className="size-5" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="space-y-4 p-6">
                    <div className="grid grid-cols-2 gap-3.5">
                        <DetailItem label="Program Studi" value={registration.study_program} />
                        <DetailItem
                            label="Divisi Pilihan"
                            value={
                                <span className="font-bold text-[#14532D]">
                                    {registration.division}
                                </span>
                            }
                        />
                        <DetailItem
                            label="Email"
                            value={
                                <a
                                    href={`mailto:${registration.email}`}
                                    className="inline-flex items-center gap-1 text-emerald-800 hover:underline"
                                >
                                    <Mail className="size-3.5" />
                                    {registration.email}
                                </a>
                            }
                        />
                        <DetailItem
                            label="WhatsApp"
                            value={
                                <a
                                    href={`https://wa.me/${registration.whatsapp.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-emerald-800 hover:underline"
                                >
                                    <Phone className="size-3.5" />
                                    {registration.whatsapp}
                                </a>
                            }
                        />
                        <DetailItem label="Tanggal Daftar" value={registration.submitted_at} />
                        <DetailItem
                            label="Status Saat Ini"
                            value={<StatusBadge status={registration.status} />}
                        />
                    </div>

                    <div className="rounded-xl border border-[#D5DDD4] bg-[#F7FAF6] p-4">
                        <p className="mb-1.5 text-[11px] font-bold tracking-wider text-[#14532D] uppercase">
                            Motivasi Mendaftar
                        </p>
                        <p className="text-sm leading-relaxed text-gray-700">
                            "{registration.motivation}"
                        </p>
                    </div>

                    {/* Penerimaan / Status actions */}
                    <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                        <p className="mb-2.5 text-xs font-bold text-gray-600 uppercase tracking-wider">
                            Keputusan Penerimaan
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                disabled={registration.status === 'lolos'}
                                onClick={() => onAccept(registration.id)}
                                className={cn(
                                    'inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-xs',
                                    registration.status === 'lolos'
                                        ? 'cursor-not-allowed bg-emerald-100 text-emerald-400'
                                        : 'bg-[#14532D] text-white hover:bg-[#0E3D20] active:scale-[0.98]',
                                )}
                            >
                                <Check className="size-4" />
                                {registration.status === 'lolos'
                                    ? 'Sudah Diterima'
                                    : 'Terima Pendaftar (Loloskan)'}
                            </button>

                            <button
                                disabled={registration.status === 'pending'}
                                onClick={() => onPending(registration.id)}
                                className={cn(
                                    'inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-all',
                                    registration.status === 'pending'
                                        ? 'cursor-not-allowed border-amber-200 bg-amber-50 text-amber-300'
                                        : 'border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 active:scale-[0.98]',
                                )}
                            >
                                <Clock className="size-3.5" />
                                Set Pending
                            </button>

                            <button
                                disabled={registration.status === 'ditolak'}
                                onClick={() => onReject(registration.id)}
                                className={cn(
                                    'inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-all',
                                    registration.status === 'ditolak'
                                        ? 'cursor-not-allowed border-red-200 bg-red-50 text-red-300'
                                        : 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100 active:scale-[0.98]',
                                )}
                            >
                                <X className="size-3.5" />
                                Tolak
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
