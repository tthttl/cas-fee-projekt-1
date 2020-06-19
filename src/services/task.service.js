const Task = require('../models/task');

class TaskService {
    // eslint-disable-next-line class-methods-use-this
    findAll() {
        return Task.find({}).exec();
    }

    // eslint-disable-next-line class-methods-use-this
    findById(id) {
        return Task.find({ _id: id }).exec();
    }

    // eslint-disable-next-line class-methods-use-this
    create(task) {
        return Task.create(task);
    }

    // eslint-disable-next-line class-methods-use-this
    update(id, task) {
        return Task.findByIdAndUpdate(id, task).exec();
    }
}

module.exports = TaskService;
