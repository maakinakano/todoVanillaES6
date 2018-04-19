function init() {
//	localStorage['todoNum']=0;
	const inputTr = document.createElement('tr');
	const todoList = document.getElementById("todo_input");
	
	for(let i=0; i<localStorage['todoNum']; i++) {
		const todoData = JSON.parse(localStorage['todo-' + i]);
		console.log(todoData);
		todoList.insertBefore(makeTodo(todoData['name'], i, todoData['isDone']), todoList.firstChild.nextSibling);	
	}
	//checkbox
	const inputCheckboxTh = document.createElement('th');
	inputCheckboxTh.setAttribute('class', 'checkbox_th');
	inputCheckboxTh.innerHTML = '<input type="checkbox" onclick="onCheckAll(this)">';
	inputTr.appendChild(inputCheckboxTh);

	//text部分
	const inputTextTh = document.createElement('th');
	inputTextTh.setAttribute('class', 'input_th');
	const inputForm = document.createElement('form');
	inputForm.addEventListener('submit', InputTodo);
	inputForm.innerHTML = '<input type="text" id="input_todo_box" autocomplete="off", placeholder="Whats need to be done?">';
	inputTextTh.appendChild(inputForm);
	inputTr.appendChild(inputTextTh);

	//削除部分
	const inputEraseTh = document.createElement('th');
	inputEraseTh.setAttribute('class', 'erase_th');
	inputTr.appendChild(inputEraseTh);

	todoList.insertBefore(inputTr, todoList.firstChild);
}

function InputTodo(event) {
	event.preventDefault();
	const inputBox = document.getElementById("input_todo_box");
	if(inputBox.value === ''){
		return;
	}

	const todoList = document.getElementById("todo_input");
	const todoName = inputBox.value;
	const todoNum = localStorage['todoNum'];

	todoList.insertBefore(makeTodo(todoName, todoNum), todoList.firstChild.nextSibling);
	writeStrage(todoNum, todoName, false);
	localStorage['todoNum'] = +todoNum+1;
	inputBox.value = "";
}


function makeTodo(todoName, todoId, isDone = false) {
	const todo = document.createElement('tr');
	todo.setAttribute('class', 'todo');
	todo.setAttribute('name', todoId);

	///チェックマーク
	const checkboxTh = document.createElement('th');
	checkboxTh.setAttribute('class', 'checkbox_th');
	if(isDone) {
		checkboxTh.innerHTML = '<input type="checkbox" class="done_check" onclick="onCheck(this)" checked=true>';
	} else {
		checkboxTh.innerHTML = '<input type="checkbox" class="done_check" onclick="onCheck(this)">';
	}
	todo.appendChild(checkboxTh);

	//text部分
	const textTh = document.createElement('th');
	if(isDone) {
		textTh.setAttribute('class', 'text_ths');
	} else {
		textTh.setAttribute('class', 'text_th');
	}
	textTh.textContent = todoName;
	textTh.setAttribute('ondblclick', 'onClickEdit(this)');
	todo.appendChild(textTh);

	//削除部分
	const erase_th = document.createElement('th');
	erase_th.setAttribute('class', 'erase_th');
	erase_th.innerHTML = '<input type="button" onclick="onclickErase(this)">';
	todo.appendChild(erase_th);

	return todo;
}

function onClickEdit(div) {
	const text = div.textContent;
	div.removeAttribute('onclick');
	div.innerHTML = '<input type="text" class="input_todo_box" value="'+text+'" onblur="onBlurEdit(this)"/>';
	div.firstChild.focus();
}

function onBlurEdit(input) {
	const div = input.parentNode;
	div.setAttribute('ondblclick', 'onClickEdit(this)');
	div.innerHTML = input.value;
}

function onclickErase(button) {
	button.parentNode.parentNode.remove();
}

function onCheck(checkBox) {
	const text = checkBox.parentNode.nextSibling;
	flipDoneTodo(text, checkBox.checked);
}

function onCheckAll(checkBox) {
	const checkBoxes = document.getElementsByClassName('done_check');
	for(let i=0; i<checkBoxes.length; i++){
		checkBoxes[i].checked = checkBox.checked;
		flipDoneTodo(checkBoxes[i].parentNode.nextSibling, checkBox.checked);
	}
}

function flipDoneTodo(todoText, isDone) {
	const id = todoText.parentNode.getAttribute('name');
	const name = todoText.textContent;
	writeStrage(id, name, isDone);
	if(isDone) {
		todoText.setAttribute('class', 'text_ths');
	} else {
		todoText.setAttribute('class', 'text_th');
	}
}

function writeStrage(id, name, isDone) {
	const todoData = {};
	todoData['name'] = name;
	todoData['isDone'] = isDone;
	localStorage['todo-' + id] = JSON.stringify(todoData);
}