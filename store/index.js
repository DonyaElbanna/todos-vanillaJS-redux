const store = Redux.createStore(
  Redux.combineReducers({ todosReducer, goalsReducer })
);

store.subscribe(() => {
  console.log("The state is: ", store.getState());
  const { todosReducer, goalsReducer } = store.getState();

  //to not have duplicated results
  document.getElementById("todos").innerHTML = "";
  document.getElementById("goals").innerHTML = "";

  todosReducer.forEach(addTodoDOM);
  goalsReducer.forEach(addGoalDOM);
});

function generateId() {
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  );
}

function addTodo() {
  const input = document.getElementById("todo");
  const todo = input.value;
  input.value = " ";

  store.dispatch(
    addTodoAction({
      id: generateId(),
      todo: todo,
      complete: false,
    })
  );
}

document.getElementById("todo-btn").addEventListener("click", addTodo);

function addGoal() {
  const input = document.getElementById("goal");
  const goal = input.value;
  input.value = "";

  store.dispatch(
    addGoalAction({
      id: generateId(),
      goal: goal,
    })
  );
}

document.getElementById("goal-btn").addEventListener("click", addGoal);

// Adding inputs to the DOM

function addTodoDOM(todo) {
  const todoItem = document.createElement("input");
  todoItem.type = "checkbox";
  todoItem.id = todo.id;
  todoItem.name = todo.todo;
  todoItem.value = todo.todo;

  const todoItemLabel = document.createElement("label");
  // todoItem.htmlFor = todo.todo;
  const text = document.createTextNode(todo.todo);
  todoItemLabel.appendChild(text);
  todoItemLabel.style.cursor = "pointer";
  todoItemLabel.addEventListener("click", () =>
    store.dispatch(toggleTodoAction(todo.id))
  );

  const removeBtn = createRemoveBtn(() =>
    store.dispatch(removeTodoAction(todo.id))
  );

  todoItemLabel.style.textDecoration = todo.complete ? "line-through" : "none";
  todoItem.checked = todo.complete;

  var br = document.createElement("br");

  const list = document.getElementById("todos");
  list.appendChild(todoItem);
  list.appendChild(todoItemLabel);
  list.appendChild(removeBtn);
  list.appendChild(br);
}

function addGoalDOM(goal) {
  const liItem = document.createElement("li");
  const text = document.createTextNode(goal.goal);

  const removeBtn = createRemoveBtn(() => {
    store.dispatch(removeGoalAction(goal.id));
  });

  liItem.appendChild(text);
  liItem.appendChild(removeBtn);

  const list = document.getElementById("goals");
  list.appendChild(liItem);
}

// ceating a delete btn
function createRemoveBtn(onClick) {
  const btn = document.createElement("button");
  btn.innerHTML = "X";
  btn.style.cursor = "pointer";
  btn.style.marginLeft = "10px";
  btn.addEventListener("click", onClick);
  return btn;
}
