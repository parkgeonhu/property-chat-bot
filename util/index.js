var fs = require('fs');

export const writeJSONData = (funcName, data) => {
    fs.writeFile(`${funcName}.txt`, JSON.stringify(data), 'utf8', function (err) {
        console.log(`${funcName}.txt 쓰기 완료`);
    });
}