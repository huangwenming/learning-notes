/**
 * Created by huangwenming on 2018/6/6.
 */
const util = require('../utils/util.js')
const constants = require('./constants.js')
const Session = require('./session.js')

// const host = 'https://1yujqaxq.qcloud.la/weapp/';
const host = 'https://185962592.wmhuang.cn/weapp/';

let buildAuthHeader = () => {
    var header = {};
    if (Session.get()) {
        header[constants.WX_HEADER_SKEY] = Session.get();
    }
    return header;
};
let LoginError = (function () {
    function LoginError(type, message) {
        Error.call(this, message);
        this.type = type;
        this.message = message;
    }

    LoginError.prototype = new Error();
    LoginError.prototype.constructor = LoginError;

    return LoginError;
})();

let  RequestError = (function () {
    function RequestError(type, message) {
        Error.call(this, message);
        this.type = type;
        this.message = message;
    }

    RequestError.prototype = new Error();
    RequestError.prototype.constructor = RequestError;

    return RequestError;
})();

/**
 * 微信登录，获取 code 和 encryptData
 */
var getWxLoginResult = function getLoginCode(callback) {
    wx.login({
        success: function (loginResult) {
            wx.getUserInfo({
                success: function (userResult) {
                    callback(null, {
                        code: loginResult.code,
                        encryptedData: userResult.encryptedData,
                        iv: userResult.iv,
                        userInfo: userResult.userInfo,
                    });
                },

                fail: function (userError) {
                    var error = new LoginError(constants.ERR_WX_GET_USER_INFO, '获取微信用户信息失败，请检查网络状态');
                    error.detail = userError;
                    callback(error, null);
                },
            });
        },

        fail: function (loginError) {
            var error = new LoginError(constants.ERR_WX_LOGIN_FAILED, '微信登录失败，请检查网络状态');
            error.detail = loginError;
            callback(error, null);
        },
    });
};

let noop = () => {};
let defaultOptions = {
    method: 'GET',
    success: noop,
    fail: noop,
    // loginUrl: 'https://1yujqaxq.qcloud.la/weapp/login'
    loginUrl: 'https://185962592.wmhuang.cn/weapp/login'
};
var login = function login(options) {
    options = util.extend({}, [defaultOptions, options]);

    if (!defaultOptions.loginUrl) {
        options.fail(new LoginError(constants.ERR_INVALID_PARAMS, '登录错误：缺少登录地址，请通过 setLoginUrl() 方法设置登录地址'));
        return;
    }

    var doLogin = () => getWxLoginResult(function (wxLoginError, wxLoginResult) {
        if (wxLoginError) {
            options.fail(wxLoginError);
            return;
        }

        var userInfo = wxLoginResult.userInfo;

        // 构造请求头，包含 code、encryptedData 和 iv
        var code = wxLoginResult.code;
        var encryptedData = wxLoginResult.encryptedData;
        var iv = wxLoginResult.iv;
        var header = {};

        header[constants.WX_HEADER_CODE] = code;
        header[constants.WX_HEADER_ENCRYPTED_DATA] = encryptedData;
        header[constants.WX_HEADER_IV] = iv;

        // 请求服务器登录地址，获得会话信息
        wx.request({
            url: options.loginUrl,
            header: header,
            method: options.method,
            data: options.data,
            success: function (result) {
                var data = result.data;

                // 成功地响应会话信息
                if (data && data.code === 0 && data.data.skey) {
                    var res = data.data
                    if (res.userinfo) {
                        Session.set(res.skey);
                        options.success(userInfo);
                    } else {
                        var errorMessage = '登录失败(' + data.error + ')：' + (data.message || '未知错误');
                        var noSessionError = new LoginError(constants.ERR_LOGIN_SESSION_NOT_RECEIVED, errorMessage);
                        options.fail(noSessionError);
                    }

                    // 没有正确响应会话信息
                } else {
                    var noSessionError = new LoginError(constants.ERR_LOGIN_SESSION_NOT_RECEIVED, JSON.stringify(data));
                    options.fail(noSessionError);
                }
            },

            // 响应错误
            fail: function (loginResponseError) {
                var error = new LoginError(constants.ERR_LOGIN_FAILED, '登录失败，可能是网络错误或者服务器发生异常');
                options.fail(error);
            },
        });
    });

    var session = Session.get();
    if (session) {
        wx.checkSession({
            success: function () {
                options.success(session);
            },

            fail: function () {
                Session.clear();
                doLogin();
            },
        });
    } else {
        doLogin();
    }
};

// 是否已经进行过重试
let hasRetried = false;

// 自定义请求函数
let request = (options) => {
    if (typeof options !== 'object') {
        var message = '请求传参应为 object 类型，但实际传了 ' + (typeof options) + ' 类型';
        throw new RequestError(constants.ERR_INVALID_PARAMS, message);
    }

    var requireLogin = options.login;
    var url = options.url;
    var params = options.data;
    var success = options.success || noop;
    var fail = options.fail || noop;
    var complete = options.complete || noop;
    var header = options.header || {};

    // 成功回调
    var callSuccess = function (args) {
        console.log(args);
        success.apply(null, arguments);
        complete.apply(null, arguments);
    };

    // 失败回调
    var callFail = function (error) {
        fail.call(null, error);
        complete.call(null, error);
    };
    if (requireLogin) {
        doRequestWithLogin();
    } else {
        doRequest();
    }

    function doRequestWithLogin() {
        login({
            success: doRequest,
            fail: callFail
        });
    }

    function doRequest() {
        wx.request({
            url: url,
            header: util.extend({}, [header, buildAuthHeader()]),
            data: params,
            dataType: 'json',
            success: (res) => {
                var data = res.data;
                // session过期
                if (data && data.code === 100) {
                    Session.clear();
                    if (!hasRetried) {
                         hasRetried = true;
                        doRequestWithLogin();
                        return;
                    }
                }
                else {
                    callSuccess.call(null, res);
                }
            },
            fail: callFail,
            complete: noop
        })
    }
}

