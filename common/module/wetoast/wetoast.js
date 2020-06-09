function WeToastClass() {
    function WeToast() {
        var pages = getCurrentPages()
        var curPage = pages[pages.length - 1]
        this.__page = curPage
        this.__timeout = null
        curPage.wetoast = this

        return this
    }
    WeToast.prototype.toast = function (data) {
        try {
            if (!data) {
                this.hide()
            } else {
                this.show(data)
            }
        } catch (err) {
            console.error(err)
            data && typeof data.fail === 'function' && data.fail(data)
        } finally {
            data && typeof data.complete === 'function' && data.complete(data)
        }
    }
    WeToast.prototype.show = function (data) {
        var page = this.__page
        clearTimeout(this.__timeout)
        page.setData({
            '__wetoast__.reveal': true
        })
        setTimeout(() => {
            var animation = wx.createAnimation()
            animation.opacity(1).step()
            data.animationData = animation.export()
            data.reveal = true
            page.setData({
                __wetoast__: data
            })
        }, 30)

        if (data.duration === 0) {
            setTimeout(() => {
                typeof data.success === 'function' && data.success(data)
            }, 430)
        } else {
            this.__timeout = setTimeout(() => {
                this.toast()
                typeof data.success === 'function' && data.success(data)
            }, (data.duration || 1500) + 400)
        }
    }
    WeToast.prototype.hide = function () {
        var page = this.__page
        clearTimeout(this.__timeout)
        if (!page.data.__wetoast__.reveal) {
            return
        }
        var animation = wx.createAnimation()
        animation.opacity(0).step()
        page.setData({
            '__wetoast__.animationData': animation.export()
        })
        setTimeout(() => {
            page.setData({
                __wetoast__: {
                    'reveal': false
                }
            })
        }, 400)
    }
    return new WeToast()
}
module.exports = {
    WeToast: WeToastClass
}