use chrono::prelude::*;
use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use wasm_bindgen::prelude::*;

pub fn duration_from_start() -> usize {
    let start = Local.with_ymd_and_hms(2023, 8, 21, 0, 0, 0).unwrap();
    let now = Local::now();
    println!("start {:?}; now {:?}", start, now);
    let duration = now.signed_duration_since(start).num_hours() + 1;
    duration as usize
}

#[derive(Deserialize, Serialize)]
struct OcsImpl {
    ocs: Vec<Vec<usize>>,
}

#[wasm_bindgen(js_name = "newOcs")]
pub fn new_ocs() -> JsValue {
    serde_wasm_bindgen::to_value(&OcsImpl { ocs: vec![vec![]] }).unwrap()
}

#[wasm_bindgen]
pub fn arrange(ocs: JsValue, duration: usize) -> Vec<usize> {
    let ocs_impl: OcsImpl = serde_wasm_bindgen::from_value(ocs).unwrap();
    let duration_from_start = duration_from_start();
    let mut set = HashSet::new();
    for v in ocs_impl.ocs.into_iter() {
        set.extend(v.into_iter().collect::<HashSet<usize>>())
    }
    let ret: Vec<_> = (duration_from_start..=(duration_from_start + 72))
        .filter(|&l| {
            let clock = l % 24;
            8 <= clock && clock <= std::cmp::max(18 - duration, 7)
        })
        .filter(|&l| {
            let r = l + duration;
            !set.iter().any(|&i| l < i && i < r)
        })
        .collect();
    ret
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test1() {
        let duration = duration_from_start();
        println!("{duration}");
    }
}