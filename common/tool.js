/*公用tool数据处理*/
import {
    ConfigWeb
} from '../config'
export default {
    /* 学校接口数据转换 */
    toolSchoolList(list) {
        return list.map(item => {
            return {
                ...item,
                title: item.schoolname,
                cards: fixTags(item.tags),
                tags: [{
                        name: "地区",
                        value: fixZhixia(item.area)
                    },
                    {
                        name: "层次",
                        value: item.level || ''
                    }
                ]
            };
        });
    },
    /* 学校接口数据转换 search*/
    toolSchoolListSearch(list, search) {
        return list.map(item => {
            return {
                ...item,
                title: item.schoolname.replace(search, `<span style="color:#6451FC">${search}</span>`),
                cards: fixTags(item.tags),
                tags: [{
                        name: "地区",
                        value: fixZhixia(item.area)
                    },
                    {
                        name: "层次",
                        value: item.level || ''
                    }
                ]
            };
        });
    },
    /* 学校接口数据转换 PK*/
    toolSchoolListPk(list, listPk) {
        return list.map(item => {
            return {
                ...item,
                hasSelected: listPk.includes(item.schoolno),
                title: item.schoolname,
                cards: fixTags(item.tags),
                tags: [{
                        name: "地区",
                        value: fixZhixia(item.area)
                    },
                    {
                        name: "层次",
                        value: item.level || ''
                    }
                ]
            };
        });
    },
    /* 专业接口数据转换 */
    toolMajorList(list) {
        return list.map(item => {
            return {
                ...item,
                title: item.majorname,
                tags: [{
                        name: '专业大类',
                        value: item.zydl || ''
                    },
                    {
                        name: '代码',
                        value: item.majorcode
                    }
                ],
                cards: [{
                        name: '学历层次',
                        value: item.xlcc || ''
                    },
                    {
                        name: '修业年限',
                        value: item.xynx || ''
                    }
                ]
            };
        });
    },
    /* 专业接口数据转换 setting*/
    toolMajorListSetting(list) {
        return list.map(item => {
            return {
                ...item,
                title: item.majorname,
                tags: [{
                    name: '专业代码',
                    value: item.majorcode
                }, {
                    name: '重点专业',
                    value: item.keyspecialty || ''
                }],
                cards: [{
                        name: '学历层次',
                        value: item.xlcc || ''
                    },
                    {
                        name: '修业年限',
                        value: item.numberofyearsofschooling ? item.numberofyearsofschooling + '年' : ''
                    }
                ]
            };
        });
    },
    /* 专业接口数据转换 search*/
    toolMajorListSearch(list, search) {
        return list.map(item => {
            return {
                ...item,
                title: item.majorname.replace(search, `<span style="color:#6451FC">${search}</span>`),
                tags: [{
                        name: '专业大类',
                        value: item.zydl || ''
                    },
                    {
                        name: '代码',
                        value: item.majorcode
                    }
                ],
                cards: [{
                        name: '学历层次',
                        value: item.xlcc || ''
                    },
                    {
                        name: '修业年限',
                        value: item.xynx || ''
                    }
                ]
            };
        });
    },
    /* 专业接口数据转换  pk */
    toolMajorListPk(list, listPk) {
        return list.map(item => {
            return {
                ...item,
                hasSelected: listPk.includes(item.majorcode),
                title: item.majorname,
                tags: [{
                        name: '专业大类',
                        value: item.zydl || ''
                    },
                    {
                        name: '代码',
                        value: item.majorcode
                    }
                ],
                cards: [{
                        name: '学历层次',
                        value: item.xlcc || ''
                    },
                    {
                        name: '修业年限',
                        value: item.xynx || ''
                    }
                ]
            };
        });
    },
    /* 专业接口数据转换 专业小类*/
    toolMajorListXiao(list) {
        return list.map(item => {
            return {
                ...item,
                title: item.majorname,
                cards: [],
                tags: [{
                    name: '代码',
                    value: item.majorcode
                }]
            };
        });
    },
    /* 对比接口数据转换 数据提出*/
    toolPkList(list, type) {
        return list.map(item => {
            return type == 1 ? item.schoolno : item.majorcode
        });
    },
    /* 首次进入页面 - 判断是nomore还是more @listArr 表单名称  @more 提示名称*/
    toolMore(that, listArr, more, pageIndex, list) {
        let index = pageIndex
        if (index == 1) {
            if (!list.length) {
                that[listArr] = [];
                that[more] = "noMore";
            } else if (list.length < 10) {
                that[listArr] = list;
                index += 1;
                that[more] = "noMore";
            } else {
                that[listArr] = list;
                index += 1;
                that[more] = "more";
            }
        } else {
            if (list.length) {
                that[listArr].push(...list);
                index += 1;
                if (list.length < 10) {
                    that[more] = "noMore";
                } else {
                    that[more] = "more";
                }
            } else {
                that[more] = "noMore";
            }
        }
        return index
    },
    /* 此操作是否需要登录  @kou kou为1判断token*/
    toolToken(kou) {
        if (!kou || uni.getStorageSync('token')) {
            return true
        } else {
            uni.showModal({
                content: '登录之后才可以操作哦!',
                success: function (res) {
                    if (res.confirm) {
                        uni.reLaunch({
                            url: '/pages/login/signIn/signIn'
                        })
                    }
                }
            });
            return false;
        }
    },
    /* 进入页面  @kou kou为1判断token*/
    toolistoolTiaoToken(url, kou) {
        if (!kou || uni.getStorageSync('token')) {
            uni.navigateTo({
                url: url
            });
        } else {
            uni.showModal({
                content: '登录之后才可以查看哦!',
                success: function (res) {
                    if (res.confirm) {
                        uni.reLaunch({
                            url: '/pages/login/signIn/signIn'
                        })
                    }
                }
            });
            return false;
        }
    },
    /* 统一跳转外链接 - webview  @src 外链接地址 :todo*/
    toolWeb(title, param = {}) {
        let src = ConfigWeb[title]
        let list = []
        for (let i in param) {
            list.push(`${i}=${param[i] || ''}`)
        }
        let query = list.join('***')
        // console.log('src', src, 'title', title, 'list', list, 'query', query)
        /* switch (title) {
            case '学校简介':
                console.log('学校简介',param)
                break;
            default:
                break;
        } */
        uni.navigateTo({
            url: `/pages/public/webview/webview?src=${src}&title=${title}&query=${query}`
        });
    },
    /* HM-filterDropdown组件数据选择后返回数据*/
    toolHMfilter(list) {
        return list.map(item => {
            return item[item.length] || item[item.length - 1] || item[item.length - 2] || ""
        });
    },
    /*字典数据dict转化成HM-filterDropdown组件数据*/
    toolHMfilterDict(list) {
        return list.map(item => {
            item.value = item.code
            return item
        });
    },
}

/* 四个直辖市替换 */
function fixZhixia(str) {
    const zhi = ["北京北京市", "天津天津市", "上海上海市", "重庆重庆市"]
    if (zhi.includes(str)) {
        return str.slice(2, 5)
    } else {
        return str
    }
}
/* tags数据处理 */
function fixTags(str) {
    if (str) {
        let k = []
        for (let i of str.split(',')) {
            if (i) {
                k.push({
                    name: i
                })
            }
        }
        return k
    }
    return []
}