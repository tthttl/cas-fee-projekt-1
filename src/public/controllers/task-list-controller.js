import {
    resizeItem,
    resizeTextLength,
    rotateIcon,
    setImportance,
    shortenText,
    initSortingLogic,
    sortTasksBy,
    sortingLogic,
} from './task-helper.js';

export default class TaskListController {
    saveSortingLogic(selectedSortingLogic) {
        this.storage.setItem('sortingLogic', selectedSortingLogic);
    }

    getSortingLogic() {
        return this.storage.getItem('sortingLogic');
    }

    saveIsFinishedVisible(isFinishedVisible) {
        this.storage.setItem('isFinishedVisible', isFinishedVisible);
    }

    getIsFinishedVisible() {
        const stringValue = this.storage.getItem('isFinishedVisible');
        switch (stringValue) {
        case 'false':
            return false;
        default:
            return true;
        }
    }

    constructor(taskService, router, storageService) {
        this.template = `
    <div class="container">
        <ul class="filter-grid">
            <li>
                <input class="radio-sort" type="radio" name="sorting" id="deadline" value="deadline" checked>
                <label class="btn btn--tall label-sort" for="deadline" data-sortby="deadline">By finished Date</label>
            </li>
            <li>
                <input class="radio-sort" type="radio" name="sorting" id="creation-date" value="creation-date">
                <label class="btn btn--tall label-sort" for="creation-date" data-sortby="creation-date">By created Date</label>
            </li>
            <li>
                <input class="radio-sort" type="radio" name="sorting" id="importance" value="importance">
                <label class="btn btn--tall label-sort" for="importance" data-sortby="importance">By Importance</label>
            </li>
            <li>
                <button class="btn btn--tall">{{#if isFinishedVisible}} Hide finished {{else}} Show finished {{/if}}</button>
            </li>
        </ul>
    </div>
    <div class="container task-box">
        {{#if tasks}}
            {{#each tasks}}
                <div class="task-item-grid">
                    <div class="deadline">
                        <text>{{this.deadline}}</text>
                    </div>
                    <div class="checkbox" data-id="{{this._id}}">
                        {{#if this.isFinished}}
                        <svg class="icon icon--primary icon--checked" viewBox="0 0 16 16"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path fill-rule="evenodd"
                                  d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                        </svg>
                        <div class="checkbox-text">Finished</div>
                        {{else}}
                        <svg class="icon icon--primary icon--un-checked" viewBox="0 0 16 16"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M11 2H5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5z"/>
                        </svg>
                        <div class="checkbox-text">Open</div>
                        {{/if}}
                    </div>
                    <div class="title-box">
                        <text class="title">{{this.title}}</text>
                        <div class="icon-container" data-importance="{{this.importance}}"></div>
                    </div>
                    <div class="description-box">
                        <text class="description" data-content="{{this.description}}"></text>
                        <div class="expand-btn-container">
                            <svg class="icon icon--btn" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 5a.5.5 0 0 0-1 0v4.793L5.354 7.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 9.793V5z"/>
                            </svg>
                        </div>
                    </div>
                    <button class="btn btn--large" data-id="{{this._id}}">Edit</button>
                </div>
            {{/each}}
         {{else}}
              <img class="image-responsive" src="../assets/images/To-do-list.jpg" alt="nothing">
         {{/if}}
    </div>`;

        this.storage = storageService;
        this.taskService = taskService;
        this.router = router;
        this.container = document.querySelector('.template-root');
        this.sortingLogic = this.getSortingLogic() || sortingLogic.deadline;
        this.isFinishedVisible = this.getIsFinishedVisible();
        this.tasks = [];
        this.visbleTasks = [];
    }

    initEventListeners() {
        const expandAndCollapseIcons = document.querySelectorAll('.icon--btn');
        Array.from(expandAndCollapseIcons)
            .forEach((icon) => {
                icon.addEventListener('click', rotateIcon(icon));
                icon.addEventListener('click', resizeItem);
                icon.addEventListener('click', resizeTextLength);
                shortenText(icon);
            });
        const checkboxes = document.querySelectorAll('.checkbox');
        Array.from(checkboxes)
            .forEach((checkbox) => {
                checkbox.addEventListener('click', (event) => {
                    const { id } = event.currentTarget.dataset;
                    const selectedTask = this.tasks.find((task) => task._id === id);
                    selectedTask.isFinished = !selectedTask.isFinished;
                    this.taskService.update(selectedTask);
                    this.renderComponent();
                });
            });
        const iconContainers = document.querySelectorAll('[data-importance]');
        Array.from(iconContainers)
            .forEach((iconContainer) => setImportance(iconContainer));
        const sortingRadioButtons = document.querySelectorAll('.radio-sort');
        Array.from(sortingRadioButtons)
            .forEach((btn) => {
                initSortingLogic(btn, this.sortingLogic);
            });
        const sortingLabels = document.querySelectorAll('.label-sort');
        Array.from(sortingLabels)
            .forEach((label) => label.addEventListener('click', (event) => {
                this.sortingLogic = event.currentTarget.dataset && event.currentTarget.dataset.sortby;
                this.saveSortingLogic(this.sortingLogic);
                this.renderComponent();
            }));
        const finishedFilter = document.querySelector('.filter-grid button');
        finishedFilter.addEventListener('click', () => {
            this.isFinishedVisible = !this.isFinishedVisible;
            this.saveIsFinishedVisible(this.isFinishedVisible);
            this.renderComponent();
        });
        const editButtons = document.querySelectorAll('.btn--large');
        Array.from(editButtons)
            .forEach((btn) => btn.addEventListener('click',
                () => this.router.navigateTo('form', btn.dataset.id)));
        const createButton = document.querySelector('.new-task-btn');
        createButton.addEventListener('click', () => this.router.navigateTo('form'));
    }

    renderComponent() {
        this.tasks = this.tasks.sort((a, b) => sortTasksBy(a, b, this.sortingLogic));
        if (!this.isFinishedVisible) {
            this.visbleTasks = this.tasks.filter((task) => !task.isFinished);
        } else {
            this.visbleTasks = this.tasks;
        }
        document.querySelector('.new-task-btn')
            .classList
            .remove('hidden');
        this.container.innerHTML = Handlebars.compile(this.template)({
            tasks: this.visbleTasks,
            sortingLogic: this.sortingLogic,
            isFinishedVisible: this.isFinishedVisible,
        });
        this.initEventListeners();
    }

    async init() {
        this.tasks = await this.taskService.findAll();
        this.renderComponent();
    }

    static async bootstrap(taskService, router, storageService) {
        await new TaskListController(taskService, router, storageService).init();
    }
}
