export default class LNote {

    constructor (parent, callback, defaultVal = 'Edit here') {
        this.parent = typeof parent === 'string' ? document.querySelector(parent) : parent;
        this.section = {
            lineNums: null,
            textarea: null
        };
        this.callback = callback;

        this.lineCounter = 0;
        this.defaultVal = defaultVal;

        this.init();
    }

    init () {

        const lines = this.section.lineNums = document.createElement('div');
        const textarea = this.section.textarea = document.createElement('div');

        lines.classList.add('line-nums');
        textarea.classList.add('textarea');
        textarea.setAttribute('contenteditable', true);

        this.parent.appendChild(lines);
        this.parent.appendChild(textarea);

        this.mutation = new MutationObserver((mutations) => {

            const newContent = this.getContent();

            this.callback(newContent.text);
            this.updateNums(newContent.nums); 
            this.saveContent(newContent.html);
        });

        this.mutation.observe(textarea, { 
            // attributes: true, 
            childList: true, 
            characterData: true,
            subtree: true
        });

        textarea.addEventListener('keydown', e => {
            if (this.lineCounter > 1) {
                return;
            }
            if (textarea.innerText.length === 1 && e.keyCode === 8) {
                e.preventDefault();
            }
        });

        const defaultVal = this.loadContent();
        if (defaultVal) {
            this.setContent(defaultVal, true);
        } else {
            this.setContent(this.defaultVal);
        }

        this.callback(defaultVal);
    }

    updateNums (newCounter) {

        if (newCounter === this.lineCounter) {
            return;
        }

        if (newCounter > this.lineCounter) {
            const fragment = document.createDocumentFragment();

            for (let i = this.lineCounter; i < newCounter; i++, this.lineCounter++) {
                this.addNum(fragment, i + 1);
            }

            this.section.lineNums.appendChild(fragment);
        }

        if (newCounter < this.lineCounter) {
            console.log(newCounter, this.lineCounter, this.lineCounter - newCounter);
            const rmAmount = this.lineCounter - newCounter;
            for (let i = 0; i < rmAmount; i++, this.lineCounter--) {
                console.log(this.section.lineNums.lastChild);
                this.section.lineNums.lastChild.remove();
            }
        }
    }

    addNum (parent, index) {

        const num = document.createElement('p');
                
        num.classList.add('line-num');
        num.dataset.index = index;
        num.innerText = index;

        parent.appendChild(num);
    }

    getContent () {
        const lines = Array.from(this.section.textarea.querySelectorAll('p'));
        const text = lines.reduce((str, line2) => str + line2.innerText + '\n', '');

        return {
            nums: lines.length,
            text: text,
            html: this.section.textarea.innerHTML
        }
    }

    saveContent (content) {
        localStorage.setItem('GMD_content', content);
    }

    setContent (content, isHTML) {
        if (isHTML) {
            this.section.textarea.innerHTML = content;
        } else {
            this.section.textarea.innerHTML = content.split('\n').map(line => `<p>${line}</p>`).join('');
        }
        
    }

    loadContent () {
        return localStorage.getItem('GMD_content') || false;
    }
 }