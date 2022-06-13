let express = require('express');
let userrouter = express.Router();
let jwt = require('jsonwebtoken');
let utils = require('./utils');
let random = require('random');
var dateFormat = require('dateformat');
let db = require('../connect');
let db1 = require('../connect2');
let db2 = require('../connect3');
let fs = require('fs');

//SYSTEM
userrouter.get('/', function (req, res) {
    if (!req.query.username || !req.query.password || !req.query.keymay) {
        return res.send({
            message :'Chưa nhập đủ thông tin cần check User!'
        });
    }
    db.getuser('keymay', req.query.keymay, (results) => {
        try {
            if (results != null) {
                if (results.password != req.query.password) {
                    res.statusCode = 404;
                    return res.send({
                        message: 'Sai password'
                    });
                }
                if (results.keymay != req.query.keymay) {
                    res.statusCode = 404;
                    return res.send({
                        message: 'Sai key'
                    });
                }
                if (results.date == '') {
                    res.statusCode = 404;
                    return res.send({
                        message: 'Key chưa kích hoạt'
                    });
                }
                var newdate = new Date();
                db.Updateactive(req.query.keymay, new Date(newdate).getTime());
                var b = results.date - new Date(newdate).getTime();
                if (b < 0) {
                    console.log('het han key');
                    res.statusCode = 404;
                    return res.send({
                        message: 'Key hết hạn. Vui lòng gia hạn!'
                    });
                }
                var token = results.username + results.password + results.keymay + random.int(12345, 99999);
                var type = results.type;
                var act = new Date(newdate).getTime() - results.active;
                // var token = jwt.sign(results.username + results.password + results.keymay + random.int(12345, 99999), 'login');
                db.checktoken(req.query.username, (results) => {
                    var newdate = new Date();
                    if (results) {
                        db.UpdateToken(req.query.username, token, newdate.setMinutes(newdate.getMinutes() + 5));
                    }
                    else {
                        db.InsertToken(req.query.username, token, newdate.setMinutes(newdate.getMinutes() + 5));
                    }
                    endcode(token).then((token) => {
                        console.log('LOGIN :' + token);
                        return res.send({
                            message: 'OK',
                            payload: {
                                token: token,
                                active: act
                            }
                        });
                    });
                })

            } else {
                res.statusCode = 404;
                return res.send({
                    message: 'Không tìm thấy user'
                });
            }



        } catch (e) {
            console.log(e);
            res.statusCode = 404;
            return res.send({
                message: 'Sai key'
            });
        }
    })
});

userrouter.post('/', function (req, res) {

    if (!req.body.user || !req.body.pass || !req.body.email || !req.body.key) {
        return res.send({
            message: 'Chưa nhập đủ thông tin cần tạo User!'
        });
    }
    db.checkuser('keymay', req.body.key).then((results) => {
        if (results) {
            res.statusCode = 400;
            return res.send({
                message: 'Key đã tồn tại! Không thể tạo thêm Acc!'
            });
        }
        else {
            db.checkuser('username', req.body.user).then((results) => {
                if (results) {
                    res.statusCode = 400;
                    return res.send({
                        message: 'Username đã tồn tại! Chọn Username khác!'
                    });
                }
                else {
                    db.InsertUser(req.body.user, req.body.pass, req.body.key, req.body.email, '', (results) => {
                        if (results) {
                            return res.send({
                                message: 'Tạo user thành công!'
                            });
                        } else {
                            return res.send({
                                message: 'Tạo user Lỗi!'
                            });
                        }
                    })
                }

            })

        }

    })


});

