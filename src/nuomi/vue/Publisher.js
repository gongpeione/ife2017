export default class Publisher {
    constructor () {
        this.subscribers = [];
    }

    add (sub) {
        this.subscribers.push(sub);
    }

    update () {
        this.subscribers.forEach(sub => {
            sub.update();
        });
    }
}