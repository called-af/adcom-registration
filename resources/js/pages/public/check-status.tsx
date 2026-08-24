import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CommunityLogo } from '@/components/community-logo';
import { FormField, ThemedInput } from '@/components/form-field';
import { StatusResult } from '@/components/status-result';
import type {
    RegistrationDetailData,
    RegistrationStatusType,
} from '@/components/status-result';
import { ThemedButton } from '@/components/themed-button';

interface Props {
    searchedNim?: string;
    result?: {
        status: RegistrationStatusType;
        data: RegistrationDetailData;
        message?: string;
    } | null;
    notFound?: boolean;
    status?: string;
    flash?: {
        error?: string;
        success?: string;
    };
}

const mockDatabase: Record<
    string,
    {
        status: RegistrationStatusType;
        data: RegistrationDetailData;
        message?: string;
    }
> = {
    '2024081001': {
        status: 'lolos',
        data: {
            name: 'Muhammad Farhan',
            nim: '2024081001',
            division: 'Frontend Developer',
            submittedAt: '20 Mei 2026',
            studyProgram: 'Teknik Informatika',
        },
        message:
            'Selamat! Kamu dinyatakan LOLOS SELEKSI UKM Android Developer Community, silakan menunggu informasi selanjutnya terkait jadwal wawancara melalui WhatsApp atau Email.',
    },
    '2024081002': {
        status: 'pending',
        data: {
            name: 'Alya Putri Ramadhani',
            nim: '2024081002',
            division: 'UI/UX Designer',
            submittedAt: '21 Mei 2026',
            studyProgram: 'Sistem Informasi',
        },
        message:
            'Pendaftaranmu sedang dalam proses review oleh tim penyeleksi UKM Android Developer Community. Mohon menunggu pengumuman resmi.',
    },
    '2024081003': {
        status: 'ditolak',
        data: {
            name: 'Rian Syahputra',
            nim: '2024081003',
            division: 'Backend Developer',
            submittedAt: '19 Mei 2026',
            studyProgram: 'Teknik Informatika',
        },
        message:
            'Mohon maaf, kamu belum lolos seleksi UKM Android Developer Community periode ini. Jangan berkecil hati dan tetap semangat berkarya!',
    },
};

export default function PublicCheckStatus({
    result,
    searchedNim: propSearchedNim,
}: Props) {
    const initialNim = propSearchedNim || '2024081001';
    const [nimInput, setNimInput] = useState(initialNim);
    const [currentSearchedNim, setCurrentSearchedNim] = useState(initialNim);
    const [isLoading, setIsLoading] = useState(false);
    const [currentResult, setCurrentResult] = useState<{
        status: RegistrationStatusType;
        data: RegistrationDetailData;
        message?: string;
    } | null>(result !== undefined ? result : mockDatabase[initialNim] || null);

    useEffect(() => {
        if (result !== undefined) {
            setCurrentResult(result);
        }
        if (propSearchedNim) {
            setCurrentSearchedNim(propSearchedNim);
            setNimInput(propSearchedNim);
        }
    }, [result, propSearchedNim]);

    const handleSearch = (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }

        const trimmed = nimInput.trim();

        if (!trimmed) {
            return;
        }

        setIsLoading(true);
        setCurrentSearchedNim(trimmed);

        router.get(
            '/cek-status',
            { nim: trimmed },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => {
                    setIsLoading(false);
                },
                onError: () => {
                    setIsLoading(false);
                    if (mockDatabase[trimmed]) {
                        setCurrentResult(mockDatabase[trimmed]);
                    } else {
                        setCurrentResult(null);
                    }
                },
            },
        );
    };

    return (
        <>
            <Head title="Cek Status Pendaftaran - UKM Android Developer Community" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-[#D9DED8] p-4 font-sans text-gray-900 selection:bg-[#A9C6A0] selection:text-[#14532D] sm:p-6 lg:h-screen lg:max-h-screen lg:overflow-hidden lg:p-6 xl:p-8">
                <div className="flex w-full max-w-xl flex-col lg:max-h-[calc(100vh-3rem)]">
                    <div className="mb-2.5 shrink-0">
                        <Link
                            href="/daftar"
                            className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#14532D] transition-colors hover:text-black sm:text-sm"
                        >
                            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                            <span>Kembali ke Pendaftaran</span>
                        </Link>
                    </div>

                    <main className="flex w-full flex-col overflow-hidden rounded-[24px] border border-[#D5DDD4] bg-white shadow-2xl shadow-emerald-950/15 lg:min-h-0 lg:overflow-hidden">
                        <div className="relative shrink-0 overflow-hidden bg-[#14532D] p-5 text-white sm:p-6">
                            <div className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-emerald-600/20 blur-2xl" />

                            <div className="relative z-10 space-y-2">
                                <CommunityLogo variant="white" size="sm" />

                                <h1 className="text-xl leading-tight font-extrabold tracking-tight text-white sm:text-2xl">
                                    Cek Status Pendaftaran
                                </h1>

                                <p className="text-xs leading-relaxed font-normal text-emerald-100/90">
                                    Pantau status pendaftaranmu dengan
                                    memasukkan NIM atau email kampus.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3.5 p-4.5 sm:p-6 lg:overflow-y-auto">
                            <form onSubmit={handleSearch}>
                                <FormField
                                    label="NIM"
                                    htmlFor="nim-search"
                                    hint="Tekan Cek untuk melihat status"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex-1">
                                            <ThemedInput
                                                id="nim-search"
                                                value={nimInput}
                                                onChange={(e) =>
                                                    setNimInput(e.target.value)
                                                }
                                                placeholder="Masukkan NIM (contoh: 2024081001)"
                                                className="font-mono"
                                            />
                                        </div>
                                        <ThemedButton
                                            type="submit"
                                            loading={isLoading}
                                            loadingText="Mencari..."
                                            icon={<Search className="size-4" />}
                                            className="h-9.5 shrink-0 px-5 text-sm font-bold"
                                        >
                                            Cek
                                        </ThemedButton>
                                    </div>
                                </FormField>
                            </form>

                            {currentResult ? (
                                <StatusResult
                                    status={currentResult.status}
                                    data={currentResult.data}
                                    customMessage={currentResult.message}
                                />
                            ) : (
                                <div className="space-y-1.5 py-6 text-center text-gray-500">
                                    <p className="text-sm font-medium">
                                        Data dengan NIM{' '}
                                        <span className="font-mono font-bold text-gray-800">
                                            {currentSearchedNim}
                                        </span>{' '}
                                        tidak ditemukan.
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Pastikan NIM yang kamu masukkan sudah
                                        benar dan sudah mendaftar di formulir
                                        pendaftaran.
                                    </p>
                                </div>
                            )}

                            <div className="border-t border-gray-100 pt-1.5 text-center">
                                <p className="text-xs text-gray-500">
                                    Belum mengisi formulir pendaftaran?{' '}
                                    <Link
                                        href="/daftar"
                                        className="font-bold text-[#14532D] underline-offset-4 hover:underline"
                                    >
                                        Daftar sekarang di sini
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
