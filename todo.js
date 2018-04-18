function init() {
	const inputTr = document.createElement('tr');
	//checkbox
	const inputCheckboxTh = document.createElement('th');
	inputCheckboxTh.setAttribute('class', 'checkbox_th');
	const inputCheckBox = document.createElement('input');
	inputCheckBox.setAttribute('type', 'checkbox');
	inputCheckboxTh.appendChild(inputCheckBox);
	inputTr.appendChild(inputCheckboxTh);

	//text部分
	const inputTextTh = document.createElement('th');
	inputTextTh.setAttribute('class', 'input_th');
	const inputForm = document.createElement('form');
	inputForm.addEventListener('submit', InputTodo);
	const input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('id', 'input_todo_box');
	input.setAttribute('autocomplete', 'off');
	input.setAttribute('placeholder', "What's need to be done?");
	inputForm.appendChild(input);
	inputTextTh.appendChild(inputForm);
	inputTr.appendChild(inputTextTh);
	//削除部分
	const inputEraseTh = document.createElement('th');
	inputEraseTh.setAttribute('class', 'erase_th');
	inputTr.appendChild(inputEraseTh);

	const todoList = document.getElementById("todo_input");
	todoList.insertBefore(inputTr, todoList.firstChild);
}

function InputTodo(event) {
	const inputBox = document.getElementById("input_todo_box");
	const todoList = document.getElementById("todo_input");
	todoList.insertBefore(makeTodo(inputBox.value), todoList.firstChild.nextSibling);
	inputBox.value = "";
	event.preventDefault();
}

function makeTodo(todoName) {
	const todo = document.createElement('tr');
	todo.setAttribute('class', 'todo');

	///チェックマーク
	const checkboxTh = document.createElement('th');
	checkboxTh.setAttribute('class', 'checkbox_th');
	const checkBox = document.createElement('input');
	checkBox.setAttribute('type', 'checkbox');
	checkboxTh.appendChild(checkBox);
	todo.appendChild(checkboxTh);

	//text部分
	const textTh = document.createElement('th');
	textTh.setAttribute('class', 'text_th');
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
	div.innerHTML = '<input type="text" class="input_todo_box" value="'+text+'" onblur="onblurEdit(this)"/>';
	div.firstChild.focus();
}

function onblurEdit(input) {
	console.log("x");
	const div = input.parentNode;
	div.setAttribute('ondblclick', 'onClickEdit(this)');
	div.innerHTML = input.value;
}

function onclickErase(button) {
	button.parentNode.parentNode.remove();
}