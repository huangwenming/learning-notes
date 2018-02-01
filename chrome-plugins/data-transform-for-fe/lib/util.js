/**
 * Created by huangwenming on 2018/2/1.
 */
var util = {
    /**
     * base64加密函数
     * @param string input 原始字符串
     * @retrurn string 加密后的字符串
     */
    base64Encode: function (input) {
        var rv;
        rv = encodeURIComponent(input);
        rv = unescape(rv);
        rv = window.btoa(rv);
        return rv;
    },
    /**
     * base64解密函数
     * @param string input 原始字符串
     * @retrurn string 解密后的字符串
     */
    base64Decode: function (input) {
        var rv;
        rv = window.atob(input);
        rv = escape(rv);
        rv = decodeURIComponent(rv);
        return rv;
    }
}