/**
 * Created by huangwenming on 2018/4/4.
 */
const models = require('./model.js');
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

for (let item in models) {
    Mongoose.model(item, new Schema(models[item]));
}

const _getModel = function(type) {
    // console.log(Mongoose.model(type))
    return Mongoose.model(type);
};
const getModel = (type) => {
    return _getModel(type);
};
module.exports = {
    getModel: getModel
};