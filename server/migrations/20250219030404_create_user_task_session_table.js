/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.string('email').unique().notNullable();
            table.string('oauth_provider').notNullable();
            table.string('oauth_id').notNullable();
            table.string('name').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        }),
        knex.schema.createTable('sessions', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('task_id').unsigned().references('id').inTable('tasks').onDelete('SET NULL');
            table.timestamp('start_time').defaultTo(knex.fn.now());
            table.timestamp('end_time').nullable();
            table.integer('duration').nullable();
            table.enu('status', ['completed', 'interrupted', 'canceled']).defaultTo('completed');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        }),
        knex.schema.createTable('tasks', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.varchar('title').notNullable();
            table.string('description').notNullable();
            table.enu('status', ['pending', 'in-progress', 'completed']).defaultTo('pending');
            table.enu('priority', ['low', 'medium', 'high']).defaultTo('medium');
            table.integer('estimated_time').defaultTo(0);
            table.integer('sessions').defaultTo(0);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        })
    ]);
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('sessions'),
        knex.schema.dropTableIfExists('tasks'),
        knex.schema.dropTableIfExists('users')
    ]);
};