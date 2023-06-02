const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");
const graphEl = document.querySelector(".graph");

let list = JSON.parse(localStorage.getItem("list")) || [];

if (list.length > 0) {
    list.forEach((task) => {
        toDoList(task);
    });
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    toDoList();
});

function toDoList(task) {
    let newTask = inputEl.value.trim();
    if (task) {
        newTask = task.name;
    }

    if (!newTask) {
        return;
    }

    const liEl = document.createElement("li");
    if (task && task.checked) {
        liEl.classList.add("checked");
    }

    const timeDuration = task && task.timeDuration ? task.timeDuration : "";
    liEl.innerHTML = `
        <span>${newTask}</span>
        <span class="duration">${timeDuration}</span>
    `;
    ulEl.appendChild(liEl);
    inputEl.value = "";

    const checkBtnEl = document.createElement("div");
    checkBtnEl.innerHTML = `<i class="fas fa-check-square"></i>`;
    liEl.appendChild(checkBtnEl);

    const trashBtnEl = document.createElement("div");
    trashBtnEl.innerHTML = `<i class="fas fa-trash"></i>`;
    liEl.appendChild(trashBtnEl);

    checkBtnEl.addEventListener("click", () => {
        liEl.classList.toggle("checked");
        updateLocalStorage();
    });

    trashBtnEl.addEventListener("click", () => {
        liEl.remove();
        updateLocalStorage();
    });

    updateLocalStorage();

    // Alarm functionality
    const alarmTime = new Date();
    alarmTime.setMinutes(alarmTime.getMinutes() + 10); // Alarm set 10 minutes before the task

    const now = new Date();
    const timeDifference = alarmTime - now;

    if (timeDifference > 0) {
        setTimeout(() => {
            alert(`Task "${newTask}" is due in 10 minutes!`);
        }, timeDifference);
    }

    // Motivational messages
    const messages = [
        "You've got this! Stay focused.",
        "Stay determined and complete your tasks.",
        "Believe in yourself and make it happen.",
        "Success starts with completing your to-do list.",
        "One task at a time. You can do it!",
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const motivationalMsgEl = document.createElement("div");
    motivationalMsgEl.classList.add("motivational-msg", "text-center", "mt-4", "text-gray-500");
    motivationalMsgEl.textContent = randomMessage;
    liEl.appendChild(motivationalMsgEl);

    // Update graph
    const completedTasks = document.querySelectorAll(".checked").length;
    const totalTasks = document.querySelectorAll("li").length;
    const completionRate = (completedTasks / totalTasks) * 100;

    graphEl.style.width = completionRate + "%";
    graphEl.textContent = completionRate.toFixed(2) + "%";
}

function updateLocalStorage() {
    const liEls = document.querySelectorAll("li");
    list = [];
    liEls.forEach((liEl) => {
        const taskName = liEl.querySelector("span").textContent;
        const duration = liEl.querySelector(".duration").textContent;
        const checked = liEl.classList.contains("checked");
        list.push({
            name: taskName,
            timeDuration: duration,
            checked: checked,
        });
    });
    localStorage.setItem("list", JSON.stringify(list));
}