// 获取首屏数据操作
const getHomePageData = (params, success, fail) => {
    const url = host + 'CourseApi/getHomePageData';
    request({
        url: url,
        login: true,
        header: {},
        data: params,
        dataType: 'json',
        success: success,
        fail: fail
    });
}

// 课表操作:新增
const addCourse = (params, success, fail) => {
    const url = host + 'CourseApi/addCourse';
    request({
        url: url,
        login: true,
        header: {},
        data: params,
        dataType: 'json',
        success: success,
        fail: fail
    })
}
// 课表操作:更新
const updateCourse = (params, success, fail) => {
    const url = host + 'CourseApi/updateCourse';
    request({
        url: url,
        login: true,
        header: {},
        data: params,
        dataType: 'json',
        success: success,
        fail: fail
    })
}

// 分享：已排课程
const getShareCourses = (params, success, fail) => {
    const url = host + 'CourseApi/getTeacherArrangeData';
    let useLogin = params.useLogin === undefined ? true : params.useLogin;
    request({
        url: url,
        login: useLogin,
        header: {},
        data: params,
        dataType: 'json',
        success: success,
        fail: fail
    })
}
// 更新学生信息
const updateStudent = (params, success, fail) => {
    const url = host + 'StuApi/updateStudentInfo';
    request({
        url: url,
        login: true,
        header: {},
        data: params,
        dataType: 'json',
        success: success,
        fail: fail
    })
}

// 获取教师的个人总结信息
const getTeacherStaticInfo = (params, success, fail) => {
    const url = host + 'TeacherApi/getTeacherStasticInfo';
    request({
        url: url,
        login: true,
        header: {},
        data: params,
        dataType: 'json',
        success: success,
        fail: fail
    })
}

// 获取周度收入详情
const getWeekStasticInfo = (params, success, fail) => {
    const url = host + 'TeacherApi/getWeekStasticInfo';
    request({
        url: url,
        login: true,
        header: {},
        data: params,
        dataType: 'json',
        success: success,
        fail: fail
    })
}
// 获取月度收入详情
const getMonthStasticInfo = (params, success, fail) => {
    const url = host + 'TeacherApi/getMonthStasticInfo';
    request({
        url: url,
        login: true,
        header: {},
        data: params,
        dataType: 'json',
        success: success,
        fail: fail
    })
}

// 获取评语list
const getCommentList = (params, success, fail) => {
    const url = host + 'StuApi/getCommentList';
    let useLogin = params.useLogin === undefined ? true : params.useLogin;
    request({
        url: url,
        login: useLogin,
        header: {},
        data: params,
        dataType: 'json',
        success: success,
        fail: fail
    })
}
// 添加评语
const saveEvaluation = (params, success, fail) => {
    const url = host + 'StuApi/comment';
    request({
        url: url,
        login: true,
        header: {},
        data: params,
        dataType: 'json',
        success: success,
        fail: fail
    })
}
// 保存分享的空余时间
const saveIdleInfo = (params, success, fail) => {
    const url = host + 'TeacherApi/genShareId';
    request({
        url: url,
        login: true,
        header: {},
        data: params,
        dataType: 'json',
        success: success,
        fail: fail
    })
}
// 获取分享的空余时间
const getIdleInfo = (params, success, fail) => {
    const url = host + 'TeacherApi/getShareData';
    request({
        url: url,
        login: true,
        header: {},
        data: params,
        dataType: 'json',
        success: success,
        fail: fail
    })
}
// 获取某老师某节课的信息
const getCourseInfo = (params, success, fail) => {
    const url = host + 'CourseApi/getCourseInfoByCourseId';
    let useLogin = params.useLogin === undefined ? true : params.useLogin;
    request({
        url: url,
        login: params.useLogin,
        header: {},
        data: params,
        dataType: 'json',
        success: success,
        fail: fail
    })
}
// 获取某老师某学生的信息
const getStudentInfo = (params, success, fail) => {
    const url = host + 'StuApi/getStudentInfo';
    request({
        url: url,
        login: true,
        header: {},
        data: params,
        dataType: 'json',
        success: success,
        fail: fail
    })
}


module.exports = {
    addCourse: addCourse,
    updateCourse: updateCourse,
    getShareCourses: getShareCourses,
    getHomePageData: getHomePageData,
    updateStudent: updateStudent,
    getTeacherStaticInfo: getTeacherStaticInfo,
    getWeekStasticInfo: getWeekStasticInfo,
    getMonthStasticInfo: getMonthStasticInfo,
    getCommentList: getCommentList,
    saveEvaluation: saveEvaluation,
    saveIdleInfo: saveIdleInfo,
    getIdleInfo: getIdleInfo,
    getCourseInfo: getCourseInfo,
    getStudentInfo: getStudentInfo,
    login: login
}