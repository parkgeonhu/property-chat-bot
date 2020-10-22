var fs = require('fs');

export const writeJSONData = (funcName, data) => {
  fs.writeFile(`./log/${funcName}.txt`, JSON.stringify(data), 'utf8', function (err) {
    console.log(`${funcName}.txt 쓰기 완료`);
  });
}

export const getUniqueArray = (array, key) => {
  return array.filter((item, i) => {
    return array.findIndex((item2, j) => {
      return item[key] === item2[key];
    }) === i;
  });
}

export const getRefinedPrice = (str) => {
  let temp1 = str.trim();
  let temp2 = temp1.replace(',', '');
  let int_deposit = parseInt(temp2);

  return int_deposit;
}

export const getDistance = (sx, sy, dx, dy) => {
  const diffX = dx - sx;
  const diffY = dy - sy;
  return Math.sqrt(Math.abs(diffX * diffX) + Math.abs(diffY * diffY));
}