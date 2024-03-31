import { TodoList } from './toDo';

// instans av TodoList-klassen
const todoList = new TodoList();
// Hämtar formuläret och antar att det alltid kommer att finnas
const form = document.getElementById('todoForm')!;
// Hämtar input-elementet för uppgift och antar att det kommer att finnas
const taskInput = document.getElementById('task') as HTMLInputElement;
// Hämtar select-elementet för prioritet
const priorityInput = document.getElementById('priority') as HTMLSelectElement;
// Hämtar container-elementet för todo-listan
const todoListContainer = document.getElementById('todoList')!;
// Knapp för att rensa hela listan
const clearListBtn = document.getElementById('clearListBtn')!;


