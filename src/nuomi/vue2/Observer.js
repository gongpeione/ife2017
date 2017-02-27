export default class Observer {
    constructor (obj) {
        this.obj = this.data = obj;

        this.watchers = {};

        this.walk(this.obj);
    }

    observe (obj, key, val) {

        this.walk(val);

        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: false,
            get: () => {
                console.log(`你访问了 ${key}`);
                return val;
            },
            set: (newVal) => {
                
                if (typeof newVal === 'object') {
                    this.walk(newVal);
                }
                console.log(`你设置了 ${key}，新的值为 ${newVal}`);

                // console.log('watchers', this.watchers[key]);
                if (this.watchers[key]) {
                    this.watchers[key](newVal);
                }
                val = newVal;
            },
        });
    }

    walk (data) {
        // console.log(data);
        if (!data || typeof data !== 'object') {
            return;
        }

        Object.keys(data).forEach(key => {
            this.observe(data, key, data[key]);
        });
    }

    $watch (prop, callback = () => {}) {
        this.watchers[prop] = callback;
    }
}