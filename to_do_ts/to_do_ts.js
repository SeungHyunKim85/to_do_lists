(function () {
    var todos = [
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
    var TodoApp = /** @class */ (function () {
        function TodoApp() {
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
        TodoApp.prototype.render = function () {
            var html = '';
            this.todos.forEach(function (todo) {
                html += "\n        <li id=\"" + todo.id + "\">\n          <input type=\"checkbox\" class=\"checkbox\" " + (todo.completed ? 'checked' : '') + ">\n          <span>" + todo.content + "</span>\n          <button class=\"remove-button\">DELETE</button>\n        </li>\n        ";
            });
            this.$todos.innerHTML = html;
            this.$pre.textContent = JSON.stringify(this.todos, null, 2);
        };
        // generateId
        TodoApp.prototype.generateId = function () {
            if (this.todos.length > 0) {
                return Math.max.apply(Math, this.todos.map(function (todo) { return todo.id; })) + 1;
            }
            return 1;
        };
        // addTodo
        TodoApp.prototype.addTodo = function (e) {
            if (e.keyCode === 13) {
                var input = e.target;
                var todo = {
                    id: this.generateId(),
                    content: input.value,
                    completed: false
                };
                this.todos = [todo].concat(this.todos);
                input.value = '';
                this.render();
            }
        };
        // toggleTodo
        TodoApp.prototype.toggleTodo = function (e) {
            var checkbox = e.target;
            var id = +checkbox.parentElement.id;
            this.todos = this.todos.map(function (todo) {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });
            this.render();
        };
        //remove todo
        TodoApp.prototype.removeTodo = function (e) {
            var button = e.target;
            if (button.classList.contains('remove-button')) {
                var id_1 = +button.parentElement.id;
                this.todos = this.todos.filter(function (todo) { return todo.id !== id_1; });
                this.render();
            }
        };
        return TodoApp;
    }());
    new TodoApp();
})();
