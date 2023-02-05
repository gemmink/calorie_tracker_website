const sqlite3 = require("sqlite3");
const path = require("path");
const path_db = path.join(__dirname, '..', 'db', 'calorie_db.sql')
const db = new sqlite3.Database(path_db);

/**
Schema of database  is
 CREATE TABLE food_table(food_key integer primary key autoincrement,food_name text, calories integer, date integer);
*/
function input_parsed_food_into_database(food_name,food_calories,food_date)
{
      db.run("insert into food_table( food_name,calories,date) " +
      "values ( \'" +  food_name.toString() + "\',"+ food_calories.toString() + "," + food_date.toString() + ")")
}

module.exports.input_food_into_database =
function (json_food,page_date) {
    const food_name = json_food.food;
    const food_calories = json_food.calories;
    const food_date = new Date(page_date);
    input_parsed_food_into_database(food_name,food_calories,food_date.getTime());
};

module.exports.get_food_eaten = function (){
    const ts = db.all('select food_name,calories,date from food_table',(err,rows)=>{console.log(rows)});
    console.log(ts);
};