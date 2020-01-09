/*公用api接口处理*/
export default {
    /* 获取字典数据 */
    apiGetDict(that, data = {}) {
        return new Promise((resolve, reject) => {
            that.$HTTP({
                url: "/zjq/mainpage/GetDict",
                header: "form",
                // load:true,
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
                    }else{
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
}