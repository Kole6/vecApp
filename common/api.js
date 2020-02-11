/*公用api接口处理*/
export default {
    /* 获取字典数据  async await*/
    apiGetDict(that, data = {}) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: "/zjq/mainpage/GetDict",
                header: "form",
                data
            }).then(res => {
                if (res.code == 0) {
                    resolve(res.data);
                } else {
                    uni.showToast({
                        title: res.message,
                        icon: "none"
                    });
                    reject();
                }
            });
        });
    },
    /* 获取新闻资讯  @key 关键字*/
    apiGetNews(that, param = {}) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/College/GetNews',
                header: 'form',
                data: {
                    ...param
                },
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data.list);
                } else {
                    reject();
                }
            })
        });
    },
    /* 获取人气榜学校  @key 关键字*/
    apiGetRqbd(that, param = {}) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/mainpage/GetRqbd',
                header: 'form',
                load: true,
                data: {
                    ...param
                }
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data.list);
                } else {
                    reject();
                }
            })
        });
    },
    /* 查询各榜单情况  @type 榜单类型 eg:实习管理=sxgl；*/
    getSchoolRank(that, param = {}) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/College/getSchoolRank',
                header: 'form',
                load: true,
                data: {
                    ...param
                }
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data.list);
                } else {
                    reject();
                }
            })
        });
    },
    /* 高职高专院校、中等职业学校区域学校数量 */
    apiGetYxsl(that) {
        that.$http({
            url: '/zjq/College/GetYxsl',
            header: 'form',
            data: {
                token: uni.getStorageSync('token'),
                region: '',
                type: that.type == '高职' ? '1' : '2',
                pageIndex: 1,
                pageSize: 100,
            }
        }).then(res => {
            if (res.code == 0) {
                let data = res.data.map(item => {
                    return {
                        ...item,
                        desc: `${item.number} 所${that.type}`,
                        name: item.provincename,
                        IPC: item.ipc == 'ipc' ? '/static/indexIcon/city.png' : item.ipc
                    }
                })
                that.categoryArr = data;
            }
        })
    },
    /* 下载文件 */
    apiGetFileDown(that, fileId) {
        let userInfo = uni.getStorageSync('userInfo');
        if (userInfo.email) {
            uni.showModal({
                content: '是否确认下载文件!',
                success: function (res) {
                    if (res.confirm) {
                        that.$http({
                            url: '/zjq/mainpage/GetFileDown',
                            header: 'form',
                            data: {
                                token: uni.getStorageSync('token'),
                                fileid: fileId
                            }
                        }).then((res => {
                            if (res.code == 0) {
                                uni.showToast({
                                    title: '文件已发送至您的邮箱，请注意查收！',
                                    icon: "none"
                                });
                            } else {
                                uni.showToast({
                                    title: res.message,
                                    icon: "none"
                                });
                            }
                        }))
                    } else {
                        uni.showToast({
                            title: '已取消',
                            icon: "none"
                        });
                    }
                }
            });
        } else {
            uni.showModal({
                content: '请绑定邮箱进行下载!',
                success: function (res) {
                    if (res.confirm) {
                        uni.navigateTo({
                            url: '/pages/personal/account/account'
                        })
                    }
                }
            });
        }
    },
    /* 院校 - 添加关注和取消关注 */
    apiFavorite(that, sid) {
        that.$http({
            url: '/zjq/User/Favorite',
            header: 'form',
            data: {
                token: uni.getStorageSync('token'),
                sid: sid,
                type: that.hasSC ? '2' : '1'
            }
        }).then(res => {
            if (res.code == 0) {
                that.hasSC = !that.hasSC;
            }
            uni.showToast({
                title: res.message,
                icon: 'none',
                duration: 2000
            });
        });
    },
    /* 专业 - 添加关注和取消关注 */
    apiFavoriteZy(that, zyid) {
        that.$http({
            url: '/zjq/User/FavoriteZy',
            header: 'form',
            data: {
                token: uni.getStorageSync('token'),
                zyid: zyid,
                type: that.hasSC ? '2' : '1'
            }
        }).then(res => {
            if (res.code == 0) {
                that.hasSC = !that.hasSC;
            }
            uni.showToast({
                title: res.message,
                icon: 'none',
                duration: 2000
            });
        });
    },
    /* 获取关注列表 @id 判断是否已关注 @type 关注类型（1：学校；2：专业） @key 搜索关键字*/
    apiGetFavoriteList(that, type, id) {
        that.$http({
            url: '/zjq/User/GetFavoriteList',
            header: 'form',
            data: {
                pageIndex: 1,
                pageSize: 1000,
                type,
                token: uni.getStorageSync('token')
            }
        }).then(res => {
            if (res.code == 0) {
                if (id) {
                    let name = type == '1' ? 'schoolno' : 'majorcode'
                    let hasSC = res.data.list.some((item) => {
                        return item[name] == id
                    })
                    if (hasSC)
                        that.hasSC = true;
                } else {
                    let name = type == '1' ? 'favoriteList1' : 'favoriteList2'
                    that[name] = res.data.list
                }
            } else {
                /* uni.showToast({
                    title: res.message,
                    icon: 'none'
                }); */
            }
        });
    },
    /* 查询关注列表  @type 类型 1:学校 2:专业 */
    apiGetFavoriteListSearch(that, type, key) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/User/GetFavoriteList',
                header: 'form',
                data: {
                    key,
                    type,
                    token: uni.getStorageSync('token')
                }
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data.list);
                } else {
                    reject();
                }
            })
        });
    },
    /* 获取对比库  @type 类型 1:学校 2:专业 */
    apiGetComparison(that, type) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/User/GetComparison',
                header: 'form',
                load: true,
                data: {
                    type,
                    token: uni.getStorageSync('token')
                }
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data);
                } else {
                    reject();
                }
            })
        });
    },
    /* 操作对比库 @optype 操作类型，A新增、D删除 @type 对比类型，1学校、2专业*/
    apiMyComparison(that, optype, type, id) {
        let n = type == 1 ? 'sid' : 'majorCode'
        let param = {}
        param[n] = id
        param = {
            ...param,
            optype,
            type,
            token: uni.getStorageSync('token')
        }
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/User/MyComparison',
                header: 'form',
                data: param,
                load: true
            }).then(res => {
                uni.showToast({
                    title: res.message,
                    icon: 'none'
                });
                if (res.code == 0) {
                    resolve(res.data);
                } else {
                    reject();
                }
            });
        });
    },
    /* 获取院校  @key 关键字*/
    apiGetSchoolSearchList(that, key, param = {}) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/College/GetSchoolSearchList',
                header: 'form',
                data: {
                    ...param,
                    key,
                    token: uni.getStorageSync('token')
                },
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data.list);
                } else {
                    reject();
                }
            })
        });
    },
    /* 获取专业  @key 关键字*/
    apiGetMajors(that, key, param = {}) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/College/GetMajors',
                header: 'form',
                data: {
                    ...param,
                    key: key || '',
                    token: uni.getStorageSync('token')
                },
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data.list);
                } else {
                    reject();
                }
            })
        });
    },
    /* 获取热门专业和学校  @type 1:专业，2：学校（默认2）*/
    apiGetHotCollege(that, type, param = {}) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/mainpage/GetHotCollege',
                header: 'form',
                data: {
                    ...param,
                    type,
                    token: uni.getStorageSync('token')
                },
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data.list);
                } else {
                    reject();
                }
            })
        });
    },
    /* 专业设置 - 获取专业 @pageIndex 页数, @pageSize 每页多少条*/
    apiGetCollegeMajorSetting(that, param = {}) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/College/GetCollegeMajorSetting',
                header: 'form',
                data: {
                    ...param,
                    token: uni.getStorageSync('token')
                },
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data.list);
                } else {
                    reject();
                }
            })
        });
    },
    /* 专业设置 - 获取院校专业学生分布 */
    apiGetXxzyfb(that, sid) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/College/GetXxzyfb',
                header: 'form',
                data: {
                    sid,
                    token: uni.getStorageSync('token')
                },
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data);
                } else {
                    reject();
                }
            })
        });
    },
    /* 学校/专业搜索 @type 1:专业，2：学校（默认2） @key 关键字*/
    apiGetSchoolMajorHighLightSearchList(that, type = 2, key, param = {}) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/College/GetSchoolMajorHighLightSearchList',
                header: 'form',
                data: {
                    ...param,
                    key,
                    type,
                    token: uni.getStorageSync('token')
                },
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data.list);
                } else {
                    reject();
                }
            })
        });
    },
    /* 学校对比结果  @sids 逗号隔开的id*/
    apiMyXxdb(that, sids) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/User/MyXxdb',
                header: 'form',
                data: {
                    sids,
                    token: uni.getStorageSync('token')
                },
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data);
                } else {
                    reject();
                }
            })
        });
    },
    /* 专业对比结果  @sids 逗号隔开的id*/
    apiMyZydb(that, zyids) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/User/MyZydb',
                header: 'form',
                data: {
                    zyids,
                    token: uni.getStorageSync('token')
                },
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data);
                } else {
                    reject();
                }
            })
        });
    },
    /* 点赞和取消点赞  @keyid 学校代码或专业代码 @type 1学校，2专业 @isDz false点赞，true取消点赞*/
    apiLikeit(that, type, keyid, isDz) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: `/zjq/User/${isDz?'dontlikeit':'likeit'}`,
                header: 'form',
                load: true,
                data: {
                    keyid,
                    type,
                    token: uni.getStorageSync('token')
                },
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data);
                } else {
                    reject();
                }
            })
        });
    },
    /* 创业就业率 */
    apiGetJycy(that, sid) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/College/GetJycy',
                header: 'form',
                data: {
                    sid,
                    token: uni.getStorageSync('token')
                },
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data);
                } else {
                    reject();
                }
            })
        });
    },
    /* 学校技能大赛情况 */
    apiGetSkillList(that, param = {}) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/College/GetSkillList',
                header: 'form',
                data: {
                    ...param,
                    token: uni.getStorageSync('token')
                },
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data);
                } else {
                    reject();
                }
            })
        });
    },
    /* 根据专业获取开设学校列表 */
    apiGetXxByZy(that, param = {}) {
        return new Promise((resolve, reject) => {
            that.$http({
                url: '/zjq/College/GetXxByZy',
                header: 'form',
                data: param,
            }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data.list);
                } else {
                    reject();
                }
            })
        });
    }
}