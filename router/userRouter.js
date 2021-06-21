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
    var b = new Date(getata.date).getTime() - new Date().getTime();
    if (b < 0) {
        res.statusCode = 404;
        return res.send({
            message: 'Key hết hạn. Vui lòng gia hạn!'
        });
    }
    //.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    var datetime_out = new Date(getata.date);
    var timezone = dateFormat(datetime_out, "HH:MM:ss dd-mm-yyyy");
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
            time: timezone
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

userrouter.post('/changepass', function (req, res) {

    if (!req.body.username || !req.body.password || !req.body.key || !req.body.newpassword) {
        res.statusCode = 404;
        console.log(req.body);
        return res.send({
            message: 'Chưa nhập đủ thông tin!'
        });
    }
    let founduser = userstore.findkey(req.body.key);
    let getata = founduser.pop();
    if (getata.length < 1) {

        res.statusCode = 404;
        return res.send({
            message: 'Không tìm thấy user'
        });
    }

    if (getata.password !== req.body.password) {
        res.statusCode = 404;
        return res.send({
            message: 'Sai password cũ'
        });
    }
    userstore.update(req.body.key, {
       
        password: req.body.newpassword
    });
    res.statusCode = 200;
    return res.send({
        message: 'Đổi mật khẩu thành công!'
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
        res.statusCode = 200;
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

module.exports = userrouter;