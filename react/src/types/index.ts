export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
}