const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({origin: true});

const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendEmailDeputyForCreate = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        const data = req.body;

        await admin.auth().createUser({
            email: data.email,
            emailVerified: false,
            password: data.password,
        })
        .then(async (userRecord) => {
            const userRef = admin.firestore().collection('users').doc(userRecord.uid);

            await userRef.set({
                email: data.email,
                name: data.name,
                role: data.role,
                surname: data.surname,
                patronymic: data.patronymic
            }).then(() => {
                const text = data.name + data.email + data.password + userRecord.uid;
                const msg = {
                    to: data.email,
                    from: 'annatsvitkova73@gmail.com',
                    subject: 'Створено вашу сторiнку',
                    text: text,
                    html: `<h1>Доброго дня, ${data.name}</h1><strong>Вашу сторiнку було створено на платформi deputy-app. 
                    Ваш логин: ${data.email}
                    Ваш пароль: ${data.password}</strong>
                    <h3><a href='https://us-central1-deputy-app.cloudfunctions.net/confirmEmailDeputy?token=${userRecord.uid}'>Пiдтвердити створення сторiнки</a></h3>`,
                };
                sgMail.send(msg)
                .then(() => {
                    res.status(200).send(true);
                });
            });
        })
        .catch(function(error) {
            res.status(error.code).send(error.message);
        }); 
    })
})

exports.confirmEmailDeputy = functions.https.onRequest(async (req, res) => {
    cors(req, res, async() => {
        const userId = req.query.token;

        await admin.auth().updateUser(userId, {
            emailVerified: true
        }).then(async (userRecord) => {
            res.redirect("http://localhost:4200/");
        }).catch(err => res.status(err.code).send(err.message));
    })
})

const sendEmail = async (data) => {
    const msg = {
        to: data.userEmail,
        from: 'annatsvitkova73@gmail.com',
        subject: data.subject,
        text: data.text,
        html: data.html,
    };

    await sgMail.send(msg)
    .then(() => {
        return true;
    }).catch(err => {
        return err;
    });
}

exports.createAppeal = functions.firestore.document('appeals/{appealId}').onCreate( async (snap, context) => {
    const appeal = snap.data();
    const userRef = admin.firestore().collection('users').doc(appeal.deputyId);
    try {
        await userRef.get().then(async span => {
            const data = {
                userEmail: span.data().email,
                subject: 'Створено новий запит',
                text: 'Доброго дня Для Вас було створено новий запит, перегляньте його deputy-app.firebaseapp.com',
                html: `<h1>Доброго дня</h1><p>Для Вас було створено новий запит, перегляньте його <a href='deputy-app.firebaseapp.com'>deputy-app.firebaseapp.com</a></p>`
            }

            return await sendEmail(data);
        })
        
    } catch (error) {
        return error;
    }
    
    return true; 
});

exports.updateAppeal = functions.firestore.document('appeals/{appealId}').onUpdate( async (change, context) => {
    try {
        const appeal = change.after.data();
        const userRef = admin.firestore().collection('users').doc(appeal.userId);
        let userEmail;
        if (appeal.status == 'done') {
            await userRef.get().then(async span => {
                userEmail = span.data().email;
                const data = {
                    userEmail,
                    subject: 'Ваш запит виконано',
                    text: 'Доброго дня Ваш запит виконано, перевiрте та залиште вiдгук на сайтi deputy-app.firebaseapp.com',
                    html: `<h1>Доброго дня</h1><p>Ваш запит виконано, перевiрте та залиште вiдгук на сайтi <a href='deputy-app.firebaseapp.com'>deputy-app.firebaseapp.com</a></p>`
                }

                return await sendEmail(data);
            })
        } else {
            return false;
        }
    } catch (error) {
        return error;
    }
    return true; 
});

exports.updateEmail = functions.https.onRequest(async (req, res) => {
    cors(req, res, async() => {
        const data = req.body;

        await admin.auth().updateUser(data.userId, {
            email: data.email
        }).then(async (userRecord) => {
            res.send(userRecord);
            
        }).catch(err => res.status(400).send(err));
    })
});

exports.updateEmail = functions.https.onRequest(async (req, res) => {
    cors(req, res, async() => {
        try {
            const {userId, oldUserEmail, newUserEmail} = req.body;
            const userRef = admin.firestore().collection('users').doc(userId);
            await admin.auth().updateUser(userId, {
                email: newUserEmail,
                emailVerified: false
            }).then(async (userRecord) => {
                await userRef.update({email: newUserEmail});
                const newUser = {
                    userEmail: userRecord.email,
                    subject: 'Ваш email змiнено',
                    text: 'Доброго дня Ваш email змiнено, для пiдтвердження натиснiть',
                    html: `<h1>Доброго дня</h1><p>Ваш email змiнено, для пiдтвердження натиснiть <a href='https://us-central1-deputy-app.cloudfunctions.net/checkEmail?token=${userId}'>Пiдтвердити</a></p>`
                }

                const oldUser = {
                    userEmail: oldUserEmail,
                    subject: 'Ваш email змiнено',
                    text: 'Доброго дня Ваш email змiнено, якщо ви не змiнювали його натиснiть',
                    html: `<h1>Доброго дня</h1><p>Ваш email змiнено, якщо ви не змiнювали його натиснiть <a href='https://us-central1-deputy-app.cloudfunctions.net/returnEmail?token=${userId}&email=${oldUserEmail}'>Вiдхилити змiни</a></p>`
                }

                await sendEmail(newUser);
                await sendEmail(oldUser);
                res.send(true);
            }).catch(err => {
                res.status(500).send(err);
            });
        } catch (error) {
            res.status(500).send(error);
        }
        return true; 
    })  
});

exports.checkEmail = functions.https.onRequest(async (req, res) => {
    cors(req, res, async() => {
        const userId = req.query.token;
        await admin.auth().updateUser(userId, {
            emailVerified: true
        }).then(async (userRecord) => {
            res.redirect("https://deputy-app.firebaseapp.com");
        }).catch(err => res.status(500).send(err));
    })
})

exports.returnEmail = functions.https.onRequest(async (req, res) => {
    cors(req, res, async() => {
        const userId = req.query.token;
        const userEmail = req.query.email;
        await admin.auth().updateUser(userId, {
            emailVerified: true,
            email: userEmail
        }).then(async (userRecord) => {
            const userRef = admin.firestore().collection('users').doc(userId);
            await userRef.update({email: userEmail}).then(() => {
                res.redirect("https://deputy-app.firebaseapp.com");
            })
        }).catch(err => res.status(500).send(err));
    })
})