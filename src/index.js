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

var disqus_config = function () {
    this.page.url = location.href;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = location.href; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};

(function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://ife2017.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();

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
        handler: () => {
            g.$('.container').innerHTML = '';
        }
    },
    {
        path: '/contextMenu',
        handler: Handler.contextMenu,
        default: true
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
    },
    {
        path: '*',
        handler: ({ from, to }) => {
            g.$('.container').innerHTML = '<div class="page404">Oops~ Page cannot be found</div>';
        }
    },
]);

router.beforeEach((from, to, next, status) => {
    
    // if it is not first page
    if (from.path !== to.path) {
        // clear container
        g.$('.container').innerHTML = '<div class="loading"></div>';
    }

    // restore console.log
    console.log = oldConsole;

    // replace github link
    g.$('.github a').href = githubLinks[to.path.replace('/', '')];

    const dsq = window.DISQUS;

    let url, identifier;
    if (status === '404') {
        identifier = location.protocol + '//' + location.host + location.pathname + '#!/404';
    } else {
        identifier = to.fullPath;
    }

    dsq && dsq.reset({
        reload: true,
        config: function () {
            console.log('reset:' + identifier);
            this.page.url = identifier;
            this.page.identifier = identifier;
        }
    });

    next();

}).start();