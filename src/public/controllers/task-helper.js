export const mainDateFormat = 'DD-MM-YYYY';

export const sortingLogic = {
    deadline: 'deadline',
    creationDate: 'creation-date',
    importance: 'importance'
}

export function rotateIcon(iconToRotate) {
    return function () {
        iconToRotate.classList.toggle('icon--upside-down');
    }
}

export function resizeItem(event) {
    const item = event.currentTarget.closest('.task-item-grid');
    item.classList.toggle('task-item-grid--opened');
}

export function resizeTextLength(event) {
    const descriptionBox = event.currentTarget.closest('.description-box');
    const description = Array.from(descriptionBox.children)
        .find((child) => child.tagName === 'TEXT');
    const dataContent = description.dataset.content;
    toggleTextLength(description, dataContent);
}

export function toggleTextLength(description, dataContent) {
    if (description.textContent.length > 110) {
        description.textContent = dataContent.substring(0, 100) + '...';
    } else {
        if (dataContent.length < 300) {
            description.textContent = dataContent;
        } else {
            description.textContent = dataContent.substring(0, 300) + '...';
        }
    }
}

export function shortenText(icon) {
    const descriptionBox = icon.closest('.description-box');
    const description = Array.from(descriptionBox.children)
        .find((child) => child.tagName === 'TEXT');
    const dataContent = description.dataset.content;
    if (dataContent.length > 100) {
        description.textContent = dataContent.substring(0, 100) + '...';
    } else {
        description.textContent = dataContent;
    }
}

export function setImportance(iconContainer) {
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

export function initSortingLogic(btn, sortingLogic) {
    if (btn.value === sortingLogic) {
        btn.setAttribute('checked', 'true');
    } else {
        btn.removeAttribute('checked');
    }
}

export function sortTasksBy(a, b, sortBy) {
    switch (sortBy) {
        case sortingLogic.deadline:
            return moment(a.deadline, mainDateFormat).valueOf() - moment(b.deadline, mainDateFormat).valueOf();
        case sortingLogic.creationDate:
            return moment(a.creationDate, mainDateFormat).valueOf() - moment(b.creationDate, mainDateFormat).valueOf();
        case sortingLogic.importance:
            return b.importance - a.importance;
        default:
            return moment(a.deadline, mainDateFormat).valueOf() - moment(b.deadline, mainDateFormat).valueOf();
    }
}

export function formatDate(dateString, dateFormat, resultFormat) {
    return moment(dateString, dateFormat).format(resultFormat);
}

Handlebars.registerHelper('formatDate',
    (dateString, resultFormat) => {
        if (dateString) {
            return moment(dateString, mainDateFormat).format(resultFormat);
        } else {
            return moment().format(resultFormat);
        }
    });
