const express = require('express'),
    router = express.Router(),
    TaskService = require('../services/task.service');

const taskService = new TaskService();

router.get('/', async (req, res) => {
    try{
        const tasks = await taskService.findAll();
        res.json(tasks);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const task = await taskService.findById(req.params.id);
        res.json(task[0]);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    if(validate(req.body)){
        const task = req.body;
        try{
            await taskService.create(task);
            res.sendStatus(201);
        } catch (e) {
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(400);
    }
});

router.put('/:id', async (req, res) => {
    if(validate(req.body)){
        const task = req.body;
        try{
            await taskService.update(req.params.id, task);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(400);
    }
});

function validate(task){
    return (task.creationDate && task.deadline && task.title && task.description && task.importance);
}

module.exports = router;
