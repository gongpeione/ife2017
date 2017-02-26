export default class Observer {
    constructor (obj) {
        this.obj = obj;
        this.data = {};

        this.walk(obj);
    }

    walk (obj) {
        Object.keys(obj).forEach(key => {
            Object.defineProperty(this.data, key, {
                enumerable: true,
                configurable: false,
                get: () => {
                    console.log(`你访问了 ${key}`);
                    return this.obj[key];
                },
                set: (newVal) => {
                    console.log(`你设置了 ${key}，新的值为 ${newVal}`);
                    this.obj[key] = newVal;
                },
            });
        })
    }
}