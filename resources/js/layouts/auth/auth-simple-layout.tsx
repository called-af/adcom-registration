import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/logo';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#D9DED8] p-4 font-sans text-gray-900 selection:bg-[#A9C6A0] selection:text-[#14532D] sm:p-6 lg:p-10">
            <div className="w-full max-w-md">
                {/* Back to Home Link */}
                <div className="mb-4">
                    <Link
                        href={home()}
                        className="group inline-flex items-center gap-2 text-sm font-bold text-[#14532D] transition-colors hover:text-black"
                    >
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        <span>Kembali ke Beranda</span>
                    </Link>
                </div>

                {/* Central Card */}
                <div className="w-full overflow-hidden rounded-[28px] border border-[#D5DDD4] bg-white shadow-2xl shadow-emerald-950/15">
                    {/* Header Banner */}
                    <div className="relative overflow-hidden bg-[#14532D] p-7 text-white sm:p-8">
                        {/* Background glow */}
                        <div className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-emerald-600/20 blur-2xl" />

                        <div className="relative z-10 space-y-3">
                            <Logo size="md" className="shadow-md" />

                            <h1 className="pt-1 text-2xl leading-tight font-extrabold tracking-tight text-white">
                                {title}
                            </h1>

                            {description && (
                                <p className="text-xs leading-relaxed font-normal text-emerald-100/90 sm:text-sm">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-7 sm:p-8">{children}</div>
                </div>
            </div>
        </div>
    );
}
