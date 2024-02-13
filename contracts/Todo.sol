// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

contract Todo {

  address todoOwner;

  struct TodoItem {
    string title;
    string description;
    bool isCompleted;
  }

  TodoItem[] public todoItems;

  constructor() {
    todoOwner = msg.sender;
  }


  function getTodoOwner() view external onlyOwner returns (address) {
    return todoOwner;
  }

  function addTodo(string calldata _title, string calldata _description) external onlyOwner {
    todoItems.push(TodoItem(_title, _description, false));
  }

  function getTodoItem(uint index) todoItemExists(index) external view returns (string memory title, string memory description, bool isCompleted){
    TodoItem storage todoItem = todoItems[index];
    return (todoItem.title, todoItem.description, todoItem.isCompleted);
  }

  function updateTitle(uint index, string calldata _title) todoItemExists(index) external onlyOwner {
    TodoItem storage todoItem = todoItems[index];
    todoItem.title = _title;
  }

  function updateDescription(uint index, string calldata _description) external onlyOwner {
    TodoItem storage todoItem = todoItems[index];
    todoItem.description = _description;
  }

  function updateTodoItemStatus(uint index) todoItemExists(index) external  onlyOwner {
    TodoItem storage todoItem = todoItems[index];
    todoItem.isCompleted = !todoItem.isCompleted;
  }

  function getTodoItems() external view onlyOwner returns(TodoItem[] memory) {
    return todoItems;
  }

  function getTodoItemsLength() external view returns (uint) {
    return todoItems.length;
  }

  function removeTodoItem(uint index) todoItemExists(index) external {
    todoItems[index] = todoItems[todoItems.length - 1];
    todoItems.pop();
  }

  modifier todoItemExists(uint index) {
    require(index < todoItems.length, 'this todo item does not exist');
    _;
  }

  modifier onlyOwner() {
    require(msg.sender == todoOwner);
    _;
  }

}