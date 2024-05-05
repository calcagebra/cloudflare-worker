rm -rf dist pkg node_modules
cargo install wasm-pack
wasm-pack build --release
yarn
yarn build