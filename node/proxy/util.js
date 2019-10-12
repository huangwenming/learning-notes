var util = {
    // 将query字符串转换成query对象
    parseStringToQuery: function (queryStr) {
        var extraParamsArray = [];
        var params = {};
        if (queryStr) {
            extraParamsArray = queryStr.split('&');
            extraParamsArray.forEach(function (item, index) {
                var queryValue = item.split('=');
                params[queryValue[0]] = queryValue[1];
            })
        }
        return params;
    },
    // 为url添加query
    addQueryToUrl: function (url, query) {
        // 需要替换掉url中与query的同名字段
        var queryStr = '';
        var newUrl = '';
        var params = util.getUrlParams(url);
        for (var key in query) {
            var value = query[key];
            if (value !== null && value !== '' && value !== undefined) {
                // fr参数在url拼接query中不被覆盖
                if (key === 'fr' && params['fr']) {
                    // 如果跳转的url中存在fr参数，则不将query中的fr替换成url中的fr
                    // 跳出单次循环
                    continue;
                }
                // 替换掉url中与query的同名字段，避免url中出现多个同名字段
                // var repeatReg = new RegExp(key + '=([^&#]*[&#])?', 'g');
                var repeatReg = new RegExp(key + '=' + params[key] + '[&#]?', 'g');
                url = url.replace(repeatReg, function (match) {
                    return /#/.test(match) ? '#' : '';
                });
                queryStr += (queryStr ? '&' + key + '=' + value : '' + key + '=' + value);
            }
        }
        var urlArray = url.split('?');
        if (urlArray.length === 1) {
            newUrl = url + '?' + queryStr;
        }
        else {
            var linkStr = '';
            // 可能会出现双问号的情况
            if (urlArray[1]) {
                linkStr = /^#/.test(urlArray[1]) ? '' : '&';
            }
            // var linkStr = /^#/.test(urlArray[1]) ? '' : '&';
            urlArray[1] = queryStr + linkStr + urlArray[1];
            newUrl = urlArray.join('?');
        }
        return newUrl;
    },
    getUrlParams: function (data) {
        var params = {};
        var str = data || window.location.href;
        if (!str) {
            return {};
        };
        str =  decodeURIComponent(str);
        var arr = [];
        // 请求参数和路由参数分开解析，都放在params
        arr = str.split('#');
        for (var i = 0; i < arr.length; i++) {
            var temp;
            if (arr[i].indexOf('?')) {
                temp = arr[i].split('?');
                // 实际没有参数
                if (!temp[1]) {
                    continue;
                }
                // 使用哪个分隔符
                // 因为安卓调起组件有问题，url不能存在&字符，所以url用$字符代替分隔参数，因此解析时做区分
                // var delimiter = temp[1].indexOf('&') > 0 ? '&' : '$';
                temp[1] = temp[1].replace(/\$/g, '&');
                var delimiter = '&';
                temp = temp[1].split(delimiter);

                for (var j = 0; j < temp.length; j++) {
                    if (temp[j] !== '') {
                        // 需要兼容base64参数带来的==问题
                        var keyValueArray = /([^=]*)=(.*)/.exec(temp[j]);
                        params[keyValueArray[1]] = keyValueArray[2];
                    }
                }
            }
        }
        return params;
    }
};

module.exports = util;