interface BaseEntity {
    id: number;
    created: Date;
    updated: Date;
    deleted: Date | null;
}

export interface ClientEntity extends BaseEntity {
    user_id: number;
    description: string;
    date_log_id: number;
}

export interface TimeLogEntity extends BaseEntity {
    user_id: number;
    clock_in: string;
    clock_out: string;
    date_log_id: number;
    timeDiffMinutes: number;
}
