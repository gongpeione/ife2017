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
        path: '/collapse',
        handler: Handler.collapse
    },
    {
        path: '/loading',
        handler: Handler.loading
    }
]);

router.beforeEach((from, to, next) => {
    // clear container
    g.$('.container').innerHTML = '';

    // reduce console.log
    console.log = oldConsole;

    // replace github link
    console.log(g.$('.github a'), githubLinks[to.path.replace('/', '')]);
    g.$('.github a').href = githubLinks[to.path.replace('/', '')];
    
    next();
});

router.beforeEach((from, to, next) => {
    console.log('before2');
    next();
});

router.beforeEach((from, to, next) => {
    console.log('before3');
    // console.log(g.$('.github a'), githubLinks[to.path.replace('/', '')]);
    // g.$('.github a').href = githubLinks[to.path.replace('/', '')];
    next();
});

router.afterEach((from, to) => {
    console.log('after1');
});

router.afterEach((from, to) => {
    console.log('after2');
});