import Vue from '../vue/Vue';

const template = `
<figure class="player-wrap">
    <div class="cover">
        <img src="{{ cover }}" alt="{{ title }}">
        <div class="start"></div>
    </div>
    <figcaption>
        <h3>{{ title }} - {{ singer }}</h3>
        <div class="info">
            <span class="singer">{{ singer }}</span>
            <span class="album">{{ album }}</span>
        </div>
    </figcaption>
    <div class="control">
        <span class="icon-previous"></span>
        <span class="icon-start"></span>
        <span class="icon-next"></span>
        <span class="icon-cycle"></span>
        <span class="icon-list"></span>
        <span class="icon-unlike"></span>
    </div>
    <div class="progress">
        <div class="volume">
            <span class="icon-volume"></span>
            <div class="volume-prgress" style="{{ volumeStyle }}"></div>
        </div>
        <div class="time">
            <time class="total">{{ time.total }}</time>
            <time class="durtion">{{ time.durtion }}</time>
        </div>
        <div class="progress-bar">
            <div class="current" style="{{ progressStyle }}"></div>
        </div>
    </div>
    
</figure>`;
export default class Player {
    constructor (parent) {
        this.parent = parent = typeof parent === 'string' ? 
                        document.querySelector(parent) : 
                        parent;
        
        this.parent.innerHTML = template;

        this.vm = new Vue({
            el: 'figure.player-wrap',
            data: {
                title: '歌曲名',
                singer: '歌手',
                album: '专辑',
                time: {
                    total: 236,
                    durtion: 23
                }
            }
        });

        console.log(this.vm);
    }   
}