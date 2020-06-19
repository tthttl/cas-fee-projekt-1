export default class TaskService {
    constructor(httpService, url) {
        this.httpService = httpService;
        this.url = url;
    }

    findAll() {
        return this.httpService.ajax(this.url, 'GET');
    }

    findById(id) {
        return this.httpService.ajax(`${this.url}/${id}`, 'GET');
    }

    save(task) {
        return this.httpService.ajax(this.url, 'POST', task);
    }

    update(taskToUpdate) {
        return this.httpService.ajax(`${this.url}/${taskToUpdate._id}`, 'PUT', taskToUpdate);
    }
}
