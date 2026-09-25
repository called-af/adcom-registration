import { Link, usePage } from '@inertiajs/react';
import { ExternalLink, LayoutDashboard, LogOut } from 'lucide-react';
import { Logo } from '@/components/logo';
import { dashboard, home } from '@/routes';

export function AdminHeader() {
    const { auth } = usePage<{
        auth?: { user?: { name: string; email: string; role?: string } };
    }>().props;

    const user = auth?.user;
    const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'A';

    return (
        <header className="sticky top-0 z-40 border-b border-[#B7CDB0]/60 bg-[#14532D] shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
                {/* Brand & Main Navigation */}
                <div className="flex items-center gap-6">
                    <Link href={dashboard()} className="transition-opacity hover:opacity-95">
                        <Logo size="sm" className="shadow-xs" />
                    </Link>

                    <div className="hidden h-6 w-px bg-emerald-700/80 md:block" />

                    <nav className="hidden items-center gap-1.5 md:flex">
                        <Link
                            href={dashboard()}
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-800/80 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs"
                        >
                            <LayoutDashboard className="size-3.5" />
                            <span>Dashboard Pendaftaran</span>
                        </Link>

                        <Link
                            href={home()}
                            target="_blank"
                            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-emerald-200/80 transition-colors hover:bg-emerald-800/40 hover:text-white"
                        >
                            <span>Web Publik</span>
                            <ExternalLink className="size-3 opacity-70" />
                        </Link>

                        <Link
                            href="/cek-status"
                            target="_blank"
                            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-emerald-200/80 transition-colors hover:bg-emerald-800/40 hover:text-white"
                        >
                            <span>Cek Status</span>
                            <ExternalLink className="size-3 opacity-70" />
                        </Link>
                    </nav>
                </div>

                {/* Right: User profile chip & Logout */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2.5 rounded-xl border border-emerald-700/60 bg-emerald-800/40 px-3 py-1.5">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">
                            {initial}
                        </div>
                        <div className="hidden text-left sm:block">
                            <p className="text-xs font-bold leading-tight text-white">
                                {user?.name || 'Administrator'}
                            </p>
                            <p className="text-[10px] font-mono leading-tight text-emerald-200/80">
                                {user?.email || 'admin@ukmandroid.dev'}
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-700 bg-emerald-800/80 px-3 py-2 text-xs font-bold text-emerald-100 transition-all hover:bg-red-900/80 hover:border-red-700 hover:text-white active:scale-95 shadow-xs"
                    >
                        <LogOut className="size-3.5" />
                        <span className="hidden sm:block">Logout</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
