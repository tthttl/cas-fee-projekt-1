import {initImportanceListeners, setImportance} from "./importance-helpers.js";
import {formatDate, mainDateFormat} from "./task-helper.js";
import {markAsDirty, isImportanceValid} from "./validation-helper.js";

export class FormController {

    constructor(taskService, router) {
        this.template = ` 
    <form class="form-grid">
        <div class="form-grid__row">
            <label for="title">Titel</label>
            <input type="text" 
                class="form-input"
                name="title" 
                id="title" 
                value="{{task.title}}" 
                placeholder="Try to take over the world"
                required
                maxlength="50">
        </div>
        <div class="form-grid__row">
            <label for="description">Beschreibung</label>
            <textarea name="description" 
                id="description" 
                class="form-input"
                rows="10" 
                placeholder="Same thing we do every night..."
                required
                maxlength="500">{{task.description}}</textarea>
        </div>
        <div class="form-grid__row">
            <label for="importance">Wichtigkeit</label>
            <select name="importance" id="importance" class="form-input hidden">
                <option value="0"></option>
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
            </select>
            <div class="icon-container">
                <svg class="icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
                </svg>
                <svg class="icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
                </svg>
                <svg class="icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
                </svg>
                <svg class="icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
                </svg>
                <svg class="icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
                </svg>
            </div>
            <div class="errorMsg">Bitte Wichtigkeit wählen!</div>
        </div>
        <div class="form-grid__row">
            <label for="deadline">Erledigt bis</label>
                <input type="date" 
                class="form-input"
                name="deadline" 
                id="deadline" 
                value="{{formatDate task.deadline 'YYYY-MM-DD'}}"
                required>
        </div>
        <div class="form-grid__column">
            <button class="btn" id="save">Speichern</button>
            <button class="btn btn--small" id="cancel" type="reset">Cancel</button>
        </div>
    </form>`;

        this.container = document.querySelector('.template-root');
        this.taskService = taskService;
        this.router = router;
        this.id = this.router.getIdParam();
    }

    initEventListeners() {
        initImportanceListeners();
        const form = document.querySelector('.form-grid');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            if(form.checkValidity() && isImportanceValid()){
                const title = document.getElementById('title').value;
                const description = document.getElementById('description').value;
                const importance = document.getElementById('importance').value;
                const deadline = formatDate(document.getElementById('deadline').value, 'YYYY-MM-DD', mainDateFormat);
                try {
                    if (this.id) {
                        const updatedTask = {...this.task, title, description, importance, deadline};
                        await this.taskService.update(updatedTask);
                    } else {
                        const taskToSave = {
                            deadline,
                            creationDate: moment().format(mainDateFormat),
                            isFinished: false,
                            title,
                            importance,
                            description
                        }
                        await this.taskService.save(taskToSave);
                    }
                    this.router.navigateTo('tasklist');
                } catch (e) {
                    alert(e);
                }
            } else {
                form.reportValidity();
            }
        });
        const cancelButton = document.getElementById('cancel');
        cancelButton.addEventListener('click', () => {
            this.router.navigateTo('tasklist');
        });

        Array.from(document.querySelectorAll('.form-input'))
            .forEach((input) => {
                input.addEventListener('blur', markAsDirty);
                input.addEventListener('valid', markAsDirty);
                input.addEventListener('invalid', markAsDirty);
            });
    }

    renderComponent() {
        this.container.innerHTML = Handlebars.compile(this.template)({
            task: this.task
        });
        const createButton = document.querySelector('.new-task-btn');
        createButton.classList.add('hidden');
        if (this.task) {
            setImportance(this.task.importance, true)();
        } else {
            document.getElementById('importance').value = '';
        }
        this.initEventListeners();
    }

    async init() {
        if (this.id) {
            this.task = await this.taskService.findById(this.id);
        }
        this.renderComponent()
    }

    static async bootstrap(taskService, router) {
        await new FormController(taskService, router).init();
    }
}
