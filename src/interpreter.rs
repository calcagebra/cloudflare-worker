use std::{
	collections::HashMap,
	f32::consts::{E, PI},
	ops::Rem,
};

use crate::{
	ast::{AstNode, Expression},
	standardlibrary::{
		complex_call, is_complex_standard_function, is_simple_standard_function, simple_call,
	},
	token::Token,
	types::{Number, NumberType},
};

#[derive(Debug, Clone)]
pub struct Interpreter {
	pub globals: HashMap<String, Number>,
	pub functions: HashMap<String, Function>,
	pub graph_buffers: Vec<Vec<u8>>,
}

impl Interpreter {
	pub fn new() -> Self {
		Self {
			globals: HashMap::new(),
			functions: HashMap::new(),
			graph_buffers: vec![]
		}
	}

	pub fn setup(&mut self) {
		let globals = vec![
			("i", Number::Complex(0.0, 1.0)),
			("pi", Number::Real(PI)),
			("π", Number::Real(PI)),
			("e", Number::Real(E)),
		];

		for (global, data) in globals {
			self.globals.insert(String::from(global), data);
		}
	}

	pub fn interpret(&mut self, ast: Vec<AstNode>) -> &Self {
		self.setup();

		for node in ast {
			self.interpret_node(node);
		}

		self
	}

