export type RegistrationStatus = 'pending' | 'lolos' | 'ditolak';

export interface Registration {
    id: number;
    name: string;
    nim: string;
    angkatan: string;
    study_program: string;
    email: string;
    whatsapp: string;
    motivation: string;
    division: string;
    division_slug: string;
    status: RegistrationStatus;
    rejection_reason?: string | null;
    submitted_at: string;
}

export interface RegistrationStats {
    total: number;
    pending: number;
    lolos: number;
    ditolak: number;
}
