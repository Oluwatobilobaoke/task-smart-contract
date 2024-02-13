import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Todo", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTodo() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const TodoContract = await ethers.getContractFactory("Todo");
    const todoContract = await TodoContract.deploy();

    return { todoContract, owner, otherAccount };
  }

  describe("TODO", () => {
    it("Should be able to add a todo", async () => {
      const { todoContract } = await loadFixture(deployTodo);

      const todoToBeCreated = {
        title: "Wash Cloth",
        description: "Wash the cloth in the washing machine",
      };

      await todoContract.addTodo(
        todoToBeCreated.title,
        todoToBeCreated.description
      );

      const todoItemCreated = await todoContract.getTodoItem(0);

      expect(todoItemCreated.title).to.equal(todoToBeCreated.title);
    });

    it("Should be able to get a todo", async () => {
      const { todoContract } = await loadFixture(deployTodo);

      const todoObject = {
        title: "Wash Cloth",
        description: "Wash the cloth in the washing machine",
      };

      await todoContract.addTodo(todoObject.title, todoObject.description);

      const todoItem = await todoContract.getTodoItem(0);

      expect(todoItem.title).to.not.equal("");
    });

    it("Should throw error this todo item does not exist ", async () => {
      const { todoContract } = await loadFixture(deployTodo);

      await expect(todoContract.getTodoItem(0)).to.be.revertedWith(
        "this todo item does not exist"
      );
    });

    it("Should be able to mark a todo as done", async () => {
      const { todoContract } = await loadFixture(deployTodo);

      const todoObject = {
        title: "Wash Cloth",
        description: "Wash the cloth in the washing machine",
      };

      await todoContract.addTodo(todoObject.title, todoObject.description);

      await todoContract.updateTodoItemStatus(0);

      const todoItem = await todoContract.getTodoItem(0);

      expect(todoItem.isDone).to.equal(true);
    });

    it("Should throw error this todo item does not exist while updating ", async () => {
      const { todoContract } = await loadFixture(deployTodo);

      await expect(todoContract.updateTodoItemStatus(0)).to.be.revertedWith(
        "this todo item does not exist"
      );
    });

    it("Should be able to delete a todo", async () => {
      const { todoContract } = await loadFixture(deployTodo);

      const todoObject = {
        title: "Wash Cloth",
        description: "Wash the cloth in the washing machine",
      };

      await todoContract.addTodo(todoObject.title, todoObject.description);

      await todoContract.removeTodoItem(0);

      await expect(todoContract.getTodoItem(0)).to.be.revertedWith(
        "this todo item does not exist"
      );
    });
    it("Should be able to delete a todo", async () => {
      const { todoContract } = await loadFixture(deployTodo);

      const todoObject = {
        title: "Wash Cloth",
        description: "Wash the cloth in the washing machine",
      };
      const todoObject2 = {
        title: "Pick Cloth",
        description: "Pick the cloth in the washing machine",
      };

      await todoContract.addTodo(todoObject.title, todoObject.description);
      await todoContract.addTodo(todoObject2.title, todoObject2.description);

      await todoContract.removeTodoItem(0);

      const todoItem2 = await todoContract.getTodoItem(0);

      expect(todoItem2.title).to.be.equals(todoObject2.title);
    });

    it("Should throw error this todo item does not exist while deleting ", async () => {
      const { todoContract } = await loadFixture(deployTodo);

      await expect(todoContract.removeTodoItem(0)).to.be.revertedWith(
        "this todo item does not exist"
      );
    });

    it("Should be able to get all todos", async () => {
      const { todoContract } = await loadFixture(deployTodo);

      const todoObject = {
        title: "Wash Cloth",
        description: "Wash the cloth in the washing machine",
      };
      const todoObject2 = {
        title: "Pick Cloth",
        description: "Pick the cloth in the washing machine",
      };

      await todoContract.addTodo(todoObject.title, todoObject.description);
      await todoContract.addTodo(todoObject2.title, todoObject2.description);

      const todoItems = await todoContract.getTodoItems();

      expect(todoItems.length).to.be.equals(2);
    });

    it("Should be able to get all todos", async () => {
      const { todoContract } = await loadFixture(deployTodo);

      const todoObject = {
        title: "Wash Cloth",
        description: "Wash the cloth in the washing machine",
      };
      const todoObject2 = {
        title: "Pick Cloth",
        description: "Pick the cloth in the washing machine",
      };

      await todoContract.addTodo(todoObject.title, todoObject.description);
      await todoContract.addTodo(todoObject2.title, todoObject2.description);

      const todoItems = await todoContract.getTodoItems();

      expect(todoItems[0].title).to.be.equals(todoObject.title);
      expect(todoItems[1].title).to.be.equals(todoObject2.title);
    });

    it("Should be able to get all todos and must equal todoItem length", async () => {
      const { todoContract } = await loadFixture(deployTodo);

      const todoObject = {
        title: "Wash Cloth",
        description: "Wash the  cloth in the washing machine",
      };
      const todoObject1 = {
        title: "Wash Cloth",
        description: "Wash the  cloth in the washing machine",
      };
      const todoObject2 = {
        title: "Wash Cloth",
        description: "Wash the  cloth in the washing machine",
      };

      await todoContract.addTodo(todoObject.title, todoObject.description);
      await todoContract.addTodo(todoObject1.title, todoObject1.description);
      await todoContract.addTodo(todoObject2.title, todoObject2.description);

      const todoItems = await todoContract.getTodoItems();
      const todoLength = await todoContract.getTodoItemsLength();

      expect(todoItems.length).to.be.equals(todoLength);
    });

    // update title
    it("Should be able to update a todo title", async () => {
      const { todoContract } = await loadFixture(deployTodo);

      const todoObject = {
        title: "Wash Cloth",
        description: "Wash the cloth in the washing machine",
      };

      await todoContract.addTodo(todoObject.title, todoObject.description);

      const newTitle = "Pick Cloth";

      await todoContract.updateTitle(0, newTitle);

      const todoItem = await todoContract.getTodoItem(0);

      expect(todoItem.title).to.equal(newTitle);
    });

    // update description
    it("Should be able to update a todo description", async () => {
      const { todoContract } = await loadFixture(deployTodo);

      const todoObject = {
        title: "Wash Cloth",
        description: "Wash the cloth in the washing machine",
      };

      await todoContract.addTodo(todoObject.title, todoObject.description);

      const newDescription = "Pick the cloth in the washing machine";

      await todoContract.updateDescription(0, newDescription);

      const todoItem = await todoContract.getTodoItem(0);

      expect(todoItem.description).to.equal(newDescription);
    });

  });
});
