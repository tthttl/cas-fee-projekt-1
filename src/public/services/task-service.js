export default class TaskService {

    constructor(httpService, url) {
        this.httpService = httpService;
        this.url = url;
    }

    async findAll() {
        return await this.httpService.ajax(this.url, 'GET');
    }

    async findById(id) {
        return await this.httpService.ajax(`${this.url}/${id}`, 'GET');
    }

    async save(task){
        return await this.httpService.ajax(this.url, 'POST', task);
    }

    async update(taskToUpdate){
        return await this.httpService.ajax(`${this.url}/${taskToUpdate._id}`, 'PUT', taskToUpdate);
    }
}
