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
            // 需要对stack中的内容进行encodeURIComponent处理，避免由于stack中的特殊字符导致http请求被blocked
            if (key === 'stack' && data[key]) {
                data[key] = encodeURIComponent(data[key]);
            }
            if (typeof data[key] === 'object') {
                url += '&' + key + '=' + JSON.stringify(data[key]);
            }
            else {
                url += '&' + key + '=' + data[key];
            }
        }
        let script = document.createElement('script');
        window.jsonpcb[cbn] = (response)=> {
            script.parentNode.removeChild(script);
            successCb && successCb(response);
            window.jsonpcb[cbn] = null;
        };
        script.onerror = ()=> {
            script.parentNode.removeChild(script);
            failCb && failCb();
            window.jsonpcb[cbn] = null;
        };
        // console.log(url);
        script.type = 'text/javascript';
        script.src = url;
        // 请求2s延缓发出，尽量在页面加载的时候，不占用资源
        setTimeout(()=>{document.body.appendChild(script);}, 2000);
    }
}
