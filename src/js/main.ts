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

// Händelselyssnare på submit för formuläret
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Förhindrar standardbeteendet för submit
    // Hämtar värde från uppgift och prioritering-input
    const task = taskInput.value; 
    const priority = parseInt(priorityInput.value); 

    if (todoList.addTodo(task, priority)) {
        displayTodos(); // Uppdaterar för att visa nya todos
        taskInput.value = ''; // Återställer värdet för uppgifts-inputen
        priorityInput.value = ''; // Återställer värdet för prioritet-inputen
    } else {
        // Visar ett felmeddelande om inmatningen är ogiltig
        alert('Felaktig inmatning. Kontrollera att du fyllt i uppgift och valt prioritet.');
    }
});

// Visar todos när sidan laddas
displayTodos();

// Funktion för att visa todos
function displayTodos() {
    todoListContainer.innerHTML = ''; // Rensar innehållet i todo-listans container
    const sortedTodos = todoList.getTodos().sort((a, b) => a.priority - b.priority);
    // Loopar igenom varje todo i listan och skapar ett nytt todo-element
    sortedTodos.forEach((todo, index) => {
        const listItem = document.createElement('li'); // Skapar ett nytt listelement
        const label = document.createElement('label'); // Skapar ett nytt label-element
        label.textContent = `${todo.task} - Prioritet: ${todo.priority}`;
        

        // Lägger till label till listelementet
        listItem.appendChild(label);
        // Lägger till listelementet till todo-listan
        todoListContainer.appendChild(listItem);
    });
}

