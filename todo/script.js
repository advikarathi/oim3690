const STORAGE_KEY = 'fresh-list-items';
const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date-input');
const taskList = document.getElementById('todo-list');
const summary = document.getElementById('task-summary');
const emptyState = document.getElementById('empty-state');
const clearCompletedButton = document.getElementById('clear-completed');

let tasks = loadTasks();

function loadTasks() {
  const savedTasks = localStorage.getItem(STORAGE_KEY);
  if (!savedTasks) return [];

  try {
    return JSON.parse(savedTasks);
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function updatePage() {
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.classList.toggle('completed', task.done);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      updatePage();
    });

    const details = document.createElement('div');
    details.className = 'task-details';
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    details.append(taskText);

    if (task.dueDate) {
      const dueDate = document.createElement('span');
      dueDate.className = 'due-date';
      dueDate.textContent = `Best before: ${task.dueDate}`;
      details.append(dueDate);
    }

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter((savedTask) => savedTask.id !== task.id);
      updatePage();
    });

    item.append(checkbox, details, deleteButton);
    taskList.append(item);
  });

  const remainingTasks = tasks.filter((task) => !task.done).length;
  summary.textContent = `${remainingTasks} item${remainingTasks === 1 ? '' : 's'} to buy`;
  emptyState.style.display = tasks.length === 0 ? 'block' : 'none';
  saveTasks();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ id: Date.now(), text: text, dueDate: dueDateInput.value, done: false });
  form.reset();
  taskInput.focus();
  updatePage();
});

clearCompletedButton.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.done);
  updatePage();
});

updatePage();
