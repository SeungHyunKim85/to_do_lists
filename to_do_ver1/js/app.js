/* <li id="myId" class="todo-item">
        <input class="custom-checkbox" type="checkbox" id="ck-myId">
        <label for="ck-myId">HTML</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li> */

let todos = [
  { myId: 1, content: 'HTML', completed: true },
  { myId: 2, content: 'CSS', completed: true },
  { myId: 3, content: 'Javascript', completed: false }
];

const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');

function render() {
  let html = '';

  todos.forEach(({ myId, content, completed }) => {
    html += `<li id="${myId}" class="todo-item">
    <input class="custom-checkbox" type="checkbox" ${completed ? 'checked' : ''} id="ck-${myId}"><label for="ck-${myId}"> ${content} </label>
    <i class="remove-todo far fa-times-circle"></i>
    </li>`;
  });

  $todos.innerHTML = html;
}

function generateID() {
  return todos.length ? Math.max(...todos.map(({ myId }) => myId)) + 1 : 1;
}

function addTodo(content) {
  todos = [{ myId: generateID(), content, completed: false }, ...todos];
  render();
}

function removeTodo(myId) {
  todos = todos.filter(todo => todo.myId !== +myId);
  render();
}

function completeTodo(myId) {
  todos = todos.map(todo => (todo.myId === +myId ? { ...todo, completed: !todo.completed } : todo));
  console.log(todos);
  render();
}

$inputTodo.onkeyup = function (e) {
  if (this.value.trim() === '' || e.keyCode !== 13) return;
  addTodo(this.value);
  this.value = '';
}

$todos.addEventListener('click', e => {
  if (!e.target.classList.contains('remove')) return;
  removeTodo(e.target.parentNode.id);
});

$todos.addEventListener('change', e => {
  if (!e.target.classList.contains('checkbox')) return;
  completeTodo(e.target.parentNode.id);
});

render();