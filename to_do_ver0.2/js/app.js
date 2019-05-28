(function () {
  // 서버로부터 취득했다고 가정
  // let todos = [
  //   { id: 1, content: 'HTML', completed: false },
  //   { id: 2, content: 'CSS', completed: true },
  //   { id: 3, content: 'Javascript', completed: false }
  // ];

  let todos = [];

  window.onload = () => {
    // ① fetch: return Promise
    // fetch('https://simple-rest-api-server.ungmo2.now.sh/todos')
    //   .then(res => res.json())
    //   .then(todosFromServer => {
    //     todos = todosFromServer;
    //     renderTodos();
    //   });

    // ② return Promise
    // async function fetchAsync (url) {
    //   const res = await fetch(url);
    //   return await res.json();
    // }

    // fetchAsync('https://simple-rest-api-server.ungmo2.now.sh/todos')
    //   .then(todosFromServer => {
    //     todos = todosFromServer;
    //     renderTodos();
    //   })
    //   .catch(e => console.error(`Failed to retrieve todos: ${e}`));

    // ③
    (async function () {
      try {
        const res = await fetch('https://simple-rest-api-server.ungmo2.now.sh/todos');
        console.log(res);

        const todosFromServer = await res.json();
        console.log(todosFromServer);

        todos = todosFromServer;
        renderTodos();
      } catch (e) {
        console.error(`Failed to retrieve todos: ${e}`);
      }
    }());
  };

  // DOMs
  const $inputTodo = document.querySelector('.input-todo');
  const $todos = document.querySelector('.todos');


  // todos 배열을 html로 변환한다.
  function renderTodos() {
    let html = '';

    todos.forEach(({ id, content, completed }) => {
      html += `<li id="${id}">
        <input type="checkbox" class="ckbx" ${completed ? 'checked' : ''}>
        <span style="${completed ? 'text-decoration: line-through' : 'none'}"> ${content} </span>
        <button class="remove">X</button>
        </li>`;
    });

    $todos.innerHTML = html;
  }

  function generateId() {
    return todos.length ? Math.max(...todos.map(({ id }) => id)) + 1 : 1;
  }

  function addTodo(content) {
    todos = [{ id: generateId(), content, completed: false }, ...todos];
    renderTodos();
  }

  function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== +id);
    renderTodos();
  }

  function completeTodo(id) {
    todos = todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
    console.log(todos);
    renderTodos();
  }

  $inputTodo.onkeyup = function (e) {
    if (this.value.trim() === '' || e.keyCode !== 13) return;
    addTodo(this.value);
    this.value = '';
  };

  $todos.addEventListener('click', e => {
    if (!e.target.classList.contains('remove')) return;
    removeTodo(e.target.parentNode.id);
  });

  $todos.addEventListener('change', e => {
    if (!e.target.classList.contains('ckbx')) return;
    completeTodo(e.target.parentNode.id);
  });

  renderTodos();
}());
