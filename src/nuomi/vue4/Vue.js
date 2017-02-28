import { g, CONST } from '../../gtool';
import Observer from './Observer';

const NODE_TYPE = {
    element: 1,
    text: 3,
    comment: 8
};

export default class Vue {
    constructor (option) {
        this.data = option.data;
        this.el = (typeof option.el === 'string') ? g.$(option.el) : option.el;

        this.moustache = /({{(.*?)}})/g;

        new Observer(this.data);

        this.parseHTML(this.el);
    }

    render (node) {
        if (node.nodeType === NODE_TYPE.element) {

            node.innerText = this.replaceContent(node.innerText);
        }
        if (node.nodeType === NODE_TYPE.text) {
            
            node.nodeValue = this.replaceContent(node.nodeValue);
        }
    }

    replaceContent (target) {
        const mathes = target.match(this.moustache);

        if (mathes && mathes.length) {

            let result = target;
            mathes.forEach(matchItem => {

                matchItem.match(this.moustache);

                const orignialText = (RegExp.$1).trim();
                const variable = (RegExp.$2).trim();
                const replacedText = this.stringToData(variable);

                result = result.replace(orignialText, replacedText);
            });
            return result;
        }
    }

    parseHTML (html) {
        
        const fragment = document.createDocumentFragment();
        let node;
        while (node = html.firstChild) {
            this.render(node);
            fragment.appendChild(node);
        }

        this.el.appendChild(fragment);
    }

    stringToData (string) {
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