const knex = require('knex')(require('../knexfile'));

const getAllTasksByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await knex('users').where({ id: userId }).first();
        if (!user) {
            return res.status(404).json(
                `User with ID ${userId} not found. Please check the user ID and try again.`
            );
        } else {
            const tasks = await knex('tasks').where({ userId });
            if (tasks.length === 0) {
                return res.status(404).json(
                    `No tasks found for user with ID ${userId}.`
                );
            } else {
                return res.status(200).json(tasks);
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: true,
            message: `Internal server error: Failed to retrieve tasks for user with ID ${userId}. Please try again later.`
        });
    }
};

const getTaskById = async (req, res) => {
    const { userId, taskId } = req.params;
    try {
        const user = await knex('users').where({ id: userId }).first();
        if (!user) {
            return res.status(404).json(
                `User with ID ${userId} not found. Please check the user ID and try again.`
            );
        } else {
            const task = await knex('tasks').where({ userId, id: taskId }).first();
            if (!task) {
                return res.status(404).json(
                    `Task with ID ${taskId} not found for user with ID ${userId}.`
                );
            } else {
                return res.status(200).json(
                    task
                );
            }
        }
    } catch (err) {
        return res.status(500).json(
            `Internal server error: Failed to retrieve task with ID ${taskId} for user with ID ${userId}. Please try again later.`
        );
    }
};

const storeTask = async (req, res) => {
    const { task } = req.body;
    const { userId } = req.params;
    if (!userId) {
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
        const newTask = { task, userId };
        console.log(newTask)
        await knex('tasks').insert(newTask);
        return res.status(201).json({
            message: 'Task successfully created.'
        });
    } catch (err) {
        return res.status(500).json({
            error: `Internal server error: Failed to post task for user with ID ${userId}.`
        });
    }
};

const modifyTask = async (req, res) => {
    const { userId, taskId } = req.params;
    const updates = req.body;
    try {
        const columns = await knex('tasks').columnInfo();
        const validColumns = Object.keys(columns);
        const invalidColumns = Object.keys(updates).filter(
            (key) => !validColumns.includes(key)
        );
        if (invalidColumns.length > 0) {
            return res.status(400).json({
                error: `Invalid columns in the request: ${invalidColumns.join(', ')}`,
            });
        }
        const modifiedTask = await knex('tasks')
            .update(updates)
            .where({ id: taskId });

        return res.status(200).json({
            message: `Task ${taskId} updated successfully.`,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: `Internal server error: Failed to update task with ID ${taskId}.`,
        });
    }
};


const deleteTask = async (req, res) => {
    const taskID = req.params.taskId;
    try {
        const deletedTask = await knex('tasks')
            .where({ id: taskID })
            .delete();
        if (deletedTask === 0) {
            return res.status(404).json({
                message: `task with ID ${taskID} not found`
            });
        }
        return res.status(200).json({
            message: `Task with ID ${taskID} successfully deleted`
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to delete task',
            error: error.message || error
        });
    }
}
module.exports = {
    getAllTasksByUserId,
    getTaskById,
    storeTask,
    modifyTask,
    deleteTask,
};