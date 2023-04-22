const sqlite3 = require("sqlite3");
const path = require("path");
const utility = require("./../src/utility_functions");
const path_db = path.join(__dirname, '..', 'db', 'calorie_db.sql')
const db = new sqlite3.Database(path_db);

/**
 Schema of database  is
 CREATE TABLE food_table(food_key integer primary key autoincrement,food_name text, calories integer, date integer);
 */
function input_parsed_food_into_database(food_name, food_calories, food_date) {
    db.run("insert into food_table( food_name,calories,date) " +
        "values ( \'" + food_name.toString() + "\'," + food_calories.toString() + "," + food_date.toString() + ")")
}
module.exports.get_food_one_row = function get_one_row(food_id,reply){
    db.each('select food_key ,food_name,calories,date from food_table where food_key = '
        + food_id.toString(),(err,row)=>
        {
           console.log ("error");
        }
    )

};

module.exports.input_food_into_database =
    function (json_food, page_date) {
        const food_name = json_food.food;
        const food_calories = json_food.calories;
        const food_date = new Date(page_date);
        input_parsed_food_into_database(food_name, food_calories, food_date.getTime());
    };

module.exports.delete_food =
    function (json_food) {
console.log(json_food);
        db.run("DELETE FROM food_table WHERE food_key =" +  json_food.del.toString());
    };


module.exports.get_food_eaten = function (reply) {
    const ts = db.all('select food_key ,food_name,calories,date from food_table', (err, rows) => {
        for(let i = 0;i<rows.length;i++)
        {
            rows[i].date_formatted = utility.format_date(rows[i].date);
        };
        reply.view(".././templates/show_food.ejs",{data:rows});
    });
    console.log(ts);
};