import { g } from '../../gtool';
import GMD from './GMD';
import LNote from './LNote';

const defaultVal = `# h1\n

## h2

### h3

#### h4

##### h5

###### h6

---

Code: \`code\`, em: *em*, strong: **strong**, strike through: ~~through~~

---

[Link](https://google.com)

![img](https://ww4.sinaimg.cn/large/006tNc79gy1fdk3zs7r9nj308c08cdi7.jpg)

> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis veniam recusandae maiores aperiam? Vero amet iste aliquam, architecto sapiente ipsum provident, adipisci molestiae. Incidunt natus, tempora ratione atque praesentium 
> assumenda!

---

pre:

\`\`\`javascript
alert(1)
\`\`\`

---

- unordered list1
- list1
- list1
- list1

1. ordered list
2. ordered list
3. ordered list
4. ordered list`;

export default class MarkDown {

    constructor (editor, output) {

        this.editor = typeof editor === 'string' ? g.$(editor) : editor;
        this.output = typeof output === 'string' ? g.$(output) : output;

        this.gmd = new GMD();
        this.lnote = new LNote(this.editor, newVal => {
            this.update(newVal);
        }, defaultVal);

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