
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

        this.beforeEachFuncs = [];
        this.afterEachFuncs = [];
        
        this.origin = location.protocol + '//' + location.host + location.pathname;

        this.routes = routes;

        this.defaultPath = '/';
        this.page404 = () => {};

        this.routes.forEach(route => {
            if (route.default) {
                this.defaultPath = route.path;
            }
            if (route.path === '*') {
                this.page404 = route.handler;
            }
        });
    }

    start () {
        window.addEventListener("hashchange", () => {
            this.hashName = location.hash.replace('#!', '');
            console.log(this.hashName);
        });
        this.firstPage();
    }

    firstPage () {
        if (location.hash !== '') {
            this.hashName = location.hash.replace('#!', '');
        } else {
            location.hash = '!' + this.defaultPath;
        }
    }

    get hashName () {
        return this._hash;
    }

    set hashName(newVal) {

        this.from.path = this.hashName;
        this.from.fullPath = `${this.origin}#!${this.hashName}`;

        this._hash = newVal;

        this.to.path = this.hashName;
        this.to.fullPath = `${this.origin}#!${this.hashName}`;

        this.history.push(this.hashName);
        this.historyAnchor += 1;

        this.hashChange ({ from: this.from, to: this.to });
    }

    hashChange (parame) {

        if (this.routes.length) {

            let from = parame.from;
            let to = parame.to;
            const lastIndex = this.beforeEachFuncs.length - 1;
            const routesLastIndex = this.routes.length - 1;

            for (let i = 0; i < routesLastIndex; i++) {
                const route = this.routes[i];

                if (this.hashName === route.path) {
                    // Excute beforeEach functions
                    if (this.beforeEachFuncs.length) {
                        // beforeEach functions chain
                        let index = 0;
                        const next = () => {
                            // console.log(index);
                            if (index < lastIndex) {
                                this.beforeEachFuncs[++index](from, to, next);
                            } else {
                                route.handler({ from, to });
                            }
                        }
                        this.beforeEachFuncs[0](from, to, next);
                       
                    } else {
                        route.handler({ from, to });
                    }

                    if (this.afterEachFuncs.length) {
                        for (let j = 0; j < this.afterEachFuncs.length; j++) {
                            this.afterEachFuncs[j]();
                        }  
                    }

                    return;
                }
            }

            // 404 page
            if (this.beforeEachFuncs.length) {
                // beforeEach functions chain
                let index = 0;
                const next = () => {
                    // console.log(index);
                    if (index < lastIndex) {
                        this.beforeEachFuncs[++index](from, to, next, '404');
                    } else {
                        this.page404({ from, to });
                    }
                }
                this.beforeEachFuncs[0](from, to, next, '404');
                
            } else {
                this.page404({ from, to });
            }
        }   
    }

    beforeEach (func) {
        this.beforeEachFuncs.push(func);
        func(this.from, this.to, () => {});

        return this;
    }

    afterEach (func) {
        this.afterEachFuncs.push(func);
        func(this.from, this.to);

        return this;
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