import ThemeController from './controllers/theme-controller.js';
import TaskService from './services/task-service.js';
import HttpService from './services/http-service.js';
import Router from './services/router.js';
import TaskListController from './controllers/task-list-controller.js';
import FormController from './controllers/form-controller.js';
import StorageService from './services/storage-service.js';

const taskService = new TaskService(new HttpService(), '/tasks');
const router = new Router();
const storageService = new StorageService(localStorage);

const routes = {
    tasklist: TaskListController,
    form: FormController,
};

document.addEventListener('DOMContentLoaded', () => {
    ThemeController.bootstrap(storageService);
    routes[router.getPage() || 'tasklist'].bootstrap(taskService, router, storageService);
});

window.addEventListener('hashchange', () => {
    routes[router.getPage() || 'tasklist'].bootstrap(taskService, router, storageService);
});
