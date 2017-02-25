const webpage = require('webpage');
const page = webpage.create();
const system = require('system');
const keyword = encodeURIComponent(system.args[1]);
const urlTemplate = 'https://www.baidu.com/s?wd=';

// console.log('keycode:' , keyword);

// page.onConsoleMessage = function (msg) {
//     console.log(msg);
// };

// console.log('page');

const startTime = new Date();
page.onError = function(err) {
    // console.log(err);
};
phantom.onError = function(err) {
    // console.log(err);
};
try {
    const retData = {
        code: -1,
        msg: 'Failed',
        keyword: decodeURIComponent(keyword),
        time: 0,
        dataList: []
    }
    page.open(urlTemplate + keyword, function (status) {
        if (status !== 'success') {
            throw new Error('Failed');
        }
        // console.log('page');
        const content = page.evaluate(function() {
            const items = $('.result.c-container, .result-op.c-container').map(function(_, item) {
                return { 
                    title: $(item).find('h3 a:first-child').text() || '',  
                    info: $(item).find('p,.op_kefu_table').text().trim().replace(/[\s]/g, '') || '',
                    link: $(item).find('h3 a:first-child').attr('href') || '',
                    pic: $(item).find('img').attr('src') || ''
                }
            });

            return items.toArray();
        });

        retData.code = 1;
        retData.msg = "successful";
        retData.time = (new Date()) - startTime;
        retData.dataList = content;

        console.log(JSON.stringify(retData, null, '    '));

        // console.log(content);

        phantom.exit();
    });
} catch (err) {
    console.log(err);
    phantom.exit();
    // retData.msg = JSON.stringify(err, null, '    ');
    // retData.time = (new Date()) - startTime;

    // console.log(JSON.stringify(retData, null, '    '));
}
// phantom.exit();