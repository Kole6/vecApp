/*公用tool数据处理*/
export default {
    /* 学校接口数据转换 */
    toolSchoolList(list) {
        return list.map(item => {
            return {
                ...item,
                title: item.schoolname,
                cards: (item.tags + "").split(",").map(item => {
                    return {
                        name: item
                    };
                }),
                tags: [{
                        name: "地区",
                        value: item.area
                    },
                    {
                        name: "层次",
                        value: item.level
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
                cards: (item.tags + "").split(",").map(item => {
                    return {
                        name: item
                    };
                }),
                tags: [{
                        name: "地区",
                        value: item.area
                    },
                    {
                        name: "层次",
                        value: item.level
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
                cards: [{
                        name: '学历层次',
                        value: item.xlcc || ''
                    },
                    {
                        name: '专业年限',
                        value: item.xynx || ''
                    }
                ],
                tags: [{
                        name: '专业大类',
                        value: item.zydl || ''
                    },
                    {
                        name: '代码',
                        value: item.majorcode
                    }
                ]
            };
        });
    },
    /* 专业接口数据转换  pk */
    toolMajorListPk(list,listPk) {
        return list.map(item => {
            return {
                ...item,
                hasSelected: listPk.includes(item.majorcode),
                title: item.majorname,
                cards: [{
                        name: '学历层次',
                        value: item.xlcc || ''
                    },
                    {
                        name: '专业年限',
                        value: item.xynx || ''
                    }
                ],
                tags: [{
                        name: '专业大类',
                        value: item.zydl || ''
                    },
                    {
                        name: '代码',
                        value: item.majorcode
                    }
                ]
            };
        });
    },
    /* 对比接口数据转换 */
    toolPkList(list, type) {
        return list.map(item => {
            return type == 1 ? item.schoolno : item.majorcode
        });
    },
}