const moustache = /({{(.*?)}})/g;
const NODE_TYPE = {
    element: 1,
    text: 3,
    comment: 8
};

export default class Watcher {

    static TYPE = {
        TEXT: 'text',
        NODE: 'node',
        BIND: 'bind'
    };
    // node, type, original, context, attr
    constructor (options) {

        this.node = options.node || this.error('Node is required');
        this.context = options.context || this.error('Context is required');
        this.data = this.context.data;
        this.publisher = this.context.publisher;

        this.type = options.type || Watcher.TYPE.NODE;

        if (this.type === Watcher.TYPE.BIND) {
            this.attrName = options.attrName || this.error('Attribute Name is missing');
            this.name = options.name || this.error('Attribute Value is missing')
        }

        this.curVal = [];

        this.init();

        this.publisher.add(this);
    }

    error (msg) {
        throw new Error(msg);
    }

    init () {

        if (this.type === Watcher.TYPE.NODE || this.type === Watcher.TYPE.TEXT) {

            this.name = [];
            this.originalText = this.type === Watcher.TYPE.NODE ?
                                    this.node.innerText :
                                    this.node.nodeValue;
                                    
            const nameList = this.originalText.match(moustache);

            if (nameList && nameList.length) {

                nameList.forEach(name => {

                    name.match(moustache);

                    const orignialText = (RegExp.$1).trim();
                    const nameValue = (RegExp.$2).trim();

                    this.curVal[nameValue] = orignialText;

                    this.name.push(nameValue);
                });
            }
        }

        this.update('init');
    }

    update (path) {
        if (
            (
                path && 
                this.name.indexOf(path.slice(0,-1)) >= 0
            ) ||
            path === 'init'
        ) {
            this.render();
        }
    }

    render () {
        // const newVal = this.replaceContent(this.originalText);

        // if (newVal === this.originalText) {
        //     return;
        // }

        switch (this.type) {
            case Watcher.TYPE.TEXT: 
                this.node.nodeValue = this.replaceContent(this.originalText);
                break;
            case Watcher.TYPE.NODE:
                this.node.innerText = this.replaceContent(this.originalText);
                break;
            case Watcher.TYPE.BIND:
            // console.log(this.attrName);
                this.node.removeAttribute(this.attrName);
                this.node.setAttribute(this.attrName.replace('g-', ''), this.getData(this.name));
        }
    }

    replaceContent (original) {

        let retVal = original;
        this.name.forEach(name => {
            
            const curVal = this.getData(name);
            this.originalText = retVal = retVal.replace(this.curVal[name], curVal);

            this.curVal[name] = curVal;

            console.log(name, curVal);
        });

        // console.log(original);
        return retVal;
    }

    getData (string) {
        try {
            const arr = string.trim().split('.');
            if (arr.length === 1) {
                return this.data[arr[0]];
            }
            return arr.reduce((x, y) => {
                return this.data[x][y];
            });
        } catch (e) {
            return '';
        }
    }
}