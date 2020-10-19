class Apt {
    constructor(name, complex, bjd) {
        this.name = name;
        this.complex = complex;
        this.bjd = bjd;
    }

    // [TO-DO] querylist를 여기서 반환하는 게 맞는지
    getQueryList() {

        if (this.complex == "") {
            return [`${this.bjd} ${this.name}`,
            `${this.bjd}`]
        }

        return [`${this.bjd} ${this.name} ${this.complex}차`,
        `${this.bjd} ${this.name}`,
        `${this.bjd}`]
    }
}


// [TO-DO] 단지, 차 빼주는 함수 만들기 
// 차 옆에는 숫자가 있으면 다 제거

//item이 의미하는 건 매물 객체
export const getAptQueryList = (item) => {

    let str = item['name']
    let bjd = item['bjd']


    //이름만 추출해내기
    let tempStr = str;

    if (str.indexOf('(') != -1) {
        tempStr = str.substring(0, str.indexOf('('));
    }

    //단지 특정 X -> null
    const complex = tempStr.replace(/[^0-9]/g, '');
    let aptObj;

    let name = tempStr.replace(/[0-9]/g, "")

    if (complex == "") {
        aptObj = new Apt(name, complex, "")
    }

    aptObj = new Apt(name, complex, bjd)

    return aptObj.getQueryList()
}


export const getRefinedPrice = (str) => {
    let temp1 = str.trim();
    let temp2 = temp1.replace(',', '');
    let int_deposit = parseInt(temp2[0]);

    return int_deposit;
}

// export const getRefinedMonthlyRent = (str_montly_rent) => {
//     let temp1 = str_montly_rent.trim();
//     let temp2 = temp1.split(',');
//     let int_deposit = parseInt(temp2[0]) * 1000;

//     for (i = 1; i < temp2.length; i++) {
//         int_deposit *= 1000;
//     }

//     return int_deposit;
// }