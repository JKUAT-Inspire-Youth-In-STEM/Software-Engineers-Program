export interface User{
    username: string;
    password: string;
}

export interface Task{
    id: number;
    title: string;
    description?: string;
    start_time: string;
    duration: number;
    done: boolean;
}

export interface AuthResponse{
    msg?: string;
    token?: string;
}