let express = require('express');
let userrouter = express.Router();
let userStore = require('../userData');
let userstore = new userStore();
let jwt = require('jsonwebtoken');
let utils = require('./utils');
let random = require('random');
let ListTokenOn = require('../ListTokenOn');
let listtoken = new ListTokenOn();
var dateFormat = require('dateformat');
var timespan = require('timespan');
  //var ts = new timespan.TimeSpan();
//import random from 'random';

userrouter.get('/', function (req, res) {
    if (!req.query.username || !req.query.password || !req.query.key) {
        return res.send({
            message: 'Chưa nhập đủ thông tin cần check User!'
        });
    }

    let founduser = userstore.findkey(req.query.key);
    let getata = founduser.pop();
    if (getata.length < 1) {

        res.statusCode = 404;
        return res.send({
            message: 'Không tìm thấy user'
        });
    }

    if (getata.password !== req.query.password) {
        res.statusCode = 404;
        return res.send({
            message: 'Sai password'
        });
    }
    if (getata.key !== req.query.key) {
        res.statusCode = 404;
        return res.send({
            message: 'Sai key'
        });
    }
    if (getata.date === '') {
        res.statusCode = 404;
        return res.send({
            message: 'Key chưa kích hoạt'
        });
    }

    var datetime_out = getata.date;
    var now = new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
     var datetime_now = dateFormat(now, "h:MM:ss dd-mm-yyyy");
     var now_days = Date.parse(datetime_now);
    //var span = timeSpan.FromDates(datetime_now,datetime_out);
    var token = jwt.sign(getata.username + getata.password + getata.key + random.int(12345, 99999), 'login');
    if (listtoken.has_user(req.query.username)) {
        listtoken.update(req.query.username, token);
    }
    else {
        listtoken.add(req.query.username, token);
    }
    return res.send({
        message: 'Login thanh cong',
        payload: {
            token: token,
            time: now_days
        }
    });
});

userrouter.post('/', function (req, res) {

    if (!req.body.username || !req.body.password || !req.body.key || !req.body.email) {
        return res.send({
            message: 'Chưa nhập đủ thông tin cần tạo User!'
        });
    }
    if (userstore.has(req.body.key)) {
        res.statusCode = 400;
        return res.send({
            message: 'Key đã tồn tại! Không thể tạo thêm Acc!'
        });
    }

    userstore.add(req.body);
    userstore.update(req.body.key, {
        date: ''
    });
    return res.send({
        message: 'Tạo user thành công!'
    });
});

userrouter.post('/checktoken', function (req, res) {

    if (!req.body.token) {
        res.statusCode = 400;
        return res.send({
            message: 'Chưa nhập token!'
        });
    }
    if (!listtoken.has_token(req.body.token)) {
        res.statusCode = 400;
        return res.send({
            message: 'Token Die!'
        });
    }
    var booll = checktoken(req.body.token, req.body.key);
    if (booll) {
        return res.send({
            message: 'Token Live!'
        });
    }
    else {
        res.statusCode = 400;
        return res.send({
            message: 'Token Die!'
        });
    }


});

userrouter.put('/:key', function (req, res) {
    if (!userstore.update(req.params.key, req.body)) {
        res.statusCode = 500;
        return res.send({
            message: 'Lỗi update'
        });
    }

    return res.send({
        message: 'update thành công',
        payload: req.body
    });
});


userrouter.delete('/:username', function (req, res) {

    if (!userstore.update(req.params.username)) {
        res.statusCode = 404;
        return res.send({
            message: 'Không tìm thấy user'
        });
    }

    userstore.remove(req.body.username);

    return res.send({
        message: 'delete thành công',
        payload: req.body
    });

});
function checktoken(token, key) {
    try {
        var decoded = utils.verifyJwtToken(token, 'login');
        if (decoded.then(function (data) {
            if (!data.includes(key)) {
                return false;
            }
            return true;

        })) {
            return true;
        }
        return false;
    }
    catch {
        return false;
    }
}
function getseconds(date_now,date_out){
    var now_hour = date_now.gethours();
    var now_minutes = date_now.getMinutes();
    var now_seconds = date_now.getSeconds();
    var now_days = date_now.daysInYear();
}
module.exports = userrouter;