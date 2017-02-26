import { g } from './gtool';
import createEntries from './createEntries';
import Router from './Router';

import './style/index.scss';
import taskList from './taskList.json';

createEntries('.entries nav');

const Handler = {
    contextMenu (parame) {
        // console.log('contextMenuHandler');
        // console.log(parame);
        require.ensure([], function(require){
            require('./nuomi/contextMenu').create('.container');
        });
    },
    threejs1 (parame) {
        // console.log('contextMenuHandler');
        // console.log(parame);
        require.ensure([], function(require){
            require('./echarts/threejs1').create('.container');
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
    }
]);

router.beforeEach((from, to, next) => {
    console.log('before1');
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