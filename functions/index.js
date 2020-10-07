const functions = require('firebase-functions');

const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "deputy-app",
        "private_key_id": "c559d315489eec95c1e690a1236996d2f9e67b35",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDiVDjbqjrR0yWr\nOFQIzocTC7o8JLfti+KjWARAA3imcJhYMQ/jVbuJQZyMd14fO92aUK41ZC0ZYp4x\n6i/1DH85P9H5JzWN/3PP1E732lRP0WutelMuPsAmiYWTsOrhwk87vV0b82y3fLqo\nJf36Td0WWFBr9KPKCqXeF9LEUlpU+nfoKlrFuhBBqoyXzxw7Zae1XQhPANKZDlGI\nB5cvrcL+BgkDgPjoYDJjRCF5p+S1n+tGFUplyWvEJLwXoFuZZm/A/v9s0MNqHqFD\naNvJmjpvTcHWsvA/SZCp16OxrrFV9Rn8Me8Ne/6JYwz5dvpGC8KPUPVFhCJmscHn\nxDXeYaFFAgMBAAECggEADupcAOX8EF3o6prAtv/dWPz53gLReD8yxW8EgK954QYk\nlBNPp7y7qjT/uyYWtto8JXJRuMUMT9L29/UmCfEz5TL2hIP3/I6sNDMarSzfR49W\nmE0qdC7AfQmtGuma4RvsGtTE8RWewYzfxDsUvM0q19EkI6kwrhz7h2JsinGe8GCd\njv/1SBv3N5br2CyTv7n+y1eZexS7Cs7XUWdgUTG4EVPMH1RG72Zzck29MonZgT+t\nhwxLi5pOO49CjqJh6XWlWIjRcfCJ9tlfT4fYkRetYnUqYjQi+r8CAepoPEe63sA+\nbKVKaQW5I2IUwFk7DgrSQYfGVJcZt7Vdn2xQDmv8QQKBgQD3tahjgE65l+DFBrxq\n4MlGbfgmCpadw1VXI0+qRFKU2qQggIYF2DOjHaj75/sygNSNO8fGNn7JhqiWl7Ln\nASaYYOZZWxV88ffoxednwEwAvM9J5/8Hgt+ba+tN4fdodf4IgeYdi+gjZ89GIim0\nssySNazoIoM8dvYqAhCgUv9aVQKBgQDp52DQzIwJsanOQkY0oCc5yHef5oORYyei\nHxdAwb6QxAUtvCevVVKfOxqN0FLGxKObwnl2M84caOcglhlnU7JeRR4LNA0yO/gf\nZNa9xoy654K+3Dzv+WgTapcmpgyRz7ex76xuFjnt6hWx85N8gUthpPmXKXBQKjrz\ni7qb9jD7MQKBgHlDidqkDmYW7uclRAoCXyZGYYul9VPoMxgEZlSRO+g5HM34fSPR\nUn4Q4A/p4fQ4U1WMpWDofqsDa/bE7sTdsFo6XanyyBMxlU5zy7Pj1JEr3UJt+1Bf\nBj5c14V6EJcn5COgC9n9CriCclsAEHCwcytEcY/2jU6FYj7wYdlKqE09AoGAJIha\n+sG37ZuuJeT8CiQpfEDvTi42xnJyMkQg4aBhH0M+e9IzcJMnAG++yf+LrjfwRdeu\nGOQmgRFxaAmJljXgWhD5jE5o8TukmWKql6F3QYn/RcgoTGLr+nxfd03gELYcvtHs\nYJVgHuS81rpwgrW/DFU0FoQGYr71ziw4zTs6k0ECgYEAgGw+s2//9JcaHQcHRQtt\niOQxL20Qwrn0cH/yfvNCTsXbDkQmuzQuHrK1NavRCKxf7odtx5jLFpXYyInfvyx2\nIEUpRBaRmbuFmprPdPfL0uolSnNhhXCQbVp8tAKDZl89ubLelvyH1p2W2mF9Y/j4\n00/gUuO4SRZ0CQ0Z5mf30+A=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-wj6yi@deputy-app.iam.gserviceaccount.com",
        "client_id": "102782908797038642507",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wj6yi%40deputy-app.iam.gserviceaccount.com"
    })
});

