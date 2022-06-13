var mysql = require('mysql');
//require('dotenv').config();
var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE1,
})
exports.getAll = function () {
    con.query("select * from user", function (err, results, fields) {
        if (!err) {
            console.log(results);
            return results;
        } else {
            console.log(err);
        }
    })
}
exports.checkuser = function (username, keymay, callback) {
    con.query("SELECT * FROM user WHERE " + username + "='" + keymay + "'", function (err, results, fields) {
        if (!err) {
            callback(results.length > 0);
        } else {
            callback(false);
        }
    })

}
exports.deleteuser = function (username, callback) {
    con.query("DELETE FROM user WHERE username='" + username + "'", function (err, results, fields) {
        if (!err) {
            callback(true);
        } else {
            callback(false);
        }
    })

}
exports.getuser = function (username, keymay, callback) {
    con.query("SELECT * FROM user WHERE " + username + "='" + keymay + "'", function (err, results, fields) {
        if (!err) {
            callback(results[0]);
        } else {
            callback(null);
        }
    })

}
exports.UpdateDate = function (keymay, date, callback) {
    con.query("UPDATE user SET date='" + date + "' WHERE keymay='" + keymay + "'", function (err) {
        if (!err) {
            callback(true);
        } else {
            callback(false);
        }
    })
}
exports.UpdatePass = function (keymay, password, callback) {
    con.query("UPDATE user SET password='" + password + "' WHERE keymay='" + keymay + "'", function (err) {
        console.log(password);
        if (!err) {
            callback(true);
        } else {
            callback(false);
        }
    })
}
exports.InsertUser = function (username, password, key, email, date, callback) {
    con.query("INSERT INTO user (username, password, keymay, email, date) " +
        "VALUES ('" + username + "', '" + password + "', '" + key + "', '" + email + "', '" + date + "');", function (err) {
            if (!err) {
                callback(true);
            } else {
                callback(false);
            }
        })
}
exports.InsertToken = function (username, token, date) {
    con.query("INSERT INTO ListTokenOn (username, token, date) " +
        "VALUES ('" + username + "', '" + token + "', '" + date + "');", function (err) {
            if (!err) {
                return true;
            } else {
                console.log(err);
                return false;
            }
        })
}
exports.UpdateToken = function (username, token,date) {
    con.query("UPDATE ListTokenOn SET token='" + token + "', date='"+date+"' WHERE username ='" + username + "'", function (err) {
        if (!err) {
            return true;
        } else {
            console.log(err);
            return false;
        }
    })
}

exports.checktoken = function (username,callback) {
    con.query("SELECT * FROM ListTokenOn WHERE username='" + username + "'", function (err, results, fields) {
        if (!err) {
           callback(results.length>0);
        } else {
            console.log(err);
            return false;
        }
    })
}
exports.deletetoken = function (username, callback) {
    con.query("DELETE FROM ListTokenOn WHERE username='" + username + "'", function (err, results, fields) {
        if (!err) {
            callback(true);
        } else {
            callback(false);
        }
    })

}
exports.checktoken1 = function (token,callback) {
    con.query("SELECT * FROM ListTokenOn WHERE token='" + token + "'", function (err, results, fields) {
        if (!err) {
           callback(results[0]);
        } else {
            console.log(err);
            return false;
        }
    })
}