export default class GMD {
    constructor () {
        this.diffLines = [];
        this.init();
    }

    init () {
        this.markPattern = {
            separator: {
                regex: /^[\-=\*]{3,}/,
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
                regex: /^[\*\-\+]\s([^\n]+)/,
                template: '<ul>$1</ul>',
                singleLine: false,
                lineStart: true
            },
            ol: {
                regex: /^\d+\.\s([^\n]+)/,
                template: '<ol>$1</ol>',
                singleLine: false,
                lineStart: true
            },
            link: {
                regex: /(?:[^!]|^)\[([^\]]+?)\]\(([^\)]+?)\)/,
                template: '<a href="$2">$1</a>',
                singleLine: false
            },
            img: {
                regex: /!\[([^\]]*?)\]\(([^\)]+?)\)/,
                template: '<img alt="$1" src="$2">',
                singleLine: false
            },
            blockquote: {
                regex: /^\>\s([^\n]+)/,
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

        // Add h1-h6 regex
        for (let i = 1; i <= 6; i++) {
            const reg = '^\s*?' + '#'.repeat(i) + '\\s([^\\n]+)';
            this.markPattern['h' + i] = {
                regex: new RegExp(reg),
                template: `<h${i}>$1</h${i}>`,
                singleLine: false,
                lineStart: true
            };
        }

        console.log(this.markPattern);
    }

    update () {
        return this.parse(this.textarea.value);
    }

    parse (val) {
        const lines = val.split(/\n{2,}/);

        const linesParsed = lines.map(line => {
            return this.parseLine(line);
        });

        const result = linesParsed.join('\n');

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
                    // const matches = line.match(new RegExp(pattern.regex, 'g'));
                    const matches = line.split('\n');
                
                    if (key === 'ul') {
                        console.log(matches);
                    }
                    
                    matches.forEach(match => {

                        if (key === 'blockquote') {
                            const filtered = match.replace(/>\s/, '');
                            list.push(this.parseLine(filtered));
                        } else {
                            const filtered = match.replace(/[\*\-\+]\s|\d+\.\s/, '');
                            list.push(`<li>${filtered}</li>`);
                        }
                    });

                    // console.log(list.join('\n'), pattern.template, key);

                    line = pattern.template.replace('$1', list.join(''));

                    continue;
                }

                const filtered = pattern.template.replace('{data}', RegExp.$1);
                
                // line = line.replace(RegExp.$_, filtered);
                line = line.replace(new RegExp(pattern.regex), pattern.template);

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

    diff () {

    }

}