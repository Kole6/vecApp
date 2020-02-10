// @type 字符串类型 必填项 可取值 hierarchy/filter  hierarchy单/多层级菜单(最多三级); filter筛选多选菜单
const city = [{
        name: "全部",
        value: ""
    },
    {
        value: 11,
        name: "北京",
        submenu: [{
            value: 1101,
            name: "北京市"
        }]
    }, {
        value: 12,
        name: "天津",
        submenu: [{
            value: 1201,
            name: "天津市"
        }]
    }, {
        value: 13,
        name: "河北",
        submenu: [{
                value: 1301,
                name: "石家庄市"
            },
            {
                value: 1302,
                name: "唐山市"
            },
            {
                value: 1303,
                name: "秦皇岛市"
            },
            {
                value: 1304,
                name: "邯郸市"
            },
            {
                value: 1305,
                name: "邢台市"
            },
            {
                value: 1306,
                name: "保定市"
            },
            {
                value: 1307,
                name: "张家口市"
            },
            {
                value: 1308,
                name: "承德市"
            },
            {
                value: 1309,
                name: "沧州市"
            },
            {
                value: 1310,
                name: "廊坊市"
            },
            {
                value: 1311,
                name: "衡水市"
            }
        ]
    }, {
        value: 14,
        name: "山西",
        submenu: [{
                value: 1401,
                name: "太原市"
            },
            {
                value: 1402,
                name: "大同市"
            },
            {
                value: 1403,
                name: "阳泉市"
            },
            {
                value: 1404,
                name: "长治市"
            },
            {
                value: 1405,
                name: "晋城市"
            },
            {
                value: 1406,
                name: "朔州市"
            },
            {
                value: 1407,
                name: "晋中市"
            },
            {
                value: 1408,
                name: "运城市"
            },
            {
                value: 1409,
                name: "忻州市"
            },
            {
                value: 1410,
                name: "临汾市"
            },
            {
                value: 1411,
                name: "吕梁市"
            }
        ]
    }, {
        value: 15,
        name: "内蒙古",
        submenu: [{
                value: 1501,
                name: "呼和浩特市"
            },
            {
                value: 1502,
                name: "包头市"
            },
            {
                value: 1503,
                name: "乌海市"
            },
            {
                value: 1504,
                name: "赤峰市"
            },
            {
                value: 1505,
                name: "通辽市"
            },
            {
                value: 1506,
                name: "鄂尔多斯市"
            },
            {
                value: 1507,
                name: "呼伦贝尔市"
            },
            {
                value: 1508,
                name: "巴彦淖尔市"
            },
            {
                value: 1509,
                name: "乌兰察布市"
            },
            {
                value: 1522,
                name: "兴安盟"
            },
            {
                value: 1525,
                name: "锡林郭勒盟"
            },
            {
                value: 1529,
                name: "阿拉善盟"
            }
        ]
    }, {
        value: 21,
        name: "辽宁",
        submenu: [{
                value: 2101,
                name: "沈阳市"
            },
            {
                value: 2102,
                name: "大连市"
            },
            {
                value: 2103,
                name: "鞍山市"
            },
            {
                value: 2104,
                name: "抚顺市"
            },
            {
                value: 2105,
                name: "本溪市"
            },
            {
                value: 2106,
                name: "丹东市"
            },
            {
                value: 2107,
                name: "锦州市"
            },
            {
                value: 2108,
                name: "营口市"
            },
            {
                value: 2109,
                name: "阜新市"
            },
            {
                value: 2110,
                name: "辽阳市"
            },
            {
                value: 2111,
                name: "盘锦市"
            },
            {
                value: 2112,
                name: "铁岭市"
            },
            {
                value: 2113,
                name: "朝阳市"
            },
            {
                value: 2114,
                name: "葫芦岛市"
            }
        ]
    }, {
        value: 22,
        name: "吉林",
        submenu: [{
                value: 2201,
                name: "长春市"
            },
            {
                value: 2202,
                name: "吉林市"
            },
            {
                value: 2203,
                name: "四平市"
            },
            {
                value: 2204,
                name: "辽源市"
            },
            {
                value: 2205,
                name: "通化市"
            },
            {
                value: 2206,
                name: "白山市"
            },
            {
                value: 2207,
                name: "松原市"
            },
            {
                value: 2208,
                name: "白城市"
            },
            {
                value: 2224,
                name: "延边朝鲜族自治州"
            }
        ]
    }, {
        value: 23,
        name: "黑龙江",
        submenu: [{
                value: 2301,
                name: "哈尔滨市"
            },
            {
                value: 2302,
                name: "齐齐哈尔市"
            },
            {
                value: 2303,
                name: "鸡西市"
            },
            {
                value: 2304,
                name: "鹤岗市"
            },
            {
                value: 2305,
                name: "双鸭山市"
            },
            {
                value: 2306,
                name: "大庆市"
            },
            {
                value: 2307,
                name: "伊春市"
            },
            {
                value: 2308,
                name: "佳木斯市"
            },
            {
                value: 2309,
                name: "七台河市"
            },
            {
                value: 2310,
                name: "牡丹江市"
            },
            {
                value: 2311,
                name: "黑河市"
            },
            {
                value: 2312,
                name: "绥化市"
            },
            {
                value: 2327,
                name: "大兴安岭地区"
            }
        ]
    }, {
        value: 31,
        name: "上海",
        submenu: [{
            value: 3101,
            name: "上海市"
        }]
    }, {
        value: 32,
        name: "江苏",
        submenu: [{
                value: 3201,
                name: "南京市"
            },
            {
                value: 3202,
                name: "无锡市"
            },
            {
                value: 3203,
                name: "徐州市"
            },
            {
                value: 3204,
                name: "常州市"
            },
            {
                value: 3205,
                name: "苏州市"
            },
            {
                value: 3206,
                name: "南通市"
            },
            {
                value: 3207,
                name: "连云港市"
            },
            {
                value: 3208,
                name: "淮安市"
            },
            {
                value: 3209,
                name: "盐城市"
            },
            {
                value: 3210,
                name: "扬州市"
            },
            {
                value: 3211,
                name: "镇江市"
            },
            {
                value: 3212,
                name: "泰州市"
            },
            {
                value: 3213,
                name: "宿迁市"
            }
        ]
    }, {
        value: 33,
        name: "浙江",
        submenu: [{
                value: 3301,
                name: "杭州市"
            },
            {
                value: 3302,
                name: "宁波市"
            },
            {
                value: 3303,
                name: "温州市"
            },
            {
                value: 3304,
                name: "嘉兴市"
            },
            {
                value: 3305,
                name: "湖州市"
            },
            {
                value: 3306,
                name: "绍兴市"
            },
            {
                value: 3307,
                name: "金华市"
            },
            {
                value: 3308,
                name: "衢州市"
            },
            {
                value: 3309,
                name: "舟山市"
            },
            {
                value: 3310,
                name: "台州市"
            },
            {
                value: 3311,
                name: "丽水市"
            }
        ]
    }, {
        value: 34,
        name: "安徽",
        submenu: [{
                value: 3401,
                name: "合肥市"
            },
            {
                value: 3402,
                name: "芜湖市"
            },
            {
                value: 3403,
                name: "蚌埠市"
            },
            {
                value: 3404,
                name: "淮南市"
            },
            {
                value: 3405,
                name: "马鞍山市"
            },
            {
                value: 3406,
                name: "淮北市"
            },
            {
                value: 3407,
                name: "铜陵市"
            },
            {
                value: 3408,
                name: "安庆市"
            },
            {
                value: 3410,
                name: "黄山市"
            },
            {
                value: 3411,
                name: "滁州市"
            },
            {
                value: 3412,
                name: "阜阳市"
            },
            {
                value: 3413,
                name: "宿州市"
            },
            {
                value: 3415,
                name: "六安市"
            },
            {
                value: 3416,
                name: "亳州市"
            },
            {
                value: 3417,
                name: "池州市"
            },
            {
                value: 3418,
                name: "宣城市"
            }
        ]
    }, {
        value: 35,
        name: "福建",
        submenu: [{
                value: 3501,
                name: "福州市"
            },
            {
                value: 3502,
                name: "厦门市"
            },
            {
                value: 3503,
                name: "莆田市"
            },
            {
                value: 3504,
                name: "三明市"
            },
            {
                value: 3505,
                name: "泉州市"
            },
            {
                value: 3506,
                name: "漳州市"
            },
            {
                value: 3507,
                name: "南平市"
            },
            {
                value: 3508,
                name: "龙岩市"
            },
            {
                value: 3509,
                name: "宁德市"
            }
        ]
    }, {
        value: 36,
        name: "江西",
        submenu: [{
                value: 3601,
                name: "南昌市"
            },
            {
                value: 3602,
                name: "景德镇市"
            },
            {
                value: 3603,
                name: "萍乡市"
            },
            {
                value: 3604,
                name: "九江市"
            },
            {
                value: 3605,
                name: "新余市"
            },
            {
                value: 3606,
                name: "鹰潭市"
            },
            {
                value: 3607,
                name: "赣州市"
            },
            {
                value: 3608,
                name: "吉安市"
            },
            {
                value: 3609,
                name: "宜春市"
            },
            {
                value: 3610,
                name: "抚州市"
            },
            {
                value: 3611,
                name: "上饶市"
            }
        ]
    }, {
        value: 37,
        name: "山东",
        submenu: [{
                value: 3701,
                name: "济南市"
            },
            {
                value: 3702,
                name: "青岛市"
            },
            {
                value: 3703,
                name: "淄博市"
            },
            {
                value: 3704,
                name: "枣庄市"
            },
            {
                value: 3705,
                name: "东营市"
            },
            {
                value: 3706,
                name: "烟台市"
            },
            {
                value: 3707,
                name: "潍坊市"
            },
            {
                value: 3708,
                name: "济宁市"
            },
            {
                value: 3709,
                name: "泰安市"
            },
            {
                value: 3710,
                name: "威海市"
            },
            {
                value: 3711,
                name: "日照市"
            },
            {
                value: 3712,
                name: "莱芜市"
            },
            {
                value: 3713,
                name: "临沂市"
            },
            {
                value: 3714,
                name: "德州市"
            },
            {
                value: 3715,
                name: "聊城市"
            },
            {
                value: 3716,
                name: "滨州市"
            },
            {
                value: 3717,
                name: "菏泽市"
            }
        ]
    }, {
        value: 41,
        name: "河南",
        submenu: [{
                value: 4101,
                name: "郑州市"
            },
            {
                value: 4102,
                name: "开封市"
            },
            {
                value: 4103,
                name: "洛阳市"
            },
            {
                value: 4104,
                name: "平顶山市"
            },
            {
                value: 4105,
                name: "安阳市"
            },
            {
                value: 4106,
                name: "鹤壁市"
            },
            {
                value: 4107,
                name: "新乡市"
            },
            {
                value: 4108,
                name: "焦作市"
            },
            {
                value: 4109,
                name: "濮阳市"
            },
            {
                value: 4110,
                name: "许昌市"
            },
            {
                value: 4111,
                name: "漯河市"
            },
            {
                value: 4112,
                name: "三门峡市"
            },
            {
                value: 4113,
                name: "南阳市"
            },
            {
                value: 4114,
                name: "商丘市"
            },
            {
                value: 4115,
                name: "信阳市"
            },
            {
                value: 4116,
                name: "周口市"
            },
            {
                value: 4117,
                name: "驻马店市"
            },
            {
                value: 4190,
                name: "济源市"
            }
        ]
    }, {
        value: 42,
        name: "湖北",
        submenu: [{
                value: 4201,
                name: "武汉市"
            },
            {
                value: 4202,
                name: "黄石市"
            },
            {
                value: 4203,
                name: "十堰市"
            },
            {
                value: 4205,
                name: "宜昌市"
            },
            {
                value: 4206,
                name: "襄阳市"
            },
            {
                value: 4207,
                name: "鄂州市"
            },
            {
                value: 4208,
                name: "荆门市"
            },
            {
                value: 4209,
                name: "孝感市"
            },
            {
                value: 4210,
                name: "荆州市"
            },
            {
                value: 4211,
                name: "黄冈市"
            },
            {
                value: 4212,
                name: "咸宁市"
            },
            {
                value: 4213,
                name: "随州市"
            },
            {
                value: 4228,
                name: "恩施土家族苗族自治州"
            },
            {
                value: 4290,
                name: "仙桃市"
            },
            {
                value: 4291,
                name: "潜江市"
            },
            {
                value: 4292,
                name: "天门市"
            },
            {
                value: 4293,
                name: "神农架林区"
            }
        ]
    }, {
        value: 43,
        name: "湖南",
        submenu: [{
                value: 4301,
                name: "长沙市"
            },
            {
                value: 4302,
                name: "株洲市"
            },
            {
                value: 4303,
                name: "湘潭市"
            },
            {
                value: 4304,
                name: "衡阳市"
            },
            {
                value: 4305,
                name: "邵阳市"
            },
            {
                value: 4306,
                name: "岳阳市"
            },
            {
                value: 4307,
                name: "常德市"
            },
            {
                value: 4308,
                name: "张家界市"
            },
            {
                value: 4309,
                name: "益阳市"
            },
            {
                value: 4310,
                name: "郴州市"
            },
            {
                value: 4311,
                name: "永州市"
            },
            {
                value: 4312,
                name: "怀化市"
            },
            {
                value: 4313,
                name: "娄底市"
            },
            {
                value: 4331,
                name: "湘西土家族苗族自治州"
            }
        ]
    }, {
        value: 44,
        name: "广东",
        submenu: [{
                value: 4401,
                name: "广州市"
            },
            {
                value: 4402,
                name: "韶关市"
            },
            {
                value: 4403,
                name: "深圳市"
            },
            {
                value: 4404,
                name: "珠海市"
            },
            {
                value: 4405,
                name: "汕头市"
            },
            {
                value: 4406,
                name: "佛山市"
            },
            {
                value: 4407,
                name: "江门市"
            },
            {
                value: 4408,
                name: "湛江市"
            },
            {
                value: 4409,
                name: "茂名市"
            },
            {
                value: 4412,
                name: "肇庆市"
            },
            {
                value: 4413,
                name: "惠州市"
            },
            {
                value: 4414,
                name: "梅州市"
            },
            {
                value: 4415,
                name: "汕尾市"
            },
            {
                value: 4416,
                name: "河源市"
            },
            {
                value: 4417,
                name: "阳江市"
            },
            {
                value: 4418,
                name: "清远市"
            },
            {
                value: 4419,
                name: "东莞市"
            },
            {
                value: 4420,
                name: "中山市"
            },
            {
                value: 4451,
                name: "潮州市"
            },
            {
                value: 4452,
                name: "揭阳市"
            },
            {
                value: 4453,
                name: "云浮市"
            }
        ]
    }, {
        value: 45,
        name: "广西",
        submenu: [{
                value: 4501,
                name: "南宁市"
            },
            {
                value: 4502,
                name: "柳州市"
            },
            {
                value: 4503,
                name: "桂林市"
            },
            {
                value: 4504,
                name: "梧州市"
            },
            {
                value: 4505,
                name: "北海市"
            },
            {
                value: 4506,
                name: "防城港市"
            },
            {
                value: 4507,
                name: "钦州市"
            },
            {
                value: 4508,
                name: "贵港市"
            },
            {
                value: 4509,
                name: "玉林市"
            },
            {
                value: 4510,
                name: "百色市"
            },
            {
                value: 4511,
                name: "贺州市"
            },
            {
                value: 4512,
                name: "河池市"
            },
            {
                value: 4513,
                name: "来宾市"
            },
            {
                value: 4514,
                name: "崇左市"
            }
        ]
    }, {
        value: 46,
        name: "海南",
        submenu: [{
                value: 4601,
                name: "海口市"
            },
            {
                value: 4602,
                name: "三亚市"
            },
            {
                value: 4603,
                name: "三沙市"
            },
            {
                value: 4690,
                name: "五指山市"
            },
            {
                value: 4680,
                name: "琼海市"
            },
            {
                value: 4681,
                name: "儋州市"
            },
            {
                value: 4682,
                name: "文昌市"
            },
            {
                value: 4683,
                name: "万宁市"
            },
            {
                value: 4684,
                name: "东方市"
            },
            {
                value: 4685,
                name: "定安县"
            },
            {
                value: 4691,
                name: "屯昌县"
            },
            {
                value: 4692,
                name: "澄迈县"
            },
            {
                value: 4693,
                name: "临高县"
            },
            {
                value: 4694,
                name: "白沙黎族自治县"
            },
            {
                value: 4695,
                name: "昌江黎族自治县"
            },
            {
                value: 4696,
                name: "乐东黎族自治县"
            },
            {
                value: 4697,
                name: "陵水黎族自治县"
            },
            {
                value: 4698,
                name: "保亭黎族苗族自治县"
            },
            {
                value: 4699,
                name: "琼中黎族苗族自治县"
            }
        ]
    }, {
        value: 50,
        name: "重庆",
        submenu: [{
            value: 5001,
            name: "重庆市"
        }]
    }, {
        value: 51,
        name: "四川",
        submenu: [{
                value: 5101,
                name: "成都市"
            },
            {
                value: 5103,
                name: "自贡市"
            },
            {
                value: 5104,
                name: "攀枝花市"
            },
            {
                value: 5105,
                name: "泸州市"
            },
            {
                value: 5106,
                name: "德阳市"
            },
            {
                value: 5107,
                name: "绵阳市"
            },
            {
                value: 5108,
                name: "广元市"
            },
            {
                value: 5109,
                name: "遂宁市"
            },
            {
                value: 5110,
                name: "内江市"
            },
            {
                value: 5111,
                name: "乐山市"
            },
            {
                value: 5113,
                name: "南充市"
            },
            {
                value: 5114,
                name: "眉山市"
            },
            {
                value: 5115,
                name: "宜宾市"
            },
            {
                value: 5116,
                name: "广安市"
            },
            {
                value: 5117,
                name: "达州市"
            },
            {
                value: 5118,
                name: "雅安市"
            },
            {
                value: 5119,
                name: "巴中市"
            },
            {
                value: 5120,
                name: "资阳市"
            },
            {
                value: 5132,
                name: "阿坝藏族羌族自治州"
            },
            {
                value: 5133,
                name: "甘孜藏族自治州"
            },
            {
                value: 5134,
                name: "凉山彝族自治州"
            }
        ]
    }, {
        value: 52,
        name: "贵州",
        submenu: [{
                value: 5201,
                name: "贵阳市"
            },
            {
                value: 5202,
                name: "六盘水市"
            },
            {
                value: 5203,
                name: "遵义市"
            },
            {
                value: 5204,
                name: "安顺市"
            },
            {
                value: 5205,
                name: "毕节市"
            },
            {
                value: 5206,
                name: "铜仁市"
            },
            {
                value: 5223,
                name: "黔西南布依族苗族自治州"
            },
            {
                value: 5226,
                name: "黔东南苗族侗族自治州"
            },
            {
                value: 5227,
                name: "黔南布依族苗族自治州"
            }
        ]
    }, {
        value: 53,
        name: "云南",
        submenu: [{
                value: 5301,
                name: "昆明市"
            },
            {
                value: 5303,
                name: "曲靖市"
            },
            {
                value: 5304,
                name: "玉溪市"
            },
            {
                value: 5305,
                name: "保山市"
            },
            {
                value: 5306,
                name: "昭通市"
            },
            {
                value: 5307,
                name: "丽江市"
            },
            {
                value: 5308,
                name: "普洱市"
            },
            {
                value: 5309,
                name: "临沧市"
            },
            {
                value: 5323,
                name: "楚雄彝族自治州"
            },
            {
                value: 5325,
                name: "红河哈尼族彝族自治州"
            },
            {
                value: 5326,
                name: "文山壮族苗族自治州"
            },
            {
                value: 5328,
                name: "西双版纳傣族自治州"
            },
            {
                value: 5329,
                name: "大理白族自治州"
            },
            {
                value: 5331,
                name: "德宏傣族景颇族自治州"
            },
            {
                value: 5333,
                name: "怒江傈僳族自治州"
            },
            {
                value: 5334,
                name: "迪庆藏族自治州"
            }
        ]
    }, {
        value: 54,
        name: "西藏",
        submenu: [{
                value: 5401,
                name: "拉萨市"
            },
            {
                value: 5421,
                name: "昌都地区"
            },
            {
                value: 5422,
                name: "山南地区"
            },
            {
                value: 5423,
                name: "日喀则市"
            },
            {
                value: 5424,
                name: "那曲地区"
            },
            {
                value: 5425,
                name: "阿里地区"
            },
            {
                value: 5426,
                name: "林芝地区"
            }
        ]
    }, {
        value: 61,
        name: "陕西",
        submenu: [{
                value: 6101,
                name: "西安市"
            },
            {
                value: 6102,
                name: "铜川市"
            },
            {
                value: 6103,
                name: "宝鸡市"
            },
            {
                value: 6104,
                name: "咸阳市"
            },
            {
                value: 6105,
                name: "渭南市"
            },
            {
                value: 6106,
                name: "延安市"
            },
            {
                value: 6107,
                name: "汉中市"
            },
            {
                value: 6108,
                name: "榆林市"
            },
            {
                value: 6109,
                name: "安康市"
            },
            {
                value: 6110,
                name: "商洛市"
            }
        ]
    }, {
        value: 62,
        name: "甘肃",
        submenu: [{
                value: 6201,
                name: "兰州市"
            },
            {
                value: 6202,
                name: "嘉峪关市"
            },
            {
                value: 6203,
                name: "金昌市"
            },
            {
                value: 6204,
                name: "白银市"
            },
            {
                value: 6205,
                name: "天水市"
            },
            {
                value: 6206,
                name: "武威市"
            },
            {
                value: 6207,
                name: "张掖市"
            },
            {
                value: 6208,
                name: "平凉市"
            },
            {
                value: 6209,
                name: "酒泉市"
            },
            {
                value: 6210,
                name: "庆阳市"
            },
            {
                value: 6211,
                name: "定西市"
            },
            {
                value: 6212,
                name: "陇南市"
            },
            {
                value: 6229,
                name: "临夏回族自治州"
            },
            {
                value: 6230,
                name: "甘南藏族自治州"
            }
        ]
    }, {
        value: 63,
        name: "青海",
        submenu: [{
                value: 6301,
                name: "西宁市"
            },
            {
                value: 6302,
                name: "海东市"
            },
            {
                value: 6322,
                name: "海北藏族自治州"
            },
            {
                value: 6323,
                name: "黄南藏族自治州"
            },
            {
                value: 6325,
                name: "海南藏族自治州"
            },
            {
                value: 6326,
                name: "果洛藏族自治州"
            },
            {
                value: 6327,
                name: "玉树藏族自治州"
            },
            {
                value: 6328,
                name: "海西蒙古族藏族自治州"
            }
        ]
    }, {
        value: 64,
        name: "宁夏",
        submenu: [{
                value: 6401,
                name: "银川市"
            },
            {
                value: 6402,
                name: "石嘴山市"
            },
            {
                value: 6403,
                name: "吴忠市"
            },
            {
                value: 6404,
                name: "固原市"
            },
            {
                value: 6405,
                name: "中卫市"
            }
        ]
    }, {
        value: 65,
        name: "新疆",
        submenu: [{
                value: 6501,
                name: "乌鲁木齐市"
            },
            {
                value: 6502,
                name: "克拉玛依市"
            },
            {
                value: 6521,
                name: "吐鲁番地区"
            },
            {
                value: 6522,
                name: "哈密地区"
            },
            {
                value: 6523,
                name: "昌吉回族自治州"
            },
            {
                value: 6527,
                name: "博尔塔拉蒙古自治州"
            },
            {
                value: 6528,
                name: "巴音郭楞蒙古自治州"
            },
            {
                value: 6529,
                name: "阿克苏地区"
            },
            {
                value: 6530,
                name: "克孜勒苏柯尔克孜自治州"
            },
            {
                value: 6531,
                name: "喀什地区"
            },
            {
                value: 6532,
                name: "和田地区"
            },
            {
                value: 6540,
                name: "伊犁哈萨克自治州"
            },
            {
                value: 6542,
                name: "塔城地区"
            },
            {
                value: 6543,
                name: "阿勒泰地区"
            },
            {
                value: 6590,
                name: "石河子市"
            },
            {
                value: 6591,
                name: "阿拉尔市"
            },
            {
                value: 6592,
                name: "图木舒克市"
            },
            {
                value: 6593,
                name: "五家渠市"
            }
        ]
    }
]
export default city