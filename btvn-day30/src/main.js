import {deleteMethod, getMethod, postMethod, putMethod} from "./api.js";

// Elements
const todoList = document.querySelector(".todo-list");
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');

// Render todos
const renderTodos = (todos) => {
    if (!todos || todos.length === 0) {
        todoList.innerHTML = '<p>No tasks to show</p>';
        return;
    }

    todoList.innerHTML = todos.map(todo => {
        return `
            <div class="todo-item" data-id="${todo.id}">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} />
                <div class="todo-content ${todo.completed ? 'completed' : ''}">${todo.title}</div>
                <button class="edit-btn fa-solid fa-pen-to-square"></button>
                <button class="del-btn fa-solid fa-trash"></button>
            </div>
        `;
    }).join('');
};

// Add new todos
const handleSubmit = async (e) => {
    e.preventDefault();
    const title = todoInput.value.trim();
    if (!title) return;

    try {
        const newTodo = {
            title: title,
            completed: false
        };

        await postMethod(newTodo);
        const todos = await getMethod();
        renderTodos(todos);
        todoInput.value = '';
    } catch (error) {
        console.error('error', error);
    }
};
// put method
todoList.addEventListener('change', async (e) => {
    if (e.target.type === 'checkbox') {
        const todoItem = e.target.closest('.todo-item');
        const id = todoItem.dataset.id;
        const completed = e.target.checked;
        const title = todoItem.querySelector('.todo-content').textContent;

        try {
            await putMethod(id, { title, completed });
            const contentEl = todoItem.querySelector('.todo-content');
            if (completed) {
                contentEl.classList.add('completed');
            } else {
                contentEl.classList.remove('completed');
            }
        } catch (error) {
            console.log(error);
            // Khôi phục trạng thái checkbox nếu có lỗi
            e.target.checked = !completed;
        }
    }
});

todoList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const todoItem = e.target.closest('.todo-item');
        const contentEl = todoItem.querySelector('.todo-content');
        const oldTitle = contentEl.textContent;
        const newTitle = prompt("Edit your task:", oldTitle);

        if (newTitle && newTitle.trim() !== "") {
            const id = todoItem.dataset.id;
            const completed = todoItem.querySelector('input[type="checkbox"]').checked;

            try {
                await putMethod(id, { title: newTitle.trim(), completed });
                const todos = await getMethod();
                renderTodos(todos);
            } catch (error) {
                console.log(error);
            }
        }
    }
});


// Delete todo
todoList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('del-btn')) {
        const todoItem = e.target.closest('.todo-item');
        const id = todoItem.dataset.id;
    console.log(todoItem.dataset);
        try {
            await deleteMethod(id);
            const todos = await getMethod();
            renderTodos(todos);
        } catch (error) {
            console.log(error);
        }
    }
});
// Start application
    const start = async () => {
        try {
            const todos = await getMethod();
            renderTodos(todos);
        } catch (error) {
            console.error('Error starting app:', error);
            todoList.innerHTML = '<p>Error loading tasks. Please try again later.</p>';
        }
    };

// Event Listeners
    todoForm.addEventListener('submit', handleSubmit);

// Start the app
    start();