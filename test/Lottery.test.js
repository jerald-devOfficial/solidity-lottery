const ganache = require("ganache");
const { Web3 } = require("web3");
const assert = require("assert");

const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require("../compile");

let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });
});

describe("Lottery Contract", async () => {
  it("should deploy the contract", () => {
    assert.ok(lottery.options.address);
  });

  it("should allow a user to enter the lottery", async () => {
    await lottery.methods
      .enter()
      .send({ from: accounts[0], value: web3.utils.toWei("0.02", "ether") });

    const players = await lottery.methods
      .getPlayers()
      .call({ from: accounts[0] });

    assert.equal(accounts[0], players[0]);
    assert.equal(players.length, 1);
  });

  it("should allow multiple users to enter the lottery", async () => {
    await lottery.methods
      .enter()
      .send({ from: accounts[0], value: web3.utils.toWei("0.02", "ether") });

    await lottery.methods
      .enter()
      .send({ from: accounts[1], value: web3.utils.toWei("0.02", "ether") });

    await lottery.methods
      .enter()
      .send({ from: accounts[2], value: web3.utils.toWei("0.02", "ether") });

    const players = await lottery.methods
      .getPlayers()
      .call({ from: accounts[0] });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(players.length, 3);
  });
});