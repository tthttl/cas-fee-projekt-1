export class HttpService {

    url = '/tasks';

    findAll() {
        return fetch(this.url, {
            method: 'get',
            headers: {'content-type': 'application/json'}
        }).then((res) => {
            return res.json();
        }).catch((error) => console.error(error));
    }

    findById(id){
        return fetch(`${this.url}/${id}`, {
            method: 'get',
            headers: {'content-type': 'application/json'}
        }).then((res) => {
            return res.json();
        }).catch((error) => console.log(error));
    }

}
