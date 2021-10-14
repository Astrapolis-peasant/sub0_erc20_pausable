# WASM Smart Contract With Patract Labs

## Patract Labs
- Patract’s mission is to accelerate the smart contract industry’s transition to Wasm technology stack.

- Official Website: https://patract.io/

- Documents Warehouse: https://docs.patract.io/en#

## Slides and transcripts
- For the speaker's slides, please refer [WASM Smart Contract with Patract Labs](./sub0-patract-slides.pdf)

- For the speaker's transcript, please refer [Transcript](./transcript.md)

## Documents
- [Redspot](https://docs.patract.io/en/redspot/intro/overview): Contract Dev Scaffold
- [Europa](https://docs.patract.io/en/europa/intro/overview): Contract Sandbox Env
- [Metis](https://docs.patract.io/en/metis/intro/overview): Standard Contract Library

## Demo Setup
> Making sure you have cargo-contract setup: Please follow the guide on ink! to setup rust, cargo and cargo-contracts

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
    - `npx redspot test ./tests/erc20_pausable_ownable.test.ts --no-compile`
    - `npx redspot test ./tests/erc20_pausable_pause.test.ts --no-compile`