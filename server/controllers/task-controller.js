const knex = require('knex')(require('../knexfile'));

const getAllTasksByUserId = async (req, res) => {
    const { user_id } = req.params;
    try {
        const user = await knex('users').where({ id: user_id }).first();
        if (!user) {
            return res.status(404).json(
                `User with ID ${user_id} not found. Please check the user ID and try again.`
            );
        } else {
            const tasks = await knex('tasks').where({ user_id });
            if (tasks.length === 0) {
                return res.status(404).json(
                    `No tasks found for user with ID ${user_id}.`
                );
            } else {
                return res.status(200).json(tasks);
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: true,
            message: `Internal server error: Failed to retrieve tasks for user with ID ${user_id}. Please try again later.`
        });
    }
};

const getTaskById = async (req, res) => {
    const { user_id, task_id } = req.params;
    try {
        const user = await knex('users').where({ id: user_id }).first();
        if (!user) {
            return res.status(404).json(
                `User with ID ${user_id} not found. Please check the user ID and try again.`
            );
        } else {
            const task = await knex('tasks').where({ user_id, id: task_id }).first();
            if (!task) {
                return res.status(404).json(
                    `Task with ID ${task_id} not found for user with ID ${user_id}.`
                );
            } else {
                return res.status(200).json(
                    task
                );
            }
        }
    } catch (err) {
        return res.status(500).json(
            `Internal server error: Failed to retrieve task with ID ${task_id} for user with ID ${user_id}. Please try again later.`
        );
    }
};

const storeTask = async (req, res) => {
    const { task } = req.body;
    const { user_id } = req.params;
    if (!user_id) {
        return res.status(400).json({
            error: 'Missing user ID in request parameters.'
        });
    }
    if (!task || !task.title) {
        return res.status(400).json({
            error: 'Task is missing or incomplete. Please provide a valid task with a title.'
        });
    }
    try {
        const newTask = { ...task, user_id };
        await knex('tasks').insert(newTask);
        return res.status(201).json({
            message: 'Task successfully created.'
        });
    } catch (err) {
        return res.status(500).json({
            error: `Internal server error: Failed to post task for user with ID ${user_id}.`
        });
    }
};

module.exports = {
    getAllTasksByUserId,
    getTaskById,
    storeTask
};