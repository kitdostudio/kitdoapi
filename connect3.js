var mysql = require('mysql');
//require('dotenv').config();
var con = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})
exports.getAll = function () {
    return new Promise((resolve, reject) => {
        con.query("select * from reg", function (err, results, fields) {
            if (!err) {
                resolve(results);
            } else {
                console.log(err);
            }
        })
    });
}
exports.checkuser = function (username, keymay) {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM reg WHERE " + username + "='" + keymay + "'", function (err, results, fields) {
            if (!err) {
                console.log(keymay);
                console.log(results);
                resolve(results.length > 0);
            } else {
                console.log(err);
                resolve(false);
            }
        })
    });

}
exports.deleteuser = function (username, callback) {

    con.query("DELETE FROM reg WHERE uid='" + username + "'", function (err, results, fields) {
        if (!err) {
            callback(true);
        } else {
            callback(false);
        }
    })


}
exports.getuser = function (username, keymay, callback) {

    con.query("SELECT * FROM reg WHERE " + username + "='" + keymay + "'", function (err, results, fields) {
        if (!err) {
            callback(results[0]);
        } else {
            callback(null);
        }
    })

}
exports.UpdateDate = function (keymay,type, date, callback) {

    con.query("UPDATE reg SET date='" + date + "', type='" + type + "' WHERE keymay='" + keymay + "'", function (err) {
        if (!err) {
            callback(true);
        } else {
            console.log(err);
            callback(false);
        }
    })

}
exports.Updateactive = function (keymay, date) {

    con.query("UPDATE reg SET active='" + date + "' WHERE keymay='" + keymay + "'", function (err) {
        if (!err) {
           return true;
        } else {
            console.log(err);
            return false;
        }
    })

}
exports.UpdatePass = function (keymay, password, callback) {

    con.query("UPDATE reg SET password='" + password + "' WHERE keymay='" + keymay + "'", function (err) {
        console.log(password);
        if (!err) {
            callback(true);
        } else {
            console.log(err);
            callback(false);
        }
    })

}
exports.InsertUser = function (username, password, ma2fa, cookie, token,email,passmail,cateloge,date, callback) {

    con.query("INSERT INTO reg (uid, password, ma2fa, cookie, token, email, passmail, cateloge, date) " +
        "VALUES ('" + username + "', '" + password + "', '" + ma2fa + "', '" + cookie + "', '" + token + "', '" + email + "', '" + passmail + "', '" + cateloge + "', '" + date + "');", function (err) {
            if (!err) {
                console.log(username);
                callback(true);
            } else {
                console.log(err);
                callback(false);
            }
        })

}
exports.InsertToken = function (username, token, date) {

    con.query("INSERT INTO reg (username, token, date) " +
        "VALUES ('" + username + "', '" + token + "', '" + date + "');", function (err) {
            if (!err) {
                return true;
            } else {
                console.log(err);
                return false;
            }
        })

}
exports.UpdateToken = function (username, token, date) {

    con.query("UPDATE ListTokenOn SET token='" + token + "', date='" + date + "' WHERE username ='" + username + "'", function (err) {
        if (!err) {
            return true;
        } else {
            console.log(err);
            return false;
        }
    })

}

exports.checktoken = function (username, callback) {
    con.query("SELECT * FROM ListTokenOn WHERE username='" + username + "'", function (err, results, fields) {
        if (!err) {
            callback(results.length > 0);
        } else {
            console.log(err);
            callback(false);
        }
    })
}
exports.deletetoken = function (username) {

    con.query("DELETE FROM ListTokenOn WHERE username='" + username + "'", function (err, results, fields) {
        if (!err) {
            resolve(true);
        } else {
            resolve(false);
        }
    })

}
exports.checktoken1 = function (token, callback) {
    
    con.query("SELECT * FROM ListTokenOn WHERE token='" + token + "'", function (err, results, fields) {
        if (!err) {
            callback(results[0]);
        } else {
            console.log(err);
            callback(false);
        }
    })

}