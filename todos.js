
let todoApp = document.querySelector('.todosApp')
let todoInput = document.querySelector('.todosInput')
let todoList = document.querySelector('.todosList')



todoApp.addEventListener('submit', function (event) {
    event.preventDefault() 
    addTodo(todoInput.value)
})



let todos = []
console.log(todos)

function addTodo(list) {
    console.log(list)

    if (list !== '') {

        let todo = {
            id: Date.now(),
            name: list,
            completed: false
        }

        todos.push(todo)
        addToLocalStorage(todos)
        todoInput.value = ""

    } else {
        alert('TIDAK BOLEH NGANGGUR!')
    }
}



function renderTodos(todos) {
    
    todoList.innerHTML = ''
    todos.forEach(list => {

        const li = document.createElement('li') 

        li.setAttribute('class', 'list') 
        li.setAttribute('dataList', list.id)

        if (list.completed === true) {
            li.classList.add('checklist')
        }

        let checklist;
        if (list.completed) {
             checklist = 'checklist'
        } else {
            checklist = null
        }
        

        li.innerHTML = `
        <input class="todosChecklist" type="checkbox" ${checklist}>
        ${list.name}
        <button class="todosDel">x</button>
        `
        todoList.append(li)
    });
}



function addToLocalStorage(todos) {
    
    let dataJSON = JSON.stringify(todos)
    localStorage.setItem('todos', dataJSON)

    renderTodos(todos)
}



function toggle(id) {

    todos.forEach(list => {

        if (list.id == id) {
            list.completed = !list.completed
        }
    })

    addToLocalStorage(todos)
}



function deleteTodo(id) {

    todos = todos.filter(function (list) {
        return list.id != id
    })

    addToLocalStorage(todos)
}



todoList.addEventListener('click', function (event) {

    let id = event.target.parentElement.getAttribute('dataList')
    console.log(id)

    if (event.target.type === 'todosChecklist') {
        toggle(id)
    }

    if (event.target.classList.contains('todosDel')) {
        deleteTodo(id)
    }
})



function getFromLocalStorage() {
    let ref = localStorage.getItem('todos')

    if (ref) {

        todos = JSON.parse(ref) 
        renderTodos(todos)
    }
}
getFromLocalStorage()