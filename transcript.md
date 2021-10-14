# WASM Smart Contracts with Patract Labs

## Introduction
Patract Labs is founded with the vision to provide full stack support for smart contract developments based on Substrate. We understand that substrate is a fast growing eco-system for a variaty of different and they are all carrying different purposes. We are seeing all kinds of substrate based projects emerging and booming. 

However, we think smart contract will play an important role in the substrate eco-system by overseeing expotentially booming projects in other blockchains such as Ethereum, Solana and EOS. Althrough many project are just simple smart contracts but they have brought tremendous values to their eco-system. For example, the Defi projects like Uniswap on Ethereum, Serum on Solana. They are now playing vital roles in the blockchain industry and creates liquidity and practical use cases for the blockchain they were built on. And all those successful projects are back-boned by the developer tools and services such as Traffle, etherscan and Ganache. So we believe by providing mature and secured developer tools and service will further benefit the entire substrate Community which allows more developers to get involved.   

Therefore, Patract Labs are dedicated into the Substrate ecosystem by provides all kinds of tools and services needed by the smart contract developers in Substrate. We are extremely excited to be involved in Sub0 Seminar by providing the following products:

### Jupiter
The first Product I am covering today is called Jupiter, Jupiter aims to be an open blockchain network, which provides wide supports to all smart contract as long as they are running on Frame `pallet-contract`. Jupiter has be been alive in the Substrate network and anyone can use it to test their smart contracts for free.

### Ask!
The second product is call Ask!. Ask is an embedded domain-specific language or eDSL that allows developers to write WASM smart contract in assemblyscript. We will cover the details later.

### Redspot
Redspot is the contract dev scoffold. Its goal is to librate developers from the tideous and munual work like contract complile, deployment, testing. We hope contract developers can finish all the task they need just in one place.

### Metis
Metis, simillar to OpenZepplin in the Ethereum ecosystem, is the standard contract library. It provides secure and audited implmentations to commonly used components in Ink!. With Metis, developers wont have to repeated writing or copy/paste the same code over and over again.

### Europa
Europa is the contract sandbox enviroment specially designed for contract developments. It removes some unnessary components from subtrate and reveal more details during the contract execution.

### Parascan
Parascan is the blockchain explorer designed specifically for inspecting smart contract logs and executions of substrate-based chains. Therotically, Parascan can connect and cache any substrate blockchain and provide ad hoc explorer services

### Himalia
Rightnow, most of SDKs for Substrate are written in JS. However, many projects and services that need to communicate with Substrate are written in other programming languages such as Go, Java and Python. Himalia is the SDK that provides multi-language support.

Let's dive deep in to the products that we will be demoing today.

## Ask! - Bring AssemblyScript to Substrate
Many of us have played around with Ink!. However, a great advantage of WASM is that WASM support programming languages compile to it. Ink! is great but it requires developers to be familiar with Rust as a prerequiste. Therefore, we create Ask! wihch is an eDSL similar to ink!. With ask!, anyone has experience with typescript or AssemblyScript can easily develop WASM smart contracts. Overall, we are tyring to bring Solidity style development into Substrate.

### eDSL
- overall layout similar to ink!
- grammer in Assemblyscript

## Decorators
- similar to macros in ink!, Ask! provides decorators. That gives very similar code layout
- High level abstraction, developers can focus on the contract logics without learning how to interact with host functions and pallet-contract. All the complex stuff are done by Ask! under the hood.

## Storage
More storages types:
- SpreadStorableMap 
- SpreadStorableArray
- PackedStorableMap 
- PackedStorableArray
When large amounts of data need to be stored, Spread should be used.
When you store a small amount of data and need to access most of the content, such as search or statistical logic, it may be better to choose Packed.

## Interface and Inheritance
Because Rust does not support inheritence, similar computer programming model used in Solidity wont work.   
With Ask!
- Solidity developers can quick get used to ask!
- Support Standard Contract Library similar to Openzeppelin.

## Under development
- We are at version v0.2 and will publish v0.3 soon.

## Redspot
Redspot is a development environment to compile, deploy, and debug wasm smart contract for substrate based chains. Redspot helps developers manage and automate the repeating steps during the process of writing smart contracts and dApps.Redspot is a development environment to compile, deploy, and debug wasm smart contract for substrate based chains. Similar to the architectures of Hardhat, Redspot is built upon Tasks and Plugins.

