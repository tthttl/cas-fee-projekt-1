export default class HttpService {
    // eslint-disable-next-line class-methods-use-this
    ajax(url, method, data, headers = {}) {
        const requestHeaders = new Headers({ 'content-type': 'application/json', ...headers });
        return fetch(url, {
            method,
            headers: requestHeaders,
            body: JSON.stringify(data),
        }).then((res) => res.json());
    }
}
