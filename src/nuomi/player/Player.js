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
                <span id="previous" class="icon-backward"></span>
                <span id="play" g-class="playOrPause"></span>
                <span id="next" class="icon-forward"></span>
                <span id="loop" g-class="loopIcon"></span>
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

        this.audio = document.querySelector('#g-player') || document.createElement('audio');
        this.audio.style.display = 'none';
        this.audio.setAttribute('id', 'g-player');

        this._currentPlayList = 0;

        document.body.appendChild(this.audio);

        const player = this;
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
                playOrPause: 'icon-pause',
                isPlaying: true,
                loop: 'loop'
            },
            methods: {
                click: {
                    '#play': function (e) {
                        if (this.data.isPlaying) {
                            player.pause();
                        } else {
                            player.play();
                        }
                    },
                    '#next': function (e) {
                        player.next();
                    },
                    '#previous': function (e) {
                        player.previous();
                    },
                    '#loop': function (e) {
                        this.data.loop = this.data.loop === 'loop' ? 'shuffle' : 'loop'
                    }
                }
            },
            watch: {
                isPlaying: function () {
                    if (this.data.isPlaying) {
                        this.data.playOrPause = 'icon-pause';
                    } else {
                        this.data.playOrPause = 'icon-play'
                    }
                }
            },
            computed: {
                loopIcon: function () {
                    return 'icon-' + this.data.loop;
                }
            }
        });

        window.GPlayerVM = this.vm;
        this.data = this.vm.data;

        let url;
        if (process.env.NODE_ENV === 'production') {
            url = 'https://node.geeku.net/music';
        } else {
            url = 'http://localhost:3000/music';
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {

                this.playlist = data;

                const song = data[this.currentPlayList];
                this.vm.data.title = song.title;
                this.vm.data.singer = song.singer;
                this.vm.data.cover = song.albumBig;

                this.audio.setAttribute('src', song.original);
                
                this.play();
            });
    }

    set currentPlayList (newIndex) {

        if (newIndex < 0) {
            newIndex = 0;
        }
        if (newIndex > this.playlist.length - 1) {
            newIndex = this.playlist.length - 1;
        }

        this._currentPlayList = newIndex;
        
        this.pause();

        const song = this.playlist[this.currentPlayList];

        this.vm.data.title = song.title;
        this.vm.data.singer = song.singer;
        this.vm.data.cover = song.albumBig;

        this.audio.setAttribute('src', song.original);
        
        this.play();
    }

    get currentPlayList () {
        return this._currentPlayList;
    }

    randomList () {
        return Math.ceil(Math.random() * this.playlist.length);
    }

    play () {
        this.audio.play();
        this.data.isPlaying = true;
    }

    pause () {
        this.audio.pause();
        this.data.isPlaying = false;
    }

    next () {
        if (this.data.loop === 'loop') {
            this.currentPlayList += 1;
        } else {
            this.currentPlayList = this.randomList();
        }
    }

    previous () {
        if (this.data.loop === 'loop') {
            this.currentPlayList -= 1;
        } else {
            this.currentPlayList = this.randomList();
        }
    }
}