### Template
- Based on contract standard, automatically generate sample contract,
deploy script, test script and Redspot Config. eg. `npx redspot-new erc20` will create a diretory with sample erc20 code, deployment and tests. You dont have to write up the deployment, configs manually.
We are integrating more templates into Redspot. So in the future, you can initiate any contract stands with one command
- npx support, no additional setup required

### Compile
- Wraps around cargo-contract
- `npx redspot compile`
- npx redspot compile will compile the code and put into coresponding dir for deployment

### Deploy
- Upload the contract and instantiate it using script.
- `npx redspot run scripts/deploy.ts --no-compile`

### Test
- Test contract methods using script
- `npx redspot test --no-compile`

### Console
- Powerful JavaScript Interactive Console for integration testing.
- control the blockchain operations
- Before writing the detailed test codes, you can play in console, understand how Redspot works. Getting the sense of how to test you contract, etc
- `npx redspot explorer`

### Docker
- Many times, a contract will be deploy across multiple blockchains, Redspot has integration with docker that allow one contract to be tested on multiple platforms
- To start Docker: `npx redspot testnet`
- Compile on Docker: `npx redspot compile --docker true`

### Plugin
- not enough for your development
- Extend Redspot with custom plugins, adding more features, integrate with other development tools
- Stay compatible with Custom Substrate Chain by extending types by simply writing yuour custom plugin

### Explorer GUI
-  @polkadot/apps but focus on contract 
-   fully integrated with Redspot configs, no more operations required once you have the test blockchain setup

## Metis — Rusty Solution For Standard Contract Library

### Current problems when developing in ink!
- Lack of standard library makes the smart contract unsafe.
    The DAO attack in 2016 stole 3.6m Ether due to a bug in the smart contract. This attack
    enforced hardfork for Ethereum Mainnet
Non-standardized contract will cause tremendous economic loss and further impact the blockchain's consensus. Imagine having this 2021, people will really question the securities your blockchain even that is caused by contract developers.

###  Developers have to manually copy/paste existing implementation.
- The source code could be unaudited and unsafe to use. 
    - Imagine copying the code from another smart contract project. They may have bugs in the contract that hasnt been noticed yet. Recklessly copying their code may cause enormous problems in future
- Time consuming and error-proning during the process.
    - you may miss some logics during copying and pasting 
    - or you misunderstood their logics because they may not name their functions correctly
    - you wasted tons of time to stay updated with their contracts to repeat copying and pasting for every release

### Introduce Metis
- To permernently solve the issues listed above, we created Metis
- Standard Contract library based on reusable components.
    - Unlike Openzeppelin’s Inheritance model, Metis is based on Components, which means
users do not directly inherit the standard implementation. Instead, Metis provides a set of
reusable components for users to assemble

### Metis vs OpenZepplin
- Inheritance — Used by Openzeppelin
    - Pros: Simplicity : Minimize the code to write for developers
    - Cons: Ambiguity : Conceal method definitions; Uncertain Inheritance tree with multiple Inheritance.
        - eg.In OpenZepplin, when you have multiple inheritence, you may have a hardtime figuring which parent contract the method is inherited from

- Composition — Used by Metis
    - Pros: Clarity : Improve code readability and audibility
        all function user can interact is coded in place, that makes code auditing much easier
    - Cons: Repetition : Repeat writing the same code for existing implementation.

## MCCI architecture
- Data Model - Storage
- Components - implementations
- Controller - combines different componets, ERC20Pausbale -> erc20, pausable, ownable
- Interface - immutable and mutable function, users interactions

### Metis—vs Native ink! (Storage)
 - Users no longer need to declare the variables by themselves
 - standardize the data structure
    - easier for Dapp development

### Metis—vs Native ink! (Constructor)
- Skip the process of variable initilization
- No need to manually emit event
    - developers may forget to emit events that will cause blockchain explorer not be able to catch the changes and give users hard time to validate their transactions

