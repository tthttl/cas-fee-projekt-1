export class Router {

    navigateTo(page, id = ""){
        window.location = id ? `#${page}:${id}` : `#${page}`;
    }

    getPage(){
        return this.parseLocation()[0];
    }

    getIdParam(){
        return this.parseLocation()[1];
    }

    parseLocation(){
        return window.location.hash.slice(1).toLowerCase().split(':');
    }

}
