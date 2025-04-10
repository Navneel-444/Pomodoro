const router = require('express').Router();
const taskController = require('../controllers/task-controller');

router.route('/:userId')
    .get(taskController.getAllTasksByUserId)
    .post(taskController.storeTask)

router.route('/:userId/:taskId')
    .get(taskController.getTaskById)
    .patch(taskController.modifyTask)
    .delete(taskController.deleteTask)
module.exports = router;