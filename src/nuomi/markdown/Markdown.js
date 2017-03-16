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
                template: '<em>$1</em>',
                singleLine: false
            },
            strongEm: {
                regex: /[\*_]{2}(.*?)[\*_]{2}/,
                template: '<strong>$1</strong>',
                singleLine: false
            },
            strikeThrough: {
                regex: /~{2}(.*?)~{2}/,
                template: '<del>$1</del>',
                singleLine: false
            },
            ul: {
                regex: /[\*\-\+]\s([^\n]+)/,
                template: '<ul>$1</ul>',
                singleLine: false,
                lineStart: true
            },
            ol: {
                regex: /\d+\.\s([^\n]+)/,
                template: '<ol>$1</ol>',
                singleLine: false,
                lineStart: true
            },
            link: {
                regex: /(?:[^!]|^)\[([^\]]+?)\]\(([^\)]+?)\)/,
                template: '<a href="$1">$2</a>',
                singleLine: false
            },
            img: {
                regex: /!\[([^\]]*?)\]\(([^\)]+?)\)/,
                template: '<img alt="$1" src="$2">',
                singleLine: false
            },
            blockquote: {
                regex: /\>\s([^\n]+)/,
                template: '<blockquote>$1</blockquote>',
                singleLine: false,
                lineStart: true
            },
            code: {
                regex: /`([^`\n]+)`/,
                template: '<code>$1</code>',
                singleLine: false
            },
            pre: {
                regex: /```(\w+)([^`]+?)```/,
                template: '<pre class="$1">$2</pre>',
                singleLine: false
            },
        }

        for (let i = 1; i <= 6; i++) {
            const reg = '^\s*?' + '#'.repeat(i) + '\\s([^\\n]+)';
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

        this.parent.innerHTML = '';
        this.parent.appendChild(this.textarea);

        this.update();
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
        const lines = newVal.split(/\n{2,}/);
        const linesParsed = [];

        lines.forEach(line => {
            line = this.parseLine(line);
            linesParsed.push(line);
        });

        const result = linesParsed.join('\n');

        this && this.output && (this.output.innerHTML = result);

        return result;
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
                return line;
            }
            
            if (pattern.lineStart) {

                if (['blockquote', 'ol', 'ul'].indexOf(key) >= 0) {
                    const list = [];
                    const matches = line.match(new RegExp(pattern.regex, 'g'));
                    
                    if (key === 'ul') {
                        console.log(matches);
                    }
                    
                    matches.forEach(match => {

                        if (key === 'blockquote') {
                            const filtered = match.replace(/>\s/, '');
                            list.push(this.parseLine(filtered));
                        } else {
                            const filtered = match.replace(/[\*\-\+]|(\d+\.)\s/, '');
                            list.push(`<li>${filtered}</li>`);
                        }
                    });

                    console.log(list.join('\n'), pattern.template, key);

                    line = pattern.template.replace('$1', list.join(''));

                    continue;
                }

                const filtered = pattern.template.replace('{data}', RegExp.$1);
                
                line = line.replace(RegExp.$_, filtered);

                isBlockEle = true;

                continue;
                // line = line.replace(match[0], newContent);
            }

            line = line.replace(new RegExp(pattern.regex, 'g'), pattern.template);
        }

        if (!isBlockEle) {
            return `<p>${line}</p>`;
        } else {
            return line;
        }
    }

}