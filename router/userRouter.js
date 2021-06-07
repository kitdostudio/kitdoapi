let express = require('express');
let userrouter = express.Router();
let userStore = require('../userData');
let userstore = new userStore();
let jwt = require('jsonwebtoken');
let utils = require('./utils');
let random = require('random');
let ListTokenOn = require('../ListTokenOn');
let listtoken = new ListTokenOn();
//import random from 'random';

userrouter.get('/', function (req, res) {
    if (!req.query.username || !req.query.password || !req.query.key) {
        return res.send({
            message: 'Chưa nhập đủ thông tin cần check User!'
        });
    }

    let founduser = userstore.find(req.query.username);
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
    var token = jwt.sign(getata.username + getata.password + getata.key + random.int(12345,99999), 'login');
    if(listtoken.has_user(req.query.username)){
        listtoken.update(req.query.username,token);
    }
    else{
        listtoken.add(req.query.username,token);
    }
    return res.send({
        message: 'Login thanh cong',
        payload: {
            token: token
        }
    });
});

userrouter.post('/', function (req, res) {

    if (!req.body.username || !req.body.password || !req.body.key || !req.body.email) {
        return res.send({
            message: 'Chưa nhập đủ thông tin cần tạo User!'
        });
    }
    if (userstore.has(req.body.username)) {
        res.statusCode = 400;
        return res.send({
            message: 'User đã tồn tại! Đổi username khác'
        });
    }

    userstore.add(req.body);

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
    if(!listtoken.has_token(req.body.token)){
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

userrouter.put('/:username', function (req, res) {
    if (!userstore.update(req.params.username, req.body)) {
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