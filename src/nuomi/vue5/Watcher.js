const moustache = /({{(.*?)}})/g;

const NODE_TYPE = {
    element: 1,
    text: 3,
    comment: 8
};
export default class Watcher {
    constructor (data, node, publisher) {
        this.node = node;
        this.name = [];
        this.oldVal = {};
        this.data = data;
        this.publisher = publisher;
        this.nodeType = node.nodeType;

        this.publisher.add(this);

        this.init();
    }

    init () {
        let content = '';
        if (this.nodeType === NODE_TYPE.element) {
            content = this.node.innerText;
        }
        if (this.nodeType === NODE_TYPE.text) {
            content = this.node.nodeValue;
        }
        const mathes = content.match(moustache);
        if (mathes && mathes.length) {
            mathes.forEach(matchItem => {

                const orignialText = (RegExp.$1).trim();
                const name = (RegExp.$2).trim();

                this.oldVal[name] = orignialText;

                this.name.push(name);
            });
        }

        this.update();
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