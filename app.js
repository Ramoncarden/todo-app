let lis = document.querySelectorAll('li');
let ul = document.querySelector('ul');
let form = document.querySelector('#add-todo');
let input = document.querySelector('#todo');

// Load Todos
let storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
for (let i = 0; i < storedTodos.length; i++) {
  let newTodo = document.createElement('li');
  newTodo.innerText = storedTodos[i].task;
  newTodo.isCompleted = storedTodos[i].isCompleted ? true : false;
  if (newTodo.isCompleted) {
    newTodo.style.textDecoration = 'line-through';
    // storedTodos.splice(i, 1);
  }

  ul.appendChild(newTodo);
}

// Add todo and delete button after clicking submit
form.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log(input.value);
  let newTodo = document.createElement('li');
  newTodo.innerText = input.value;
  input.value = '';
  // todos += newTodo;
  ul.appendChild(newTodo);

  // Save to local storage
  storedTodos.push({ task: newTodo.innerText, isCompleted: false });
  localStorage.setItem('todos', JSON.stringify(storedTodos));
});

ul.addEventListener('click', function(event) {
  let clickedListItem = event.target;

  if (!clickedListItem.isCompleted) {
    clickedListItem.style.textDecoration = 'line-through';
    clickedListItem.isCompleted = true;
    // localStorage.removeItem(clickedListItem);
  } else {
    clickedListItem.style.textDecoration = 'none';
    clickedListItem.isCompleted = false;
  }

  for (let i = 0; i < storedTodos.length; i++) {
    if (storedTodos[i].task === clickedListItem.innerText) {
      storedTodos[i].isCompleted = clickedListItem.isCompleted;
      storedTodos.splice(i, 1);
      localStorage.setItem('todos', JSON.stringify(storedTodos));
    }
  }
});
