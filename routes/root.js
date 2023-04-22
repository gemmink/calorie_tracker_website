'use strict'
const db = require("../src/db_interface");
const utility = require("../src/utility_functions");

module.exports = async function (fastify, opts) {
    //this is the landing page, I
    fastify.get('/', function (req, reply) {
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
    fastify.get('/view_food', (req, reply) => {
        db.get_food_eaten(reply);
    })
    fastify.post('/view_food', (req, reply) => {
        db.delete_food(req.body);
        reply.redirect(req.url);
    })
    fastify.get('/update_food', (req, reply) => {
        reply.view("/update_food.ejs");
    })
    fastify.get('/update_food/:id', (req, reply) => {
        db.get_food_one_row(req.params.id);
       //reply.view("/update_food.ejs");
    })
    fastify.post('/update_food', (req, reply) => {
        reply.redirect('/')
    })
    fastify.get('/view_food/:date', (req, reply) => {
        db.get_food_eaten(reply);
    })

}
