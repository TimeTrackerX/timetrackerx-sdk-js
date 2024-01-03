interface BaseEntity {
    id: number;
    created: Date;
    updated: Date;
    deleted: Date | null;
}

export interface ClientEntity extends BaseEntity {
    user_id: number;
    date_log_id: number;
    name: string;
    description?: string;
    logo_url?: string;
    hourly_rate?: number;
    monthly_cap?: number;
}

export interface TimeLogEntity extends BaseEntity {
    user_id: number;
    clock_in: string;
    clock_out: string;
    date_log_id: number;
    timeDiffMinutes: number;
}
