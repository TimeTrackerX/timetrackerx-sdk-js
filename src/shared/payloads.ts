interface ClientPayload {
    description?: string;
    logo_url?: string;
    hourly_rate?: number;
    monthly_cap?: string;
}

export interface CreateClientPayload extends ClientPayload {
    name: string;
}

export interface PatchClientPayload extends ClientPayload {
    name?: string;
}

interface DateLogPayload {
    client_id: number;
    user_id: number;
}

export interface CreateDateLogPayload extends DateLogPayload {
    date_logged: Date;
}

export interface PatchDateLogPayload extends DateLogPayload {}

interface TaskPayload {
    user_id: number;
    date_log_id: number;
}

export interface CreateTaskPayload extends TaskPayload {
    description: string;
}

export interface PatchTaskPayload extends CreateTaskPayload {}

interface TimeLogPayload {
    client_id: number;
    user_id: number;
    time?: Date;
}

export interface CreateTimeLogPayload extends TimeLogPayload {}
export interface PatchTimeLogPayload extends TimeLogPayload {}
