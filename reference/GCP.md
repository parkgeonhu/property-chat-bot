## req, res 예시
### req
```shell
curl --location --request GET 'https://maps.googleapis.com/maps/api/directions/json?origin=37.63906582026493,127.07703045060357&destination=37.6107638961532,126.996969239236&mode=transit&key=AIzaSyD2gG5pQmaMSmlw2CMhM9-PvhbZNB5LQQU' \
```

### res
```json
{
    "geocoded_waypoints": [
        {
            "geocoder_status": "OK",
            "place_id": "ChIJfaJsLnq5fDURLnV8Rg5XHzk",
            "types": [
                "establishment",
                "point_of_interest"
            ]
        },
        {
            "geocoder_status": "OK",
            "place_id": "ChIJNcH8COK8fDURGmDpf38AaI4",
            "types": [
                "street_address"
            ]
        }
    ],
    "routes": [
        {
            "bounds": {
                "northeast": {
                    "lat": 37.6390658,
                    "lng": 127.0770305
                },
                "southwest": {
                    "lat": 37.602073,
                    "lng": 126.994762
                }
            },
            "copyrights": "Map data ©2020 SK telecom",
            "legs": [
                {
                    "arrival_time": {
                        "text": "오후 3:02",
                        "time_zone": "Asia/Seoul",
                        "value": 1603173751
                    },
                    "departure_time": {
                        "text": "오후 2:30",
                        "time_zone": "Asia/Seoul",
                        "value": 1603171808
                    },
                    "distance": {
                        "text": "9.3 km",
                        "value": 9343
                    },
                    "duration": {
                        "text": "32분",
                        "value": 1943
                    },
                    "end_address": "대한민국 서울특별시 성북구 정릉3동 861-1",
                    "end_location": {
                        "lat": 37.61076389999999,
                        "lng": 126.9969692
                    },
                    "start_address": "대한민국 서울특별시 노원구 하계동 255",
                    "start_location": {
                        "lat": 37.6390658,
                        "lng": 127.0770305
                    },
                    "steps": [
                        {
                            "distance": {
                                "text": "0.3 km",
                                "value": 263
                            },
                            "duration": {
                                "text": "4분",
                                "value": 264
                            },
                            "end_location": {
                                "lat": 37.638329,
                                "lng": 127.074191
                            },
                            "html_instructions": "골마을근린공원까지 도보",
                            "polyline": {
                                "points": "ekvdFmvrfWrCvP"
                            },
                            "start_location": {
                                "lat": 37.6390658,
                                "lng": 127.0770305
                            },
                            "steps": [
                                {
                                    "distance": {
                                        "text": "0.3 km",
                                        "value": 263
                                    },
                                    "duration": {
                                        "text": "4분",
                                        "value": 264
                                    },
                                    "end_location": {
                                        "lat": 37.638329,
                                        "lng": 127.074191
                                    },
                                    "polyline": {
                                        "points": "ekvdFmvrfWrCvP"
                                    },
                                    "start_location": {
                                        "lat": 37.6390658,
                                        "lng": 127.0770305
                                    },
                                    "travel_mode": "WALKING"
                                }
                            ],
                            "travel_mode": "WALKING"
                        },
                        {
                            "distance": {
                                "text": "5.4 km",
                                "value": 5436
                            },
                            "duration": {
                                "text": "12분",
                                "value": 695
                            },
                            "end_location": {
                                "lat": 37.607001,
                                "lng": 127.028336
                            },
                            "html_instructions": "버스 용산구청행",
                            "polyline": {
                                "points": "qfvdFudrfWRjANpB?JNpFNbANv@V|@`@x@R^LVBDlBdEx@zAfArBz@fB`AnB|@|A@BRZ~DhHl@dA@Bz@fBfF`JZbAX~@fAhBBDdDxExCtFrClFj@xAJRdG`LfDjG`CnEtDfGFH~CjFx@|Ap@dB`BhDf@dA@BnCtFb@n@`AnArBzA~CvA@@jAf@tCnA\\RjBzA@@x@x@^h@`AxAf@x@fIrMfApAt@x@`KjJDD@@pDxCVd@dAhB|@|Bt@dB~BxFtEtK@B@@fCnGfAjBvB~AdH`G@@"
                            },
                            "start_location": {
                                "lat": 37.638329,
                                "lng": 127.074191
                            },
                            "transit_details": {
                                "arrival_stop": {
                                    "location": {
                                        "lat": 37.607001,
                                        "lng": 127.028336
                                    },
                                    "name": "월곡뉴타운"
                                },
                                "arrival_time": {
                                    "text": "오후 2:46",
                                    "time_zone": "Asia/Seoul",
                                    "value": 1603172767
                                },
                                "departure_stop": {
                                    "location": {
                                        "lat": 37.638329,
                                        "lng": 127.074191
                                    },
                                    "name": "골마을근린공원"
                                },
                                "departure_time": {
                                    "text": "오후 2:34",
                                    "time_zone": "Asia/Seoul",
                                    "value": 1603172072
                                },
                                "headsign": "용산구청",
                                "headway": 600,
                                "line": {
                                    "agencies": [
                                        {
                                            "name": "서울특별시버스운송사업조합",
                                            "url": "http://www.odsay.com/Bus/Seoul_Main.asp?CID=1000&LMenu=1"
                                        }
                                    ],
                                    "color": "#374ff2",
                                    "name": "서울 간선버스",
                                    "short_name": "100",
                                    "text_color": "#ffffff",
                                    "vehicle": {
                                        "icon": "//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png",
                                        "name": "버스",
                                        "type": "BUS"
                                    }
                                },
                                "num_stops": 13
                            },
                            "travel_mode": "TRANSIT"
                        },
                        {
                            "distance": {
                                "text": "3.4 km",
                                "value": 3450
                            },
                            "duration": {
                                "text": "13분",
                                "value": 750
                            },
                            "end_location": {
                                "lat": 37.61071099999999,
                                "lng": 126.994762
                            },
                            "html_instructions": "버스 당곡사거리행",
                            "polyline": {
                                "points": "wbpdFcfifWlAlAfB`ClLjOt@tA@@nAbCHRbAjCd@~Az@`@RJh@JU|Ce@dEi@`DMz@A@s@vDm@nBOz@s@lE[jBOt@I~@@B@dBBhDCbAWxAkBfCa@|@k@bB[~@?@wChHWx@MpAWdESz@AD_@v@mBnBkAvBm@dA_@fAYbASfAMr@Gt@HbAN~@Dj@Dp@@Z?Vg@dC?BkCzK?@u@fDiAlFgB|Ge@pAo@|AcBjE?@@@"
                            },
                            "start_location": {
                                "lat": 37.607001,
                                "lng": 127.028336
                            },
                            "transit_details": {
                                "arrival_stop": {
                                    "location": {
                                        "lat": 37.61071099999999,
                                        "lng": 126.994762
                                    },
                                    "name": "국민대학교앞"
                                },
                                "arrival_time": {
                                    "text": "오후 2:59",
                                    "time_zone": "Asia/Seoul",
                                    "value": 1603173556
                                },
                                "departure_stop": {
                                    "location": {
                                        "lat": 37.607001,
                                        "lng": 127.028336
                                    },
                                    "name": "월곡뉴타운"
                                },
                                "departure_time": {
                                    "text": "오후 2:46",
                                    "time_zone": "Asia/Seoul",
                                    "value": 1603172806
                                },
                                "headsign": "당곡사거리",
                                "headway": 420,
                                "line": {
                                    "agencies": [
                                        {
                                            "name": "서울특별시버스운송사업조합",
                                            "url": "http://www.odsay.com/Bus/Seoul_Main.asp?CID=1000&LMenu=1"
                                        }
                                    ],
                                    "color": "#374ff2",
                                    "name": "서울 간선버스",
                                    "short_name": "153",
                                    "text_color": "#ffffff",
                                    "vehicle": {
                                        "icon": "//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png",
                                        "name": "버스",
                                        "type": "BUS"
                                    }
                                },
                                "num_stops": 8
                            },
                            "travel_mode": "TRANSIT"
                        },
                        {
                            "distance": {
                                "text": "0.2 km",
                                "value": 194
                            },
                            "duration": {
                                "text": "3분",
                                "value": 195
                            },
                            "end_location": {
                                "lat": 37.61076389999999,
                                "lng": 126.9969692
                            },
                            "html_instructions": "대한민국 서울특별시 성북구 정릉3동 861-1까지 도보",
                            "polyline": {
                                "points": "}ypdFgtbfWIyL"
                            },
                            "start_location": {
                                "lat": 37.61071099999999,
                                "lng": 126.994762
                            },
                            "steps": [
                                {
                                    "distance": {
                                        "text": "0.2 km",
                                        "value": 194
                                    },
                                    "duration": {
                                        "text": "3분",
                                        "value": 195
                                    },
                                    "end_location": {
                                        "lat": 37.61076389999999,
                                        "lng": 126.9969692
                                    },
                                    "polyline": {
                                        "points": "}ypdFgtbfWIyL"
                                    },
                                    "start_location": {
                                        "lat": 37.61071099999999,
                                        "lng": 126.994762
                                    },
                                    "travel_mode": "WALKING"
                                }
                            ],
                            "travel_mode": "WALKING"
                        }
                    ],
                    "traffic_speed_entry": [],
                    "via_waypoint": []
                }
            ],
            "overview_polyline": {
                "points": "ekvdFmvrfWrCvPRjANpBN|F^zBV|@`@x@`@v@pBjE`CnE|BvE~@`BbGnKz@fBfF`Jt@bCjAnBdDxExCtFrClFj@xApGtLhHzM|DpG~CjFx@|Ap@dB`BhDh@hAnCtFb@n@`AnArBzA`DxA`FvB\\RjBzAz@z@`BbCf@x@fIrMfApAt@x@`KjJFFpDxCVd@dAhB|@|BtD~IvExKhCpGfAjBvB~AfHbGlAlAfB`ClLjOv@vAxAvCbAjCd@~AnAl@h@JU|Ce@dEi@`DO|@s@vDm@nBcAhGk@`DGbADnGCbAWxAkBfCa@|@gAbDwCjHWx@MpAWdESz@a@|@mBnByB|D_@fAYbAa@zBGt@HbATjBFlA?Vg@dCkC~Ku@hDiAlFgB|GuAnDcBlE@@IyL"
            },
            "summary": "",
            "warnings": [
                "도보 경로는 베타 서비스입니다. 주의 – 이 경로에는 인도 또는 보행 경로가 누락되었을 수도 있습니다."
            ],
            "waypoint_order": []
        }
    ],
    "status": "OK"
}
```