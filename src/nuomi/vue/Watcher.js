const moustache = /({{(.*?)}})/g;

export default class Watcher {
    constructor (data, node, original, publisher) {
        this.data = data;
        this.node = node;
        this.publisher = publisher;
        this.original = original;

        this.name = [];
        this.curVal = {};
        this.nodeType = node.nodeType;

        this.init();

        this.publisher.add(this);
    }

    init () {

        const nameList = this.original.match(moustache);

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

    update () {
        this.render();
    }

    render () {
        if (this.nodeType === NODE_TYPE.element) {
            this.node.innerText = this.replaceContent(this.node.innerText);
        }
        if (this.nodeType === NODE_TYPE.text) {
            this.node.nodeValue = this.replaceContent(this.node.nodeValue);
        }
    }

    replaceContent (original) {
        this.name.forEach(name => {
            const curVal = this.getData(name);
            original = original.replace(this.oldVal[name], curVal);

            this.oldVal[name] = curVal;
        });
        return original;
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