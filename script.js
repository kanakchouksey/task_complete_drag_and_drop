const todo_column = document.querySelector("#todo"); 
const progress_column = document.querySelector("#progress"); 
const done_column = document.querySelector("#done"); 
 
const tasks = document.querySelectorAll('.task'); 
const toggle_modal = document.getElementById('toggle_modal'); 
const modal = document.querySelector('.modal'); 
const modalbg = document.querySelector('.bg'); 
const addTaskbtn = document.getElementById('add-new-task') 
 
const tasksData ={}; 
 
let dragElement = null; 

function saveTasks() {
    [todo_column, progress_column, done_column].forEach(col => {
        const tasks = col.querySelectorAll(".task");

        tasksData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            };
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasksData));
}

function updateCounts() {
    [todo_column, progress_column, done_column].forEach(col => {
        const count = col.querySelector(".right");
        count.innerText = col.querySelectorAll(".task").length;
    });
}

if (localStorage.getItem("tasks")) { 
    let data = JSON.parse(localStorage.getItem("tasks")); 
 
    for (const col in data) { 
        data[col].forEach(task => { 
            const div = document.createElement("div"); 
 
            div.classList.add("task"); 
            div.setAttribute("draggable", "true"); 
 
            div.innerHTML = ` 
                <h2>${task.title}</h2> 
                <p>${task.desc}</p> 
                <button class="delete">Delete</button> 
            `; 
 
            document.querySelector(`#${col}`).appendChild(div); 
 
            div.addEventListener("drag", () => { 
                dragElement = div; 
            }); 
        }); 
    } 
} 
 
updateCounts();
 
toggle_modal.addEventListener("click", function () { 
    modal.classList.toggle('active'); 
 
}); 
 
modalbg.addEventListener("click", function () { 
    modal.classList.toggle('active'); 
}); 
 
addTaskbtn.addEventListener("click", () => { 
    const tasktitle = document.querySelector("#task-title-input").value; 
    const taskdesc = document.querySelector("#task-desc-input").value; 
    
    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-desc-input").value = "";

    const div = document.createElement("div"); 
    div.classList.add('task'); 
    div.setAttribute("draggable", "true"); 
    div.innerHTML = `   <h2>${tasktitle}</h2> 
                   <p>${taskdesc}</p> 
                       <button class="delete">Delete</button>` 
    
    todo_column.appendChild(div); 
    modal.classList.remove('active'); 
 
    div.addEventListener("drag", (e) => { 
        dragElement = div; 
    }); 

    updateCounts();
    saveTasks();
 
}); 
 
// drag event removeEventListener added when task is drag and move to another column  
 
tasks.forEach(task => { 
    task.addEventListener("drag", (e) => { 
        dragElement = task; 
    }) 
}) 
 
function addDragEventListerners(column) { 
    column.addEventListener("dragenter", function (e) { 
        e.preventDefault(); 
        column.classList.add("hover-over"); 
    }); 
 
    column.addEventListener("dragover", function (e) { 
        e.preventDefault(); 
    }); 
 
    column.addEventListener("dragleave", function (e) { 
        e.preventDefault(); 
        column.classList.remove("hover-over"); 
    }); 
 
    column.addEventListener("drop", function (e) { 
        e.preventDefault(); 
        console.log("dragged", dragElement, column); 
        column.appendChild(dragElement); 
        column.classList.remove("hover-over"); 
 
        updateCounts();
        saveTasks();
    }); 
} 
 
document.addEventListener("click", (e) => { 
    if (e.target.classList.contains("delete")) { 
 
        const task = e.target.parentElement; 
        task.remove(); 
 
        updateCounts();
        saveTasks();
    } 
}); 
 
addDragEventListerners(todo_column); 
addDragEventListerners(progress_column); 
addDragEventListerners(done_column);