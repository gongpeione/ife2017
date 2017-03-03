export default class Publisher {
    constructor () {
        this.watchers = [];
    }
    
    add (watcher) {
        this.watchers.push(watcher);
    }

    update () {
        this.watchers.forEach(watcher => {
            watcher.update();
        });
    }
}