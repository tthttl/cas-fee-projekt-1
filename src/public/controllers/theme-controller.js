export default class ThemeController {
    constructor(storageService) {
        this.storage = storageService;
    }

    initEventListeners() {
        document.querySelector('.theme-selector-btn')
            .addEventListener('click', this.toggleTheme.bind(this));
    }

    setTheme(themeName) {
        this.storage.setItem('theme', themeName);
        document.documentElement.className = themeName;
    }

    toggleTheme() {
        if (this.storage.getItem('theme') === 'theme-modern') {
            this.setTheme('theme-classic');
        } else {
            this.setTheme('theme-modern');
        }
    }

    init() {
        if (this.storage.getItem('theme') === 'theme-modern') {
            this.setTheme('theme-modern');
        } else {
            this.setTheme('theme-classic');
        }
        this.initEventListeners();
    }

    static bootstrap(storageService) {
        new ThemeController(storageService).init();
    }
}
