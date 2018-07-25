/**
 * Created by huangwenming on 2018/4/4.
 */
module.exports = {
    // 错误信息表,数据库中的表名为errorinfos
    errorInfo: {
        project: String,
        message: String,
        script: String,
        lineNo: String,
        columnNo: String,
        stack: String,
        time: String
    }
}