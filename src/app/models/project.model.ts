export interface Project {
    id: string;
    name: string;
    desc: string;
    coverImg: string;
    taskIds?: string[];
    members?: string[];
}