const cors = require('cors')({origin: true});

const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.createCustomUser = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        const data = req.body;
        await admin.auth().createUser({
            uid: data.fullName,
            email: data.email,
            emailVerified: false,
            password: data.password,
        })
        .then(async (userRecord) => {
            const userRef = admin.firestore().collection('users').doc(userRecord.uid);
            const text = data.name + data.email + data.password + userRecord.uid;
            const msg = {
                to: data.email,
                subject: 'Створено вашу сторiнку',
                text: text,
                html: `<h1>Доброго дня, ${data.name}</h1><strong>Вашу сторiнку було створено на платформi deputy-app. 
                Ваш логин: ${data.email}
                Ваш пароль: ${data.password}</strong>
                <h3><a href='https://us-central1-deputy-app.cloudfunctions.net/confirmEmailDeputy?token=${userRecord.uid}'>Пiдтвердити створення сторiнки</a></h3>`,
            };
            if(data.role == 'deputy') {
                await createDeputy(userRef, data, msg);
                res.send(true);
            } else {
                await createNewUser(userRef, data, msg);
                res.send(true);
            }
        })
        .catch(function(error) {
            res.status(500).send(error.message);
        }); 
    })
});

const createDeputy = async(userRef, data, msg) => {
    try {
        await userRef.set({
            email: data.email,
            name: data.name,
            role: data.role,
            surname: data.surname,
            patronymic: data.patronymic,
            rating: 0,
            historyRating: [],
            countConfirmAppeals: 0,
            countAppeals: 0
            
        }).then(async () => {
            return await sendEmail(msg);
        });
    } catch (error) {
        return 
    }
}

const createNewUser = async (userRef, data, msg) => {
    await userRef.set({
        email: data.email,
        name: data.name,
        role: data.role,
        imageUrl: null
    }).then(async () => {
        return await sendEmail(msg);
    });
}

// exports.confirmEmailDeputy = functions.https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         const userId = req.query.token;

//         await admin.auth().updateUser(userId, {
//             emailVerified: true
//         }).then(async (userRecord) => {
//             res.redirect("http://localhost:4200/");
//         }).catch(err => res.status(err.code).send(err.message));
//     })
// })


exports.sendCommentDeputy = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            const data = req.body;
            const userRef = await admin.firestore().collection('users').doc(data.deputyId).get();
            const user = userRef.data();
            const text = 'Доброго дня, ' + user.name + 'Підтвердження запиту відхилино.' + data.appealId + 'Комментар: ' + data.message;
            const msg = {
                userEmail: user.email,
                subject: 'Підтвердження запиту відхилино',
                text: text,
                html: `<h1>Доброго дня, ${user.name}</h1>
                <p>Підтвердження <a href='https://deputy-app.web.app/?id=${data.appealId}'>запиту</a> відхилино.</p>
                <h6>Комментар: </h6><span>${data.message}</span>`,
            };
            await sendEmail(msg);
            res.send(data);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
});

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
        console.log('err', err)
        return err;
    });
}

// exports.createAppeal = functions.firestore.document('appeals/{appealId}').onCreate( async (snap, context) => {
//     const appeal = snap.data();
//     const userRef = admin.firestore().collection('users').doc(appeal.deputyId);
//     try {
//         await userRef.get().then(async span => {
//             await userRef.update({countAppeals: span.data().countAppeals + 1})
//             const data = {
//                 userEmail: span.data().email,
//                 subject: 'Створено новий запит',
//                 text: 'Доброго дня Для Вас було створено новий запит, перегляньте його deputy-app.firebaseapp.com',
//                 html: `<h1>Доброго дня</h1><p>Для Вас було створено новий запит, перегляньте його <a href='deputy-app.firebaseapp.com'>deputy-app.firebaseapp.com</a></p>`
//             }

//             return await sendEmail(data);
//         })
        
//     } catch (error) {
//         return error;
//     }
    
//     return true; 
// });

