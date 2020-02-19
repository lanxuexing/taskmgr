export interface Task {
    id: string;
    projectId: string;
    taskDetailIds: string[];
    order: string;
    name: string;
    tasks?: TaskDetail;
}

export interface TaskDetail {
    id: string;
    taskId: string;
    ownerId: string;
    participantIds: string[];
    desc: string;
    completed: boolean;
    owner: Owner;
    dueDate: string;
    reminder?: string;
    priority: string;
    createDate: string;
    remark: string;
}

export interface Owner {
    id: string;
    name: string;
    avatar: string;
}
