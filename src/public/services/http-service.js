export class HttpService {

    ajax(url, method, data, headers = {}) {
        const requestHeaders = new Headers({'content-type': 'application/json', ...headers});
        return fetch(url, {
            method,
            headers: requestHeaders,
            body: JSON.stringify(data)
        }).then((res) => res.json())
            .catch((e) => console.log(e));
    }

}
