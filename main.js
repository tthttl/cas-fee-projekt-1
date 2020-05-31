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

function init() {
    const expandAndCollapseIcons = document.querySelectorAll('.icon--btn');
    Array.from(expandAndCollapseIcons).forEach((icon) => {
        icon.addEventListener('click', rotateIcon(icon));
        icon.addEventListener('click', resizeItem);
        icon.addEventListener('click', resizeTextLength);
        shortenText(icon);
    });
    const checkboxes = document.querySelectorAll('.checkbox');
    Array.from(checkboxes).forEach((checkbox) => selectCheckbox(checkbox));
    const iconContainers = document.querySelectorAll('[data-importance]');
    Array.from(iconContainers).forEach((iconContainer) => setImportance(iconContainer));
}

function rotateIcon(iconToRotate) {
    return function () {
        iconToRotate.classList.toggle('icon--upside-down');
    }
}

function resizeItem(event) {
    const item = event.currentTarget.closest('.task-item-grid');
    item.classList.toggle('task-item-grid--opened');
}

function resizeTextLength(event) {
    const descriptionBox = event.currentTarget.closest('.description-box');
    const description = Array.from(descriptionBox.children)
        .find((child) => child.tagName === 'TEXT');
    const dataContent = description.dataset.content;
    toggleTextLength(description, dataContent);
}

function toggleTextLength(description, dataContent) {
    if (description.textContent.length > 110) {
        description.textContent = dataContent.substring(0, 100) + ' (...)';
    } else {
        if (dataContent.length < 300) {
            description.textContent = dataContent;
        } else {
            description.textContent = dataContent.substring(0, 300) + ' (...)';
        }
    }
}

function shortenText(icon) {
    const descriptionBox = icon.closest('.description-box');
    const description = Array.from(descriptionBox.children)
        .find((child) => child.tagName === 'TEXT');
    const dataContent = description.dataset.content;
    if (dataContent.length > 100) {
        description.textContent = dataContent.substring(0, 100) + ' (...)';
    } else {
        description.textContent = dataContent;
    }
}

function selectCheckbox(checkbox) {
    const isFinished = checkbox.dataset.finished.toLowerCase() === 'true';
    if (isFinished) {
        hideIcon(checkbox.children, 'icon--un-checked');
    } else {
        hideIcon(checkbox.children, 'icon--checked');
    }

}

function hideIcon(children, className) {
    Array.from(children)
        .find((child) => child.classList.contains(className))
        .classList.add('icon--invisible');
}

function setImportance(iconContainer) {
    const importance = iconContainer.dataset.importance;
    const documentFragment = document.createDocumentFragment();
    for (let i = importance; i >= 0; i--) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS(null, 'class', 'icon icon--primary');
        svg.setAttributeNS(null, 'viewBox', '0 0 16 16');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttributeNS(null, 'fill-rule', 'evenodd');
        path.setAttributeNS(null, 'd', 'M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z');
        svg.appendChild(path);
        documentFragment.appendChild(svg);
    }
    iconContainer.appendChild(documentFragment);
}

init();

