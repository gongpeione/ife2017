class ObEventHandler {
    constructor () {
        this.changeMethods = {};
    }

    onChange (name, callback = () => {}) {
        this.changeMethods[name] = callback;
    }

    callChangeMethods (name, newVal = '') {
        name in this.changeMethods && this.changeMethods[name](newVal);
    }

    bubbling (path, newVal) {
        
        const pathArray = path.slice(0, path.length - 1).split('.');
        const length = pathArray.length;

        // Call same path name's function,eg '['a.b.c.d']()'
        this.callChangeMethods(path, newVal);

        if (length) {

            // Call each path name's function, eg '['a'](), ['b']() ...'
            pathArray.forEach(pathName => {
                this.callChangeMethods(pathName, newVal);
            });

            // Call parent path name's function,, eg '['a.b.c'](), ['a.b']() ...'
            for (let i = pathArray.length - 1; i >= 2 ; i--) {
                const pathSlice = pathArray.slice(0, i);
                this.callChangeMethods(pathSlice.join('.'), newVal);
            }
        }
    }
}

export default class Observer {

    constructor (data, publisher) {
        this.originalData = this.data = data;
        this.publisher = publisher;

        this.handler = new ObEventHandler();

        this.observe(this.originalData);
    }

    observe (data) {
        this.checkData(data);
    }

    checkData (data, path = '') {
        if (typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.initProperty(data, key, data[key], path);
            });
        }
    }

    initProperty (data, key, val, path) {

        path += key + '.';

        this.checkData(val, path); 

        // if this property is an computed one then do nothing
        const property = Object.getOwnPropertyDescriptor(data, key);
        if (property.configurable === false) {
            return;
        }
        
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: () => {
                return val;
            },
            set: newVal => {

                if (newVal === val) {
                    return;
                }

                val = newVal;

                this.checkData(newVal, parent);
                this.handler.bubbling(path, newVal);

                this.publisher.update(path);
            }
        });
    }

    $watch (name, callback = () => {}) {
        this.handler.onChange(name, callback);
    }
}