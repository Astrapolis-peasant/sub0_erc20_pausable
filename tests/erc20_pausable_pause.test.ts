import { expect } from "chai";
import { artifacts, network, patract } from "redspot";

const { getContractFactory, getRandomSigner } = patract;

const { api, getAddresses, getSigners } = network;

async function expectRevert(promise, expectedError) {
    try {
        await promise;
    } catch (exp) {
        expect(exp.error.message).to.equal("contracts.ContractTrapped( Contract trapped during execution.)")
    }
}

describe("ERC20 Pausable Test", () => {
  after(() => {
    return api.disconnect();
  });

  const initial_supply = 100000000;

  async function setup() {
    await api.isReady
    const signerAddresses = await getAddresses();
    const Alice = signerAddresses[0];
    const sender = await getRandomSigner(Alice, "10000 UNIT");
    const contractFactory = await getContractFactory("erc20_pausable", sender.address);
    const contract = await contractFactory.deploy("new", initial_supply);
    const abi = artifacts.readArtifact("erc20_pausable");
    const receiver = await getRandomSigner();

    return { sender, contractFactory, contract, abi, receiver, Alice };
  }
  
  it("Paused", async () => {
    const { contract, sender, receiver } = await setup();

    /// default paused state is be false
    expect((await contract.query.paused()).output).to.equal(false);

    // non-owner should be able to pause 
    it('reverts', async function () {
        await expectRevert(
            contract.connect(receiver).tx.pause(), '',
        );
    });
  
    expect((await contract.query.paused()).output).to.equal(false);

    // owner should be able to pause
    await expect(contract.tx.pause())
        .to.emit(contract, 'Paused')
        .withArgs(sender.address);

    expect((await contract.query.paused()).output).to.equal(true);

    // owner can unpause
    await expect(contract.tx.unpause())
        .to.emit(contract, 'Unpaused')
        .withArgs(sender.address);

    expect((await contract.query.paused()).output).to.equal(false);
  });


  it("Transfer without paused", async () => {
    const { contract, sender } = await setup();

    const signerAddresses = await getAddresses();
    const Bob = signerAddresses[1];

    expect((await contract.query.balanceOf(sender.address)).output).to.equal(initial_supply);

    await expect(contract.tx.transfer(Bob, 1000))
      .to.emit(contract, 'Transfer')
      .withArgs(sender.address, Bob, 1000);

    expect((await contract.query.balanceOf(sender.address)).output).to.equal(initial_supply - 1000);
    expect((await contract.query.balanceOf(Bob)).output).to.equal(1000);
    expect((await contract.query.totalSupply()).output).to.equal(initial_supply);
  });

  it("Transfer with paused", async () => {
    const { contract, sender } = await setup();

    const signerAddresses = await getAddresses();
    const Bob = signerAddresses[1];

    expect((await contract.query.paused()).output).to.equal(false);

    await expect(contract.tx.pause())
        .to.emit(contract, 'Paused')
        .withArgs(sender.address);

    expect((await contract.query.balanceOf(sender.address)).output).to.equal(initial_supply);

    it('reverts', async function () {
        await expectRevert(
            contract.tx.transfer(Bob, 1000), '',
        );
    });

    expect((await contract.query.balanceOf(sender.address)).output).to.equal(initial_supply);
    expect((await contract.query.balanceOf(Bob)).output).to.equal(0);
    expect((await contract.query.totalSupply()).output).to.equal(initial_supply);
  });

});