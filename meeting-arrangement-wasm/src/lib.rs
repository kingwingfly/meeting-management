use chrono::prelude::*;
use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use wasm_bindgen::prelude::*;

fn duration_from_start() -> usize {
    let start = Local.with_ymd_and_hms(2023, 8, 21, 0, 0, 0).unwrap();
    let now = Local::now();
    println!("start {:?}; now {:?}", start, now);
    let duration = now.signed_duration_since(start).num_hours() + 1;
    duration as usize
}

fn date_from_start(date: &str) -> usize {
    let start = Local.with_ymd_and_hms(2023, 8, 21, 0, 0, 0).unwrap();
    let naive_datetime =
        NaiveDateTime::parse_from_str(&date, "%Y-%m-%d %H:%M").expect("Invalid date format");
    let local_datetime: DateTime<Local> = Local
        .from_local_datetime(&naive_datetime)
        .single()
        .expect("Invalid date and time");
    let duration = local_datetime.signed_duration_since(start).num_hours();
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
    let ret: Vec<_> = (duration_from_start..(duration_from_start + 72))
        .filter(|&l| {
            let clock = l % 24;
            8 <= clock && clock <= std::cmp::max(18 - duration, 7)
        })
        .filter(|&l| {
            let r = l + duration;
            !set.iter().any(|&i| l <= i && i < r)
        })
        .collect();
    ret
}

#[derive(Deserialize, Serialize, Default)]
struct CreateData {
    date: String,
    desc: String,
    duration: usize,
    participants: Vec<usize>,
}

#[wasm_bindgen(js_name = "newGenSqlData")]
pub fn new_sql_gen_data() -> JsValue {
    serde_wasm_bindgen::to_value(&CreateData::default()).unwrap()
}

#[wasm_bindgen(js_name = "genSqls")]
pub fn gen_sql(create_data: JsValue) -> JsValue {
    let create_data: CreateData = serde_wasm_bindgen::from_value(create_data).unwrap();
    let duration = date_from_start(&create_data.date);
    let occupied: Vec<usize> = (duration..(duration + create_data.duration)).collect();
    let mut ret = String::new();
    create_data.participants.iter().for_each(|id| {
        let new = format!(
            r#"
INSERT INTO occupied (id, occupied)
VALUES ({id}, ARRAY{occupied:?})
ON CONFLICT (id)
DO UPDATE SET occupied = array_cat(
    occupied.occupied,
    excluded.occupied
);
            "#
        );
        ret.push_str(&new);
    });
    let add_meeting_sql = format!(
        r#"
INSERT INTO meetings (date_time, location, describle, duration, participants)
VALUES ('{}', '{}', '{}', {}, array{:?})
RETURNING meeting_id;
        "#,
        create_data.date,
        "unimplement",
        create_data.desc,
        create_data.duration,
        create_data.participants
    );
    ret.push_str(&add_meeting_sql);
    serde_wasm_bindgen::to_value(&ret).unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test1() {
        let duration = duration_from_start();
        println!("{duration}");
        let date = "2023-08-22 17:28".to_string();
        println!("{}", date_from_start(&date))
    }
}
