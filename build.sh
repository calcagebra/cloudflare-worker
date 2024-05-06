cargo install wasm-bindgen-cli
cargo build --target=wasm32-unknown-unknown
wasm-bindgen --out-dir=dist --target=web --omit-default-module-path target/wasm32-unknown-unknown/release/calcagebra.wasm
yarn
yarn build
rm -rf dist node_modules pkg