import { g } from '../../gtool';
import GMD from './GMD';
import LNote from './LNote';

export default class MarkDown {

    constructor (editor, output) {

        this.editor = typeof editor === 'string' ? g.$(editor) : editor;
        this.output = typeof output === 'string' ? g.$(output) : output;

        this.gmd = new GMD();
        this.lnote = new LNote(this.editor, newVal => {
            console.log(newVal);
            this.update(newVal);
        });

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

    update (newVal) {
        this.output.innerHTML = this.gmd.parse(newVal);
    }
}