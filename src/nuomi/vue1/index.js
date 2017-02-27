import template from './template.html';
import { g, CONST } from '../../gtool';
import '../vue2/style.scss';
import Observer from './Observer';

export function create (parent, option = []) {
    parent = typeof parent === 'string' ? g.$(parent) : parent;

    parent.innerHTML = template;

    const oldConsole = console.log;
    const outputList = [];
    console.log = (output, isCommand = false) => {
        if (isCommand) {
            outputList.push(`<div class="command"><span>> </span>${output}</div>`);
        } else {
            outputList.push(`<div><span>< </span>${output}</div>`);
        }
    };

    console.log(`let app1 = new Observer({
        name: 'youngwind',
        age: 25
    });`, true);
    let app1 = new Observer({
        name: 'youngwind',
        age: 25
    });
    // console.log
    console.log('app1.data.name', true);
    app1.data.name // 你访问了 name
    console.log('app1.data.age = 100;', true);
    app1.data.age = 100;  // 你设置了 age，新的值为100

    playCommand(outputList);

    console.log = (output, isCommand = false) => {
        if (isCommand) {
            addList(`<div class="command"><span>> </span>${output}</div>`);
        } else {
            addList(`<div><span>< </span>${output}</div>`);
        }
    };
    const input = g.$('.console input');
    input.addEventListener('keyup', e => {
        if (e.keyCode === CONST.KEY_CODE.ENTER) {
            
            const command = input.value;
            console.log(command, true);

            if (/app1\.data\.(\w+)+?\s?=?('.*?')?/.test(command)) {
                eval(command);
            } else {
                console.log("[warning] Command illegal");
            }

            input.value = '';
        }
    });

    // console.log = oldConsole;
}

async function playCommand (outputList) {
    // console.log(outputList);
    for(let i = 0; i < outputList.length; i++) {
        await new Promise((r, j) => { setTimeout(() => { r() } , 200); });
        await addList(outputList[i]);
    }
}

function addList (output) {
    const outputEle = g.$('.console .output');
    outputEle.innerHTML += output;
    outputEle.scrollTop = outputEle.scrollHeight;
}