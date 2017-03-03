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
        loading.show();
        require.ensure(['./nuomi/contextMenu'], function(require){
            require('./nuomi/contextMenu').create('.container');
            loading.hide();
        });
    },
    threejs1 (parame) {
        loading.show();
        require.ensure(['./echarts/threejs1'], function(require){
            require('./echarts/threejs1').create('.container');
            loading.hide();
        });
    },
    hoverEffect (parame) {
        loading.show();
        require.ensure(['./nuomi/hoverEffect'], function(require){
            require('./nuomi/hoverEffect').create('.container');
            loading.hide();
        });
    },
    vue1 (parame) {
        loading.show();
        require.ensure(['./nuomi/vue1'], function(require){
            require('./nuomi/vue1').create('.container');
            loading.hide();
        });
    },
    vue2 (parame) {
        loading.show();
        require.ensure(['./nuomi/vue2'], function(require){
            require('./nuomi/vue2').create('.container');
            loading.hide();
        });
    },
    vue3 (parame) {
        loading.show();
        require.ensure(['./nuomi/vue3'], function(require){
            require('./nuomi/vue3').create('.container');
            loading.hide();
        });
    },
    vue4 (parame) {
        loading.show();
        require.ensure(['./nuomi/vue4'], function(require){
            require('./nuomi/vue4').create('.container');
            loading.hide();
        });
    },
    vue5 (parame) {
        loading.show();
        require.ensure(['./nuomi/vue5'], function(require){
            require('./nuomi/vue5').create('.container');
            loading.hide();
        });
    },
    collapse (parame) {
        loading.show();
        require.ensure(['./nuomi/collapse'], function(require){
            require('./nuomi/collapse').create('.container');
            loading.hide();
        });
    },
    loading (parame) {
        loading.show();
        require.ensure(['./nuomi/loading'], function(require){
            require('./nuomi/loading').create('.container');
            loading.hide();
        });
    },
    slider (parame) {
        loading.show();
        require.ensure(['./nuomi/slider'], function(require){
            require('./nuomi/slider').create('.container');
            loading.hide();
        });
    },
    snake (parame) {
        loading.show();
        require.ensure(['./business/snake'], function(require){
            require('./business/snake').create('.container');
            loading.hide();
        });
    },
    player (parame) {
        loading.show();
        require.ensure(['./nuomi/player'], function(require){
            require('./nuomi/player').create('.container');
            loading.hide();
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
    g.$('.container').innerHTML = '';

    // restore console.log
    console.log = oldConsole;

    // replace github link
    g.$('.github a').href = githubLinks[to.path.replace('/', '')];
    
    next();
});