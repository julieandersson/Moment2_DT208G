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
        const newTodo: Todo = { 
        task: task,
        completed: false,
        priority: priority,
        createdDate: new Date()
    };
        this.todos.push(newTodo);
        this.saveToLocalStorage();
        return true;
    }

    /* metod för att markera todos som klara */
    markTodoCompleted(todoIndex: number, completed: boolean): void {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed = completed;
            // Uppdatera datum när en todo markeras som klar
            if (completed) {
                this.todos[todoIndex].completedDate = new Date();
            } else {
            // Nollställ datumet om todo avmarkeras
                this.todos[todoIndex].completedDate = undefined;
            }
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

    /* metod för att ta bort en todo */
    deleteTodo(todoIndex: number): void {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos.splice(todoIndex, 1); // Ta bort todo från listan
            this.saveToLocalStorage(); // Spara ändringar till localStorage
        }
    }
}