	pub fn interpret_node(&mut self, node: AstNode) {
		match node {
			AstNode::Assignment((name, numbertype), expr) => {
				let number = self.interpret_expression(&expr);

				if numbertype.is_some() && number.r#type() != numbertype.unwrap() {
					// TODO: proper errors
					panic!(
						"type mismatch found {} expected {}",
						number,
						numbertype.unwrap()
					)
				}

				self.globals.insert(name, number);
			}
			AstNode::FunctionCall(name, exprs) => {
				// A simple standard function is a term used to define a function which
				// takes only Number as arguments opposed to say function name
				if is_simple_standard_function(&name) {
					let mut args = vec![];

					for expr in exprs {
						args.push(self.interpret_expression(&expr))
					}

					simple_call(&name, args);
				}
				// A complex function is one which may take any combination of argument and types
				// currently only graph is a complex function
				else if is_complex_standard_function(&name) {
					let graph_buffer = complex_call(&name, exprs, self);

					self.graph_buffers.push(graph_buffer);
				} else if self.functions.contains_key(&name) {
					let f: Function = self.functions.get(&name).unwrap().clone();
					let globals = self.globals.clone();

					for (i, (arg, numbertype)) in f.params.iter().enumerate() {
						let r = self.interpret_expression(&exprs[i]);

						if r.r#type() != *numbertype {
							// TODO: error handling
							panic!("type mismatch")
						}

						self.globals.insert(arg.to_string(), r);
					}

					self.interpret_expression(&f.code);

					self.globals = globals;
				}
			}
			AstNode::FunctionDeclaration(name, items, number_type, expr) => {
				self
					.functions
					.insert(name, Function::new(items, number_type, expr));
			}
		}
	}

	pub fn interpret_expression(&mut self, expr: &Expression) -> Number {
		match expr {
			Expression::Abs(expression) => {
				let number = self.interpret_expression(expression);

				let numbertype = number.r#type();

				match numbertype {
					NumberType::Int => Number::Int(number.int().abs()),
					NumberType::Real => Number::Real(number.real().abs()),
					NumberType::Complex => {
						Number::Real(number.array().iter().map(|f| f * f).sum::<f32>().sqrt())
					}
					_ => todo!(),
				}
			}
			Expression::Binary(lhs, token, rhs) => {
				let lhd = self.interpret_expression(lhs);

				let rhd = self.interpret_expression(rhs);

				fn solve(lhd: &Number, rhd: &Number, token: &Token) -> Number {
					match token {
						Token::Add => match (lhd, rhd) {
							(Number::Int(a), Number::Int(b)) => return Number::Int(a + b),
							(Number::Int(a), Number::Real(b)) | (Number::Real(b), Number::Int(a)) => {
								return Number::Real(*a as f32 + b);
							}
							(Number::Real(a), Number::Real(b)) => return Number::Real(a + b),
							(Number::Int(n), Number::Complex(a, b)) | (Number::Complex(a, b), Number::Int(n)) => {
								Number::Complex(a + (*n as f32), *b)
							}
							(Number::Real(n), Number::Complex(a, b))
							| (Number::Complex(a, b), Number::Real(n)) => Number::Complex(a + n, *b),
							(Number::Complex(a, b), Number::Complex(c, d)) => Number::Complex(a + c, b + d),
							(Number::Matrix(a), Number::Matrix(b)) => {
								if a.len() != b.len() {
									panic!("matrix rows are not same, required for addition")
								}

								let mut r = vec![];

								let mut col = vec![];

								for (i, numbers) in a.iter().enumerate() {
									for (j, number) in numbers.iter().enumerate() {
										col.push(solve(&number.clone(), &b[i][j].clone(), &Token::Add));
									}
									r.push(col.clone());
									col.clear();
								}

								Number::Matrix(r)
							}
							_ => todo!(),
						},
						Token::Sub => match (lhd, rhd) {
							(Number::Int(a), Number::Int(b)) => return Number::Int(a - b),
							(Number::Int(a), Number::Real(b)) => {
								return Number::Real(*a as f32 - b);
							}
							(Number::Real(b), Number::Int(a)) => {
								return Number::Real(b - *a as f32);
							}
							(Number::Real(a), Number::Real(b)) => return Number::Real(a - b),
							(Number::Int(n), Number::Complex(a, b)) => Number::Complex(-a + (*n as f32), -b),
							(Number::Complex(a, b), Number::Int(n)) => Number::Complex(a - (*n as f32), *b),
							(Number::Real(n), Number::Complex(a, b)) => Number::Complex(-a + n, -b),
							(Number::Complex(a, b), Number::Real(n)) => Number::Complex(a - n, *b),
							(Number::Complex(a, b), Number::Complex(c, d)) => Number::Complex(a - c, b - d),
							(Number::Matrix(a), Number::Matrix(b)) => {
								if a.len() != b.len() {
									panic!("matrix rows are not same, required for addition")
								}

								let mut r = vec![];

								let mut col = vec![];

								for (i, numbers) in a.iter().enumerate() {
									for (j, number) in numbers.iter().enumerate() {
										col.push(solve(number, &b[i][j], &Token::Sub));
									}
									r.push(col.clone());
									col.clear();
								}

								Number::Matrix(r)
							}
							_ => todo!(),
						},
						Token::Mul => match (lhd, rhd) {
							(Number::Int(a), Number::Int(b)) => return Number::Int(a * b),
							(Number::Int(a), Number::Real(b)) | (Number::Real(b), Number::Int(a)) => {
								return Number::Real(*a as f32 * b);
							}
							(Number::Real(a), Number::Real(b)) => return Number::Real(a * b),
							(Number::Int(n), Number::Complex(a, b)) | (Number::Complex(a, b), Number::Int(n)) => {
								Number::Complex(a * (*n as f32), b * (*n as f32))
							}
							(Number::Real(n), Number::Complex(a, b))
							| (Number::Complex(a, b), Number::Real(n)) => Number::Complex(a * n, b * n),
							(Number::Complex(a, b), Number::Complex(c, d)) => {
								Number::Complex(a * c - b * d, a * d + b * c)
							}
							(Number::Matrix(a), Number::Matrix(b)) => {
								// TODO: Check if matrices can be multipled

								let mut r = vec![];

								let mut col = vec![];

								for row in a {
									let mut c = 0;
									while b[0].len() != c {
										let mut sum = Number::Real(0.0);

										for (k, number) in row.iter().enumerate() {
											sum = solve(&sum, &solve(number, &b[k][c], &Token::Mul), &Token::Add);
										}

										col.push(sum);
										c += 1;
									}
									r.push(col.clone());
									col.clear();
								}

								Number::Matrix(r)
							}
							_ => todo!(),
						},
						Token::Div => match (lhd, rhd) {
							(Number::Int(a), Number::Int(b)) => return Number::Int(a / b),
							(Number::Int(a), Number::Real(b)) => {
								return Number::Real(*a as f32 / b);
							}
							(Number::Real(b), Number::Int(a)) => {
								return Number::Real(b / *a as f32);
							}
							(Number::Real(a), Number::Real(b)) => return Number::Real(a / b),
							(Number::Int(n), Number::Complex(a, b)) => Number::Complex(
								(*n as f32) * a / (a * a + b * b),
								-(*n as f32) * b / (a * a + b * b),
							),
							(Number::Complex(a, b), Number::Int(n)) => {
								Number::Complex(a / (*n as f32), b / (*n as f32))
							}
							(Number::Real(n), Number::Complex(a, b)) => {
								Number::Complex(n * a / (a * a + b * b), -n * b / (a * a + b * b))
							}
							(Number::Complex(a, b), Number::Real(n)) => Number::Complex(a / n, b / n),
							(Number::Complex(a, b), Number::Complex(c, d)) => Number::Complex(
								(a * c + b * d) / (c * c + d * d),
								(b * c - a * d) / (c * c + d * d),
							),
							_ => todo!(),
						},
						Token::Pow => {
							match (lhd, rhd) {
								(Number::Int(a), Number::Int(b)) => {
									// TODO: Handle negative errors
									return Number::Int(a.pow((*b).try_into().unwrap()));
								}
								(Number::Int(a), Number::Real(b)) => {
									return Number::Real((*a as f32).powf(*b));
								}
								(Number::Real(a), Number::Int(b)) => {
									return Number::Real(a.powf(*b as f32));
								}
								(Number::Real(a), Number::Real(b)) => {
									return Number::Real(a.powf(*b));
								}
								(Number::Complex(a, b), Number::Int(n)) => {
									let modulus = (a * a + b * b).sqrt();

									let argument = (b / a).atan();

									return Number::Complex(
										modulus.powf(*n as f32) * (*n as f32 * argument).cos(),
										modulus.powf(*n as f32) * (*n as f32 * argument).sin(),
									);
								}
								_ => unimplemented!(),
							}
						}
						Token::Rem => match (lhd, rhd) {
							(Number::Int(a), Number::Int(b)) => return Number::Int(a.rem(b)),
							(Number::Int(a), Number::Real(b)) => {
								return Number::Real((*a as f32).rem(b));
							}
							(Number::Real(a), Number::Int(b)) => {
								return Number::Real((a).rem(*b as f32));
							}
							(Number::Real(a), Number::Real(b)) => {
								return Number::Real(a.rem(b));
							}
							_ => unimplemented!(),
						},
						Token::IsEq => match (lhd, rhd) {
							(Number::Int(a), Number::Int(b)) => {
								return Number::Int((a == b) as i32);
							}
							(Number::Real(a), Number::Real(b)) => {
								return Number::Int((a == b) as i32);
							}
							(Number::Complex(a, b), Number::Complex(c, d)) => {
								return Number::Int((a == c && b == d) as i32);
							}
							(Number::Matrix(a), Number::Matrix(b)) => {
								return Number::Int((a == b) as i32);
							}
							_ => unimplemented!(),
						},
						Token::NEq => match (lhd, rhd) {
							(Number::Int(a), Number::Int(b)) => {
								return Number::Int((a != b) as i32);
							}
							(Number::Real(a), Number::Real(b)) => {
								return Number::Int((a != b) as i32);
							}
							(Number::Complex(a, b), Number::Complex(c, d)) => {
								return Number::Int((a != c && b != d) as i32);
							}
							(Number::Matrix(a), Number::Matrix(b)) => {
								return Number::Int((a != b) as i32);
							}
							_ => unimplemented!(),
						},
						Token::Gt => match (lhd, rhd) {
							(Number::Int(a), Number::Int(b)) => {
								return Number::Int((a > b) as i32);
							}
							(Number::Real(a), Number::Real(b)) => {
								return Number::Int((a > b) as i32);
							}
							_ => unimplemented!(),
						},
						Token::GtEq => match (lhd, rhd) {
							(Number::Int(a), Number::Int(b)) => {
								return Number::Int((a >= b) as i32);
							}
							(Number::Real(a), Number::Real(b)) => {
								return Number::Int((a >= b) as i32);
							}
							_ => unimplemented!(),
						},
						Token::Lt => match (lhd, rhd) {
							(Number::Int(a), Number::Int(b)) => {
								return Number::Int((a < b) as i32);
							}
							(Number::Real(a), Number::Real(b)) => {
								return Number::Int((a < b) as i32);
							}
							_ => unimplemented!(),
						},
						Token::LtEq => match (lhd, rhd) {
							(Number::Int(a), Number::Int(b)) => {
								return Number::Int((a <= b) as i32);
							}
							(Number::Real(a), Number::Real(b)) => {
								return Number::Int((a <= b) as i32);
							}
							_ => unimplemented!(),
						},
						_ => unreachable!(),
					}
				}

				solve(&lhd, &rhd, token)
			}
			Expression::Branched(condition, then, otherwise) => {
				let condition = self.interpret_expression(condition).real();

				if condition != 0.0 {
					self.interpret_expression(then)
				} else {
					self.interpret_expression(otherwise)
				}
			}
			Expression::Identifier(name) => {
				// TODO: Error handling for when name does not
				self.globals.get(name).unwrap().clone()
			}
			Expression::Real(f) => Number::Real(*f),
			Expression::Integer(i) => Number::Int(*i),
			Expression::Matrix(matrix) => Number::Matrix(
				matrix
					.iter()
					.map(|f| {
						f.iter()
							.map(|g| self.interpret_expression(g))
							.collect::<Vec<Number>>()
					})
					.collect::<Vec<Vec<Number>>>(),
			),
			Expression::FunctionCall(name, exprs) => {
				// A simple standard function is a term used to define a function which
				// takes only Number as arguments opposed to say function name
				if is_simple_standard_function(&name) {
					let mut args = vec![];

					for expr in exprs {
						args.push(self.interpret_expression(&expr))
					}

					return simple_call(&name, args);
				}
				// A complex function is one which may take any combination of argument and types
				// currently only graph is a complex function
				else if is_complex_standard_function(&name) {
					let graph_buffer = complex_call(&name, exprs.to_vec(), self);
					
					self.graph_buffers.push(graph_buffer);
				} else if self.functions.contains_key(name) {
					let f = self.functions.get(name).unwrap().clone();
					let globals = self.globals.clone();

					for (i, (arg, numbertype)) in f.params.iter().enumerate() {
						let r = self.interpret_expression(&exprs[i]);

						if r.r#type() != *numbertype {
							// TODO: error handling
							panic!("type mismatch")
						}

						self.globals.insert(arg.to_string(), r);
					}

					let r = self.interpret_expression(&f.code);

					self.globals = globals;

					if r.r#type() != f.return_type {
						panic!("return type and expression type are not the same")
					}

					return r;
				}

				unreachable!()
			}
		}
	}
}

#[derive(Debug, Clone)]
pub struct Function {
	pub params: Vec<(String, NumberType)>,
	pub return_type: NumberType,
	pub code: Expression,
}

impl Function {
	pub fn new(params: Vec<(String, NumberType)>, return_type: NumberType, code: Expression) -> Self {
		Self {
			params,
			return_type,
			code,
		}
	}
}