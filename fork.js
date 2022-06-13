let db = require('./connect');
let random = require('random');

process.on("message", message => {
    const response = de(message.query1, message.query2, message.query3,(results)=>{
        return results;
    });
    console.log(response);
    process.send(response);
    process.exit();
})
function de(QozwUyZjQkyhPaY, Qozkyh9ODQoz, ZjQkyhwalLzIFAcwal, callback) {
    if (QozwUyZjQkyhPaY === '' || Qozkyh9ODQoz === '' || ZjQkyhwalLzIFAcwal === '') {
        callback({
            bYskyheytwUybYskyh: 'Chưa nhập đủ dữ liệu!'
        });
    }
    else {

        var anticrack = process.env.DB_ANTICRACK.split('|');
        checkcrack(anticrack, Qozkyh9ODQoz).then((results) => {
            console.log(results);
            if (!results) {
                callback({
                    bYskyheytwUybYskyh: 'Con chó CRACK à :D !'
                });
            }
            else {
                decoded(QozwUyZjQkyhPaY).then((token) => {
                    console.log(token);
                    db.checktoken1(token, (results) => {
                        if (!results) {
                            callback({
                                "bYskyheytwUybYskyh": "Token Die!"
                            });
                        }
                        else {
                            var newdate = new Date();
                            var b = results.date - new Date(newdate).getTime();
                            if (b < 0) {
                                var token1 = results.username + ZjQkyhwalLzIFAcwal + random.int(12345, 99999);
                                console.log(token1);
                                db.checktoken(results.username, (results1) => {
                                    var newdate = new Date();
                                    if (results1) {
                                        db.UpdateToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                                    }
                                    else {
                                        db.InsertToken(results.username, token1, newdate.setMinutes(newdate.getMinutes() + 5));
                                    }
                                    console.log('aaaaa');
                                    endcode(token1).then((token1) => {
                                        decoded(Qozkyh9ODQoz).then((dc) => {
                                            console.log(dc);
                                            callback({
                                                "bYskyheytwUybYskyh": dc,
                                                "PaYkyhhPiQozwUyZjQkyhPaY": token1
                                            });
                                        })
                                    });
                                })
                            }
                            else {
                                console.log('bbb');
                                checktoken(token, ZjQkyhwalLzIFAcwal).then((results) => {
                                    console.log(results);
                                    if (results) {
                                        decoded(Qozkyh9ODQoz).then((dc) => {
                                            console.log('==>' + dc);
                                            callback({
                                                "bYskyheytwUybYskyh": dc
                                            });
                                        });
                                    }
                                    else {
                                        callback({
                                            "bYskyheytwUybYskyh": 'Token Die!'
                                        });
                                    }

                                });
                            }

                        }

                    })
                })
            }
        }
        )
    }
}



////////////////
function checkcrack(anticrack, text) {

    return new Promise((resolve, reject) => {
        var b = false;
        for (let j = 0; j < anticrack.length; j++) {
            if (text == anticrack[j]) {
                console.log('true ne');
                // b = true;
                // break;
                resolve(true);
            }
        }
        resolve(false);
        // if (b) {
        //     resolve(true);
        // }
        // else {
        //     console.log('false ne');
        //     resolve(false);
        // }
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
        console.log(end);
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
        console.log("de=>" + de);
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
    '~|s44', ' |0PC', '-|0sP', '"|DeH', '=|OqL','{|Sp0','}|Sp1','[|XXS',']|XXA','\'|sOl',';|OLS'];
