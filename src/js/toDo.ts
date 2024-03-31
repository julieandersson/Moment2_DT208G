import { Todo } from "./ItoDo";

/* Implementera en TypeScript-klass TodoList */

export class TodoList {
    private todos: Todo[]; /* Array av Todo-objekt */
    private readonly storageKey: string = "todos";

    constructor() {
        this.todos = this.loadFromLocalStorage();
    }

    /* metod för att lägga till nya todos med prioritet */
    addTodo(task: string, priority: number): boolean {
        if (task.trim() === "" || isNaN(priority) || priority < 1 || priority > 3) {
            return false;
        }
        const newTodo: Todo = { task: task, completed: false, priority: priority };
        this.todos.push(newTodo);
        this.saveToLocalStorage();
        return true;
    }

    /* metod för att markera todos som klara */
    markTodoCompleted(todoIndex: number, completed: boolean): void {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed = completed;
            this.saveToLocalStorage();
        }
    }

    /* metod för att rensa alla todos */
    clearAllTodos(): void {
        this.todos = [];
        this.saveToLocalStorage();
    }

    /* metod för att hämta listan med todos */
    getTodos(): Todo[] {
        return this.todos;
    }

    /* metod för att spara todos till localStorage */
    saveToLocalStorage(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
    }

    /* metod för att hämta todos från localStorage */
    loadFromLocalStorage(): Todo[] {
        const storedTodos = localStorage.getItem(this.storageKey);
        return storedTodos ? JSON.parse(storedTodos) : [];
    }
}
