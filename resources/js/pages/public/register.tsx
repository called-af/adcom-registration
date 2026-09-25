import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, Check, Code2, Instagram, Rocket, Users } from 'lucide-react';
import { useState } from 'react';
import { DivisionSelect } from '@/components/division-select';
import type { DivisionOption } from '@/components/division-select';
import {
    FormField,
    ThemedCheckbox,
    ThemedInput,
    ThemedTextarea,
} from '@/components/form-field';
import { Logo } from '@/components/logo';
import { ThemedButton } from '@/components/themed-button';

interface Props {
    divisions?: DivisionOption[];
    status?: string;
    success?: boolean;
}

export default function PublicRegister({ divisions, success }: Props) {
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

            <div className="flex min-h-screen w-full flex-col bg-white font-sans text-gray-900 selection:bg-[#A9C6A0] selection:text-[#14532D] lg:flex-row">
                {/* Decorative Panel — footer on mobile, left side on desktop */}
                <div className="relative flex min-h-[280px] w-full flex-col justify-between overflow-hidden bg-green-800 p-6 order-last sm:p-10 lg:sticky lg:top-0 lg:order-first lg:h-screen lg:min-h-[380px] lg:w-1/2 lg:p-12 xl:p-16">
                    {/* Multi-layer gradient */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(5,46,22,1)_0%,_rgba(22,101,52,1)_50%,_rgba(6,78,59,1)_100%)]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                            backgroundSize: '48px 48px',
                        }}
                    />

                    {/* Decorative rings */}
                    <div className="pointer-events-none absolute -top-32 -right-32 size-[500px] rounded-full border border-white/[0.04]" />
                    <div className="pointer-events-none absolute -top-16 -right-16 size-[380px] rounded-full border border-dashed border-white/[0.06]" />
                    <div className="pointer-events-none absolute -bottom-40 -left-40 size-[450px] rounded-full border border-white/[0.03]" />

                    {/* Glow effects */}
                    <div className="pointer-events-none absolute top-0 left-1/2 size-96 -translate-x-1/2 rounded-full bg-emerald-400/8 blur-[100px]" />
                    <div className="pointer-events-none absolute bottom-0 right-0 size-72 rounded-full bg-teal-500/10 blur-[80px]" />

                    {/* Right edge accent */}
                    <div className="pointer-events-none absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />

                    {/* === Content === */}

                    {/* Top: Branding */}
                    <div className="relative z-10 space-y-4">
                        <Logo size="lg" className="shadow-md" />

                        <div className="max-w-sm space-y-2">
                            <h1 className="text-xl leading-[1.15] font-extrabold tracking-tight text-white sm:text-2xl lg:text-[27px] xl:text-3xl">
                                Bergabung Bersama{' '}
                                <span className="text-green-600">
                                    Android Developer
                                </span>{' '}
                                Community
                            </h1>

                            <p className="text-sm leading-relaxed font-normal text-white/70">
                                Kembangkan skill, bangun relasi, dan ciptakan
                                inovasi teknologi bersama komunitas developer
                                kampus.
                            </p>
                        </div>
                    </div>

                    {/* Bottom: Quote + Features + Footer */}
                    <div className="relative z-10 mt-8 flex flex-col space-y-8 lg:mt-0">
                        {/* Quote */}
                        <blockquote className="border-l-2 border-emerald-400/40 pl-4">
                            <p className="text-[15px] leading-relaxed font-medium italic text-white/80">
                                "Teknologi terbaik lahir dari kolaborasi,
                                bukan kompetisi."
                            </p>
                        </blockquote>

                        {/* Feature list */}
                        <div className="space-y-4">
                            {[
                                {
                                    icon: Users,
                                    title: 'Komunitas Solid',
                                    desc: 'Jaringan developer kampus yang saling mendukung dan bertumbuh bersama.',
                                },
                                {
                                    icon: Code2,
                                    title: 'Skill Development',
                                    desc: 'Workshop, mentoring, dan tech talk rutin dari praktisi industri.',
                                },
                                {
                                    icon: Rocket,
                                    title: 'Real Projects',
                                    desc: 'Kerjakan project nyata yang bisa langsung masuk portofolio karirmu.',
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="flex items-start gap-3.5"
                                >
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.07]">
                                        <item.icon className="size-[18px] text-emerald-400" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[13px] font-semibold leading-tight text-white">
                                            {item.title}
                                        </p>
                                        <p className="text-xs leading-relaxed text-white/50">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="space-y-3 border-t border-white/[0.06] pt-4">
                            <a
                                href="https://instagram.com/adcom_official"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-medium text-white/50 transition-colors hover:text-white"
                            >
                                <Instagram className="size-4" />
                                @adcom_official
                            </a>
                            <p className="text-[11px] font-medium tracking-wide text-white/30">
                                &copy; {new Date().getFullYear()} UKM Android
                                Developer Community
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Half: Form (Full Screen Layout, No Card / Container Box) */}
                <div className="flex w-full flex-col justify-center bg-white px-5 py-9 sm:px-9 lg:min-h-screen lg:w-1/2 lg:overflow-y-auto lg:px-11 xl:px-15">
                    <div className="mx-auto w-full max-w-xl">
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
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1 pb-1">
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
                                    <p className="text-xs font-normal text-gray-500 sm:text-sm">
                                        Lengkapi data dirimu untuk bergabung
                                        dengan komunitas kami.
                                    </p>
                                </div>

                                <div className="space-y-3 sm:space-y-3.5">
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

                                    <div className="pt-1">
                                        <ThemedButton
                                            type="submit"
                                            loading={processing}
                                            loadingText="Memproses Pendaftaran..."
                                            icon={
                                                <ArrowRight className="size-4" />
                                            }
                                            className="h-11 w-full text-sm font-bold"
                                        >
                                            Daftar Menjadi Anggota
                                        </ThemedButton>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
