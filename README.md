# TODO Smart Contract Project

A todo smart Contract that makes use of struct and arrays.

[0x310376a36649cC8897795000283442Cb05C58dE7](https://sepolia.etherscan.io/address/0x310376a36649cC8897795000283442Cb05C58dE7)

Code is written in Solidity and tested with Hardhat.

## ASSIGNMENT

"Write a todo smart Contract that makes use of struct and arrays.
This contract has nothing to do with mapping.
A user can create a todo see all todos they create.
Add a status of isDone using a boolean.
One function should toggle the isDone status.
Users should be able to update title, description, isdone status and delete todo.
Finally, write and test with remix and hardhat."
This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

## Install

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

```bash
npx hardhat verify --network sepolia <contract-address>
```

```bash
npx hardhat test
```