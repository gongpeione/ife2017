import template from './template.html';
import { g } from '../../gtool';
import './style.scss';
import Player from './Player';

export function create (parent, option = []) {
    parent = typeof parent === 'string' ? g.$(parent) : parent;

    parent.innerHTML = template;

    new Player(parent);
}