/* Todo-interface */

export interface Todo {
    task: string;
    completed: boolean;
    priority: number;
    createdDate: Date; // Nytt fält för datum då todo skapades
    completedDate?: Date; // Nytt fält för datum då todo markerades som utförd
}
