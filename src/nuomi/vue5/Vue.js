import { g, CONST } from '../../gtool';
import Observer from './Observer';
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
        this.el = (typeof option.el === 'string') ? g.$(option.el) : option.el;

        this.publisher = new Publisher();

        this.observer = new Observer(this.data, this.publisher);

        this.parseHTML(this.el);
    }

    parseHTML (html) {
        
        const fragment = document.createDocumentFragment();
        let node;
        while (node = html.firstChild) {

            let content = '';
            if (node.nodeType === NODE_TYPE.element) {
                content = node.innerText;
            }
            if (node.nodeType === NODE_TYPE.text) {
                content = node.nodeValue;
            }

            const match = moustache.test(content);
            if (match) {
                new Watcher(this.data, node, this.publisher);    
            }
        
            fragment.appendChild(node);
        }

        this.el.appendChild(fragment);
    }

    $watch (name, callback) {
        this.observer.$watch(name, callback);
    }
}