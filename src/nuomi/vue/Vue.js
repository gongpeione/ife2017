// import Observer from './Observer';
import Watcher from './Watcher';
import Publisher from './Publisher';

const NODE_TYPE = {
    element: 1,
    text: 3,
    comment: 8
};

const moustache = /({{(.*?)}})/g;

export default class Vue {
    constructor (option) {

        this.data = option.data;
        this.el = (typeof option.el === 'string') ? document.querySelector(option.el) : option.el;

        this.publisher = new Publisher();

        // this.observer = new Observer(this.data, this.publisher);

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

        if (node.nodeType === NODE_TYPE.element) {

            const children = Array.from(node.children);
            if (children.length) {
                Array.from(node.children, child => {
                    this.parseNode(child);
                });
            } else {
                content = node.innerText;
            } 
        }
        if (node.nodeType === NODE_TYPE.text) {
            content = node.nodeValue;
        }

        const match = content.match(moustache);
        if (match) {
            console.log(match);
            new Watcher(this.data, node, content, this.publisher);    
        }
    }

    $watch (name, callback) {
        this.observer.$watch(name, callback);
    }
}