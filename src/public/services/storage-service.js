export default class StorageService {
    constructor(storage) {
        this.storage = storage;
    }

    getItem(key) {
        return this.storage.getItem(key);
    }

    setItem(key, value) {
        this.storage.setItem(key, value);
    }
}
