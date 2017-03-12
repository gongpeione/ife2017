import Vue from '../vue/Vue';

const template = `
<figure class="player-wrap">
    <div class="player">
        <div class="cover">
            <img g-src="cover" g-alt="title" g-style="progressStyle">
            <div class="start"></div>
        </div>
        <div class="content">
            <figcaption>
                <h3>{{ title }}</h3>
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
                    <div class="volume-prgress">
                        <div class="current" g-style="volumeStyle"></div>
                    </div>
                </div>
                <div class="time">
                    <time class="total">{{ time.total }}</time>
                    <time class="durtion">{{ time.durtion }}</time>
                </div>
                <div class="progress-bar">
                    <div class="current" g-style="progressStyle"></div>
                </div>
            </div>
        </div>
    </div>

    <section class="list">
        <ul>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
        </ul>
    </section>
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
                // cover: 'https://ww3.sinaimg.cn/large/006tKfTcgy1fczj3tzyrqj31kw0vwh2a.jpg',
                time: {
                    total: 236,
                    durtion: 23
                },
                progressStyle: 'background: #000',
            }
        });

        console.log(this.vm);

        window.vm = this.vm;
    }   
}