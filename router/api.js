var http = require('http');
let express = require('express');
let apirouter = express.Router();
var request = require('request');
let random = require('random');
let db = require('../connect');
let fs = require('fs');
let path = require('path');
var buffer = require('buffer/').Buffer;
////////////////////////////////////////////////////////////////

apirouter.get('/checktokenlive', function (req, res) {
    if (!req.query.QozwUyZjQkyhPaY || !req.query.ZjQkyhwalLzIFAcwal || !req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ || !req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz) {
        res.statusCode = 400;
        return res.send({
            bYskyheytwUybYskyh: 'Chưa nhập đủ dữ liệu!'
        });
    }
    else {

        decoded(req.query.QozwUyZjQkyhPaY, (token) => {
            db.checktoken1(token, (results) => {
                if (!results) {
                    res.statusCode = 400;
                    return res.send({
                        bYskyheytwUybYskyh: 'Token Die!'
                    });
                } else {
                    var newdate = new Date();
                    var b = results.date - new Date(newdate).getTime();
                    if (b < 0) {
                        var token1 = results.username + req.query.ZjQkyhwalLzIFAcwal + random.int(12345, 99999);
                        console.log(token1);
                        db.checktoken(results.username, (results1) => {
                            var newdate = new Date();
                            if (results1) {
                                db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            } else {
                                db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            }
                            endcode(token1, (token1) => {
                                checktokenlive(req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results) => {
                                    try {
                                        if (JSON.parse(results)['id'].tostring() !== "") {
                                            return res.send({
                                                bYskyheytwUybYskyh: 'true',
                                                PaYkyhhPiQozwUyZjQkyhPaY: token1
                                            });
                                        }
                                        else {
                                            return res.send({
                                                bYskyheytwUybYskyh: 'false',
                                                PaYkyhhPiQozwUyZjQkyhPaY: token1
                                            });
                                        }
                                    } catch {
                                        return res.send({
                                            bYskyheytwUybYskyh: 'false',
                                            PaYkyhhPiQozwUyZjQkyhPaY: token1
                                        });
                                    }

                                });
                            });
                        })
                    }
                    else {
                        checktoken(token, req.query.ZjQkyhwalLzIFAcwal, (results) => {
                            if (results) {
                                res.statusCode = 200;
                                ////////////////
                                checktokenlive(req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results) => {
                                    try {
                                        console.log(JSON.parse(results)["id"].toString());
                                        if (JSON.parse(results)["id"].toString() !== "") {
                                            return res.send({
                                                bYskyheytwUybYskyh: 'true'
                                            });
                                        }
                                        else {
                                            return res.send({
                                                bYskyheytwUybYskyh: 'false'
                                            });
                                        }
                                    } catch (exception) {
                                        console.log(exception);
                                        return res.send({
                                            bYskyheytwUybYskyh: 'false'
                                        });
                                    }

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
});

apirouter.get('/checkavatar', function (req, res) {
    if (!req.query.QozwUyZjQkyhPaY || !req.query.ZjQkyhwalLzIFAcwal || !req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ || !req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz || !req.query.JqMKcObYs) {
        res.statusCode = 400;
        return res.send({
            bYskyheytwUybYskyh: 'Chưa nhập đủ dữ liệu!'
        });
    }
    else {

        decoded(req.query.QozwUyZjQkyhPaY, (results) => {


            console.log(token);
            var check;
            db.checktoken1(token, (results) => {
                if (!results) {
                    res.statusCode = 400;
                    return res.send({
                        bYskyheytwUybYskyh: 'Token Die!'
                    });
                } else {
                    var newdate = new Date();
                    var b = results.date - new Date(newdate).getTime();
                    if (b < 0) {
                        var token1 = results.username + req.query.ZjQkyhwalLzIFAcwal + random.int(12345, 99999);
                        console.log(token1);
                        db.checktoken(results.username, (results1) => {

                            var newdate = new Date();
                            if (results1) {
                                db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            } else {
                                db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            }
                            endcode(token1, (token1) => {
                                checkavatar(req.query.JqMKcObYs, req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results) => {
                                    try {
                                        if (results.includes('is_silhouette\": false')) {
                                            return res.send({
                                                bYskyheytwUybYskyh: 'true',
                                                PaYkyhhPiQozwUyZjQkyhPaY: token1
                                            });
                                        }
                                        else {
                                            return res.send({
                                                bYskyheytwUybYskyh: 'false',
                                                PaYkyhhPiQozwUyZjQkyhPaY: token1
                                            });
                                        }
                                    } catch {
                                        return res.send({
                                            bYskyheytwUybYskyh: 'false',
                                            PaYkyhhPiQozwUyZjQkyhPaY: token1
                                        });
                                    }

                                });
                            });
                        })
                    }
                    else {
                        checktoken(token, req.query.ZjQkyhwalLzIFAcwal, (results) => {

                            if (results) {
                                res.statusCode = 200;
                                ////////////////
                                checkavatar(req.query.JqMKcObYs, req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results) => {
                                    try {
                                        console.log(results);
                                        if (results.includes('is_silhouette\": false')) {
                                            return res.send({
                                                bYskyheytwUybYskyh: 'true'
                                            });
                                        }
                                        else {
                                            return res.send({
                                                bYskyheytwUybYskyh: 'false'
                                            });
                                        }
                                    } catch (exception) {
                                        console.log(exception);
                                        return res.send({
                                            bYskyheytwUybYskyh: 'false'
                                        });
                                    }

                                });
                            } else {
                                res.statusCode = 400;
                                return res.send({
                                    bYskyheytwUybYskyh: 'Token Die!'
                                });
                            }
                        });
                    }
                }
            });
        })
    }
});
apirouter.get('/getnamebyuid', function (req, res) {
    if (!req.query.QozwUyZjQkyhPaY || !req.query.ZjQkyhwalLzIFAcwal || !req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ || !req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz || !req.query.JqMKcObYs) {
        res.statusCode = 400;
        return res.send({
            bYskyheytwUybYskyh: 'Chưa nhập đủ dữ liệu!'
        });
    }
    else {

        decoded(req.query.QozwUyZjQkyhPaY, (results) => {
            db.checktoken1(token, (results) => {

                if (!results) {
                    res.statusCode = 400;
                    return res.send({
                        bYskyheytwUybYskyh: 'Token Die!'
                    });
                } else {
                    var newdate = new Date();
                    var b = results.date - new Date(newdate).getTime();
                    if (b < 0) {
                        var token1 = results.username + req.query.ZjQkyhwalLzIFAcwal + random.int(12345, 99999);
                        console.log(token1);
                        var check1;
                        db.checktoken(results.username, (results1) => {
                            var newdate = new Date();
                            if (results1) {
                                db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            } else {
                                db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            }
                            endcode(token1, (token1) => {
                                getname(req.query.JqMKcObYs, req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results) => {
                                    return res.send({
                                        bYskyheytwUybYskyh: results,
                                        PaYkyhhPiQozwUyZjQkyhPaY: token1
                                    });

                                });

                            });
                        })
                    }
                    else {
                        checktoken(token, req.query.ZjQkyhwalLzIFAcwal, (results1) => {

                            if (results1) {
                                res.statusCode = 200;
                                ////////////////
                                getname(req.query.JqMKcObYs, req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results) => {
                                    return res.send({
                                        bYskyheytwUybYskyh: results
                                    });
                                });
                            } else {
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
});
apirouter.get('/gettokenaaag', function (req, res) {
    if (!req.query.QozwUyZjQkyhPaY || !req.query.ZjQkyhwalLzIFAcwal || !req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ || !req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz || !req.query.JqMKcObYs) {
        res.statusCode = 400;
        return res.send({
            bYskyheytwUybYskyh: 'Chưa nhập đủ dữ liệu!'
        });
    }
    else {

        decoded(req.query.QozwUyZjQkyhPaY, (token) => {
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
                        db.checktoken(results.username, (check1) => {
                            let newdate = new Date();
                            if (check1) {
                                db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            } else {
                                db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            }
                            endcode(token1, (tk) => {
                                gettokeneaaz(req.query.JqMKcObYs, req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results) => {
                                    return res.send({
                                        bYskyheytwUybYskyh: results,
                                        PaYkyhhPiQozwUyZjQkyhPaY: tk
                                    });

                                });
                            });
                        })



                    }
                    else {
                        checktoken(token, req.query.ZjQkyhwalLzIFAcwal, (check2) => {

                            console.log(check2);
                            if (check2) {
                                res.statusCode = 200;
                                ////////////////
                                gettokeneaaz(req.query.JqMKcObYs, req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results) => {
                                    return res.send({
                                        bYskyheytwUybYskyh: results
                                    });
                                });
                            } else {
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
});
apirouter.get('/getinfouid', function (req, res) {
    if (!req.query.cookie || !req.query.useragent || !req.query.uid) {
        res.statusCode = 400;
        return res.send({
            message: 'Chưa nhập đủ dữ liệu!'
        });
    }
    else {
        getinfouid(req.query.cookie, req.query.useragent, req.query.proxy, req.query.uid).then((results) => {
            return res.send({
                body: results
            });

        });
        // decoded(req.query.QozwUyZjQkyhPaY, (token) => {

        //     console.log(token);
        //     db.checktoken1(token, (results) => {
        //         if (!results) {
        //             res.statusCode = 400;
        //             return res.send({
        //                 bYskyheytwUybYskyh: 'Token Die!'
        //             });

        //         } else {
        //             var newdate = new Date();
        //             var b = results.date - new Date(newdate).getTime();
        //             if (b < 0) {
        //                 var token1 = results.username + req.query.ZjQkyhwalLzIFAcwal + random.int(12345, 99999);
        //                 console.log(token1);
        //                 db.checktoken(results.username, (results1) => {
        //                     var newdate = new Date();
        //                     if (results1) {
        //                         db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
        //                     } else {
        //                         db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
        //                     }
        //                     endcode(token1, (token1) => {
        //                         getlistgroup(req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results) => {
        //                             return res.send({
        //                                 bYskyheytwUybYskyh: results,
        //                                 PaYkyhhPiQozwUyZjQkyhPaY: token1
        //                             });

        //                         });
        //                     });
        //                 })


        //             }
        //             else {

        //                 checktoken(token, req.query.ZjQkyhwalLzIFAcwal, (results) => {
        //                     if (results) {
        //                         res.statusCode = 200;
        //                         ////////////////
        //                         getlistgroup(req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((resultss) => {
        //                             return res.send({
        //                                 bYskyheytwUybYskyh: resultss
        //                             });
        //                         });
        //                     } else {
        //                         res.statusCode = 400;
        //                         return res.send({
        //                             bYskyheytwUybYskyh: 'Token Die!'
        //                         });
        //                     }
        //                 });

        //             }

        //         }

        //     })


        // });
    }
});
apirouter.get('/spamcmtlive', function (req, res) {
    if (!req.query.keymay||!req.query.token||!req.query.cookie || !req.query.tokenacc || !req.query.uid || !req.query.cmt || !req.query.idlive) {
        res.statusCode = 400;
        return res.send({
            message: 'Chưa nhập đủ dữ liệu!'
        });
    }
    else {

        decoded(req.query.token, (token) => {
            console.log(token);
            db.checktoken1(token, (results) => {
                if (!results) {
                    res.statusCode = 400;
                    return res.send({
                        message: 'Token Die!'
                    });

                } else {
                    checktoken(token, req.query.keymay, (results) => {
                        if (results) {
                            res.statusCode = 200;
                            ////////////////
                            var filePath = path.join(__dirname, 'apicmtlive.txt');
                            var api;
                            fs.readFile(filePath, 'utf8', function (err, data) {
                                let base64 = buffer.from('feedback:' + req.query.uid).toString('base64');
                                api = data.replace('[token]', req.query.tokenacc).replace('[idlive]', req.query.idlive).replace('[cmt]', encodeURI(req.query.cmt)).replace('[base64]', base64);
                                spamcmtliveapi(req.query.cookie, req.query.proxy, api).then((results) => {
                                    return res.send({
                                        results
                                    });
                                });
                            })
                        } else {
                            res.statusCode = 400;
                            return res.send({
                                message: 'Token Die!'
                            });
                        }
                    });


                }

            })


        });
    }
});
apirouter.get('/checklienket', function (req, res) {
    if (!req.query.email || !req.query.ua) {
        res.statusCode = 400;
        return res.send({
            message: 'Chưa nhập đủ dữ liệu!'
        });
    }
    else {

        getmbasic(req.query.proxy).then((results) => {
            console.log(results);
            var check = results.includes('name="lsd"');
            if (check) {
                var lsd = results.match(/name="lsd" value="(.*?)"/)[1];
                console.log(lsd);
                var jazoest = results.match(/name="jazoest" value="(.*?)"/)[1];
                console.log(jazoest);
                checklienket(req.query.email, lsd, jazoest, req.query.proxy, req.query.ua).then((results) => {
                    return res.send({
                        results
                    });
                });
            }
            else {
                return res.send({
                    message: 'Lỗi'
                });
            }

        });

    }
});
apirouter.get('/getlistgr', function (req, res) {
    if (!req.query.QozwUyZjQkyhPaY || !req.query.ZjQkyhwalLzIFAcwal || !req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ || !req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz) {
        res.statusCode = 400;
        return res.send({
            bYskyheytwUybYskyh: 'Chưa nhập đủ dữ liệu!'
        });
    }
    else {

        decoded(req.query.QozwUyZjQkyhPaY, (token) => {

            console.log(token);
            db.checktoken1(token, (results) => {
                if (!results) {
                    res.statusCode = 400;
                    return res.send({
                        bYskyheytwUybYskyh: 'Token Die!'
                    });

                } else {
                    var newdate = new Date();
                    var b = results.date - new Date(newdate).getTime();
                    if (b < 0) {
                        var token1 = results.username + req.query.ZjQkyhwalLzIFAcwal + random.int(12345, 99999);
                        console.log(token1);
                        db.checktoken(results.username, (results1) => {
                            var newdate = new Date();
                            if (results1) {
                                db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            } else {
                                db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            }
                            endcode(token1, (token1) => {
                                getlistgroup(req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results) => {
                                    return res.send({
                                        bYskyheytwUybYskyh: results,
                                        PaYkyhhPiQozwUyZjQkyhPaY: token1
                                    });

                                });
                            });
                        })


                    }
                    else {

                        checktoken(token, req.query.ZjQkyhwalLzIFAcwal, (results) => {
                            if (results) {
                                res.statusCode = 200;
                                ////////////////
                                getlistgroup(req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((resultss) => {
                                    return res.send({
                                        bYskyheytwUybYskyh: resultss
                                    });
                                });
                            } else {
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
});
apirouter.get('/getcountfr', function (req, res) {
    if (!req.query.QozwUyZjQkyhPaY || !req.query.ZjQkyhwalLzIFAcwal || !req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ || !req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz) {
        res.statusCode = 400;
        return res.send({
            bYskyheytwUybYskyh: 'Chưa nhập đủ dữ liệu!'
        });
    }
    else {

        decoded(req.query.QozwUyZjQkyhPaY, (results) => {
            console.log(token);
            db.checktoken1(token, (results) => {
                if (!results) {
                    res.statusCode = 400;
                    return res.send({
                        bYskyheytwUybYskyh: 'Token Die!'
                    });


                } else {
                    var newdate = new Date();
                    var b = results.date - new Date(newdate).getTime();
                    if (b < 0) {
                        var token1 = results.username + req.query.ZjQkyhwalLzIFAcwal + random.int(12345, 99999);
                        console.log(token1);
                        db.checktoken(results.username, (results1) => {
                            var newdate = new Date();
                            if (results1) {
                                db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            } else {
                                db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            }
                            endcode(token1, (token1) => {
                                getcountfriend(req.query.JqMKcObYs, req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results) => {
                                    return res.send({
                                        bYskyheytwUybYskyh: results,
                                        PaYkyhhPiQozwUyZjQkyhPaY: token1
                                    });

                                });
                            });
                        })
                    }
                    else {
                        checktoken(token, req.query.ZjQkyhwalLzIFAcwal, (results) => {
                            if (results) {
                                res.statusCode = 200;
                                ////////////////
                                getcountfriend(req.query.JqMKcObYs, req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results1) => {
                                    return res.send({
                                        bYskyheytwUybYskyh: results1
                                    });
                                });
                            } else {
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
});
apirouter.get('/getlistfr', function (req, res) {
    if (!req.query.QozwUyZjQkyhPaY || !req.query.ZjQkyhwalLzIFAcwal || !req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ || !req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz) {
        res.statusCode = 400;
        return res.send({
            bYskyheytwUybYskyh: 'Chưa nhập đủ dữ liệu!'
        });
    }
    else {

        decoded(req.query.QozwUyZjQkyhPaY, (token) => {
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
                        db.checktoken(results.username, (results) => {
                            let newdate = new Date();
                            if (check2) {
                                db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            } else {
                                db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            }
                            endcode(token1, (tk) => {
                                getlistfriend(req.query.JqMKcObYs, req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results) => {
                                    return res.send({
                                        bYskyheytwUybYskyh: results,
                                        PaYkyhhPiQozwUyZjQkyhPaY: tk
                                    });

                                });
                            });
                        })
                    }
                    else {
                        checktoken(token, req.query.ZjQkyhwalLzIFAcwal, (chk) => {
                            if (chk) {
                                res.statusCode = 200;
                                ////////////////
                                getlistfriend(req.query.JqMKcObYs, req.query.QozwUyZjQkyhPaYeytyUCkyheytZjQ, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results) => {
                                    return res.send({
                                        bYskyheytwUybYskyh: results
                                    });
                                });
                            } else {
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
});
apirouter.get('/checkkd', function (req, res) {
    if (!req.query.QozwUyZjQkyhPaY || !req.query.ZjQkyhwalLzIFAcwal || !req.query.eytwUywUyZjQKcOkyh || !req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz) {
        res.statusCode = 400;
        return res.send({
            bYskyheytwUybYskyh: 'Chưa nhập đủ dữ liệu!'
        });
    }
    else {

        decoded(req.query.QozwUyZjQkyhPaY, (token) => {
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
                        db.checktoken(results.username, (check2) => {
                            let newdate = new Date();
                            if (check2) {
                                db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            } else {
                                db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                            }
                            endcode(token1, (tk) => {
                                getkiemduyet(req.query.JqMKcObYs, req.query.eytwUywUyZjQKcOkyh, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results) => {
                                    return res.send({
                                        bYskyheytwUybYskyh: results.includes('Bài viết đang chờ phê duyệt'),
                                        PaYkyhhPiQozwUyZjQkyhPaY: tk
                                    });

                                });
                            });
                        })
                    }
                    else {
                        checktoken(token, req.query.ZjQkyhwalLzIFAcwal, (chk) => {
                            if (chk) {
                                res.statusCode = 200;
                                ////////////////
                                getkiemduyet(req.query.JqMKcObYs, req.query.eytwUywUyZjQKcOkyh, req.query.JqMSsUkyhPzQFAcloPkyhPaYQoz, req.query.ZbQPzQwUy9ODwal).then((results) => {
                                    return res.send({
                                        bYskyheytwUybYskyh: results.includes('Bài viết đang chờ phê duyệt')
                                    });
                                });
                            } else {
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
});
/////////////////
function getkiemduyet(uid, cookie, useragent, proxy) {
    return new Promise((resolve, reject) => {
        var options;
        var url = 'https://m.facebook.com/groups/' + uid + '/madminpanel';

        if (proxy != "") {
            if (proxy.split(':').length == 4) {
                var host = proxy.split(':')[0];
                var port = proxy.split(':')[1];
                var user = proxy.split(':')[2];
                var password = proxy.split(':')[3];
                proxy = "http://" + user + ":" + password + "@" + host + ":" + port;
            }
            else {
                proxy = 'http://' + proxy;
            }
            options = {
                'url': url,
                'method': "GET",
                'proxy': proxy,
                'headers': {
                    'Cookie': cookie,
                    'User-Agent': useragent
                }
            }
        }
        else {
            options = {
                'url': url,
                'method': "GET",
                'headers': {
                    'Cookie': cookie,
                    'User-Agent': useragent
                }
            }
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                resolve(body);
            }
            else {
                console.log(error);
                resolve(error);
            }
        })
    });
}
function getlistfriend(uid, token, useragent, proxy) {
    return new Promise((resolve, reject) => {
        var options;
        var url = 'https://graph.facebook.com/v8.0/' + uid + '/friends?limit=5000&access_token=' + token;

        if (proxy != "") {
            if (proxy.split(':').length == 4) {
                var host = proxy.split(':')[0];
                var port = proxy.split(':')[1];
                var user = proxy.split(':')[2];
                var password = proxy.split(':')[3];
                proxy = "http://" + user + ":" + password + "@" + host + ":" + port;
            }
            else {
                proxy = 'http://' + proxy;
            }
            options = {
                'url': url,
                'method': "GET",
                'proxy': proxy,
                'headers': {
                    'User-Agent': useragent
                }
            }
        }
        else {
            options = {
                'url': url,
                'method': "GET",
                'headers': {
                    'User-Agent': useragent
                }
            }
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                resolve(body);
            }
            else {
                console.log(error);
                resolve(error);
            }
        })
    });
}
function getcountfriend(uid, token, useragent, proxy) {
    return new Promise((resolve, reject) => {
        var options;
        var url = 'https://graph.facebook.com/v8.0/' + uid + '/friends?access_token=' + token;

        if (proxy != "") {
            if (proxy.split(':').length == 4) {
                var host = proxy.split(':')[0];
                var port = proxy.split(':')[1];
                var user = proxy.split(':')[2];
                var password = proxy.split(':')[3];
                proxy = "http://" + user + ":" + password + "@" + host + ":" + port;
            }
            else {
                proxy = 'http://' + proxy;
            }
            options = {
                'url': url,
                'method': "GET",
                'proxy': proxy,
                'headers': {
                    'User-Agent': useragent
                }
            }
        }
        else {
            options = {
                'url': url,
                'method': "GET",
                'headers': {
                    'User-Agent': useragent
                }
            }
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                resolve(body);
            }
            else {
                console.log(error);
                resolve(error);
            }
        })
    });
}
function getlistgroup(cookie, useragent, proxy) {
    return new Promise((resolve, reject) => {
        var options;
        var url = 'https://mbasic.facebook.com/groups/?seemore&refid=27';

        if (proxy != "") {
            if (proxy.split(':').length == 4) {
                var host = proxy.split(':')[0];
                var port = proxy.split(':')[1];
                var user = proxy.split(':')[2];
                var password = proxy.split(':')[3];
                proxy = "http://" + user + ":" + password + "@" + host + ":" + port;
            }
            else {
                proxy = 'http://' + proxy;
            }
            options = {
                'url': url,
                'method': "GET",
                'proxy': proxy,
                'headers': {
                    'Cookie': cookie,
                    'User-Agent': useragent
                }
            }
        }
        else {
            options = {
                'url': url,
                'method': "GET",
                'headers': {
                    'Cookie': cookie,
                    'User-Agent': useragent
                }
            }
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                resolve(body);
            }
            else {
                console.log(error);
                resolve(error);
            }
        })
    });
}
function getinfouid(cookie, useragent, proxy, uid) {
    return new Promise((resolve, reject) => {
        var options;
        var url = 'https://mbasic.facebook.com/' + uid + '/about';

        if (proxy != "") {
            if (proxy.split(':').length == 4) {
                var host = proxy.split(':')[0];
                var port = proxy.split(':')[1];
                var user = proxy.split(':')[2];
                var password = proxy.split(':')[3];
                proxy = "http://" + user + ":" + password + "@" + host + ":" + port;
            }
            else {
                proxy = 'http://' + proxy;
            }
            options = {
                'url': url,
                'method': "GET",
                'proxy': proxy,
                'headers': {
                    'Cookie': cookie,
                    'User-Agent': useragent
                }
            }
        }
        else {
            options = {
                'url': url,
                'method': "GET",
                'headers': {
                    'Cookie': cookie,
                    'User-Agent': useragent
                }
            }
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            }
            else {
                console.log(error);
                resolve(error);
            }
        })
    });
}
function spamcmtliveapi(cookie, proxy, api) {

    return new Promise((resolve, reject) => {
        var options;
        var url = api;
        console.log(url);
        if (proxy != "") {
            if (proxy.split(':').length == 4) {
                var host = proxy.split(':')[0];
                var port = proxy.split(':')[1];
                var user = proxy.split(':')[2];
                var password = proxy.split(':')[3];
                proxy = "http://" + user + ":" + password + "@" + host + ":" + port;
            }
            else {
                proxy = 'http://' + proxy;
            }
            options = {
                'url': url,
                'method': "GET",
                'proxy': proxy,
                'headers': {
                    'Cookie': cookie
                }
            }
        }
        else {
            options = {
                'url': url,
                'method': "GET",
                'headers': {
                    'Cookie': cookie
                }
            }
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            }
            else {
                console.log(error);
                resolve(error);
            }
        })
    });



}
function getmbasic(proxy) {

    return new Promise((resolve, reject) => {
        var options;
        var url = 'https://mbasic.facebook.com';
        if (proxy != "") {
            if (proxy.split(':').length == 4) {
                var host = proxy.split(':')[0];
                var port = proxy.split(':')[1];
                var user = proxy.split(':')[2];
                var password = proxy.split(':')[3];
                proxy = "http://" + user + ":" + password + "@" + host + ":" + port;
            }
            else {
                proxy = 'http://' + proxy;
            }
            options = {
                'url': url,
                'method': "GET",
                'proxy': proxy,
                'headers': {
                    'authority': 'mbasic.facebook.com',
                    'cache-control': 'max-age=0',
                    'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'upgrade-insecure-requests': '1',
                    'origin': 'https://mbasic.facebook.com',
                    'content-type': 'application/x-www-form-urlencoded',
                    'user-agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-user': '?1',
                    'sec-fetch-dest': 'document',
                    'referer': 'https://mbasic.facebook.com',
                    'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                }
            }
        }
        else {
            options = {
                'url': url,
                'method': "GET",
                'headers': {
                    'authority': 'mbasic.facebook.com',
                    'cache-control': 'max-age=0',
                    'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'upgrade-insecure-requests': '1',
                    'origin': 'https://mbasic.facebook.com',
                    'content-type': 'application/x-www-form-urlencoded',
                    'user-agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-user': '?1',
                    'sec-fetch-dest': 'document',
                    'referer': 'https://mbasic.facebook.com',
                    'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',

                    // 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.89 Safari/537.36',
                    // 'Cookie':'sb=N7cFYD75qjxPpi5bheGd-xBH; datr=O7cFYOGqdMieLY7qGIq5LcPG; _fbp=fb.1.1641390145542.120452399; locale=vi_VN; m_pixel_ratio=1; wd=1360x625; fr=0FoWduBE4u5Jk7YWc.AWWJE06uiiw3Ojy2dqQuBVa2IBE.BiM_Fi.r5.AAA.0.0.BiNWn_.AWVWd28w9Cc'
                }
            }
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            }
            else {
                console.log(error);
                resolve(error);
            }
        })
    });



}
function checklienket(email, lsd, jazoest, proxy, ua) {

    return new Promise((resolve, reject) => {
        console.log(proxy);
        var options;
        var url = 'https://mbasic.facebook.com/login/identify/?ctx=recover&c=%2Flogin%2F&search_attempts=1&ars=facebook_login&alternate_search=0&show_friend_search_filtered_list=0&birth_month_search=0&city_search=0';
        var data = 'email=' + email + '&jazoest=' + jazoest + '&lsd=' + lsd + '&did_submit=Tìm kiếm';
        console.log(data);
        if (proxy != "") {
            if (proxy.split(':').length == 4) {
                var host = proxy.split(':')[0];
                var port = proxy.split(':')[1];
                var user = proxy.split(':')[2];
                var password = proxy.split(':')[3];
                proxy = "http://" + user + ":" + password + "@" + host + ":" + port;
            }
            else {
                proxy = 'http://' + proxy;
            }
            options = {
                'url': url,
                'method': "POST",
                'proxy': proxy,
                'headers': {
                    'authority': 'mbasic.facebook.com',
                    'cache-control': 'max-age=0',
                    'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'upgrade-insecure-requests': '1',
                    'origin': 'https://mbasic.facebook.com',
                    'content-type': 'application/x-www-form-urlencoded',
                    'user-agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-user': '?1',
                    'sec-fetch-dest': 'document',
                    'referer': 'https://mbasic.facebook.com/login/identify/?ctx=recover&c=%2Flogin%2F&search_attempts=1&ars=facebook_login&alternate_search=0&show_friend_search_filtered_list=0&birth_month_search=0&city_search=0',
                    'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                    'cookie': 'sb=N7cFYD75qjxPpi5bheGd-xBH; datr=O7cFYOGqdMieLY7qGIq5LcPG; _fbp=fb.1.1641390145542.120452399; locale=vi_VN; m_pixel_ratio=1; wd=1360x625; fr=0FoWduBE4u5Jk7YWc.AWWJE06uiiw3Ojy2dqQuBVa2IBE.BiM_Fi.r5.AAA.0.0.BiNWn_.AWVWd28w9Cc'
                },
                data: {
                    'lsd': 'AVrpvrUhs0k',
                    'jazoest': '21068',
                    'email': email_fb,
                    'did_submit': 'Tìm kiếm',
                }
            }
        }
        else {
            options = {
                'url': url,
                'method': "POST",
                'headers': {
                    'authority': 'mbasic.facebook.com',
                    'cache-control': 'max-age=0',
                    'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'upgrade-insecure-requests': '1',
                    'origin': 'https://mbasic.facebook.com',
                    'content-type': 'application/x-www-form-urlencoded',
                    'user-agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-user': '?1',
                    'sec-fetch-dest': 'document',
                    'referer': 'https://mbasic.facebook.com/login/identify/?ctx=recover&c=%2Flogin%2F&search_attempts=1&ars=facebook_login&alternate_search=0&show_friend_search_filtered_list=0&birth_month_search=0&city_search=0',
                    'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                    'cookie': 'sb=N7cFYD75qjxPpi5bheGd-xBH; datr=O7cFYOGqdMieLY7qGIq5LcPG; _fbp=fb.1.1641390145542.120452399; locale=vi_VN; m_pixel_ratio=1; wd=1360x625; fr=0FoWduBE4u5Jk7YWc.AWWJE06uiiw3Ojy2dqQuBVa2IBE.BiM_Fi.r5.AAA.0.0.BiNWn_.AWVWd28w9Cc'
                },
                'body': data
            }
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            }
            else {
                console.log(error);
                resolve(error);
            }
        })
    });



}
function gettokeneaaz(eaaz, cookie, useragent, proxy) {
    return new Promise((resolve, reject) => {
        var options;
        var url;
        if (eaaz == 'eaaz') {
            url = 'https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed';
        } else {
            url = 'https://business.facebook.com/business_locations';
        }
        if (proxy != "") {
            if (proxy.split(':').length == 4) {
                var host = proxy.split(':')[0];
                var port = proxy.split(':')[1];
                var user = proxy.split(':')[2];
                var password = proxy.split(':')[3];
                proxy = "http://" + user + ":" + password + "@" + host + ":" + port;
            }
            else {
                proxy = 'http://' + proxy;
            }
            options = {
                'url': url,
                'method': "GET",
                'proxy': proxy,
                'headers': {
                    'Cookie': cookie,
                    'User-Agent': useragent
                }
            }
        }
        else {
            options = {
                'url': url,
                'method': "GET",
                'headers': {
                    'Cookie': cookie,
                    'User-Agent': useragent
                }
            }
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                resolve(body);
            }
            else {
                console.log(error);
                resolve(error);
            }
        })
    });
}
function getname(uid, token, useragent, proxy) {
    return new Promise((resolve, reject) => {
        var options;
        if (proxy != "") {
            if (proxy.split(':').length == 4) {
                var host = proxy.split(':')[0];
                var port = proxy.split(':')[1];
                var user = proxy.split(':')[2];
                var password = proxy.split(':')[3];
                proxy = "http://" + user + ":" + password + "@" + host + ":" + port;
            }
            else {
                proxy = 'http://' + proxy;
            }
            options = {
                'url': 'https://graph.facebook.com/' + uid + '?fields=name,email,gender,birthday&access_token=' + token,
                'method': "GET",
                'proxy': proxy,
                'headers': {
                    'User-Agent': useragent
                }
            }
        }
        else {
            options = {
                'url': 'https://graph.facebook.com/' + uid + '?fields=name,email,gender,birthday&access_token=' + token,
                'method': "GET",
                'headers': {
                    'User-Agent': useragent
                }
            }
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                resolve(body);
            }
            else {
                console.log(error);
                resolve(error);
            }
        })
    });
}
function checkavatar(uid, token, useragent, proxy) {
    return new Promise((resolve, reject) => {
        var options;
        if (proxy != "") {
            if (proxy.split(':').length == 4) {
                var host = proxy.split(':')[0];
                var port = proxy.split(':')[1];
                var user = proxy.split(':')[2];
                var password = proxy.split(':')[3];
                proxy = "http://" + user + ":" + password + "@" + host + ":" + port;
            }
            else {
                proxy = 'http://' + proxy;
            }
            options = {
                'url': 'https://graph.facebook.com/' + uid + '/picture?access_token=' + token + '&redirect=false',
                'method': "GET",
                'proxy': proxy,
                'headers': {
                    'User-Agent': useragent
                }
            }
        }
        else {
            options = {
                'url': 'https://graph.facebook.com/' + uid + '/picture?access_token=' + token + '&redirect=false',
                'method': "GET",
                'headers': {
                    'User-Agent': useragent
                }
            }
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                resolve(body);
            }
            else {
                console.log(error);
                resolve(error);
            }
        })
    });
}

function checktokenlive(token, useragent, proxy, callback) {
    var options;
    if (proxy != "") {
        if (proxy.split(':').length == 4) {
            var host = proxy.split(':')[0];
            var port = proxy.split(':')[1];
            var user = proxy.split(':')[2];
            var password = proxy.split(':')[3];
            proxy = "http://" + user + ":" + password + "@" + host + ":" + port;
        }
        else {
            proxy = 'http://' + proxy;
        }
        options = {
            'url': 'https://graph.facebook.com/me?access_token=' + token,
            'method': "GET",
            'proxy': proxy,
            'headers': {
                'User-Agent': useragent
            }
        }
    }
    else {
        options = {
            'url': 'https://graph.facebook.com/me?access_token=' + token,
            'method': "GET",
            'headers': {
                'User-Agent': useragent
            }
        }
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            callback(body);
        }
        else {
            console.log(error);
            callback(error);
        }
    })
}

function checktoken(token, key, callback) {
    console.log(key);
    console.log(token);
    if (!token.includes(key)) {
        console.log('falsekey');
        callback(false);
    }
    else {
        callback(true);
    }

}
function endcode(text, callback) {

    var end = '';
    for (let j = 0; j < text.length; j++) {
        for (let i = 0; i < mang.length; i++) {
            if (mang[i].split('|')[0] == (text[j])) {
                end = end + mang[i].split('|')[1];
            }
        }
    }
    callback(end);

}
function decoded(text, callback) {
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
    callback(de);

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
module.exports = apirouter;