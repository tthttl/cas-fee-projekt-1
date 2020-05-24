// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-modern') {
        setTheme('theme-classic');
    } else {
        setTheme('theme-modern');
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-modern') {
        setTheme('theme-modern');
    } else {
        setTheme('theme-classic');
    }
})();