### Metis—vs Native ink! (Event)
- Stays pretty much the same due to current design of Ink!. Will mitigate in near future
- we will use Macros to automatically generate event based on Metis components included. For example, if you have a contract Called ERC20Pausable, we will generate all events included in storage declaration

### ink! Metis—vs Native ink! (Message)
- Contains default method implementation that ensures the security of balance transfer
    - taking care of all the caveats may exist in implementations
        - eg. checking remaining balance
        - allows developers to focus more on their core logics

### Design Principle
- rewriting functions seem stupid in software design
-  writing code on the right side
    - more nature
    - skip writing all redundent code
- Instantiation means create a instance of smart contract on the blockchain.
- Calling method of another instance means calling method from another contract.
- Cross contract calling ends up with wrong result.

### Composition of multiple components
- no need to list all required variables in storage
- combine on demand, create more possibilities

## Europa  
### out-of-box local test net
- Europa is another implementation of subtrate blockchain with special focus on smart contract development
- For better development experience, we removed consensus. The reason was when we were developing contracts using Canvas, we found the auto-generated blocks really bother us. Therefore, Europa only produces blocks when it receives new extrinsics.
- No WASM Runtime. Although WASM Runtime is great since it allows no hardfork blockchain upgrades, it brings more difficulty to debug contract execution
- State KV Database. This additional database tracks all state changes when a new block gets mined. This is really helpful when we are debugging smart contracts as we can figure what the contract really changes the underneath states of the blockchain.
- Contract Pallet Modification. Right now, running WASM smart contracts feels like a blackbox to contract developers as it doesnot print out all execution details. Therefore, we modifies `contract-pallet` to allow the node printing out all execution details.

### Europa UI
- We believe running a testing node should be as easy as possible and no setup should be involved. That will make WASM smart contract development more attractive to developers from all industries.
- Europa UI's graphic interface is designed specifically for contract developments to faciliate browsing/debugging smart contracts. we will illustrate it shortly
- Unlike other Substrate chain while you have to compile it locally. YOu cna download the binary release and
start your own node with one click. So you don't have to manually install all the dependecies manually. That will save contract developers a great amout of time to run a node locally.
- Europa UI is built with Electron and available throught all maintream platfroms including Windows, Mac and Ubuntu. But it has some restraints on Operating System Versions. So check you os version before downloading.

### Europa UI - demo
contract pages
- check all state changes
- making rpc calls
- making rpc calls with trace to get more insights of contract execution
Nested Views
- Nested contract calls maybe very confusing
- gives clear hirrachy of how cross contract calls works

### Europa CLI
- custom RPCs 
    - europa_forwardToHeight: forward the blockchain to a desinated height
    - europa_backwardToHeight: revert the blockchain to a desinated height and remove all blockchains state after that height
    - europa_modifiedStateKvs: get all the blockchain state changes
- Custom Commands
    - State - kv: same as RPC: europa_modifiedStateKvs -> get all the blockchain state changes
    - workspace - allows the developers to switch to different workspaces for different testing scenarios

- Detailed logging for contract execution:
    - it will trace and print all parameters and blockchain changes during the contract exeuction
    - provides wasm panic backtrace to exactly locate where the bug happens in smart contract


## Demo
1. Start your Redspot Project using Redspot templates:
```
npx redspot-new erc20
```
> remember to change the dependencies in `cargo.toml` to pull from crate.io, otherwise it will have compatible issues with `polkadot.js`

```
ink_primitives = { version = "3.0.0-rc5", default-features = false }
ink_metadata = { version = "3.0.0-rc5", default-features = false, features = ["derive"], optional = true }
ink_env = { version = "3.0.0-rc5", default-features = false }
ink_storage = { version = "3.0.0-rc5", default-features = false }
ink_lang = { version = "3.0.0-rc5", default-features = false }
```
- `redspot.config.ts`: contains all configurations for redspot such as network configs 
- `scripts/deploy.ts`: is the deployment script to deploy the contract to blockchain
- `tests`: contains all tests written for integration tests.

2. Download Europa-UI

