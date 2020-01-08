/*公用api接口处理*/
export default {
    // 获取新闻列表
    apiGetNews(that, key) {
        if (key == '' && that.newList.length != 0 && type == 1) {
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
    }
}