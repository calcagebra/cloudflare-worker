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
async fn main(req: Request, env: Env, _ctx: Context) -> Result<Response> {
    let router = Router::new();

    router
        .post_async("/", |mut req, _env| async move {
            let cors = Cors::default()
                .with_origins(["*"])
                .with_allowed_headers(["*"]);
            let json = req.json::<RequestBody>().await.unwrap();
            let res = Response::ok(run(json.code, json.debug));

            res?.with_cors(&cors)
        })
        .get_async("/globals", |_req, _env| async move {
            let cors = Cors::default()
                .with_origins(["*"])
                .with_allowed_headers(["*"]);
            let globals = Interpreter::new()
                .init_globals()
                .variables
                .iter()
                .map(|(a, b)| format!("{a} {b}\n"))
                .collect::<Vec<_>>()
                .join("");

            let res = Response::ok(globals);

            res?.with_cors(&cors)
        })
        .run(req, env).await
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
