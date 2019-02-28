window.jsonpcb = {};
export default {
    /**
     * jsonp请求
     * @param {string} url 请求url
     * @param {Object} data 请求参数
     * @param {Function} successCb 回调函数
     * @param {Function} failCb 回调函数
     * @param {string} cbParamType url中回调函数参数名，默认为【callback】
     * @return {boolean} false
     */
    jsonp: function (url, data, successCb, failCb, cbParamType) {
        let md5 = Math.ceil(Math.random() * 100000);
        let cbn = 'jsonpcb' + md5;
        cbParamType = cbParamType || 'callback';
        url = url + (url.indexOf('?') > -1 ? '&' : '?') + cbParamType + '=window.jsonpcb.' + cbn;
        data.ctime = new Date().getTime();
        for (let key in data) {
            if (typeof data[key] === 'object') {
                url += '&' + key + '=' + JSON.stringify(data[key]);
            }
            else {
                url += '&' + key + '=' + data[key];
            }
        }
        let script = document.createElement('script');
        window.jsonpcb[cbn] = function (response) {
            script.parentNode.removeChild(script);
            successCb && successCb(response);
            window.jsonpcb[cbn] = null;
        };
        script.onerror = function () {
            script.parentNode.removeChild(script);
            failCb && failCb();
            // util.toast('请求失败，请重试');
            window.jsonpcb[cbn] = null;
        };
        script.src = url;
        script.type = 'text/javascript';
        document.body.appendChild(script);
    }
}
