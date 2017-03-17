export default class LNote {
    constructor (parent, callback) {
        this.parent = typeof parent === 'string' ? document.querySelector(parent) : parent;
        this.section = {
            lineNums: null,
            textarea: null
        };
        this.callback = callback;

        this.lineCounter = 1;

        this.init();
    }

    init () {
        const lines = this.section.lineNums = document.createElement('div');
        const textarea = this.section.textarea = document.createElement('div');

        lines.classList.add('line-nums');
        textarea.classList.add('textarea');
        textarea.setAttribute('contenteditable', true);
        textarea.innerHTML = '<p>Edit here</p>';

        this.parent.appendChild(lines);
        this.parent.appendChild(textarea);

        this.mutation = new MutationObserver((mutations) => {

            const lines = Array.from(textarea.querySelectorAll('p'));
            this.callback(
                lines.reduce((str, line2) => str + line2.innerText + '\n', '')
            );
            this.updateNums(lines.length); 

        });
        this.mutation.observe(textarea, { 
            // attributes: true, 
            childList: true, 
            characterData: true,
            subtree: true
        });

        this.addNum(lines, 1);
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
            for (let i = 0; i < this.lineCounter - newCounter; i++, this.lineCounter--) {
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
}