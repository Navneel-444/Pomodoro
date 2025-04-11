/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// import seed data files, arrays of objects
const usersData = require('../seed-data/users');
const tasksData = require('../seed-data/tasks');
const sessionsData = require('../seed-data/sessions');

exports.seed = async function (knex) {
  await knex('tasks').del();
  await knex('users').del();
  await knex('sessions').del();
  await knex('users').insert(usersData);
  await knex('tasks').insert(tasksData);
  await knex('sessions').insert(sessionsData);
};