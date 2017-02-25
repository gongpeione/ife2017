import { g } from './gtool';
import createEntries from './createEntries';
import Router from './Router';

import './style/index.scss';

// const $ = g.$;
// const $$ = g.$$;

createEntries('.entries nav');

const Handler = {
    contextMenu (parame) {
        // console.log('contextMenuHandler');
        console.log(parame);
        require.ensure([], function(require){
            const contextMenuFunc = require('./nuomi/contextMenu').createMenu;
            // console.log(contextMenuFunc.default);
            contextMenuFunc('.container');
        });
    }
}
new Router([
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
    }
]);