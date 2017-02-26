import { g } from './gtool';

import taskList from './taskList.json';

const entries = taskList;

export default function createEntries (parent) {
    parent = typeof parent === 'string' ? g.$(parent) : parent;

    const entriesList = [];
    entries.forEach(topLevel => {

        const topLevelList = [];
        const ul = new g.vdom('ul');
        const title = new g.vdom('li', {}, [ topLevel.title ]);

        topLevel.tasks.forEach(task => {
            const taskList = new g.vdom('li', {}, [ task.title ]);
            
            taskList.addEvent('click', e => {
                location.hash = '!/' + task.name;
                // Handler[task.name](e);
            });

            topLevelList.push(taskList);
        });

        ul.addChildren(topLevelList);
        entriesList.push(title, ul);
    })

    const ul = new g.vdom('ul', {}, entriesList);
    parent.appendChild(ul.render());
}