const express = require("express");

const router = express.Router();

const multer = require('multer');
const { v4: uuidv4 } = require('uuid')
const path = require('path')

const user = require('../api/controllers/user.controllers');
const authTeacher = require("../api/midleweres/authTeacher");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
let upload = multer({ storage, fileFilter })

router.post('/signup', upload.single('photo'), function (req, res) {
    const name = req.body.name;
    const photo = req.file.filename;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password;
    const lastName = req.body.lastName;
    const classNr = req.body.classNr;
    const numberId = req.body.numberId;
    const nameFather = req.body.nameFather;
    const nameMather = req.body.nameMather;
    const city = req.body.city;
    const street = req.body.street;
    const nr = req.body.nr;
    const zipCode = req.body.zipCode;
    const newUserData = {
        name,
        photo,
        email,
        password,
        role,
        lastName,
        classNr,
        numberId,
        nameFather,
        nameMather,
        city,
        street,
        nr,
        zipCode
    }
    user.add(newUserData, function (err, user) {
        if (err) {
            res.status(404);
            res.json({
                error: "user not created"
            })
        } else {
            res.json(user)
        }
    })

});

router.post('/login', function (req, res) {
    user.login(req.body, function (err, loggedUser, token = '') {
        if (err) {
            res.status(404);
            res.json({
                error: 'User not logged'
            })
        } else if (token) {
            res.json({ success: true, user: loggedUser, jwt: token })
        } else {
            res.json({ success: false, massage: 'username or password do not match' })
        }
    })
});

router.post('/all/', function (req, res) {
    let group = req.query.group

    user.list(group, function (err, users) {
        if (err) {
            res.status(404);
            res.json({
                error: "user not found"
            })
        } else {
            res.json(users)
        }
    })

});

router.get('/:id', function (req, res) {
    user.get(req.params.id, function (err, user) {
        if (err) {
            res.status(404);
            res.json({
                error: 'User not found'
            })
        } else {
            res.json(user)
        }
    })
});

router.put('/update/:id', function (req, res) {
    user.update(req.params.id, req.body, function (err, data) {
        if (err) {
            res.status(404);
            res.json({
                error: 'user is not found'
            })
        } else {
            res.json(data)
        }
    })
});


router.delete('/delete/:id',authTeacher, function (req, res) {
    user.delete(req.params.id, function (err, data) {
        if (err) {
            res.status(404);
            res.json({
                error: "User not found"
            })
        } else {
            res.json(data)
        }
    })
});

router.put('/addGrade/:id',authTeacher, function (req, res) {
    user.grades([req.params.id, req.body], function (err, grades) {
        if (err) res.send(err)
        res.json(grades)
    })
});


module.exports = router;