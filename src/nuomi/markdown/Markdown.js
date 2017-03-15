import { g } from '../../gtool';

export default class MarkDown {
    constructor (parent, output) {
        this.parent = typeof parent === 'string' ? g.$(parent) : parent;
        this.children = [];
        this.html = new g.vdom('div', { class: 'g-mark' }, [ ...this.children ]);
        this.contentList = [];

        this.value = '';

        if (output) {
            this.output = typeof output === 'string' ? g.$(output) : output;
        }

        this.pattern = {
            link: /https?:\/\/(.*?)/
        }
        this.markPattern = {
            separator: {
                regex: /[\-=\*]{3,}/,
                template: '<hr>',
                singleLine: true,
                lineStart: true,
            },
            emphasis: {
                regex: /[\*_]([^\*_]+?)[\*_](?!\*)/,
                template: '<em>{data}</em>',
                singleLine: false
            },
            strongEm: {
                regex: /[\*_]{2}(.*?)[\*_]{2}/,
                template: '<strong>{data}</strong>',
                singleLine: false
            },
            strikeThrough: {
                regex: /~{2}(.*?)~{2}/,
                template: '<del>{data}</del>',
                singleLine: false
            },
            ul: {
                regex: /^[\*\-\+]\s([^\n]+)/,
                template: '<li>{data}</li>',
                singleLine: false,
                lineStart: true
            },
            ol: {
                regex: /^\d+\.\s([^\n]+)/,
                template: '<li>{data}</li>',
                singleLine: false,
                lineStart: true
            },
            link: {
                regex: /\[(^\])+\]\([(^\)]+\)/,
                template: '<a href="{data[1]}">{data[0]}</a>',
                singleLine: false
            },
            img: {
                regex: /!\[(^\])+\]\([(^\)]+\)/,
                template: '<img src="{data[1]}" alt="{data[0]}">',
                singleLine: false
            },
            blockquote: {
                regex: /\>\s([^\n]+)/,
                template: '<blockquote>{data}</blockquote>',
                singleLine: false,
                lineStart: true
            },
            code: {
                regex: /`([^`]+)`/,
                template: '<code>{data}</code>',
                singleLine: false
            },
            pre: {
                regex: /```(\w+)([^`]+)```/,
                template: '<pre>{data[1]}</pre>',
                singleLine: false
            },
        }

        for (let i = 1; i <= 6; i++) {
            const reg = '^' + '#'.repeat(i) + '\\s([^\\n]+)';
            this.markPattern['h' + i] = {
                regex: new RegExp(reg),
                template: `<h${i}>{data}</h${i}>`,
                singleLine: false,
                lineStart: true
            };
        }

        console.log(this.markPattern);

        this.init();
    }

    init () {

        this.textarea = new g.vdom('textarea', {
            class: 'g-MarkDown'
        }, [ this.parent.innerHTML ]).render();

        this.textarea.addEventListener('keyup', e => {
            this.value = this.textarea.value;
            
            this.parse(this.value);
        })

        this.parent.appendChild(this.textarea);
        // this.data.setAttribute('contenteditable', true);
        
        // this.mutation = new MutationObserver(function(mutations) {
        //     mutations.forEach(function(mutation) {
        //         console.log(mutation, mutation.type);
        //     });    
        // });
        // this.mutation.observe(this.data, { 
        //     // attributes: true, 
        //     childList: true, 
        //     characterData: true,
        //     subtree: true
        // });
    }

    update () {
        this.parse(this.textarea.value);
    }

    parse (newVal) {
        const lines = newVal.split('\n\n');
        const linesParsed = [];

        lines.forEach(line => {

            line = this.parseLine(line);
            linesParsed.push(line);
        });

        this.output.innerHTML = linesParsed.join('\n');
    }

    parseLine (line) {

        let isBlockEle = false;
        let isQuote = false; 

        for (let key in this.markPattern) {

            const pattern = this.markPattern[key];

            if (!pattern.regex.test(line)) {
                continue;
            }

            if (pattern.singleLine) {
                line = line.replace(pattern.regex, pattern.template);
                linesParsed.push(line);
                return;
            }
            
            if (pattern.lineStart) {

                if (key === 'blockquote') {
                    const quoteList = [];
                    const matches = line.match(new RegExp(pattern.regex, 'g'));
                    // console.log(matches);
                    matches.forEach(match => {
                        const filtered = match.replace(/>\s/, '');
                        quoteList.push(this.parseLine(filtered));
                    });

                    line = pattern.template.replace('{data}', quoteList.join('\n'));

                    continue;
                }

                const filtered = pattern.template.replace('{data}', RegExp.$1);
                
                line = line.replace(RegExp.$_, filtered);

                isBlockEle = true;

                continue;
                // line = line.replace(match[0], newContent);
            }
            console.log(RegExp.$1, RegExp.$_);
            const matches = line.match(new RegExp(pattern.regex, 'g'));
            matches.forEach(match => {
                line = line.replace(match, pattern.template.replace('{data}', RegExp.$1));
            });
        }

        if (!isBlockEle) {
            return `<p>${line}</p>`;
        } else {
            return line;
        }
    }

}