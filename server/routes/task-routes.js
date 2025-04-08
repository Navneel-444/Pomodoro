const router = require('express').Router();
const taskController = require('../controllers/task-controller');

router.route('/:user_id')
    .get(taskController.getAllTasksByUserId)
    .post(taskController.storeTask)

router.route('/:user_id/:task_id')
    .get(taskController.getTaskById)
    // .patch(taskController.modifyTask)
    .delete(taskController.deleteTask)
module.exports = router;