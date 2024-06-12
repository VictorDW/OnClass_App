export interface Auth {
    email: string;
    password: string;
}

export interface AuthResponse {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
}