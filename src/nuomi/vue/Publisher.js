export default class Publisher {
    constructor () {
        this.subscribers = [];
    }

    add (sub) {
        this.subscribers.push(sub);
    }

    update (path) {
        this.subscribers.forEach(sub => {
            sub.update(path);
        });
    }
}