import template from './template.html';
import { g } from '../../gtool';
import './style.scss';
import Snake from './Snake';

export function create (parent, option = []) {
    parent = typeof parent === 'string' ? g.$(parent) : parent;

    parent.innerHTML = template;

    new Snake('.snake-wrap', {
        color: {
            bg: '#232',
            snake: '#985'
        }
    });
}