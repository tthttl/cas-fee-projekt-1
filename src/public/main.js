import ThemeController from './controllers/theme-controller.js';
import TaskService from './services/task-service.js';
import HttpService from './services/http-service.js';
import Router from './services/router.js';
import TaskListController from './controllers/task-list-controller.js';
import FormController from './controllers/form-controller.js';

const taskService = new TaskService(new HttpService(), '/tasks');
const router = new Router();

const routes = {
    tasklist: TaskListController,
    form: FormController,
};

document.addEventListener('DOMContentLoaded', () => {
    ThemeController.bootstrap();
    routes[router.getPage() || 'tasklist'].bootstrap(taskService, router);
});

window.addEventListener('hashchange', () => {
    routes[router.getPage() || 'tasklist'].bootstrap(taskService, router);
});