// exports.createMessage = functions.firestore.document('messages/{messageId}').onCreate( async (snap, context) => {
//     const messageObj = snap.data();
//     const appealRef = admin.firestore().collection('appeals').doc(messageObj.appealId);
//     try {
//         if(messageObj.type == 'feedback') {
//             await appealRef.get().then(async snap => {
//                 const appeal = snap.data();
//                 const deputyRef = admin.firestore().collection('users').doc(appeal.deputyId);
//                 await deputyRef.get().then(spanshot => {
//                     const data = spanshot.data();
//                     const historyRating = data.historyRating;
//                     let rating;
//                     if (historyRating.length) {
//                         historyRating.push(messageObj.rating);
//                         rating = (historyRating.reduce((a, b) => (a + b)) / historyRating.length).toFixed(1);
//                     } else {
//                         rating = messageObj.rating;
//                         historyRating.push(messageObj.rating);
//                     }
//                     deputyRef.update({
//                         rating,
//                         historyRating
//                     })
//                 })
//             })
//             await userRef.get().then(async span => {
//                 await userRef.update({countAppeals: span.data().countAppeals + 1})
                
//             })
//         } else if(messageObj.type == 'confirm') {
//             const data = {
//                 userEmail: 'anna.tsvitkova@outright.digital',
//                 subject: 'Ваш запит виконано',
//                 text: 'Доброго дня. Запит виконано, перевiрте та підтвердіть запит deputy-app.firebaseapp.com',
//                 html: `<h1>Доброго дня</h1><p>Запит виконано, перевiрте та підтвердіть його виконання. <a href='https://deputy-app.web.app/?id=${messageObj.appealId}'>https://deputy-app.web.app/?id=${messageObj.appealId}</a></p>`
//             }

//             return await sendEmail(data);
//         }
        
//     } catch (error) {
//         return error;
//     }
    
//     return true; 
// });

// exports.updateAppeal = functions.firestore.document('appeals/{appealId}').onUpdate( async (change, context) => {
//     try {
//         const appeal = change.after.data();
//         const userRef = admin.firestore().collection('users').doc(appeal.userId);
//         const deputyRef = admin.firestore().collection('users').doc(appeal.deputyId);
//         let userEmail;
//         if (appeal.status == 'Виконано') {
//             await userRef.get().then(async span => {
//                 await deputyRef.get().then(async deputySpan => {
//                     await deputyRef.update({countConfirmAppeals: deputySpan.data().countConfirmAppeals + 1});
//                 })
//                 userEmail = span.data().email;
//                 const data = {
//                     userEmail,
//                     subject: 'Ваш запит виконано',
//                     text: 'Доброго дня Ваш запит виконано, перевiрте та залиште вiдгук на сайтi deputy-app.firebaseapp.com',
//                     html: `<h1>Доброго дня</h1><p>Ваш запит виконано, перевiрте та залиште вiдгук на сайтi <a href='deputy-app.firebaseapp.com'>deputy-app.firebaseapp.com</a></p>`
//                 }

//                 return await sendEmail(data);
//             })
//         } else {
//             return false;
//         }
//     } catch (error) {
//         return error;
//     }
//     return true; 
// });


// exports.blockAppeal = functions.https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         try {
//             const {id} = req.body;
//             await admin.firestore().collection('appeals').doc(id).update({isBlock: true});
//             const newUser = {
//                 userEmail: 'anna.tsvitkova@outright.digital',
//                 subject: 'Відхилення запиту',
//                 text: 'Доброго дня. Депутат відхилив запит, перевірте його.',
//                 html: `<h1>Доброго дня</h1><p>Депутат відхилив запит, перевірте його.<a href='https://deputy-app.web.app/?id=${id}'>https://deputy-app.web.app/?id=${id}</a></p>`
//             }
//             await sendEmail(newUser);
//             res.send(true);
//         } catch (error) {
//             res.status(500).send(error);
//         }
//         return true; 
//     })  
// });


// exports.updateEmail = functions.https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         const data = req.body;

//         await admin.auth().updateUser(data.userId, {
//             email: data.email
//         }).then(async (userRecord) => {
//             res.send(userRecord);
            
//         }).catch(err => res.status(400).send(err));
//     })
// });

