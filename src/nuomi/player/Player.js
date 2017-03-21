import Vue from '../vue/Vue';

const template = `
<figure class="player-wrap">
    <div class="player">
        <div class="cover">
            <img g-src="cover" g-alt="title">
            <div class="start"></div>
        </div>
        <div class="content">
            <figcaption g-title="title">
                <h3>{{ title }}</h3>
                <div class="info">
                    <span class="singer">{{ singer }}</span>
                    <span class="album">{{ album }}</span>
                </div>
            </figcaption>
            
            <div class="control">
                <span id="previous" class="icon-backward"></span>
                <span id="play" g-class="playOrPauseIcon"></span>
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
                    <time class="current">{{ time.current }}</time><time class="duration">{{ time.duration }}</time>
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
        this._currentPlayList = 0;
        this._duration = 0;
        this._current = 0;

        this.init();
    }

    init () {

        this.audio = document.querySelector('#g-player') || document.createElement('audio');
        this.audio.style.display = 'none';
        this.audio.setAttribute('id', 'g-player');
        this.audio.addEventListener('timeupdate', e => {
            this.current = this.audio.currentTime;
        });
        this.audio.addEventListener('loadedmetadata', e => {
            this.duration = this.audio.duration;
        });

        document.body.appendChild(this.audio);

        // Bind Vue and html
        const player = this;
        this.vm = new Vue({
            el: 'figure.player-wrap',
            data: {
                title: '歌曲名',
                singer: '歌手',
                album: '专辑',
                cover: 'https://ww4.sinaimg.cn/large/006tNc79gy1fdk3zs7r9nj308c08cdi7.jpg',
                time: {
                    duration: '00:00',
                    current: '00:00'
                },
                progress: 0,
                playOrPause: 'pause',
                isPlaying: true,
                loop: 'loop'
            },
            events: {
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
                        this.data.playOrPause = 'pause';
                    } else {
                        this.data.playOrPause = 'play'
                    }
                }
            },
            computed: {
                loopIcon: function () {
                    return 'icon-' + this.data.loop;
                },
                playOrPauseIcon: function () {
                    return 'icon-' + this.data.playOrPause;
                },
                progressStyle: function () {
                    return `width: ${this.data.progress}%`;
                }
            }
        });

        window.GPlayerVM = this.vm;
        this.data = this.vm.data;

        this.fetch();
    }

    fetch () {
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

    get duration () {
        return this._duration;
    }

    set duration (newVal) {
        this._duration = newVal;
        this.data.time.duration = this.secToTime(this.duration);
    }

    get current () {
        return this._current;
    }

    set current (newVal) {
        this._current = newVal;
        this.data.time.current = this.secToTime(this.current);
        this.data.progress = (this.current / this.duration) * 100;
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

    secToTime (totalSec) {
        totalSec = ~~totalSec;
        const min = ~~(totalSec / 60);
        const sec = totalSec % 60;
        return `${min >= 10 ? min : '0' + min}:${sec >= 10 ? sec : '0' + sec}`;
    }
}