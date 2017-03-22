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

        // add computed property
        this.computedList = option.computed;
        this.computed();

        this.observer = new Observer(this.data, this.publisher);

        this.events = option.events;
        this.watchList = option.watch;
        
        this.parseHTML(this.el);
        this.addEvents(this.el);
        this.watch();
    }

    computed () {
        const _this = this;
        Object.keys(this.computedList).forEach(key => {
            Object.defineProperty(this.data, key, {
                enumerable: true,
                configurable: false,
                get () {
                    return _this.computedList[key].apply(_this);
                }
            });
        });
    }

    watch () {
        Object.keys(this.watchList).forEach(name => {
            this.$watch(name, this.watchList[name])
        });
    }

    addEvents (root) {
        Object.keys(this.events).forEach(event => {
            Object.keys(this.events[event]).forEach(el => {
                root.querySelectorAll(el).forEach(each => {
                    each.addEventListener(event, this.events[event][el].bind(this));
                });
            });
        });
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

            Array.from(node.attributes).forEach(attr => {
                const name = attr.name;
                const value = attr.nodeValue;
                if (directive.test(name)) {

                    if (RegExp.$1 === 'for') {

                        

                    } else {
                        new Watcher({
                            node: node, 
                            type: Watcher.TYPE.BIND, 
                            name: value, 
                            context: this, 
                            attrName: name
                        });
                    }
                    
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
        this.observer.$watch(name, callback.bind(this));
    }
}