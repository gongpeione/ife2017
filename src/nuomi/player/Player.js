import Vue from '../vue/Vue';

const template = `
<figure class="player-wrap">
    <div class="player">
        <div class="cover">
            <img g-src="cover" g-alt="title">
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
                <span class="icon-backward"></span>
                <span class="icon-play"></span>
                <span class="icon-forward"></span>
                <span class="icon-loop"></span>
                <label class="icon-list" for="listSwitch"></label>
                <span class="icon-like"></span>
            </div>
            <div class="progress">
                <div class="volume">
                    <span class="icon-volume"></span>
                    <div class="volume-prgress">
                        <div class="current" g-style="volumeStyle"></div>
                    </div>
                </div>
                <div class="time">
                    <time class="total">{{ time.total }}</time><time class="durtion">{{ time.durtion }}</time>
                </div>
                <div class="progress-bar">
                    <div class="current" g-style="progressStyle"></div>
                </div>
            </div>
        </div>
    </div>

    <input type="checkbox" id="listSwitch"/>
    <section class="list">
        <ul>
            <li>
                <img g-src="cover" g-alt="title">
                <span class="info">
                    <span class="title">{{ title }}</span>
                    <span class="singer">{{ singer }}</span>
                </span>
                <span class="icon-delete"></span>
            </li>
            <li>
                <img g-src="cover" g-alt="title">
                <span class="info">
                    <span class="title">{{ title }}</span>
                    <span class="singer">{{ singer }}</span>
                </span>
                <span class="icon-delete"></span>
            </li>
            <li>
                <img g-src="cover" g-alt="title">
                <span class="info">
                    <span class="title">{{ title }}</span>
                    <span class="singer">{{ singer }}</span>
                </span>
                <span class="icon-delete"></span>
            </li>
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
                cover: 'https://ww4.sinaimg.cn/large/006tNc79gy1fdk3zs7r9nj308c08cdi7.jpg',
                time: {
                    total: 236,
                    durtion: 23
                },
                progressStyle: 'width: 50%',
            }
        });

        window.vm = this.vm;

        let url;
        if (process.env.NODE_ENV === 'production') {
            url = 'https://node.geeku.net/music';
        } else {
            url = 'http://localhost:3000/music';
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const song = data[1];
                console.log(song);
                this.vm.data.title = song.title;
                this.vm.data.singer = song.singer;
                this.vm.data.cover = song.albumBig;
            });
    }   
}