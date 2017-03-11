import Observer from './Observer';
import Watcher from './Watcher';
import Publisher from './Publisher';

const NODE_TYPE = {
    element: 1,
    text: 3,
    comment: 8
};

const moustache = /({{(.*?)}})/;
const directive = /g-(.*?)/;

export default class Vue {
    constructor (option) {

        this.data = option.data;
        this.el = (typeof option.el === 'string') ? document.querySelector(option.el) : option.el;

        this.publisher = new Publisher();

        this.observer = new Observer(this.data, this.publisher);

        this.parseHTML(this.el);
    }

    parseHTML (html) {
        
        const fragment = document.createDocumentFragment();
        const childrenLength = html.children.length;

        let child = null;
        while (child = html.firstChild) {
            fragment.appendChild(child);
            this.parseNode(child);
        }

        this.el.appendChild(fragment);
    }

    parseNode (node) {

        let content = '';

        // console.log(node);
        if (node.nodeType === NODE_TYPE.element) {

            Array.from(node.attributes, attr => {
                const name = attr.name;
                const value = attr.nodeValue;
                
                if (directive.test(name)) {
                    // console.log(name);
                    new Watcher({
                        node: node, 
                        type: Watcher.TYPE.BIND, 
                        name: value, 
                        context: this, 
                        attrName: name
                    });
                }
            });

            const children = Array.from(node.children);
            if (children.length) {
                children.forEach(child => {
                    this.parseNode(child);
                });
            } else {
                content = node.innerText;
                
                if (moustache.test(content)) {
                    new Watcher({
                        node: node, 
                        type: Watcher.TYPE.NODE, 
                        context: this
                    });
                }
            } 
        }
        if (node.nodeType === NODE_TYPE.text) {
            content = node.nodeValue;

            if (moustache.test(content)) {
                new Watcher({
                    node: node, 
                    type: Watcher.TYPE.TEXT, 
                    context: this
                });
            }
        }
    }

    $watch (name, callback) {
        this.observer.$watch(name, callback);
    }
}