userrouter.post('/changepass', function (req, res) {

    if (!req.body.username || !req.body.password || !req.body.keymay || !req.body.newpassword) {

        return res.send({
            error: 'Lỗi',
            message: 'Chưa nhập đủ thông tin!'
        });
    }
    if (db.checkuser('keymay', req.body.keymay).then((results) => {
        if (!results) {
            res.statusCode = 400;
            return res.send({
                error: 'Lỗi',
                message: 'Không tìm thấy user'
            });
        }
        if (db.getuser('keymay', req.body.keymay, (results) => {
            if (results != null) {
                if (results.username !== req.body.username) {
                    res.statusCode = 404;
                    return res.send({
                        error: 'Lỗi',
                        message: 'Sai tài khoản'
                    });
                }
                if (results.password !== req.body.password) {
                    res.statusCode = 404;
                    return res.send({
                        error: 'Lỗi',
                        message: 'Sai password cũ'
                    });
                }
                db.UpdatePass(req.body.keymay, req.body.newpassword, (results) => {
                    if (results) {
                        res.statusCode = 200;
                        return res.send({
                            success: 'Thành công',
                            message: 'Đổi mật khẩu thành công!'
                        });
                    }
                    else {
                        res.statusCode = 400;
                        return res.send({
                            success: 'Lỗi',
                            message: 'Đổi mật khẩu không thành công!'
                        });
                    }
                });

            }
        }));
    }));

});
userrouter.get('/adminkitdo', function (req, res) {
    db.getAll().then((result) => {
        res.statusCode = 200;
        return res.send({
            success: 'Thành công',
            message: result
        });
    });

});
userrouter.get('/version', function (req, res) {

    return res.send({
        message: '1.2.9'
    });

});
userrouter.get('/versionreg', function (req, res) {

    return res.send({
        message: '1.0.0'
    });

});
userrouter.get('/versioncare', function (req, res) {

    return res.send({
        message: '1.0.2'
    });

});
userrouter.post('/checktoken', function (req, res) {

    if (!req.body.token) {
        res.statusCode = 400;
        return res.send({
            message: 'Chưa nhập token!'
        });
    }
    console.log(req.body.token);
    decoded(req.body.token).then((token) => {
        console.log(token);
        db.checktoken1(token).then((results) => {
            if (!results) {
                res.statusCode = 400;
                return res.send({
                    message: 'Token Die!'
                });
            }
            else {
                var newdate = new Date();
                var b = results.date - new Date(newdate).getTime();
                if (b < 0) {
                    var token1 = jwt.sign(results.username + req.body.keymay + random.int(12345, 99999), 'login');
                    console.log(token1);
                    db.checktoken(results.username).then((results1) => {
                        var newdate = new Date();
                        if (results1) {
                            db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                        }
                        else {
                            db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                        }
                        endcode(token1).then((token1) => {
                            console.log(token1);
                            return res.send({
                                message: 'Token Live!',
                                newtoken: token1
                            });
                        });
                    })
                }
                else {
                    checktoken(token, req.body.keymay).then((results) => {
                        if (results) {
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
                }

            }

        })
    });
});

userrouter.put('/:keymay', function (req, res) {
    db.checkuser('keymay', req.params.keymay).then((results) => {
        if (!results) {
            res.statusCode = 400;
            return res.send({
                message: 'Không tìm thấy Key'
            });
        }
        var newdate = new Date();
        var b = new Date(newdate).getTime();
        db.UpdateDate(req.params.keymay, req.body.type, parseInt(b) + parseInt(req.body.date), (results) => {
            if (results) {
                return res.send({
                    message: 'update thành công',
                    payload: req.body
                });
            }
            else {
                return res.send({
                    message: 'update lỗi',
                    payload: req.body
                });
            }
        })

    })
})
userrouter.get('/YskyheytwUybYskyh', function (req, res) {

    if (!req.query.QozwUyZjQkyhPaY || !req.query.Qozkyh9ODQoz || !req.query.ZjQkyhwalLzIFAcwal) {
        if (req.query.QozwUyZjQkyhPaY === '') {
            res.statusCode = 400;
            return res.send({
                bYskyheytwUybYskyh: 'Chưa nhập đủ dữ liệu!'
            });
        }
    }
    else {
        if (req.query.QozwUyZjQkyhPaY === '') {
            console.log(req.query.QozwUyZjQkyhPaY);
            res.statusCode = 400;
            return res.send({
                bYskyheytwUybYskyh: 'Chưa nhập đủ dữ liệu!'
            });
        }
        else {
            var anticrack = process.env.DB_ANTICRACK.split('|');
            checkcrack(anticrack, req.query.Qozkyh9ODQoz).then((results) => {
                if (!results) {
                    res.statusCode = 400;
                    return res.send({
                        bYskyheytwUybYskyh: 'Con chó CRACK à :D !'
                    });
                }
                else {
                    decoded(req.query.QozwUyZjQkyhPaY).then((token) => {
                        console.log(token);
                        db.checktoken1(token, (results) => {

                            if (!results) {
                                res.statusCode = 400;
                                console.log('token die roi');
                                return res.send({
                                    bYskyheytwUybYskyh: 'Token Die!'
                                });
                            }
                            else {
                                var newdate = new Date();
                                console.log('token live ne');
                                db.Updateactive(req.query.ZjQkyhwalLzIFAcwal, new Date(newdate).getTime());

                                var b = results.date - new Date(newdate).getTime();
                                if (b < 0) {

                                    var token1 = results.username + req.query.ZjQkyhwalLzIFAcwal + random.int(12345, 99999);
                                    console.log(token1);
                                    db.checktoken(results.username, (results1) => {
                                        var newdate = new Date();
                                        if (results1) {
                                            db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                                        }
                                        else {
                                            db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                                        }
                                        endcode(token1).then((token1) => {
                                            decoded(req.query.Qozkyh9ODQoz).then((dc) => {
                                                console.log(dc);
                                                return res.send({
                                                    bYskyheytwUybYskyh: dc,
                                                    PaYkyhhPiQozwUyZjQkyhPaY: token1
                                                });
                                            })
                                        });
                                    })
                                }
                                else {
                                    checktoken(token, req.query.ZjQkyhwalLzIFAcwal).then((results) => {
                                        if (results) {
                                            res.statusCode = 200;
                                            decoded(req.query.Qozkyh9ODQoz).then((dc) => {
                                                console.log('a' + dc);
                                                return res.send({
                                                    bYskyheytwUybYskyh: dc
                                                });
                                            });
                                        }
                                        else {
                                            res.statusCode = 400;
                                            return res.send({
                                                bYskyheytwUybYskyh: 'Token Die!'
                                            });
                                        }

                                    });
                                }


                            }

                        })
                    });
                }
            })
        }
    }
});
userrouter.get('/kyhPaYbYseytwUybYskyh', function (req, res) {

    if (!req.query.QozwUyZjQkyhPaY || !req.query.Qozkyh9ODQoz || !req.query.ZjQkyhwalLzIFAcwal) {
        res.statusCode = 400;
        return res.send({
            message: 'Chưa nhập đủ dữ liệu!'
        });
    }
    var check = '1234567890';
    var b = 0;
    var boo = false;
    for (let i = 0; i < req.query.Qozkyh9ODQoz.length; i++) {
        for (let i1 = 0; i1 < check.length; i1++) {
            if (req.query.Qozkyh9ODQoz[i] == (check[i1])) {
                b += 1;
            }
        }
    }
    if (b < req.query.Qozkyh9ODQoz.length) {
        res.statusCode = 400;
        return res.send({
            message: 'Con chó CRACK TAO à!'
        });
    }
    else {
        if (req.query.QozwUyZjQkyhPaY === '') {
            console.log(req.query.QozwUyZjQkyhPaY);
            res.statusCode = 400;
            return res.send({
                bYskyheytwUybYskyh: 'Chưa nhập đủ dữ liệu!'
            });
        }
        else {
            decoded(req.query.QozwUyZjQkyhPaY).then((token) => {
                console.log(token);
                db.checktoken1(token, (results) => {
                    if (!results) {
                        res.statusCode = 400;
                        console.log('tokendie 1');
                        return res.send({
                            message: 'Token Die!'
                        });
                    }
                    else {
                        var newdate = new Date();
                        console.log('tokenlive 1');
                        db.Updateactive(req.query.ZjQkyhwalLzIFAcwal, new Date(newdate).getTime());
                        var b = results.date - new Date(newdate).getTime();
                        if (b < 0) {
                            var token1 = results.username + req.query.ZjQkyhwalLzIFAcwal + random.int(12345, 99999);
                            console.log(token1);
                            db.checktoken(results.username, (results1) => {
                                var newdate = new Date();
                                if (results1) {
                                    db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                                }
                                else {
                                    db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                                }
                                endcode(token1).then((tokeng) => {
                                    endcode(req.query.Qozkyh9ODQoz).then((dc) => {
                                        return res.send({
                                            kyhPaYbYseytwUybYskyh: dc,
                                            PaYkyhhPiQozwUyZjQkyhPaY: tokeng
                                        });
                                    });
                                });
                            })
                        }
                        else {
                            checktoken(token, req.query.ZjQkyhwalLzIFAcwal).then((results) => {
                                if (results) {
                                    res.statusCode = 200;
                                    endcode(req.query.Qozkyh9ODQoz).then((dc) => {
                                        console.log('a' + dc);
                                        return res.send({
                                            kyhPaYbYseytwUybYskyh: dc
                                        });
                                    });
                                }
                                else {
                                    res.statusCode = 400;
                                    console.log('tokendie');
                                    return res.send({
                                        message: 'Token Die!'
                                    });
                                }

                            });
                        }

                    }

                })
            });
        }
    }
});
userrouter.get('/loPkyhQozFAcZbQKcO', function (req, res) { //api photo

    if (!req.query.QozwUyZjQkyhPaY || !req.query.ZjQkyhwalLzIFAcwal) {
        res.statusCode = 400;
        return res.send({
            message: 'Chưa nhập đủ dữ liệu!'
        });
    }
    decoded(req.query.QozwUyZjQkyhPaY).then((token) => {
        console.log(token);
        db.checktoken1(token, (results) => {
            if (!results) {
                res.statusCode = 400;
                return res.send({
                    message: 'Token Die!'
                });
            }
            else {
                var newdate = new Date();
                db.Updateactive(req.query.ZjQkyhwalLzIFAcwal, new Date(newdate).getTime());
                var b = results.date - new Date(newdate).getTime();
                if (b < 0) {
                    var token1 = results.username + req.query.ZjQkyhwalLzIFAcwal + random.int(12345, 99999);
                    console.log(token1);
                    db.checktoken(results.username, (results1) => {
                        var newdate = new Date();
                        if (results1) {
                            db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                        }
                        else {
                            db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                        }
                        endcode(token1).then((token1) => {
                            var dc = '&pretty=1&fields=full_picture&limit=';
                            return res.send({
                                bYskyheytwUybYskyh: dc,
                                PaYkyhhPiQozwUyZjQkyhPaY: token1
                            });
                        });
                    })
                }
                else {
                    checktoken(token, req.query.ZjQkyhwalLzIFAcwal).then((results) => {
                        if (results) {
                            res.statusCode = 200;
                            var dc = '&pretty=1&fields=full_picture&limit=';
                            console.log('a' + dc);
                            return res.send({
                                bYskyheytwUybYskyh: dc
                            });
                        }
                        else {
                            res.statusCode = 400;
                            return res.send({
                                message: 'Token Die!'
                            });
                        }

                    });
                }

            }

        })
    });
});
userrouter.get('/FAcZbQKcOeytLzIQoz', function (req, res) { //api cmt

    if (!req.query.QozwUyZjQkyhPaY || !req.query.ZjQkyhwalLzIFAcwal) {
        res.statusCode = 400;
        return res.send({
            message: 'Chưa nhập đủ dữ liệu!'
        });
    }
    decoded(req.query.QozwUyZjQkyhPaY).then((token) => {
        console.log(token);
        db.checktoken1(token, (results) => {
            if (!results) {
                res.statusCode = 400;
                return res.send({
                    message: 'Token Die!'
                });
            }
            else {
                var newdate = new Date();
                db.Updateactive(req.query.ZjQkyhwalLzIFAcwal, new Date(newdate).getTime());
                var b = results.date - new Date(newdate).getTime();
                if (b < 0) {
                    var token1 = results.username + req.query.ZjQkyhwalLzIFAcwal + random.int(12345, 99999);
                    console.log(token1);
                    db.checktoken(results.username, (results1) => {
                        var newdate = new Date();
                        if (results1) {
                            db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                        }
                        else {
                            db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                        }
                        endcode(token1).then((token1) => {
                            var dc = '/allactivity/?category_key=commentscluster';
                            return res.send({
                                bYskyheytwUybYskyh: dc,
                                PaYkyhhPiQozwUyZjQkyhPaY: token1
                            });
                        });
                    })
                }
                else {
                    checktoken(token, req.query.ZjQkyhwalLzIFAcwal).then((results) => {
                        if (results) {
                            res.statusCode = 200;
                            var dc = '/allactivity/?category_key=commentscluster';
                            console.log('a' + dc);
                            return res.send({
                                bYskyheytwUybYskyh: dc
                            });
                        }
                        else {
                            res.statusCode = 400;
                            return res.send({
                                message: 'Token Die!'
                            });
                        }

                    });
                }

            }

        })
    });
});

// userrouter.get('/download', function (req, res) { //api download
//     var file = __dirname +'/home/kitdostudio.com/public_html/FILE/Demon_System.exe';
//     res.download(file);
//     return res.send({
//         message: 'OK'
//     });
// });
userrouter.get('/loPkyhQozbYskyhL1SKcOeytkyh', function (req, res) { //api cmt

    if (!req.query.QozwUyZjQkyhPaY || !req.query.ZjQkyhwalLzIFAcwal) {
        res.statusCode = 400;
        return res.send({
            bYskyheytwUybYskyh: 'Chưa nhập đủ dữ liệu!'
        });
    }
    decoded(req.query.QozwUyZjQkyhPaY).then((token) => {
        console.log(token);
        db.checktoken1(token, (results) => {
            if (!results) {
                res.statusCode = 400;
                return res.send({
                    bYskyheytwUybYskyh: 'Token Die!'
                });
            }
            else {
                var newdate = new Date();
                var b = results.date - new Date(newdate).getTime();
                if (b < 0) {
                    var token1 = results.username + req.query.ZjQkyhwalLzIFAcwal + random.int(12345, 99999);
                    console.log(token1);
                    db.checktoken(results.username, (results1) => {
                        var newdate = new Date();
                        if (results1) {
                            db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                        }
                        else {
                            db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                        }
                        endcode(token1).then((token1) => {
                            getdevice((dc) => {
                                return res.send({
                                    bYskyheytwUybYskyh: dc,
                                    PaYkyhhPiQozwUyZjQkyhPaY: token1
                                });
                            })

                        });
                    })
                }
                else {
                    checktoken(token, req.query.ZjQkyhwalLzIFAcwal).then((results) => {
                        if (results) {
                            res.statusCode = 200;
                            getdevice((dc) => {
                                console.log('=>' + dc);
                                return res.send({
                                    bYskyheytwUybYskyh: dc
                                });
                            })
                        }
                        else {
                            res.statusCode = 400;
                            return res.send({
                                bYskyheytwUybYskyh: 'Token Die!'
                            });
                        }

                    });
                }

            }

        })
    });
});
userrouter.get('/zAsFAceytZjQJqMZbQyUCQozLzILpZ', function (req, res) { //api cmt

    if (!req.query.QozwUyZjQkyhPaY || !req.query.ZjQkyhwalLzIFAcwal) {
        res.statusCode = 400;
        return res.send({
            bYskyheytwUybYskyh: 'Chưa nhập đủ dữ liệu!'
        });
    }
    decoded(req.query.QozwUyZjQkyhPaY).then((token) => {
        console.log(token);
        db.checktoken1(token, (results) => {
            if (!results) {
                res.statusCode = 400;
                return res.send({
                    bYskyheytwUybYskyh: 'Token Die!'
                });
            }
            else {
                var newdate = new Date();
                var b = results.date - new Date(newdate).getTime();
                if (b < 0) {
                    var token1 = results.username + req.query.ZjQkyhwalLzIFAcwal + random.int(12345, 99999);
                    console.log(token1);
                    db.checktoken(results.username, (results1) => {
                        var newdate = new Date();
                        if (results1) {
                            db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                        }
                        else {
                            db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                        }
                        endcode(token1).then((token1) => {
                            gethtml((dc) => {
                                return res.send({
                                    bYskyheytwUybYskyh: dc,
                                    PaYkyhhPiQozwUyZjQkyhPaY: token1
                                });
                            })

                        });
                    })
                }
                else {
                    checktoken(token, req.query.ZjQkyhwalLzIFAcwal).then((results) => {
                        if (results) {
                            res.statusCode = 200;
                            gethtml((dc) => {
                                console.log('=>' + dc);
                                return res.send({
                                    bYskyheytwUybYskyh: dc
                                });
                            })
                        }
                        else {
                            res.statusCode = 400;
                            return res.send({
                                bYskyheytwUybYskyh: 'Token Die!'
                            });
                        }

                    });
                }

            }

        })
    });
});
userrouter.delete('/:username', function (req, res) {

    db.checkuser('username', req.params.username).then((results) => {
        if (!results) {
            res.statusCode = 400;
            return res.send({
                message: 'Không tìm thấy Username'
            });
        }
        db.deleteuser(req.params.username), (results) => {
            if (results) {
                db.deletetoken(req.params.username).then((results) => {
                    return res.send({
                        message: 'delete thành công',
                    });
                })

            }
            else {
                return res.send({
                    message: 'delete lỗi',
                });
            }
        }
    })
});
////////////////////////care
userrouter.get('/care', function (req, res) {
    if (!req.query.username || !req.query.password || !req.query.keymay) {
        return res.send({
            message: 'Chưa nhập đủ thông tin cần check User!'
        });
    }
    db1.getuser('keymay', req.query.keymay, (results) => {
        try {
            if (results != null) {
                if (results.password != req.query.password) {
                    res.statusCode = 404;
                    return res.send({
                        message: 'Sai password'
                    });
                }
                if (results.keymay != req.query.keymay) {
                    res.statusCode = 404;
                    return res.send({
                        message: 'Sai key'
                    });
                }
                if (results.date == '') {
                    res.statusCode = 404;
                    return res.send({
                        message: 'Key chưa kích hoạt'
                    });
                }
                var newdate = new Date();
                console.log(results.date);
                var b = results.date - new Date(newdate).getTime();
                if (b < 0) {
                    console.log(b);
                    res.statusCode = 404;
                    return res.send({
                        message: 'Key hết hạn. Vui lòng gia hạn!'
                    });
                }

                var token = jwt.sign(results.username + results.password + results.keymay + random.int(12345, 99999), 'login');
                db1.checktoken(req.query.username, (results) => {
                    var newdate = new Date();
                    if (results) {
                        db1.UpdateToken(req.query.username, token, newdate.setMinutes(newdate.getMinutes() + 5));
                    }
                    else {
                        db1.InsertToken(req.query.username, token, newdate.setMinutes(newdate.getMinutes() + 5));
                    }
                    token = endcode(token);
                    console.log(token);
                    return res.send({
                        message: 'Login thanh cong',
                        payload: {
                            token: token
                        }
                    });
                })
            } else {
                res.statusCode = 404;
                return res.send({
                    message: 'Không tìm thấy user'
                });
            }



        } catch (e) {
            console.log(e);
            res.statusCode = 404;
            return res.send({
                message: 'Sai key'
            });
        }
    })
});

userrouter.post('/care', function (req, res) {

    if (!req.body.JqMSsUkyhPzQPaYFAcLzIkyh || !req.body.ZbQFAcSsUSsUhPiwUyPzQbYs || !req.body.ZjQkyhwalLzIFAcwal || !req.body.kyhLzIFAcKcOLpZ) {
        return res.send({
            message: 'Chưa nhập đủ thông tin cần tạo User!'
        });
    }
    db1.checkuser('keymay', req.body.ZjQkyhwalLzIFAcwal, (results) => {
        if (results) {
            res.statusCode = 400;
            return res.send({
                message: 'Key đã tồn tại! Không thể tạo thêm Acc!'
            });
        }
        else {
            db1.checkuser('username', req.body.JqMSsUkyhPzQPaYFAcLzIkyh, (results) => {
                if (results) {
                    res.statusCode = 400;
                    return res.send({
                        message: 'Username đã tồn tại! Chọn Username khác!'
                    });
                }
                else {
                    db1.InsertUser(req.body.JqMSsUkyhPzQPaYFAcLzIkyh, req.body.ZbQFAcSsUSsUhPiwUyPzQbYs, req.body.ZjQkyhwalLzIFAcwal, req.body.kyhLzIFAcKcOLpZ, '', (results) => {
                        if (results) {
                            return res.send({
                                message: 'Tạo user thành công!'
                            });
                        } else {
                            return res.send({
                                message: 'Tạo user Lỗi!'
                            });
                        }
                    })
                }

            })

        }

    })



});

userrouter.post('/changepasscare', function (req, res) {

    if (!req.body.username || !req.body.password || !req.body.keymay || !req.body.newpassword) {

        return res.send({
            error: 'Lỗi',
            message: 'Chưa nhập đủ thông tin!'
        });
    }
    if (db1.checkuser('keymay', req.body.keymay, (results) => {
        if (!results) {
            res.statusCode = 400;
            return res.send({
                error: 'Lỗi',
                message: 'Không tìm thấy user'
            });
        }
        if (db1.getuser('keymay', req.body.keymay, (results) => {
            if (results != null) {
                if (results.username !== req.body.username) {
                    res.statusCode = 404;
                    return res.send({
                        error: 'Lỗi',
                        message: 'Sai tài khoản'
                    });
                }
                if (results.password !== req.body.password) {
                    res.statusCode = 404;
                    return res.send({
                        error: 'Lỗi',
                        message: 'Sai password cũ'
                    });
                }
                db1.UpdatePass(req.body.keymay, req.body.newpassword, (results) => {
                    if (results) {
                        res.statusCode = 200;
                        return res.send({
                            success: 'Thành công',
                            message: 'Đổi mật khẩu thành công!'
                        });
                    }
                    else {
                        res.statusCode = 400;
                        return res.send({
                            success: 'Lỗi',
                            message: 'Đổi mật khẩu không thành công!'
                        });
                    }
                });

            }
        }));
    }));

});

userrouter.post('/checktokencare', function (req, res) {

    if (!req.body.token) {
        res.statusCode = 400;
        return res.send({
            message: 'Chưa nhập token!'
        });
    }
    console.log(req.body.token);
    var token = decoded(req.body.token);
    console.log(token);
    db1.checktoken1(token, (results) => {
        if (!results) {
            res.statusCode = 400;
            return res.send({
                message: 'Token Die!'
            });
        }
        else {
            var newdate = new Date();
            var b = results.date - new Date(newdate).getTime();
            if (b < 0) {
                var token1 = jwt.sign(results.username + req.body.keymay + random.int(12345, 99999), 'login');
                console.log(token1);
                db1.checktoken(results.username, (results1) => {
                    var newdate = new Date();
                    if (results1) {
                        db1.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                    }
                    else {
                        db1.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                    }
                    token1 = endcode(token1);
                    console.log(token1);
                    return res.send({
                        message: 'Token Live!',
                        newtoken: token1
                    });
                })
            }
            else {
                checktoken(token, req.body.keymay, (results) => {
                    if (results) {
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
            }

        }

    })
});

userrouter.put('/care/:keymay', function (req, res) {
    db1.checkuser('keymay', req.params.keymay, (results) => {
        if (!results) {
            res.statusCode = 400;
            return res.send({
                message: 'Không tìm thấy Key'
            });
        }
        var newdate = new Date();
        var b = new Date(newdate).getTime();
        db1.UpdateDate(req.params.keymay, parseInt(b) + parseInt(req.body.date), (results) => {
            if (results) {
                return res.send({
                    message: 'update thành công',
                    payload: req.body
                });
            }
            else {
                return res.send({
                    message: 'update lỗi',
                    payload: req.body
                });
            }
        })


    })

});
userrouter.post('/YskyheytwUybYskyhcare', function (req, res) {

    if (!req.query.token || !req.query.text || !req.query.keymay) {
        res.statusCode = 400;
        return res.send({
            message: 'Chưa nhập đủ dữ liệu!'
        });
    }
    var token = decoded(req.query.token);
    console.log(token);
    db1.checktoken1(token, (results) => {
        if (!results) {
            res.statusCode = 400;
            return res.send({
                message: 'Token Die!'
            });
        }
        else {
            var newdate = new Date();
            var b = results.date - new Date(newdate).getTime();
            if (b < 0) {
                var token1 = jwt.sign(results.username + req.body.keymay + random.int(12345, 99999), 'login');
                console.log(token1);
                db1.checktoken(results.username, (results1) => {
                    var newdate = new Date();
                    if (results1) {
                        db1.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                    }
                    else {
                        db1.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                    }
                    token1 = endcode(token1);
                    var dc = decoded(req.query.text);
                    return res.send({
                        decode: dc,
                        newtoken: token1
                    });
                })
            }
            else {
                checktoken(token, req.query.keymay, (results) => {
                    if (results) {
                        res.statusCode = 200;
                        var dc = decoded(req.query.text);
                        return res.send({
                            decode: dc.toString()
                        });
                    }
                    else {
                        res.statusCode = 400;
                        return res.send({
                            message: 'Token Die!'
                        });
                    }

                });
            }

        }

    })
});
userrouter.post('/kyhPaYbYseytwUybYskyhcare', function (req, res) {

    if (!req.query.QozwUyZjQkyhPaY || !req.query.Qozkyh9ODQoz || !req.query.ZjQkyhwalLzIFAcwal) {
        res.statusCode = 400;
        return res.send({
            message: 'Chưa nhập đủ dữ liệu!'
        });
    }
    var token = decoded(req.query.QozwUyZjQkyhPaY);
    console.log(token);
    db1.checktoken1(token, (results) => {
        if (!results) {
            res.statusCode = 400;
            return res.send({
                message: 'Token Die!'
            });
        }
        else {
            var newdate = new Date();
            var b = results.date - new Date(newdate).getTime();
            if (b < 0) {
                var token1 = jwt.sign(results.username + req.body.ZjQkyhwalLzIFAcwal + random.int(12345, 99999), 'login');
                console.log(token1);
                db1.checktoken(results.username, (results1) => {
                    var newdate = new Date();
                    if (results1) {
                        db1.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                    }
                    else {
                        db1.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                    }
                    token1 = endcode(token1);
                    var dc = endcode(req.query.Qozkyh9ODQoz);
                    return res.send({
                        kyhPaYbYseytwUybYskyh: dc,
                        PaYkyhhPiQozwUyZjQkyhPaY: token1
                    });
                })
            }
            else {
                checktoken(token, req.query.ZjQkyhwalLzIFAcwal, (results) => {
                    if (results) {
                        res.statusCode = 200;
                        var dc = endcode(req.query.Qozkyh9ODQoz);
                        console.log('a' + dc);
                        return res.send({
                            kyhPaYbYseytwUybYskyh: dc
                        });
                    }
                    else {
                        res.statusCode = 400;
                        return res.send({
                            message: 'Token Die!'
                        });
                    }

                });
            }

        }

    })
});
userrouter.post('/:usernamecare', function (req, res) {

    db1.checkuser('username', req.params.username, (results) => {
        if (!results) {
            res.statusCode = 400;
            return res.send({
                message: 'Không tìm thấy Username'
            });
        }
        db1.deleteuser(req.params.username, (results) => {
            if (results) {
                db1.deletetoken(req.params.username, (results) => {
                    return res.send({
                        message: 'delete thành công',
                    });
                })

            }
            else {
                return res.send({
                    message: 'delete lỗi',
                });
            }
        })


    })

});
///////////////////////////// reg
userrouter.post('/reg/insertreg', function (req, res) {
    db2.InsertUser(req.params.a, req.params.pass, req.params.ma2fa, req.params.cookie, req.params.token, req.params.email, req.params.passmail, req.params.cateloge, req.params.date, (results) => {
        if (results) {
            console.log(req.params.a);
            return res.send({
                
                message: 'ok'
            });
        } else {
            return res.send({
                message: 'fail'
            });
        }});
});
userrouter.get('/getreg', function (req, res) {
    db2.getAll().then((result) => {
        res.statusCode = 200;
        return res.send({
            success: 'Thành công',
            message: result
        });
    });
});


///////////////////
function getdevice(callback) {
    fs.readFile('/home/kitdostudio.com/public_html/listdevice.txt', 'utf8', function (err, data) {
        if (err) throw err;
        let mang = data.toString().split('\r\n');
        callback(mang[Math.floor(Math.random() * mang.length)]);
    });
}
function gethtml(callback) {
    fs.readFile('/home/kitdostudio.com/public_html/htmlBU.txt', 'utf8', function (err, data) {
        if (err) throw err;
        callback(data);
    });
}
function checkcrack(anticrack, text) {

    return new Promise((resolve, reject) => {
        var b = false;
        for (let j = 0; j < anticrack.length; j++) {
            if (text == anticrack[j]) {
                console.log('true ne');
                b = true;
                break;
            }
        }
        if (b) {
            resolve(true);
        }
        else {
            resolve(false);
        }
    })
}
function checktoken(token, key) {
    return new Promise((resolve, reject) => {
        console.log(key);
        console.log(token);
        if (!token.includes(key)) {
            console.log('falsekey');
            resolve(false);
        }
        else {
            resolve(true);
        }
    })
}
function endcode(text) {
    return new Promise((resolve, reject) => {
        var end = '';
        for (let j = 0; j < text.length; j++) {
            for (let i = 0; i < mang.length; i++) {
                if (mang[i].split('|')[0] == (text[j])) {
                    end = end + mang[i].split('|')[1];
                }
            }
        }
        resolve(end);
    })
}
function decoded(text) {
    return new Promise((resolve, reject) => {
        var add = '';
        var de = '';
        var l = 1;
        for (let j = 0; j < text.length; j++) {
            if (l % 3 == 0) {
                add = add + text[j] + '|';
            } else {
                add = add + text[j];
            }
            l++;
        }
        var spl = add.split('|');
        for (let j1 = 0; j1 < spl.length; j1++) {
            for (let i = 0; i < mang.length; i++) {
                if (mang[i].split('|')[1] == (spl[j1])) {
                    de = de + mang[i].split('|')[0];
                }
            }
        }
        resolve(de);
    })
}
var mang = ['a|FAc', 'b|zAs', 'c|eyt', 'd|bYs', 'e|kyh', 'f|ika', 'g|loP', 'h|yUC', 'i|KcO', 'j|PLc', 'k|ZjQ', 'l|LpZ', 'm|LzI', 'n|PaY', 'o|wUy', 'p|ZbQ', 'q|Uys', 'r|PzQ', 's|SsU', 't|Qoz',
    'u|JqM', 'v|L1S', 'w|hPi', 'x|9OD', 'y|wal', 'z|Lib',
    'A|FaC', 'B|zaS', 'C|EyT', 'D|BYs', 'E|kYh', 'F|IkA', 'G|LOP', 'H|YuC', 'I|KCo', 'J|pLC', 'K|ZJq', 'L|LPz', 'M|LZI', 'N|PAY', 'O|wUY', 'P|ZBq', 'Q|UYS', 'R|PZq', 'S|SSu', 'T|QoZ',
    'U|JQM', 'V|l1s', 'W|HPI', 'X|9oD', 'Y|WAl', 'Z|LIb',
    '1|C21', '2|CL1', '3|PO0', '4|LSC', '5|0FS', '6|LZA', '7|9s1', '8|ZSA', '9|P00', '0|LKS',
    'ă|gg1', 'ắ|epU', 'ằ|oz0', 'ẳ|POD', 'ẵ|2aQ', 'ặ|POl', 'Ă|LC1', 'Ắ|LC2', 'Ằ|LC4', 'Ẳ|LC5', 'Ẵ|LC6', 'Ặ|LC7',
    'â|ec1', 'ầ|ec2', 'ấ|ec3', 'ẩ|ec4', 'ẫ|ec5', 'ậ|ec6', 'Â|ec7', 'Ầ|ec8', 'Ấ|ec9', 'Ẫ|ec0', 'Ậ|lo4',
    'í|PI1', 'ì|PI2', 'ỉ|PI4', 'ĩ|PI5', 'ị|PI6', 'Í|PI7', 'Ì|PI8', 'Ỉ|PI9', 'Ĩ|PI0', 'Ị|PZ8',
    'à|AL1', 'á|AL2', 'ả|AL3', 'ã|AL4', 'ạ|AL5', 'À|AL6', 'Á|AL7', 'Ả|AL8', 'Ã|AL9', 'Ạ|AL0',
    'đ|LSq', 'Đ|LSQ',
    'è|EP1', 'È|EP2', 'é|EP3', 'É|EP4', 'ẻ|EP5', 'Ẻ|EP6', 'ẽ|EP7', 'Ẽ|EP8', 'Ẹ|EP9', 'ẹ|EP0',
    'ê|EH1', 'Ê|EH2', 'Ề|EH3', 'Ế|EH4', 'Ể|EH5', 'Ễ|EH6', 'Ệ|EH7', 'ề|EH8', 'ế|EH9', 'ể|EH0', 'ễ|Es0', 'ệ|Es1',
    'ò|OP1', 'ó|OP2', 'ỏ|OP3', 'õ|OP4', 'ọ|OP5', 'Ò|OP6', 'Ó|OP7', 'Ỏ|OP8', 'Õ|OP9', 'Ọ|OP0',
    'ô|QO1', 'ố|QO2', 'ồ|QO3', 'ổ|QO4', 'ỗ|QO5', 'ộ|QO6', 'Ô|QO7', 'Ố|QO8', 'Ồ|QO9', 'Ổ|QO0', 'Ỗ|QS1', 'Ộ|QZ1',
    'ơ|CP1', 'ờ|CP2', 'ớ|CP3', 'ở|CP4', 'ỡ|CP5', 'ợ|CP6', 'Ơ|CP7', 'Ờ|CP8', 'Ớ|CP9', 'Ở|CP0', 'Ỡ|CQ1', 'Ợ|CO1',
    'ú|hc1', 'ù|hc2', 'ủ|hc3', 'ũ|hc4', 'ụ|hc5', 'Ú|hc6', 'Ù|hc7', 'Ủ|hc8', 'Ũ|hc9', 'Ụ|hc0',
    'ư|ha1', 'ừ|ha2', 'ứ|ha3', 'ử|ha4', 'ữ|ha5', 'ự|ha6', 'Ư|ha7', 'Ừ|ha8', 'Ứ|ha9', 'Ử|ha0', 'Ữ|hb1', 'Ự|hB1',
    '!|Lal', '@|OLO', '#|QOa', '$|PCS', '%|OOS', '^|SUZ', '&|SSR', '*|LPC', '(|olc', ')|soc', '_|pps', '+|u7u', ':|chg', '?|yUY', '\\|Csw', '/|lcs', '>|S3e', '<|Cde', '.|s8q', ',|sc3',
    '~|s44', ' |0PC', '-|0sP', '"|DeH', '=|OqL', '[|XXS', ']|XXA', '\'|sOl', ';|OLS', '{|Sp0', '}|Sp1'];

module.exports = userrouter;