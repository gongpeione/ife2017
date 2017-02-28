import template from './template.html';
import { g } from '../../gtool';
import './style.scss';

export function create (parent, option = []) {
    parent = typeof parent === 'string' ? g.$(parent) : parent;

    parent.innerHTML = template;
}