Detailed release information can be found here [Release v0.3.32](https://github.com/patractlabs/europa-ui/releases/tag/v0.3.32).
Currently, 3 operating systems are supportd:
* **Windows** 10 (21H1 and above)[europa-ui-v0.3.32-x86_64-win.exe](https://github.com/patractlabs/europa-ui/releases/download/v0.3.32/europa-ui-v0.3.30-x86_64-win.exe)
* **MacOS** (10.15.7 and above)[europa-ui-v0.3.32-x86_64-darwin.dmg](https://github.com/patractlabs/europa-ui/releases/download/v0.3.32/europa-ui-v0.3.32-x86_64-darwin.dmg)
* **Ubuntu** (20.04 and above)[europa-ui-v0.3.32-x86_64-linux.AppImage](https://github.com/patractlabs/europa-ui/releases/download/v0.3.32/europa-ui-v0.3.32-x86_64-linux.AppImage)
> For ubuntu, remember to give it permission `chmod +x europa-ui-v0.3.32-x86_64-linux.AppImage`

3. Start Europa-UI

- Simply double click the icon to start it. Making sure the default port is not occupied. 

- Click start to start the node.

4. Test Redspot + Europa using templated contract and config
```
px redspot run scripts/deploy.ts
```
It will compile the contracts and update contract + metadata to Europa-UI. If the metadata does not get uploaded correctly, you can manual add that.

- open Europa-UI, you should be able to see the contract has been successfully deployed.
- you can use `back to Block` to revert the blockchain and remove the deployed test contract

5. Copy dependency in [Cargo.toml](./contracts/Cargo.toml) and contract code in [lib.rs](./contracts/lib.rs) into `erc20/contracts/Cargo.toml` and `erc20/contracts/lib.rs`
    - cp -R contracts ink_contracts
    - let's checkout the changes by introducing metis
        - `Cargo.toml`: we import the metis components that we will be using. note that `metis_lang` is a must have for projects using Metis
        - `lib.rs`: 
            - instead of just `use ink_lang as ink;`, we import all dependencies from metis
            - storage: we no longer declare our own variables, we composite multiple metis components
            - event: Unfortunately, we still have to write all the code for events. In the next version of Metis, we will make Metis's generate those events as long as we have declared them in the storage.
            - Messages: we no longer need to implement functions ourself. We can use Metis's default implmentation
            - Internal functions: those are functions that are not exposed to users on blockchain, Metis's macro will automatically generate mose of them. So we no longer need to write them ourself.

        - Metis's feature of composition:
            - As we mentioned in the slides, Metis allows user to easily put together different components as needed.

        - Extensions:
            - hook:
                you might be ask why we did not add specific logics to pause transfer in our method implementations. That is because we use hooks in Metis and for every component we have a list of extension that implements the hooks.
            - erc20 extensions: https://github.com/patractlabs/metis/blob/main/crates/components/token/erc20/src/extensions/pausable.rs This extension overrides the `before_token_transfer` hook and adds the logic in it. So we no longer needs to implement pausable logic in every transfer function we have

6.  Build your contract with 
```
cd contracts
cargo +nightly contract build --keep-debug-symbols --optimization-passes=0
```
then copy it to artifacts dir under erc20 directory 
> this will build the contract in debug mode and keeps all debug symbols.
```
mkdir ../artifacts
cp ./target/ink/erc20_pausable.contract ../artifacts/
cp ./target/ink/metadata.json ../artifacts/erc20_pausable.json 
```

7. write the deployment script.
    - copy the code from [deploy.ts](./scripts/deploy.ts)
    - `npx redspot run scripts/deploy.ts --no-compile`
    - open Europa-UI to check if the contract has been successfully deployed

8. Writing tests:
    - copy all the code from [tests](./tests)
    - `npx redspot test ./tests/erc20_pausable_init.test.ts --no-compile`
        - test contract instantiation
    - `npx redspot test ./tests/erc20_pausable_ownable.test.ts --no-compile`
        - owner is initialized to sender's address
        - non owner will be able to renounce ownership
        - owner should be able to renounce ownership
        - non-owner shuoldn't be able to transfer ownership
        - owner can transfer their ownership

    - `npx redspot test ./tests/erc20_pausable_pause.test.ts --no-compile`
        - default paused state is be false
        - non-owner should be able to pause 
        - owner should be able to pause
        - owner can unpause
        - Transfer without paused should be successful
        - Transfer with paused should be failed