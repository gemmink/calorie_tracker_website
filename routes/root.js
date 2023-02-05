'use strict'
const db = require("../src/db_interface");
const utility = require("../src/utility_functions");

module.exports = async function (fastify, opts) {

    fastify.get('/', function (req, reply) {
            db.get_food_eaten();
            reply.view("/landing_page.ejs", {page_date: utility.get_str_today_date()});
        }
    )

    fastify.get('/enter_food/:date', function (req, reply) {
            reply.view("/schedule_input.ejs", {page_date: req.params.date});
        }
    )
    fastify.post('/enter_food/:date', (req, reply) => {
        db.input_food_into_database(req.body, req.params.date);
        reply.redirect(req.url);
    })

}
