#![feature(internal_output_capture)]
mod ast;
mod errors;
mod interpreter;
mod lexer;
mod parser;
mod standardlibrary;
mod token;
mod types;

use std::sync::Arc;

use lexer::Lexer;

use crate::{errors::ErrorReporter, interpreter::Interpreter, parser::Parser};
use serde::Deserialize;

use worker::*;

#[derive(Debug, Deserialize)]
pub struct RequestBody {
	code: String,
	debug: bool,
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

			let (output, graphs) = run(json.code, json.debug);

			let res = Response::ok(format!(
				"OUTPUT:{output}\nGRAPHS:{}",
				graphs
					.iter()
					.map(|f| f
						.iter()
						.map(|n| n.to_string())
						.collect::<Vec<String>>()
						.join(" "))
					.collect::<Vec<String>>()
					.join("NEXT_GRAPH")
			));

			res?.with_cors(&cors)
		})
		.run(req, env)
		.await
}

pub fn run(contents: String, debug: bool) -> (String, Vec<Vec<u8>>) {
	std::io::set_output_capture(Some(Default::default()));

	let tokens = Lexer::new(&contents).tokens();
	if debug {
		println!("{tokens:?}")
	}
	let ast = Parser::new("", tokens, ErrorReporter::new()).ast();
	if debug {
		println!("{ast:?}")
	}
	let graph_buffers = Interpreter::new().interpret(ast).graph_buffers.to_vec();

	let captured = std::io::set_output_capture(None);
	let captured = captured.unwrap();
	let captured = Arc::try_unwrap(captured).unwrap();
	let captured = captured.into_inner().unwrap();
	(String::from_utf8(captured).unwrap(), graph_buffers)
}
