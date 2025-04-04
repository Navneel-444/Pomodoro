const router = require('express').Router();
const taskController = require('../controllers/task-controller');

router.route('/:user_id')
    .get(taskController.getAllTasksByUserId)
    .post(taskController.storeTask)

// Route to get a task by its ID (if needed)
router.route('/:user_id/:task_id')
    .get(taskController.getTaskById);

module.exports = router;