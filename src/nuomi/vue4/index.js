import template from './template.html';
import { g, CONST } from '../../gtool';
import './style.scss';
import Observer from './Observer';
import Vue from './Vue';

export function create (parent, option = []) {
    parent = typeof parent === 'string' ? g.$(parent) : parent;

    parent.innerHTML = template;

    let app = new Vue({
        el: '#vue-content',
        data: {
            user: {
            name: 'youngwind',
            age: 25
            }
        }
    });

    console.log(app);
    
}