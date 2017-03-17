export default class LNote {
    constructor (parent) {
        this.parent = typeof parent === 'string' ? document.querySelector(parent) : parent;
        this.section = {
            lineNums: null,
            textarea: null
        };

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
            // console.log();
            const lines = Array.from(textarea.querySelectorAll('p'));
            
            console.log(lines);
            this.updateNums(lines.length);

            // mutations.forEach(function(mutation) {
            //     console.log(mutation, mutation.type);
            // });    
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