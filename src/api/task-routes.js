const express = require('express'),
    router = express.Router(),
    TaskService = require('../services/task.service');

const taskService = new TaskService();

router.get('/', async (req, res) => {
    try{
        const tasks = await taskService.findAll();
        res.json(tasks);
    } catch (e) {
        res.status(500).json({});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const task = await taskService.findById(req.params.id);
        res.json(task[0]);
    } catch (e) {
        res.status(500).json({});
    }
});

router.post('/', async (req, res) => {
    if(validate(req.body)){
        const task = req.body;
        try{
            const savedTask = await taskService.create(task);
            res.set('location', savedTask._id);
            res.status(201).json({});
        } catch (e) {
            res.status(500).json({});
        }
    } else {
        res.status(400).json({});
    }
});

router.put('/:id', async (req, res) => {
    if(validate(req.body)){
        const task = req.body;
        try{
            await taskService.update(req.params.id, task);
            res.status(200).json({});
        } catch (e) {
            res.status(500).json({});
        }
    } else {
        res.status(400).json({});
    }
});

function validate(task){
    return (task.creationDate && task.deadline && task.title && task.description
        && task.importance !== undefined && task.isFinished !== undefined);
}

module.exports = router;
