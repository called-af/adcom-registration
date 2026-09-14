import { Search } from 'lucide-react';

interface RegistrationFiltersProps {
    search: string;
    onSearchChange: (val: string) => void;
    divisionFilter: string;
    onDivisionFilterChange: (val: string) => void;
    statusFilter: string;
    onStatusFilterChange: (val: string) => void;
}

export function RegistrationFilters({
    search,
    onSearchChange,
    divisionFilter,
    onDivisionFilterChange,
    statusFilter,
    onStatusFilterChange,
}: RegistrationFiltersProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Cari nama, NIM, prodi, atau email..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="h-10 w-full rounded-xl border border-[#D5DDD4] bg-white pl-9 pr-4 text-sm font-medium text-gray-800 shadow-xs placeholder:text-gray-400 focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D]/20 focus:outline-none"
                />
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <select
                    value={divisionFilter}
                    onChange={(e) => onDivisionFilterChange(e.target.value)}
                    className="h-10 rounded-xl border border-[#D5DDD4] bg-white px-3 text-xs font-semibold text-gray-700 shadow-xs focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D]/20 focus:outline-none"
                >
                    <option value="">Semua Divisi</option>
                    <option value="android">Android Developer</option>
                    <option value="uiux">UI/UX Designer</option>
                    <option value="frontend">Frontend Developer</option>
                    <option value="backend">Backend Developer</option>
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => onStatusFilterChange(e.target.value)}
                    className="h-10 rounded-xl border border-[#D5DDD4] bg-white px-3 text-xs font-semibold text-gray-700 shadow-xs focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D]/20 focus:outline-none"
                >
                    <option value="">Semua Status</option>
                    <option value="pending">Menunggu Review</option>
                    <option value="lolos">Diterima (Lolos)</option>
                    <option value="ditolak">Ditolak</option>
                </select>
            </div>
        </div>
    );
}
