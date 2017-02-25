
// TODO dynamic parame
export default class Router {

    constructor (routes = []) {
        
        this._hash = '';
        this.from = {
            path: '',
            fullPath: location.href
        };
        this.to = {
            path: '',
            fullPath: location.href
        };
        this.history = [];
        this.historyAnchor = -1;

        this.beforeEachFuncs = null;
        
        this.origin = location.origin;

        this.routes = routes;

        this.defaultPath = '/';
        this.routes.forEach(route => {
            if (route.default) {
                defaultPath = route.default;
            }
        });

        this.firstPage();
    }

    firstPage () {
        if (location.hash !== '') {
            this.hashName = location.hash.replace('#!', '');
        } else {
            this.hashName = this.defaultPath;
        }

        window.addEventListener("hashchange", () => {
             this.hashName = location.hash.replace('#!', '');
        });

        // this.hashChange({ from: this.from, to: this.to });
    }

    get hashName () {
        return this._hash;
    }

    set hashName(newVal) {

        this.from.path = this.hashName;
        this.from.fullPath = `${this.origin}/#!${this.hashName}`;

        this._hash = newVal;

        this.to.path = this.hashName;
        this.to.fullPath = `${this.origin}/#!${this.hashName}`;

        this.history.push(this.hashName);
        this.historyAnchor += 1;

        this.hashChange ({ from: this.from, to: this.to });
    }

    hashChange (parame) {
        // this.hashName = location.hash.replace('#!', '');
        console.log(this);
        if (this.routes.length) {
            this.routes.forEach(route => {
                // console.log(this.hashName, route.path)
                if (this.hashName === route.path) {
                    if (this.beforeEachFuncs) {
                        this.beforeEachFuncs(this.from, this.to, route.handler.bind(null, parame));
                    } else {
                        route.handler(parame);
                    }
                }
            });
        }   
    }

    beforeEach (func) {
        this.beforeEachFuncs = func;
        this.beforeEachFuncs(this.from, this.to, () => {});
    }

    back () {
        if (this.history.length < 2) {
            return;
        }
        this.hashName = this.history[this.historyAnchor - 1];
    }

    go (cout) {
        if (cout > 0 && (this.history.length - 1 - this.historyAnchor) >= cout) {
            this.hashName = this.history[this.historyAnchor - cout];
        }

        if (cout < 0 && this.historyAnchor >= Math.abs(cout)) {
            this.hashName = this.history[this.historyAnchor + cout];
        }
    }
}