const inputform = document.getElementById("input_form");
inputform.addEventListener('submit', InputTodo);

function InputTodo(event) {
	const inputBox = document.getElementById("input_todo_box");
	const todoList = document.getElementById("todo_list");
	todoList.insertBefore(makeTodo(inputBox.value), todoList.firstChild);
	inputBox.value = "";
	event.preventDefault();
}

function makeTodo(todoName) {
	console.log(todoName);
	const todo = document.createElement('tr');
	todo.setAttribute('class', 'todo');
	const checker = document.createElement('th');
	checker.setAttribute('class', 'checkbox_th');
	const todoText = document.createElement('th');
	const erase = document.createElement('th');

	///チェックマーク
	const checkBox = document.createElement('input');
	checkBox.setAttribute('type', 'checkbox');
	checker.appendChild(checkBox);
	todo.appendChild(checker);

	//text部分
	const todoNameArea = document.createElement('div');
	todoNameArea.textContent = todoName;
	todoNameArea.setAttribute('onclick', 'onClickEdit(this)');
	todoText.appendChild(todoNameArea);
	todo.appendChild(todoText);
	//削除部分
	todo.appendChild(erase);

	return todo;
}

function onClickEdit(div) {
	const text = div.textContent;
	console.log(text);
//	jQuery(function($){
//		$('dd').click(function(){
//			var txt = $(this).text();
//			$(this).html('<input type="text" value="'+txt+'" />');
//		});
//	});
}