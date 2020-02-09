export interface Task {
    name: string;
    tasks: TaskDetail;
}

export interface TaskDetail {
    id: number;
    desc: string;
    completed: boolean;
    owner: Owner;
    dueDate: string;
    reminder?: string;
}

export interface Owner {
    id: number;
    name: string;
    avatar: string;
}
