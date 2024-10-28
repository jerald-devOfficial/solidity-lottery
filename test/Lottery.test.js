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


describe("Lottery", () => {
  it("should deploy the contract", () => {
    assert.ok(lottery.options.address);
  });
});
