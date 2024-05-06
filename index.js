import init, { run } from './dist/calcagebra.js';
import wasmData from './dist/calcagebra_bg.wasm';

const wasmPromise = await init(wasmData);

export function execute(code) {
    return run(code)
}