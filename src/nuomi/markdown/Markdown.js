import { g } from '../../gtool';

export default class MarkDown {
    constructor (dataSource) {
        this.data = typeof dataSource === 'string' ? g.$(dataSource) : dataSource;
        this.children = [];
        this.html = new g.vdom('div', { class: 'g-mark' }, [ ...this.children ]);
        this.contentList = [];

        this.pattern = {
            link: /https?:\/\/(.*?)/
        }
        this.markPattern = {
            h1: /a/,
            separator: /[-=]{3,}/,
            emphasis: /[\*_](.*?)[\*_]/,
            strongEm: /[\*_]{2}(.*?)[\*_]{2}/,
            strikeThrough: /~{2}(.*?)~{2}/,
            ul: /[\*\-\+]\s([^\n]+)/,
            ol: /\d+\.\s([^\n]+)/,
            link: /\[(^\])+\]\([(^\)]+\)/
        }

        for (let i = 1; i <= 6; i++) {
            const reg = '#'.repeat(i) + '\\s([^\\n]+?)';
            this.markPattern['h' + i] = new RegExp(reg);
        }

        console.log(this.markPattern);

        this.init();
    }

    init () {

        this.data.setAttribute('contenteditable', true);
        
        this.mutation = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                console.log(mutation, mutation.type);
            });    
        });
        this.mutation.observe(this.data, { 
            // attributes: true, 
            childList: true, 
            characterData: true,
            subtree: true
        });
    }

    update () {
        this.parse(this.data.value);
    }

    parse (newVal) {
        console.dir(newVal.split('\n'));
    }

}