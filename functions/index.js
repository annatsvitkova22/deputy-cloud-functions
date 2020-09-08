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
                role: data.role
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