import axios from 'axios';
const apiKey = require(__dirname + '/../../../../config/api.config.json');

var xml2js = require('xml2js');
var parser = new xml2js.Parser();

```
11110	종로구
11140	중구
11170	용산구
11200	성동구
11215	광진구
11230	동대문구
11260	중랑구
11290	성북구
11305	강북구
11320	도봉구
11350	노원구
11380	은평구
11410	서대문구
11440	마포구
11470	양천구
11500	강서구
11530	구로구
11545	금천구
11560	영등포구
11590	동작구
11620	관악구
11650	서초구
11680	강남구
11710	송파구
11740	강동구
```



// [TO-DO] XML parser 라이브러리 알아보기
export const getRTMSDataSvcAptRentInfo = async (lawd_cd, deal_ymd, pageNo) => {
    //LAWD_CD 지역코드 CSV 파일 참조
    const res = await axios({
        url: 'http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptRent?'+
        'type=xml' +
        '&serviceKey='+apiKey['openKey'] +
        '&LAWD_CD='+lawd_cd +
        '&DEAL_YMD='+deal_ymd +
        '&pageNo='+pageNo
        ,
        method: 'GET'
    });

    let data;

    parser.parseString(res.data, function(err, result) {
        //db에 inserting 하는 작업
        data=result
    });

    return data;

    //return res.data.meta.total_count
};

