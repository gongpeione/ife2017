import { g } from '../../gtool';
import GMD from './GMD';
import LNote from './LNote';

export default class MarkDown {

    constructor (parent, output) {

        this.parent = typeof parent === 'string' ? g.$(parent) : parent;
        this.gmd = new GMD();

        console.log('md', this.parent);
        this.lnote = new LNote(this.parent);

        if (output) {
            this.output = typeof output === 'string' ? g.$(output) : output;
        }

        this.init();
    }

    init () {

        // this.textarea = new g.vdom('textarea', {
        //     class: 'g-MarkDown'
        // }, [ this.parent.innerHTML.replace(/&gt;/g, '>') ]).render();

        // this.textarea.addEventListener('keyup', e => {
        //     this.update();
        // })

        // this.parent.innerHTML = '';
        // this.parent.appendChild(this.textarea);

        // this.update();
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
        this.output.innerHTML = this.gmd.parse(this.textarea.value);
    }
}