let form = document.getElementById("form");
let input = document.getElementById("inp");
let totalLength = document.querySelector(".totolLength");
let ul = document.getElementById("todoUl");
let modal = document.getElementById("modal");
let close = document.getElementById("close");
let formBtn = document.getElementById("formBtn");
// let totalComplate = 0;

// const getRandomId = () => Math.floor(Math.random * 99999999);

const totalLengthTodoLists = () => {
    totalLength.innerHTML = ""
    let todo = JSON.parse(localStorage.getItem("todo")) || [];
    // console.log(totalComplate);
    let totalComplate = 0;
    todo.filter((item) => item.active ? totalComplate += 1 : null)
    if (todo.length == 0) {
        totalLength.innerHTML = `0 / 0`
    } else {
        totalLength.innerHTML = `${todo.length} / ${totalComplate}`
    }
}


formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!input.value.trim()) {
        alert("zehmet olmasa todo daxil edin ")
        return;
    }
    let todo = JSON.parse(localStorage.getItem("todo")) || [];
    let tekrarId = todo.find((item) => item.id == todo.length + 1);
    if (tekrarId) {
        var data = {
            id: todo.length + 2,
            title: input.value,
            active: false,
        }
    } else {
        var data = {
            id: todo.length + 1,
            title: input.value,
            active: false,
        }
    }

    todo.push(data)
    localStorage.setItem("todo", JSON.stringify(todo));
    todoVisibilty()
    totalLengthTodoLists()
    form.reset();
})

const todoModalClose = () => {
    modal.style.display = "none"
}

function complateFunction(id, item) {
    document.location.href = "#"
    let todo = JSON.parse(localStorage.getItem("todo")) || [];
    let todoCurrency = todo.find((todoitem) => todoitem.id == id);
    if (todoCurrency) {
        todoCurrency.active = !todoCurrency.active
    }
    // todo.filter(todoItem => {
    //     if(todoItem.active == false){
    //         todoItem.active = true
    //     }
    // })
    // let li = document.querySelectorAll("li");
    // li.forEach((liItem) => {
    //     if (liItem.innerHTML.includes(item)) {
    //         totalComplate += 1;
    //         totalLengthTodoLists()
    //         liItem.classList.add("active");
    //     }

    // })
    localStorage.setItem("todo", JSON.stringify(todo))
    todoModalClose()
    totalLengthTodoLists()
    todoVisibilty()
    
}

const updateFunc = (id, item) => {
    let todo = JSON.parse(localStorage.getItem("todo"));
    let newData = document.getElementById("newData");
    if (!newData.value.trim()) {
        alert("zehmet olmasa todo daxil edin ")
        return;
    }
    todo.forEach((todoItem) => {
        if (todoItem.id == id) {
            todoItem.title = newData.value
        }
    })
    localStorage.setItem("todo", JSON.stringify(todo))
    todoModalClose();
    todoVisibilty()
}
const deleteFunc = (id) => {
    let todo = JSON.parse(localStorage.getItem("todo"));
    let index = 0;
    todo.find((item, i) => {
        if (item.id == id) {
            index = i
        }
    })
    todo.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(todo))
    todoVisibilty();
    todoModalClose();
}

const todoModal = (item, id) => {
    modal.innerHTML = ""
    modal.innerHTML = `
             <i id="close" onclick="todoModalClose()" class="fa-regular fa-circle-xmark"></i>
            <input id="newData" value="${item}" type="text">
            <div class="btns">
                <button onclick="complateFunction(${id},'${item}')"><i class="fa-solid fa-check"></i> Complate</button>
                <button onclick="updateFunc(${id},'${item}')"><i class="fa-solid fa-pen"></i> Edit</button>
                <button onclick="deleteFunc(${id})"><i class="fa-solid fa-trash"></i> Delete</button>
            </div>
    `
}

const todoModalOpen = (item, id) => {
    modal.style.display = "flex";
    todoModal(item, id)
}

const todoVisibilty = () => {
    ul.innerHTML = ""
    let todo = JSON.parse(localStorage.getItem("todo")) || [];
    todo.forEach((item) => {
        let li = document.createElement("li");
        if (item.active) {
            li.classList.add("active")
        }
        li.innerHTML = `${item.title} <i onclick="todoModalOpen('${item.title}',${item.id})" class="settings fa-solid fa-gear"></i>`
        ul.appendChild(li);
    })
}


window.onload = () => {
    todoVisibilty()
    totalLengthTodoLists()
}