// exports.updateEmail = functions.https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         try {
//             const {userId, oldUserEmail, newUserEmail} = req.body;
//             const userRef = admin.firestore().collection('users').doc(userId);
//             await admin.auth().updateUser(userId, {
//                 email: newUserEmail,
//                 emailVerified: false
//             }).then(async (userRecord) => {
//                 await userRef.update({email: newUserEmail});
//                 const newUser = {
//                     userEmail: userRecord.email,
//                     subject: 'Ваш email змiнено',
//                     text: 'Доброго дня Ваш email змiнено, для пiдтвердження натиснiть',
//                     html: `<h1>Доброго дня</h1><p>Ваш email змiнено, для пiдтвердження натиснiть <a href='https://us-central1-deputy-app.cloudfunctions.net/checkEmail?token=${userId}'>Пiдтвердити</a></p>`
//                 }

//                 const oldUser = {
//                     userEmail: oldUserEmail,
//                     subject: 'Ваш email змiнено',
//                     text: 'Доброго дня Ваш email змiнено, якщо ви не змiнювали його натиснiть',
//                     html: `<h1>Доброго дня</h1><p>Ваш email змiнено, якщо ви не змiнювали його натиснiть <a href='https://us-central1-deputy-app.cloudfunctions.net/returnEmail?token=${userId}&email=${oldUserEmail}'>Вiдхилити змiни</a></p>`
//                 }

//                 await sendEmail(newUser);
//                 await sendEmail(oldUser);
//                 res.send(true);
//             }).catch(err => {
//                 res.status(500).send(err);
//             });
//         } catch (error) {
//             res.status(500).send(error);
//         }
//         return true; 
//     })  
// });

// exports.checkEmail = functions.https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         const userId = req.query.token;
//         await admin.auth().updateUser(userId, {
//             emailVerified: true
//         }).then(async (userRecord) => {
//             res.redirect("https://deputy-app.firebaseapp.com");
//         }).catch(err => res.status(500).send(err));
//     })
// })

// exports.returnEmail = functions.https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         const userId = req.query.token;
//         const userEmail = req.query.email;
//         await admin.auth().updateUser(userId, {
//             emailVerified: true,
//             email: userEmail
//         }).then(async (userRecord) => {
//             const userRef = admin.firestore().collection('users').doc(userId);
//             await userRef.update({email: userEmail}).then(() => {
//                 res.redirect("https://deputy-app.firebaseapp.com");
//             })
//         }).catch(err => res.status(500).send(err));
//     })
// })

// exports.editUser = functions.https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         const {id, isDesabled, role, name} = req.body;
//         await admin.auth().updateUser(id, {
//             disabled: isDesabled
//         }).then(async (userRecord) => {
//             const userRef = admin.firestore().collection('users').doc(id);
//             if (role == 'deputy') {
//                 const fullName = name.split(' ');
//                 await userRef.update({
//                     isDesabled,
//                     role, 
//                     name: fullName[1] ? fullName[1] : null,
//                     surname: fullName[0] ? fullName[0] : null,
//                     patronymic: fullName[2] ? fullName[2] : null
//                 }).then(() => {
//                     res.send(true);
//                 });
//             } else {
//                 await userRef.update({isDesabled, role, name}).then(() => {
//                     res.send(true);
//                 });
//             }
//         }).catch(err => res.status(500).send(err));
//     })
// });


// exports.disabledUser = functions.https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         const {userId} = req.body;
//         await admin.auth().updateUser(userId, {
//             disabled: true
//         }).then(async (userRecord) => {
//             const userRef = admin.firestore().collection('users').doc(userId);
//             await userRef.update({isDesabled: true}).then(() => {
//                 res.send(true);
//             })
//         }).catch(err => res.status(500).send(err));
//     })
// });

// exports.createToken = functions.https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         const userId = req.body.userId;
//         await admin.auth().createCustomToken(userId).then(customToken => {
//             res.send(customToken);
//         }).catch(err => res.status(500).send(err));
//     })
// })

// exports.checkToken = functions.https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         const token = req.body.token;
//         await admin.auth().verifyIdToken(token, true).then(result => {
//             res.send(result);
//         }).catch(err => res.status(500).send(err));
//     })
// })