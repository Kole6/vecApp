/*公用api接口处理*/
export default {
    /* 获取字典数据  async await*/
    apiGetDict(that, data = {}) {
        return new Promise((resolve, reject) => {
            that.$HTTP({
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
    /* 获取新闻资讯 */
    apiGetNews(that, key, type) {
        if (key == '' && that.newList.length != 0 && type == 0) { //缓存首次内容
            return;
        }
        that.$HTTP({
            url: '/zjq/College/GetNews',
            header: 'form',
            data: {
                key,
            }
        }).then((res) => {
            that.newList = [...res.data.list]
        })
    },
    /* 高职高专院校、中等职业学校区域学校数量 */
    apiGetYxsl(that) {
        that.$HTTP({
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
                        that.$HTTP({
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
        that.$HTTP({
            url: '/zjq/User/Favorite',
            header: 'form',
            data: {
                token: uni.getStorageSync('token'),
                sid: sid,
                type: that.hasSC ? '2' : '1'
            }
        }).then(res => {
            uni.showToast({
                title: res.message,
                icon: 'none',
                duration: 1000
            });
            that.hasSC = !that.hasSC;
        });
    },
    /* 专业 - 添加关注和取消关注 */
    apiFavoriteZy(that, zyid) {
        that.$HTTP({
            url: '/zjq/User/FavoriteZy',
            header: 'form',
            data: {
                token: uni.getStorageSync('token'),
                zyid: zyid,
                type: that.hasSC ? '2' : '1'
            }
        }).then(res => {
            uni.showToast({
                title: res.message,
                icon: 'none',
                duration: 1000
            });
            that.hasSC = !that.hasSC;
        });
    },
    /* 获取关注列表 @id 判断是否已关注 @type 关注类型（1：学校；2：专业） @key 搜索关键字*/
    apiGetFavoriteList(that, type, id) {
        that.$HTTP({
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
                uni.showToast({
                    title: res.message,
                    icon: 'none'
                });
            }
        });
    },
    /* 获取对比库  @type 类型 1:学校 2:专业 */
    apiGetComparison(that, type) {
        return new Promise((resolve, reject) => {
            that.$HTTP({
                url: '/zjq/User/GetComparison',
                header: 'form',
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
            that.$HTTP({
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
}