import { g } from '../../gtool';
import './ContextMenu.scss';

// TODO submenu
export default class ContextMenu {
    constructor (parent, options = {}) {
        this.parent = typeof parent === 'string' ? g.$(parent) : parent;
        this.options = options;
        this.isHidden = true;
        this.type = [
            'separator',
            'link',
            'function',
            'text',
        ];

        this.menu = this.render();
        this.parent.appendChild(this.menu);

        this.parent.addEventListener('contextmenu', e => {
            this.show();
            const position = this._getXY(e);
            this.setPosition(position.x, position.y);

            e.preventDefault();
            return false;
        });
        document.addEventListener('click', e => {
            // console.log(this);
            if (e.target !== this.menu) {
                this.hide();
            }
        });
        document.addEventListener('contextmenu', e => {
            console.log(e);
            if (e.target !== this.menu && e.target !== this.parent) {
                this.hide();
            }
        });
    }

    render () {
        const menuList = [];
        this.options.items.forEach(item => {

            if (this.type.indexOf(item.type) < 0) {
                return;
            }
            switch (item.type) {
                case 'separator': menuList.push(this.separator(item)); break;
                case 'link':      menuList.push(this.link(item)); break;
                case 'function':  menuList.push(this.function(item)); break;
                case 'text':      menuList.push(this.text(item)); break;
                
                default: return;
            }

        });

        const className = 'g-contextMenu ' + (this.options.class || '');
        return new g.vdom('ul', { class: className }, menuList).render();
    }

    separator (option) {
        return new g.vdom('li', { class: 'separator' });
    }

    link (option) {

        const a = new g.vdom('a', { 

            href: option.content || '', 
            target: option.target ? option.target : '_blank',

        }, [ option.title ]);
        
        const list = new g.vdom('li', { class: 'link' + (option.disabled ? ' disabled' : '') }, [ a ]);
        if (option.disabled) {
            list.addEvent('click', e => {
                e.preventDefault();
                return false;
            })
        }

        return list;
    }

    function (option) {
        const btn = new g.vdom('li', { 
            class: 'function' + (option.disabled ? ' disabled' : '') 
        }, [ option.title ]);

        if (!option.disabled) {
            btn.addEvent('click', (e) => {
                option.content(e);
            });
        }

        return btn;
    }

    text (option) {
        return new g.vdom('li', { 
            class: 'text' + (option.disabled ? ' disabled' : '') 
        }, [ option.title ]);
    }

    show () {
        g.class(this.menu, 'hide', true);
        g.class(this.menu, 'show');
    }

    hide () {
        g.class(this.menu, 'show', true);
        g.class(this.menu, 'hide');
    }

    setPosition (x, y) {
        g.css(this.menu, `left:${x}px; top:${y}px`);
    }

    _getXY (e) {
        // console.log(e);
        const toTop = document.documentElement.scrollTop || document.body.scrollTop;
        const toLeft =  document.documentElement.scrollLeft || document.body.scrollLeft;
        const bodyWidth = g.width(document.body);
        const bodyHeight = g.height(document.body);
        const menuWidth = g.width(this.menu);
        const menuHeight = g.height(this.menu);

        let x = e.clientX + toLeft;
        let y = e.clientY + toTop;
        if (bodyWidth - x < menuWidth) {
            x -= menuWidth;
        }
        if (bodyHeight - y < menuHeight) {
            y -= menuHeight;
        }
        return {x, y}; 
        // return {x: e.clientX + toLeft, y: e.clientY + toTop}; 
    }
}