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

// Get a specific task by task_id for a specific user
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
        console.error(err);
        return res.status(500).json(
            `Internal server error: Failed to retrieve task with ID ${task_id} for user with ID ${user_id}. Please try again later.`
        );
    }
};

module.exports = {
    getAllTasksByUserId,
    getTaskById
};