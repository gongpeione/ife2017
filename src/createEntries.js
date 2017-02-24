import { g } from './gtool';

// const $ = g.$;
// const $$ = g.$$;

const entries = [
    {
        title: '百度糯米前端技术学院',
        tasks: [
            {
                title: '自定义网页右键菜单',
                name: 'contextMenu',
                completed: false
            }
        ]
    }
];

const Handler = {
    contextMenu (e) {
        console.log('contextMenuHandler');
        require.ensure([], function(require){
            const contextMenuFunc = require('./nuomi/contextMenu').createMenu;
            // console.log(contextMenuFunc.default);
            contextMenuFunc('.container');
        });
    }
}

export default function createEntries (parent) {
    parent = typeof parent === 'string' ? g.$(parent) : parent;

    const entriesList = [];
    entries.forEach(topLevel => {

        const topLevelList = [];
        const ul = new g.vdom('ul');
        const title = new g.vdom('li', {}, [ topLevel.title ]);

        topLevel.tasks.forEach(task => {
            const taskList = new g.vdom('li', {}, [ task.title ]);
            
            taskList.addEvent('click', Handler[task.name]);

            topLevelList.push(taskList);
        });

        ul.addChildren(topLevelList);
        entriesList.push(title, ul);
    })

    const ul = new g.vdom('ul', {}, entriesList);
    parent.appendChild(ul.render());
}