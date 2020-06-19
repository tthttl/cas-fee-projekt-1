export default class Router {
    // eslint-disable-next-line class-methods-use-this
    navigateTo(page, id = '') {
        window.location = id ? `#${page}:${id}` : `#${page}`;
    }

    getPage() {
        return this.parseLocation()[0];
    }

    getIdParam() {
        return this.parseLocation()[1];
    }

    // eslint-disable-next-line class-methods-use-this
    parseLocation() {
        return window.location.hash.slice(1).toLowerCase().split(':');
    }
}
