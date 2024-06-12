export interface Auth {
    email: string;
    password: string;
}

export interface AuthResponse {
    id: number;
    role: string;
    token: string;
}