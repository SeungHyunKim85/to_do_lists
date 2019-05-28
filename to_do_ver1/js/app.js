/* <li id="myId" class="todo-item">
        <input class="custom-checkbox" type="checkbox" id="ck-myId">
        <label for="ck-myId">HTML</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li> */

let todos = [
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];

const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $nav = document.querySelector('nav');
const $completedTodos = document.querySelector('completed-todos');
const $activeTodos = document.querySelector('active-todos');
const $completeAll = document.querySelector('ck-complete-all');

function render() {
  let html = '';

  todos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item">
    <input class="custom-checkbox" type="checkbox" ${completed ? 'checked' : ''} id="ck-${id}"><label for="ck-${id}"> ${content} </label>
    <i class="remove-todo far fa-times-circle"></i>
    </li>`;
  });

  $todos.innerHTML = html;
}

function generateID() {
  return todos.length ? Math.max(...todos.map(({ id }) => id)) + 1 : 1;
}

function addTodo(content) {
  todos = [{ myId: generateID(), content, completed: false }, ...todos];
  render();
}

function removeTodo(id) {
  todos = todos.filter(todo => todo.id !== +id);
  render();
}

function completeTodo(id) {
  todos = todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
  console.log(todos);
  render();
}

$inputTodo.onkeyup = function (e) {
  if (this.value.trim() === '' || e.keyCode !== 13) return;
  addTodo(this.value);
  this.value = '';
}

$todos.addEventListener('click', e => {
  if (!e.target.classList.contains('remove-todo')) return;
  //e.target 리무브 버튼
  removeTodo(e.target.parentNode.id);
});

$todos.addEventListener('change', e => {
  if (!e.target.classList.contains('custom-checkbox')) return;
  completeTodo(e.target.parentNode.id);
});

/* $nav.addEventListener('click', e => {
  e.target.nodeName.contains('active');
  console.log(e.target.nodeName.contains('active'));
}); */

render();