import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { RegistrationDetailModal } from '@/components/admin/registration-detail-modal';
import { RegistrationFilters } from '@/components/admin/registration-filters';
import { RegistrationStats } from '@/components/admin/registration-stats';
import { RegistrationTable } from '@/components/admin/registration-table';
import { INITIAL_REGISTRATIONS } from '@/data/mock-registrations';
import type { Registration, RegistrationStats as StatsType } from '@/types/registration';

export default function Dashboard() {
    const [registrationList, setRegistrationList] = useState<Registration[]>(INITIAL_REGISTRATIONS);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [divisionFilter, setDivisionFilter] = useState('');
    const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;

    // Filter registrations
    const filteredRegistrations = useMemo(() => {
        return registrationList.filter((reg) => {
            const matchesSearch =
                !search ||
                reg.name.toLowerCase().includes(search.toLowerCase()) ||
                reg.nim.toLowerCase().includes(search.toLowerCase()) ||
                reg.email.toLowerCase().includes(search.toLowerCase()) ||
                reg.study_program.toLowerCase().includes(search.toLowerCase()) ||
                reg.division.toLowerCase().includes(search.toLowerCase());

            const matchesStatus = !statusFilter || reg.status === statusFilter;
            const matchesDivision = !divisionFilter || reg.division_slug === divisionFilter;

            return matchesSearch && matchesStatus && matchesDivision;
        });
    }, [registrationList, search, statusFilter, divisionFilter]);

    // Calculate dynamic stats
    const stats: StatsType = useMemo(
        () => ({
            total: registrationList.length,
            pending: registrationList.filter((r) => r.status === 'pending').length,
            lolos: registrationList.filter((r) => r.status === 'lolos').length,
            ditolak: registrationList.filter((r) => r.status === 'ditolak').length,
        }),
        [registrationList],
    );

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filteredRegistrations.length / perPage));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const fromIndex = (safeCurrentPage - 1) * perPage;
    const displayedRegistrations = filteredRegistrations.slice(fromIndex, fromIndex + perPage);

    // Accept registration (Loloskan)
    const handleAccept = (id: number) => {
        const target = registrationList.find((r) => r.id === id);
        setRegistrationList((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: 'lolos' } : item)),
        );
        if (selectedRegistration?.id === id) {
            setSelectedRegistration((prev) => (prev ? { ...prev, status: 'lolos' } : null));
        }
        toast.success(`${target?.name || 'Pendaftar'} berhasil DITERIMA (Lolos Seleksi)!`);
    };

    // Reject registration
    const handleReject = (id: number) => {
        const target = registrationList.find((r) => r.id === id);
        setRegistrationList((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: 'ditolak' } : item)),
        );
        if (selectedRegistration?.id === id) {
            setSelectedRegistration((prev) => (prev ? { ...prev, status: 'ditolak' } : null));
        }
        toast.error(`${target?.name || 'Pendaftar'} telah ditolak.`);
    };

    // Set pending
    const handlePending = (id: number) => {
        const target = registrationList.find((r) => r.id === id);
        setRegistrationList((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: 'pending' } : item)),
        );
        if (selectedRegistration?.id === id) {
            setSelectedRegistration((prev) => (prev ? { ...prev, status: 'pending' } : null));
        }
        toast.info(`Status ${target?.name || 'pendaftar'} dikembalikan ke Pending.`);
    };

    return (
        <>
            <Head title="Dashboard Pendaftaran & Penerimaan Anggota" />

            <div className="space-y-6">
                {/* Header Title Section */}
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                        Data Pendaftar & Penerimaan
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Kelola data calon anggota baru dan konfirmasi penerimaan pendaftar UKM Android Developer Community.
                    </p>
                </div>

                {/* 4 Interactive Stat Cards */}
                <RegistrationStats
                    stats={stats}
                    statusFilter={statusFilter}
                    onStatusFilterChange={(st) => {
                        setStatusFilter(st);
                        setCurrentPage(1);
                    }}
                />

                {/* Search & Dropdown Filters */}
                <RegistrationFilters
                    search={search}
                    onSearchChange={(val) => {
                        setSearch(val);
                        setCurrentPage(1);
                    }}
                    divisionFilter={divisionFilter}
                    onDivisionFilterChange={(val) => {
                        setDivisionFilter(val);
                        setCurrentPage(1);
                    }}
                    statusFilter={statusFilter}
                    onStatusFilterChange={(val) => {
                        setStatusFilter(val);
                        setCurrentPage(1);
                    }}
                />

                {/* Applicants Table with Pagination & Instant Actions */}
                <RegistrationTable
                    registrations={displayedRegistrations}
                    allFilteredCount={filteredRegistrations.length}
                    currentPage={safeCurrentPage}
                    totalPages={totalPages}
                    perPage={perPage}
                    onPageChange={setCurrentPage}
                    onSelectRegistration={setSelectedRegistration}
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            </div>

            {/* Candidate Detail & Decision Modal */}
            {selectedRegistration && (
                <RegistrationDetailModal
                    registration={selectedRegistration}
                    onClose={() => setSelectedRegistration(null)}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    onPending={handlePending}
                />
            )}
        </>
    );
}
