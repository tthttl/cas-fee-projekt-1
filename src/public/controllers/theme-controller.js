export class ThemeController {

    initEventListeners(){
        document.querySelector('.theme-selector-btn').addEventListener('click', this.toggleTheme.bind(this));
    }

    setTheme(themeName) {
        localStorage.setItem('theme', themeName);
        document.documentElement.className = themeName;
    }

    toggleTheme() {
        if (localStorage.getItem('theme') === 'theme-modern') {
            this.setTheme('theme-classic');
        } else {
            this.setTheme('theme-modern');
        }
    }

    init() {
        if (localStorage.getItem('theme') === 'theme-modern') {
            this.setTheme('theme-modern');
        } else {
            this.setTheme('theme-classic');
        }
        this.initEventListeners();
    };

    static bootstrap() {
        new ThemeController().init();
    }

}
