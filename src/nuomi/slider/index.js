import template from './template.html';
import { g } from '../../gtool';
import './style.scss';

export function create (parent, option = []) {
    parent = typeof parent === 'string' ? g.$(parent) : parent;

    parent.innerHTML = template;
    
    let angle = 0;
    const sliderCover = g.$('.slider-cover');
    g.$('.previous').addEventListener('click', () => {
        g.css(sliderCover, `transform: rotateY(${angle += 60}deg)`);
    });
    g.$('.next').addEventListener('click', () => {
        g.css(sliderCover, `transform: rotateY(${angle -= 60}deg)`);
    });
}