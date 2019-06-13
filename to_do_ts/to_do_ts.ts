(function() {
  interface Todo {
    id: number;
    content: string;
    completed: boolean;
  }

  const todos: Todo[] = [
    {
      id: 1,
      content: 'html',
      completed: false
    },
    {
      id: 2,
      content: 'css',
      completed: false
    },
    {
      id: 3,
      content: 'js',
      completed: true
    }
  ];

  class TodoApp {
    todos: Todo[];
    $input: HTMLInputElement;
    $todos: HTMLUListElement;
    $pre: HTMLPreElement;

    constructor() {
      this.todos = todos;
      this.$input = document.querySelector('.input-todos');
      this.$todos = document.querySelector('.todos');
      this.$pre = document.querySelector('pre');

      this.render();

      this.$input.addEventListener('keyup', this.addTodo.bind(this));
      this.$todos.addEventListener('change', this.toggleTodo.bind(this));
      this.$todos.addEventListener('click', this.removeTodo.bind(this));
    }

    // render
    render(): void {
      let html = '';
      this.todos.forEach((todo: Todo) => {
        html += `
        <li id="${todo.id}">
          <input type="checkbox" class="checkbox" ${
            todo.completed ? 'checked' : ''
          }>
          <span>${todo.content}</span>
          <button class="remove-button">DELETE</button>
        </li>
        `;
      });
      this.$todos.innerHTML = html;
      this.$pre.textContent = JSON.stringify(this.todos, null, 2);
    }

    // generateId
    generateId() {
      if (this.todos.length > 0) {
        return Math.max(...this.todos.map((todo) => todo.id)) + 1;
      }
      return 1;
    }

    // addTodo
    addTodo(e: KeyboardEvent) {
      if (e.keyCode === 13) {
        const input = <HTMLInputElement>e.target;
        const todo: Todo = {
          id: this.generateId(),
          content: input.value,
          completed: false
        };
        this.todos = [todo, ...this.todos];
        input.value = '';
        this.render();
      }
    }

    // toggleTodo
    toggleTodo(e: MouseEvent) {
      const checkbox = <HTMLInputElement>e.target;
      const id = +checkbox.parentElement.id;
      this.todos = this.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      this.render();
    }

    //remove todo
    removeTodo(e: MouseEvent) {
      const button = <HTMLElement>e.target;
      if (button.classList.contains('remove-button')) {
        const id = +button.parentElement.id;
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.render();
      }
    }
  }

  new TodoApp();
})();