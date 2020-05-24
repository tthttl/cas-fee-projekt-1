const FILLED = 'icon--filled';
const SELECTED = 'icon--selected';

function initPriorityListeners() {
    const icons = document.querySelectorAll('.icon');
    Array.from(icons).forEach((icon, index) => {
        icon.addEventListener('mouseover', fillIcons(index, FILLED));
        icon.addEventListener('click', setPriority(index));
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

function setPriority(index) {
    return function () {
        const priority = document.getElementById('priority');
        if(+priority.value === index){
            fillIcons(-1, SELECTED)();
            priority.value = '';
        } else {
            priority.value = index;
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

initPriorityListeners();
