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

// Händelselyssnare på knappen för att rensa hela listan
clearListBtn.addEventListener('click', function() {
    todoList.clearAllTodos();
    displayTodos();
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

        const createDateElement = document.createElement('span'); // Skapar ett element för skapad-datumet
        createDateElement.textContent = `Skapad: ${new Date(todo.createdDate).toLocaleString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}`;
        createDateElement.classList.add('created-date');
        listItem.appendChild(createDateElement);

       // Skapa element för datum när todo är markerad som klar
       if (todo.completedDate) {
        const completeDateElement = document.createElement('span');
        completeDateElement.textContent = `Slutförd: ${new Date(todo.completedDate).toLocaleString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}`;
        completeDateElement.classList.add('completed-date');
        listItem.appendChild(completeDateElement);
   }
        const checkbox = document.createElement('input'); // Skapar ett checkbox-element
        checkbox.type = 'checkbox'; // Sätter typen till 'checkbox'
        checkbox.checked = todo.completed; // Sätter kryssrutan till markerad om todo är klar
        label.style.textDecoration = todo.completed ? 'line-through' : 'none'; // Överstruken text om todo är klar


    // Lägger till en händelselyssnare för att kunna markera/avmarkera checkboxen 
    checkbox.addEventListener('change', () => {
        const isChecked = checkbox.checked;
        todoList.markTodoCompleted(index, isChecked);
        displayTodos();
    });

        // Skapar knapp för att radera todo
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Radera';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            todoList.deleteTodo(index);
            displayTodos();
        });

       
        // Lägger till label till listelementet
        listItem.appendChild(label);
        // Lägger till checkbox till listelementet
        listItem.appendChild(checkbox);
        // Lägger till listelementet till todo-listan
        todoListContainer.appendChild(listItem);
        // Lägg till raderingsknappen till listelementet
        listItem.appendChild(deleteButton);
    });
}

