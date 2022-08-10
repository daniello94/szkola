const User = require('../models/User');
const bcrypt = require('bcrypt');
const Subject = require("../models/Subject");

function userAdd(data, cb) {
    let newUser = new User(data);

    newUser.save(function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user);
        }
    })
};

function userLogin(data, cb) {
    User.findOne({ email: data.email }).exec(function (err, user) {
        if (err) {
            cb(err);
            return
        }
        if (!user) {
            cb(null, user)
            return
        };
        bcrypt.compare(data.password, user.password, function (err, logged) {
            if (err) {
                cb(err)
            } if (logged) {
                const token = user.generateAuthToken();
                cb(null, user, token);
            } else {
                cb(null, null)
            }
        })
    })
};

function userList(group, cb) {
    let payload = {}

    if (group) {
        payload = { "role": "student", "classNr": group }
    } else {
        payload = { "role": "student" }
    }

    User.find(payload).lean().exec(function (err, users) {
        if (err) {
            cb(err)
        } else {
            cb(null, users)
        }
    })

};

function userGet(id, cb) {
    User.findById(id).exec(function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
};

function userUpdate(id, data, cb) {
    User.updateOne({ _id: id }, data, function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
};

function userDelate(id, cb) {
    User.deleteOne({ _id: id }, function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
};

function gradesAdd(data, cb) {
    User.findOne({ _id: data[0] }, function (err, foundUsers) {
        if (
            !foundUsers.results.filter(
                (result) => result.nameSubject === data[1].nameSubject
            ).length
        ) {
            let newSub = new Subject({
                nameSubject: data[1].nameSubject,
                grades: [data[1].grades],
            });

            foundUsers.results.push(newSub);
            foundUsers.save(function (err, data) {
                if (err) {
                    cb(err)
                } else {
                    cb(null, data)
                }
            });
        } else {
            const index = foundUsers.results.findIndex((result) => {
                return result.nameSubject === data[1].nameSubject;
            });

            foundUsers.results[index].grades.push(data[1].grades);

            foundUsers.save(function (err, data) {
                if (err) {
                    cb(err)
                } else {
                    cb(null, data)
                }
            });
        }
    });
}
module.exports = {
    add: userAdd,
    login: userLogin,
    list: userList,
    get: userGet,
    update: userUpdate,
    delete: userDelate,
    grades: gradesAdd,
}