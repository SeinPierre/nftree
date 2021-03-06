use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::console;

use std::f64;

#[wasm_bindgen]
pub fn add_two_ints(a: u32, b: u32) -> u32 {
    a + b
}

#[wasm_bindgen]
pub fn fib(n: u32) -> u32 {
if n == 0 || n == 1 {
    return n;
}

fib(n - 1) + fib(n - 2)
}

#[wasm_bindgen]
pub fn tree(c: &str) -> bool {

    console::log_1(&"Hello in tree".into());
    console::log_1(&JsValue::from_str(c));

    let document = web_sys::window().unwrap().document().unwrap();
    let canvas = document.get_element_by_id(c).unwrap();
    let canvas: web_sys::HtmlCanvasElement = canvas
        .dyn_into::<web_sys::HtmlCanvasElement>()
        .map_err(|_| ())
        .unwrap();

    let context = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    context.begin_path();

    // Draw the outer circle.
    context
        .arc(75.0, 75.0, 50.0, 0.0, f64::consts::PI * 2.0)
        .unwrap();

    // Draw the mouth.
    context.move_to(110.0, 75.0);
    context.arc(75.0, 75.0, 35.0, 0.0, f64::consts::PI).unwrap();

    // Draw the left eye.
    context.move_to(65.0, 65.0);
    context
        .arc(60.0, 65.0, 5.0, 0.0, f64::consts::PI * 2.0)
        .unwrap();

    // Draw the right eye.
    context.move_to(95.0, 65.0);
    context
        .arc(90.0, 65.0, 5.0, 0.0, f64::consts::PI * 2.0)
        .unwrap();

    context.stroke();

    console::log_1(&"Hello in tree end".into());

    true
}