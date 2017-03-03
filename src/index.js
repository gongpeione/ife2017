import 'babel-polyfill';

import { g } from './gtool';
import createEntries from './createEntries';
import Router from './Router';

import './style/index.scss';
import taskList from './taskList.json';

createEntries('.entries nav');

const oldConsole = console.log;

const loadingEle = g.$('.loading');
const loading = {
    hide (func = () => {}) {
        func();
        g.class(loadingEle, 'hide');
        g.class(loadingEle, 'show', true);
    },
    show (func = () => {}) {
        func();
        g.class(loadingEle, 'show');
        g.class(loadingEle, 'hide', true);
    }
}

const Handler = {
    contextMenu (parame) {
        require.ensure([], function(require){
            require('./nuomi/contextMenu').create('.container');
        });
    },
    threejs1 (parame) {
        require.ensure([], function(require){
            require('./echarts/threejs1').create('.container');
        });
    },
    hoverEffect (parame) {
        require.ensure([], function(require){
            require('./nuomi/hoverEffect').create('.container');
        });
    },
    vue1 (parame) {
        require.ensure([], function(require){
            require('./nuomi/vue1').create('.container');
        });
    },
    vue2 (parame) {
        require.ensure([], function(require){
            require('./nuomi/vue2').create('.container');
        });
    },
    vue3 (parame) {
        require.ensure([], function(require){
            require('./nuomi/vue3').create('.container');
        });
    },
    vue4 (parame) {
        require.ensure([], function(require){
            require('./nuomi/vue4').create('.container');
        });
    },
    vue5 (parame) {
        require.ensure([], function(require){
            require('./nuomi/vue5').create('.container');
        });
    },
    collapse (parame) {
        require.ensure([], function(require){
            require('./nuomi/collapse').create('.container');
        });
    },
    loading (parame) {
        require.ensure([], function(require){
            require('./nuomi/loading').create('.container');
        });
    },
    slider (parame) {
        require.ensure([], function(require){
            require('./nuomi/slider').create('.container');
        });
    },
    snake (parame) {
        require.ensure([], function(require){
            require('./business/snake').create('.container');
        });
    },
    player (parame) {
        require.ensure([], function(require){
            require('./nuomi/player').create('.container');
        });
    }
}

const githubLinks = {};
taskList.forEach(collage => {
    collage.tasks.forEach(task => {
        githubLinks[task.name] = task.github;
    })
});
// console.log(githubLinks);
const router = new Router([
    {
        path: '/',
        handler: (parame) => {
            console.log(parame);
            g.$('.container').innerHTML = '';
        }
    },
    {
        path: '/contextMenu',
        handler: Handler.contextMenu
    },
    {
        path: '/phantomjs1',
        handler: () => {
            g.$('.container').innerHTML = '<div class="nopage"></div>';
        }
    },
    {
        path: '/threejs1',
        handler: Handler.threejs1
    },
    {
        path: '/hoverEffect',
        handler: Handler.hoverEffect
    },
    {
        path: '/vue1',
        handler: Handler.vue1
    },
    {
        path: '/vue2',
        handler: Handler.vue2
    },
    {
        path: '/vue3',
        handler: Handler.vue3
    },
    {
        path: '/vue4',
        handler: Handler.vue4
    },
    {
        path: '/vue5',
        handler: Handler.vue5
    },
    {
        path: '/collapse',
        handler: Handler.collapse
    },
    {
        path: '/loading',
        handler: Handler.loading
    },
    {
        path: '/slider',
        handler: Handler.slider
    },
    {
        path: '/snake',
        handler: Handler.snake
    },
    {
        path: '/player',
        handler: Handler.player
    }
]);

router.beforeEach((from, to, next) => {
    // clear container
    g.$('.container').innerHTML = '<div class="loading"></div>';

    // restore console.log
    console.log = oldConsole;

    // replace github link
    g.$('.github a').href = githubLinks[to.path.replace('/', '')];

    const dsq = window.DISQUS;
    dsq.reset({
        reload: true,
        config: function () {
            // this.page.identifier = (self.$route.path || window.location.pathname)
            this.page.url = to.fullPath;
            this.page.identifier = to.fullPath;
        }
    });
    
    next();
});