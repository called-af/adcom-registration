import { AdminHeader } from '@/components/admin/admin-header';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#D9DED8] font-sans text-gray-900 selection:bg-[#A9C6A0] selection:text-[#14532D]">
            <AdminHeader />
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
                {children}
            </main>
        </div>
    );
}
