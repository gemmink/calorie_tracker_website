function date_to_string(obj_date){
    let date = obj_date.getDate();
    let month = obj_date.getMonth() + 1;
    let year = obj_date.getFullYear();
    console.log("yeet");
    return year.toString()+"-" +month.toString()+"-"+date.toString();
};
module.exports.get_str_today_date = function (){
    let time_now = Date.now();
    let obj_date = new Date(time_now);
    return date_to_string(obj_date);
}
module.exports.format_date = function (ts){
    let obj_date = new Date(ts);
    return date_to_string(obj_date);
};
