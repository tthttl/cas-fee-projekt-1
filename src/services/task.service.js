const Task = require('../models/task');

class TaskService {

    findAll() {
        return Task.find({}).exec();
    }

    findById(id) {
        return Task.find({_id: id}).exec();
    }

    create(task){
        return Task.create(task);
    }

    update(id, task){
        return Task.findByIdAndUpdate(id, task).exec();
    }

}

module.exports = TaskService;
