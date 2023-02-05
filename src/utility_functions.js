module.exports.get_str_today_date = function (){
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    return year.toString()+"-" +month.toString()+"-"+date.toString();
}
