export interface Task {
    id: string;
    order: string;
    name: string;
    tasks: TaskDetail;
    taskIds: string[];
}

export interface TaskDetail {
    id: string;
    desc: string;
    completed: boolean;
    owner: Owner;
    dueDate: string;
    reminder?: string;
    priority: string;
    createDate: string;
    remark: string;
    ownerId: string;
    participantIds: string[];
}

export interface Owner {
    id: string;
    name: string;
    avatar: string;
}
