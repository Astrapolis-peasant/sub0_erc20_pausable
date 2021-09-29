import { expect } from "chai";
import { artifacts, network, patract } from "redspot";

const { getContractFactory, getRandomSigner } = patract;

const { api, getAddresses, getSigners } = network;

describe("ERC20 Pausable Test", () => {
    after(() => {
      return api.disconnect();
    });
  
    const initial_supply = 100000000;
    
    /// setup the contract instasnce and allocate values to it
    async function setup() {
      await api.isReady
      const signerAddresses = await getAddresses();
      const Alice = signerAddresses[0];
      const sender = await getRandomSigner(Alice, "10000 UNIT");
      const contractFactory = await getContractFactory("erc20_pausable", sender.address);
      const contract = await contractFactory.deploy("new", initial_supply);
      const abi = artifacts.readArtifact("erc20_pausable");
  
      return { sender, contractFactory, contract, abi, Alice };
    }

    it("Init supply", async () => {
        const { contract, sender } = await setup();
        const name = await contract.query.name();
        expect(name.output).to.equal('MetisTestToken');
    
        const symbol = await contract.query.symbol();
        expect(symbol.output).to.equal('MET');
    
        const decimals = await contract.query.decimals();
        expect(decimals.output).to.equal(18);
    
        expect((await contract.query.balanceOf(sender.address)).output).to.equal(initial_supply);
        expect((await contract.query.totalSupply()).output).to.equal(initial_supply);
    
        expect((await contract.query.paused()).output).to.equal(false);
      })
});