#![feature(internal_output_capture)]
mod ast;
mod data;
mod interpreter;
mod lexer;
mod parser;
mod standardlibrary;
mod token;

use std::sync::Arc;

use lexer::Lexer;

use crate::{interpreter::Interpreter, parser::Parser};
use serde::Deserialize;

use worker::*;

#[derive(Debug, Deserialize)]
pub struct RequestBody {
    code: String,
    debug: bool
}

#[event(fetch)]
async fn main(mut req: Request, _env: Env, _ctx: Context) -> Result<Response> {
    let cors = Cors::default()
        .with_origins(["*"])
        .with_allowed_headers(["*"]);

    let json = req.json::<RequestBody>().await.unwrap();

    let res = Response::ok(run(json.code, json.debug));

    res?.with_cors(&cors)
}

pub fn run(contents: String, debug: bool) -> String {
    std::io::set_output_capture(Some(Default::default()));

    let tokens = Lexer::new(&contents).tokens();
    if debug {
        println!("{tokens:?}")
    }
    let ast = Parser::new(tokens).ast();
    if debug {
        println!("{ast:?}")
    }
    Interpreter::new().run(ast);

    let captured = std::io::set_output_capture(None);
    let captured = captured.unwrap();
    let captured = Arc::try_unwrap(captured).unwrap();
    let captured = captured.into_inner().unwrap();
    String::from_utf8(captured).unwrap()
}
