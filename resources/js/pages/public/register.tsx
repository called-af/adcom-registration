import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { CommunityLogo } from '@/components/community-logo';
import { DivisionSelect } from '@/components/division-select';
import type { DivisionOption } from '@/components/division-select';
import {
    FormField,
    ThemedCheckbox,
    ThemedInput,
    ThemedTextarea,
} from '@/components/form-field';
import { IllustrationBox } from '@/components/illustration-box';
import { ThemedButton } from '@/components/themed-button';

interface Props {
    divisions?: DivisionOption[];
    status?: string;
    success?: boolean;
}

export default function PublicRegister({ divisions, status, success }: Props) {
    const { data, setData, post, processing, errors, wasSuccessful, reset } =
        useForm({
            name: '',
            nim: '',
            angkatan: '',
            study_program: '',
            email: '',
            whatsapp: '',
            division_id: '',
            motivation: '',
            agreed_to_rules: false,
        });

    const [isSubmittedLocal, setIsSubmittedLocal] = useState(false);
    const isSubmitted = wasSuccessful || success || isSubmittedLocal;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/daftar', {
            preserveScroll: true,
            onSuccess: () => {
                setIsSubmittedLocal(true);
            },
        });
    };

    return (
        <>
            <Head title="Pendaftaran Anggota - UKM Android Developer Community" />

            <div className="flex min-h-screen items-center justify-center bg-[#D9DED8] p-3 font-sans text-gray-900 selection:bg-[#A9C6A0] selection:text-[#14532D] sm:p-6 lg:h-screen lg:max-h-screen lg:overflow-hidden lg:p-6 xl:p-8">
                <main className="grid w-full max-w-[1140px] grid-cols-1 overflow-hidden rounded-[28px] border border-[#D5DDD4] bg-white shadow-2xl shadow-emerald-950/15 lg:h-full lg:max-h-[min(94vh,850px)] lg:grid-cols-12">
                    <div className="relative flex flex-col justify-between overflow-hidden bg-[#14532D] p-6 text-white sm:p-8 lg:col-span-5 lg:h-full lg:overflow-hidden lg:p-7 xl:p-8">
                        <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-emerald-700/20 blur-3xl" />
                        <div className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-emerald-500/10 blur-3xl" />

                        <div className="relative z-10 space-y-3">
                            <CommunityLogo variant="white" size="md" />

                            <h1 className="pt-1 text-xl leading-[1.2] font-extrabold tracking-tight text-white sm:text-2xl lg:text-[26px] xl:text-[28px]">
                                Bergabung Bersama UKM Android Developer
                                Community
                            </h1>

                            <p className="text-xs leading-relaxed font-normal text-emerald-100/90 sm:text-sm">
                                Kembangkan skill, bangun relasi, dan ciptakan
                                inovasi teknologi bersama komunitas developer
                                kampus.
                            </p>
                        </div>

                        <IllustrationBox className="relative z-10 mt-4 lg:mt-6" />
                    </div>

                    <div className="flex flex-col justify-between bg-white p-6 sm:p-8 lg:col-span-7 lg:h-full lg:overflow-y-auto lg:p-7 xl:p-8">
                        {isSubmitted ? (
                            <div className="my-auto animate-in space-y-6 py-12 text-center duration-300 fade-in-50">
                                <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#D6E6D3] text-[#14532D] shadow-sm">
                                    <Check className="size-10 stroke-[3]" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-extrabold text-[#14532D]">
                                        Pendaftaran Berhasil Terkirim!
                                    </h2>
                                    <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-600">
                                        Data formulir pendaftaranmu telah kami
                                        terima. Kamu bisa memantau status
                                        kelolosanmu secara berkala di halaman
                                        Cek Status.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row">
                                    <Link href="/cek-status">
                                        <ThemedButton
                                            type="button"
                                            variant="primary"
                                            icon={
                                                <ArrowRight className="size-4" />
                                            }
                                            className="w-full sm:w-auto"
                                        >
                                            Cek Status Pendaftaran
                                        </ThemedButton>
                                    </Link>
                                    <ThemedButton
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setIsSubmittedLocal(false);
                                            reset();
                                        }}
                                        className="w-full sm:w-auto"
                                    >
                                        Isi Formulir Baru
                                    </ThemedButton>
                                </div>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-3.5 sm:space-y-4"
                            >
                                <div className="space-y-0.5 pb-0.5">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-extrabold tracking-tight text-gray-950 sm:text-2xl">
                                            Pendaftaran Anggota
                                        </h2>
                                        <Link
                                            href="/cek-status"
                                            className="flex items-center gap-1 text-xs font-bold text-[#14532D] underline-offset-4 hover:underline"
                                        >
                                            <span>Cek Status</span>
                                            <ArrowRight className="size-3" />
                                        </Link>
                                    </div>
                                    <p className="text-xs font-normal text-gray-500">
                                        Lengkapi data dirimu untuk bergabung
                                        dengan komunitas kami.
                                    </p>
                                </div>

                                <div className="space-y-2.5 sm:space-y-3">
                                    <FormField
                                        label="NAMA LENGKAP"
                                        htmlFor="name"
                                        required
                                        error={errors.name}
                                    >
                                        <ThemedInput
                                            id="name"
                                            required
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            placeholder="Masukkan nama lengkapmu"
                                            isError={!!errors.name}
                                        />
                                    </FormField>

                                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                                        <FormField
                                            label="NIM"
                                            htmlFor="nim"
                                            required
                                            error={errors.nim}
                                        >
                                            <ThemedInput
                                                id="nim"
                                                required
                                                value={data.nim}
                                                onChange={(e) =>
                                                    setData(
                                                        'nim',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Contoh: 2024081001"
                                                className="font-mono"
                                                isError={!!errors.nim}
                                            />
                                        </FormField>

                                        <FormField
                                            label="ANGKATAN"
                                            htmlFor="angkatan"
                                            required
                                            error={errors.angkatan}
                                        >
                                            <ThemedInput
                                                id="angkatan"
                                                required
                                                maxLength={4}
                                                value={data.angkatan}
                                                onChange={(e) =>
                                                    setData(
                                                        'angkatan',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="2025"
                                                className="font-mono"
                                                isError={!!errors.angkatan}
                                            />
                                        </FormField>
                                    </div>

                                    <FormField
                                        label="PROGRAM STUDI"
                                        htmlFor="study_program"
                                        required
                                        error={errors.study_program}
                                    >
                                        <ThemedInput
                                            id="study_program"
                                            required
                                            value={data.study_program}
                                            onChange={(e) =>
                                                setData(
                                                    'study_program',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Contoh: Teknik Informatika / Sistem Informasi"
                                            isError={!!errors.study_program}
                                        />
                                    </FormField>

                                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                                        <FormField
                                            label="EMAIL"
                                            htmlFor="email"
                                            required
                                            error={errors.email}
                                        >
                                            <ThemedInput
                                                id="email"
                                                type="email"
                                                required
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="nama@domain.com"
                                                isError={!!errors.email}
                                            />
                                        </FormField>

                                        <FormField
                                            label="WHATSAPP"
                                            htmlFor="whatsapp"
                                            required
                                            error={errors.whatsapp}
                                        >
                                            <ThemedInput
                                                id="whatsapp"
                                                required
                                                value={data.whatsapp}
                                                onChange={(e) =>
                                                    setData(
                                                        'whatsapp',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="08xxxxxxxxxx"
                                                isError={!!errors.whatsapp}
                                            />
                                        </FormField>
                                    </div>

                                    <FormField
                                        label="MINAT DIVISI"
                                        hint="Pilih salah satu divisi"
                                        error={errors.division_id}
                                    >
                                        <DivisionSelect
                                            value={data.division_id}
                                            options={divisions}
                                            onChange={(val) =>
                                                setData('division_id', val)
                                            }
                                        />
                                    </FormField>

                                    <FormField
                                        label="ALASAN BERGABUNG"
                                        htmlFor="motivation"
                                        required
                                        error={errors.motivation}
                                    >
                                        <ThemedTextarea
                                            id="motivation"
                                            required
                                            rows={2}
                                            value={data.motivation}
                                            onChange={(e) =>
                                                setData(
                                                    'motivation',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Ceritakan Motivasimu…."
                                            isError={!!errors.motivation}
                                        />
                                    </FormField>

                                    <div>
                                        <ThemedCheckbox
                                            required
                                            checked={data.agreed_to_rules}
                                            onChange={(checked) =>
                                                setData(
                                                    'agreed_to_rules',
                                                    checked,
                                                )
                                            }
                                            label={
                                                <span className="text-[11px] leading-tight sm:text-xs">
                                                    Saya menyetujui seluruh
                                                    ketentuan dan bersedia aktif
                                                    berkontribusi di{' '}
                                                    <strong className="font-bold text-gray-900">
                                                        UKM Android Developer
                                                        Community
                                                    </strong>
                                                    .
                                                </span>
                                            }
                                        />
                                        {errors.agreed_to_rules && (
                                            <p className="mt-1 text-xs font-medium text-red-600">
                                                {errors.agreed_to_rules}
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-0.5">
                                        <ThemedButton
                                            type="submit"
                                            loading={processing}
                                            loadingText="Memproses Pendaftaran..."
                                            icon={
                                                <ArrowRight className="size-4" />
                                            }
                                            className="h-10.5 w-full text-sm font-bold"
                                        >
                                            Daftar Menjadi Anggota
                                        </ThemedButton>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-[11px] text-gray-500 sm:text-xs">
                                            Sudah mendaftar sebelumnya?{' '}
                                            <Link
                                                href="/cek-status"
                                                className="font-bold text-[#14532D] underline-offset-4 hover:underline"
                                            >
                                                Cek Status Pendaftaran di sini
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
