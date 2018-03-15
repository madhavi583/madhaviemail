var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');
var nodemailer = require('nodemailer');
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
                const output = `<p>You have Employees request</p>
                <h3>Employees Deatils</h3>
                <ul>
                <li>Madhavi Employee Details</li>
                </ul>
                <h3>Meaasge</h3>
               
                `;
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 25,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: 'itsupport@olivetech.com', // generated ethereal user
                        pass: '1th3lpd35k' // generated ethereal password
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"madhavi pathapati ðŸ‘»" <itsupport@olivetech.com>', // sender address
                    to: 'madhupathapati406@gmail.com', // list of receivers
                    subject: 'Leave', // Subject line
                    text: 'Leave Request', // plain text body
                    html: output // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    // res.render('madhavi',{msg:"Email has been sent"});
                });
            } else {
                // authentication failed
                res.status(400).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    userService.create(req.body)
        .then(function () {
            res.json('success');
            console.log('new user madhaavi reg');
            const output = `<p>You have Employees request</p>
            <h3>Employees Deatils</h3>
            <ul>
            <li>Madhavi Employee Details</li>
            </ul>
            <h3>Meaasge</h3>
           
            `;
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 25,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'itsupport@olivetech.com', // generated ethereal user
                    pass: '1th3lpd35k' // generated ethereal password
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"madhavi pathapati ðŸ‘»" <itsupport@olivetech.com>', // sender address
                to: 'madhupathapati406@gmail.com', // list of receivers
                subject: 'Leave', // Subject line
                text: 'Leave Request', // plain text body
                html: output // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                // res.render('madhavi',{msg:"Email has been sent"});
            });
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    userService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);

            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.update(req.params._id, req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    userService.delete(req.params._id)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}