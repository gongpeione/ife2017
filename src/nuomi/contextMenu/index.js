import { g } from '../../gtool';
import template from './template.html';
import ContextMenu from './ContextMenu';
import './style.scss';

export function create (parent, option = []) {
    parent = typeof parent === 'string' ? g.$(parent) : parent;

    // console.log(html);
    parent.innerHTML = template;

    const container = g.$('.contentMenu', parent);
    new ContextMenu(container, defaultOption);
}

const defaultOption = {
    class: 'context-menu',
    items: [
        {
            type: 'link',
            title: '百度',
            content: 'https://www.baidu.com',
            target: '_blank'
        },
        {
            type: 'separator',
        },
        {
            type: 'function',
            title: 'Alert',
            content: () => alert(1)
        },
        {
            type: 'link',
            title: 'Disabled',
            disabled: true
        },
        {
            type: 'text',
            title: 'Plain Text',
            class: 'plain'
        }
    ]
}