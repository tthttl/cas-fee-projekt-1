export function markAsDirty(event) {
    const { currentTarget } = event;
    currentTarget.classList.add('dirty');
}

export function isImportanceValid() {
    if (document.getElementById('importance').value === '') {
        document.querySelector('.errorMsg').classList.add('show');
        return false;
    }
    document.querySelector('.errorMsg').classList.remove('show');
    return true;
}
