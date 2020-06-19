const FILLED = 'icon--filled';
const SELECTED = 'icon--selected';

export function initImportanceListeners() {
    const icons = document.querySelectorAll('.icon');
    Array.from(icons).forEach((icon, index) => {
        icon.addEventListener('mouseover', fillIcons(index, FILLED));
        icon.addEventListener('click', setImportance(index));
        icon.addEventListener('mouseout', removeFillWhenNotSelected);
    });
}

function fillIcons(index, cssClass) {
    return function () {
        const icons = document.querySelectorAll('.icon');
        Array.from(icons).forEach((icon, iconIndex) => {
            if (iconIndex <= index) {
                icon.classList.add(cssClass);
            } else {
                icon.classList.remove(cssClass);
            }
        });
    }
}

export function setImportance(index, initial = false) {
    return function () {
        const importance = document.getElementById('importance');
        const currentValue = importance.value === '' ? -1 : +importance.value;
        if(currentValue === index && !initial){
            fillIcons(-1, SELECTED)();
            importance.value = -1;
        } else {
            importance.value = index;
            fillIcons(index, SELECTED)();
        }
    }
}

function removeFillWhenNotSelected() {
    const icons = document.querySelectorAll('.icon');
    Array.from(icons).forEach((icon) => {
        if (!icon.classList.contains(SELECTED)) {
            icon.classList.remove(FILLED);
        }
    });
}
