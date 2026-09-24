import { Head, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { RegistrationDetailModal } from '@/components/admin/registration-detail-modal';
import { RegistrationFilters } from '@/components/admin/registration-filters';
import { RegistrationStats } from '@/components/admin/registration-stats';
import { RegistrationTable } from '@/components/admin/registration-table';
import type { Registration, RegistrationStats as StatsType } from '@/types/registration';

interface Props {
    registrations: Registration[];
}

export default function Dashboard({ registrations }: Props) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [divisionFilter, setDivisionFilter] = useState('');
    const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
    const [openInRejectMode, setOpenInRejectMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;

    // Filter registrations
    const filteredRegistrations = useMemo(() => {
        return registrations.filter((reg) => {
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
    }, [registrations, search, statusFilter, divisionFilter]);

    // Calculate dynamic stats
    const stats: StatsType = useMemo(
        () => ({
            total: registrations.length,
            pending: registrations.filter((r) => r.status === 'pending').length,
            lolos: registrations.filter((r) => r.status === 'lolos').length,
            ditolak: registrations.filter((r) => r.status === 'ditolak').length,
        }),
        [registrations],
    );

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filteredRegistrations.length / perPage));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const fromIndex = (safeCurrentPage - 1) * perPage;
    const displayedRegistrations = filteredRegistrations.slice(fromIndex, fromIndex + perPage);

    // Accept registration (Loloskan)
    const handleAccept = (id: number) => {
        router.patch(`/dashboard/registrations/${id}/status`, { status: 'lolos' }, {
            preserveScroll: true,
            onSuccess: () => {
                if (selectedRegistration?.id === id) {
                    setSelectedRegistration((prev) => (prev ? { ...prev, status: 'lolos' } : null));
                }
            }
        });
    };

    // Reject registration
    const handleReject = (id: number, reason: string = '') => {
        router.patch(`/dashboard/registrations/${id}/status`, { status: 'ditolak', rejection_reason: reason }, {
            preserveScroll: true,
            onSuccess: () => {
                if (selectedRegistration?.id === id) {
                    setSelectedRegistration((prev) => (prev ? { ...prev, status: 'ditolak', rejection_reason: reason } : null));
                }
            }
        });
    };

    const handleRejectClick = (reg: Registration) => {
        setSelectedRegistration(reg);
        setOpenInRejectMode(true);
    };

    const handleModalClose = () => {
        setSelectedRegistration(null);
        setOpenInRejectMode(false);
    };

    // Set pending
    const handlePending = (id: number) => {
        router.patch(`/dashboard/registrations/${id}/status`, { status: 'pending' }, {
            preserveScroll: true,
            onSuccess: () => {
                if (selectedRegistration?.id === id) {
                    setSelectedRegistration((prev) => (prev ? { ...prev, status: 'pending' } : null));
                }
            }
        });
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
                    onSelectRegistration={(reg) => {
                        setSelectedRegistration(reg);
                        setOpenInRejectMode(false);
                    }}
                    onAccept={handleAccept}
                    onRejectClick={handleRejectClick}
                />
            </div>

            {/* Candidate Detail & Decision Modal */}
            {selectedRegistration && (
                <RegistrationDetailModal
                    registration={selectedRegistration}
                    initialRejectMode={openInRejectMode}
                    onClose={handleModalClose}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    onPending={handlePending}
                />
            )}
        </>
    );
}
