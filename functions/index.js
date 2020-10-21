const functions = require('firebase-functions');

const admin = require('firebase-admin');

const algoliasearch = require('algoliasearch');
const algolia = algoliasearch(functions.config().algolia.appid, functions.config().algolia.adminkey);

// admin.initializeApp(functions.config().firebase);
admin.initializeApp({
    credential: admin.credential.cert(
        {
            "type": "service_account",
            "project_id": "deputy-app",
            "private_key_id": "95c53c036c55a658a99472ff7fc9f39065f4fc0b",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDh8z5XFqGKAUmp\nugMdW37HS65onbzw/D5e1j4Qe5V7wF+y7zE5DYo7y5UTV5LFIF45K5TmK9RifPmx\noIh+nq5pqROEh4SdoaNY0wMEveKwLGDMMWK3o3E+z8SmFr10izyUV+po+v8sQIpw\nKWQZQdVM5DJDSk0qWL3DyN5DKiBHooZYt98iKlHy2rBhwpOHenXaQ/+h39kyK4fp\nv+CahOA2Kbn9NexxmXxmR4bfwfksWRfjPkUCkpHKpDJT/vkT2mQ4RotMpu3T8hB4\n18wEVElRUczPsa6QqAJtyhm2tXwIpIIIR+8/HoAQddorXiq9lpA0jidEGvMZeDmD\n+NaiQAMhAgMBAAECggEAY+AqmUJWq3MARbcEc3CjLKMmd/Xps7g8NZ2MF6sZG3eg\nla6nWmnCxcWqor8eEGbLX4gFLG0JV3OYx8yHKTkpLWlgSD/C/g6Z7sRvXCQ3VNp4\n+ymFUlk70KD0ctowapi1cXkfE8KHEt+Aki2pooR4LaHdGeN5EpPhZe6fWJ8BX8gB\n6YTpirqW861JELZunOOw1T2fRcwb9bjrFy/qfxYuO7WM99yUnInjozSUwY1+B8kc\nMDZUN9/Lz5Uee/v1oduIcvf3rAZqD6V0+uJca/Vfq72XZJ3lu235NFgoEPZdQL+Y\nlyZBR3vVqJRaxw5M3w5YTrIGHIetsyENKknaYPL+tQKBgQDzVFvS1iK3R9yVDkYt\nY3LT/qg8nheeZdrXYsgQQ7wDk7ddAESXkLz6i6vK9z/6FD8dq1oToKXEYTj9H5ya\nF1FewCbMz89/hbRsfBTB4bllzELQVa3q9Q9liOnIAe+7Ac7ou1jsppd7izpSsn/8\nC9L1F+bdUOYU/ii3uie1PvdX2wKBgQDttza8z6Evj40wfabgL6gbPC8xvTTLdjnU\nbl/fZ/d3LXSFttw09TwxbWF0QaLLXBVh5DxG0cHtijawUj2cxI0Z8vR/s1s+SN9D\nraiYs0BbS7+BOYT8JO0dpZUM73APNPlOaK7rkZ2oKTQcnHHycv4joogWRmZzPf1C\nFETNIONPswKBgQDlR7LyOpYhr1P5G6cis5eKjGWIIMtOlNkdpNWxBbIOiMz5k/wN\n+PMo/hzVNh8RjKxgT4qj/fbU0Wt6j6PnSluA9XxZ9uKlXZ5BrrV8by5b7plyZ5lm\nUJ2+ZcErli+HPc/yWj4TV3JbljhRniKco6OXEHuYRNdYJpjFbmJmFTvJiwKBgQDq\nqkrm6TD9eoCutdvexCz3ddpBB77ue69q/eq26DNq+vxkY7fOr6jUQl5KHeFPT3/s\nOxsl7ju6+w4x0X3xHDcOvsCOr8gLHHUKoowk8g8+EPDj6JxXLTzGX4dcVaIR4QGb\nXcwP0JgKQWKoO+hgpxQqqXAeTTEl4rP4X3nr5eN/8QKBgBAZxId2Ua+QSEP5RroN\nfCe5bb1wja8QbeWHFtXun7eI/Jf9uriH3HRJBUAZ5wLjGme/qyCkzmwo0q2tSOso\nWfDA/XCnMAGIOt6+FEDwj82TkOk0/rdBiC7t4Wa1OiXlh/uSSy+Y4zCU/3tgP3uZ\nwaIo5BJxUbtcX3HyuHPNENEb\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-wj6yi@deputy-app.iam.gserviceaccount.com",
            "client_id": "102782908797038642507",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wj6yi%40deputy-app.iam.gserviceaccount.com"
        })
});

// admin.initializeApp({
//     credential: admin.credential.cert({
//         "type": "service_account",
//         "project_id": "deputies-apps",
//         "private_key_id": "2e2cea0079ec926f74ec6596f323aaa0baa1f8ff",
//         "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDHBeHdXqORwN9i\nw7bXgFr5Z6B/BQ3rdQV+/4QBKesSZyHz3gClhkV7cQxojqpS9DpD0myc6p8dTcfi\n95spHo7rkQY1L+7HtZTuJ4SQ6s6P9Zn4PO6gF41uX4juug6swqcB43Z130KMR2vp\nVzgmt3Ng3WvDnxapuf0i2l1l/BPJnDrKmhsZFMC/0Moikdpw1ENNBqi2UqqF3iOW\n/Ucr/erLtaaM7HmlpWxSJXzY4XzJCF/gIZiYkBpM5IC6LD78LuhLPmaKxcu448pR\nSFjHyOi5ePnaUzswFMAYm2YRR5fDz8vtcToF8yGXYRCISC3mtbstkYKQJpowhg55\nIzbrjRNJAgMBAAECggEAC0DVRLS0U7pXvzBBC0YcDsBZ4ji9UOAS5ZuJwZ2Wx7l6\nYV0/BNz22owZtyNC9PIPhdR09PnssYXbfKVCuhRa4S2378O0MQlewIkOPTnzoE7z\nK+a5GOcABZrEBbiSOhk/A3Oyt+c97mve6YiXmZPTo6ldbagWClaEfkch0xGJ5mM0\nBCfNjQ8FTF3xJMQc/GRzl9nFKK52IO3MbUBKK8A8tX1CHIWihchlzbs2MM62zY4u\ngUyWwbdi3gWwFKuSp+fRH0sXEXmtTrdbbtMIY+tUp9r1RlkYmkk6QgrGeSR/G6jo\nAuh4ljTkTE2VZJ5ssJkf8nEfl1MlgT+Knfp4mddZgQKBgQD6ImXvoSKtX/jdlph5\nLTxemyQM+TZQZa+lolNrIPOUDHFTcfKzee6yX1MvyQEjU1O3a+WmqqGoEi5v2bI8\nrVd3ZIb7Jx7DS2llRlH8/bWmw+d/RS6l7zBwkqzfhQ9U4f/hWQCbTi34+EjKBM9A\nZKVBhXBNhog4Auw2Q7MUEfvbgQKBgQDLsKc3F8aHKs4EsdCEOpc/Jfkp5mXCKleO\nJNWy5pQ1LIIshRA0w06lJTEA528lvYUOCyr9WbOUql1a0LtowK1HzkoIxpcHbu0X\nCvtjCbHyivR1dTWDFXeGpHBQ/vQRBu042zwxsNZaB3IsyHK/0xh6K5eOARil+WeY\nWziR2Lc7yQKBgGfm1/8FKRlpjz/EaYuUXcpSmVQGRSh6RM8BsbMDWgq6bGykHZOt\n55gSfsSPszhQSascV6W2pTXib4WooSARRQ7kJCm5Y07uSVZ3MmFrpgQixkuYmjr1\nM2Lfmo2ygN7ajea2iMj6XaBYyiuYedqetAKWgkLByl2x4RrdXkrM+ZiBAoGAaGeL\nzjlpkS7nmpBqCNzfWYblSAzIa9W4Oyu2PZTisr61mow52lGhphSCIax+1CFoaeJf\njqzD15fbcgk7hl38c6nRWN4x26WH8R+36vO1OlTvKKWDYEVIlsMCrwF/qJqcTWBS\nYkX6GPtoEnxMFPbmvPhLHoaBU9GawAVB4b/ra8ECgYBwMj93QOpUbpB0/LjTPveW\n1n55hPZIZ2RZRdA+/17E8FqwjHH8+pUaDpYQ1O2i4E7cOpyBMlE1FD8HjsCy8Yfw\nd/37rr+iqXzr7sPplEZGQNy9PINwM9bWgaV3afJvBmrPViDi7I6CN1ghHwAFgVRw\ntcC83KRgzA5TPalUetT0dQ==\n-----END PRIVATE KEY-----\n",
//         "client_email": "firebase-adminsdk-92u2h@deputies-apps.iam.gserviceaccount.com",
//         "client_id": "103648704231175582250",
//         "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//         "token_uri": "https://oauth2.googleapis.com/token",
//         "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//         "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-92u2h%40deputies-apps.iam.gserviceaccount.com"
//     })
// });


const cors = require('cors')({origin: true});
const SENDGRID_API_KEY = functions.config().sendgrid.key;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);


exports.createUsersToAlgolia = functions.region('europe-west3').firestore.document('appeals/{appealId}').onCreate( async (snap, context) => {
    const newValue = snap.data();
    newValue.objectID = snap.id;

    const index = algolia.initIndex('appeals');
    index.saveObject(newValue);
});

exports.updateUsersToAlgolia = functions.region('europe-west3').firestore.document('appeals/{appealId}').onUpdate( async (snap, context) => {
    const data = snap.after.data();
    data.objectID = snap.after.id;

    const index = algolia.initIndex('appeals');
    index.saveObject(data);
});

exports.deleteUsersToAlgolia = functions.region('europe-west3').firestore.document('appeals/{appealId}').onDelete( async (snap, context) => {
    const index = algolia.initIndex('appeals');
    index.deleteObject(snap.id);
});

exports.sendDataToAngolia = functions.region('europe-west3').https.onRequest((req, res) => {
    let appeals = [];
    admin.firestore().collection('appeals').get().then((docs) => {

        docs.forEach((doc) => {
            const appeal = doc.data();
            appeal.objectID = doc.id;
            appeals.push(appeal);
        })

        const index = algolia.initIndex('appeals');

        index.saveObjects(appeals, function( err, content) {
            res.status(200).send(content);
        })
    })
})

// exports.createCustomUser = functions.region('europe-west3').https.onRequest(async (req, res) => {
//     cors(req, res, async () => {
//         const data = req.body;
//         await admin.auth().createUser({
//             uid: data.fullName,
//             email: data.email,
//             emailVerified: false,
//             password: data.password,
//         })
//         .then(async (userRecord) => {
//             const userRef = admin.firestore().collection('users').doc(userRecord.uid);
//             const text = data.name + data.email + data.password + userRecord.uid;
//             const msg = {
//                 userEmail: data.email,
//                 subject: 'Створено вашу сторiнку',
//                 text: text,
//                 html: `<h1>Доброго дня, ${data.name}</h1><strong>Вашу сторiнку було створено на платформi deputy-app. 
//                 Ваш логин: ${data.email}
//                 Ваш пароль: ${data.password}</strong>
//                 <h3><a href='https://europe-west3-deputies-apps.cloudfunctions.net/confirmEmailDeputy?token=${userRecord.uid}'>Пiдтвердити створення сторiнки</a></h3>`,
//             };
//             if(data.role == 'deputy') {
//                 await createDeputy(userRef, data, msg);
//                 res.send(true);
//             } else {
//                 await createNewUser(userRef, data, msg);
//                 res.send(true);
//             }
//         })
//         .catch(function(error) {
//             res.status(500).send(error.message);
//         }); 
//     })
// });

// const createDeputy = async(userRef, data, msg) => {
//     try {
//         await userRef.set({
//             email: data.email,
//             name: data.name,
//             role: data.role,
//             surname: data.surname,
//             patronymic: data.patronymic,
//             rating: 0,
//             historyRating: [],
//             countConfirmAppeals: 0,
//             countAppeals: 0,
//             district: data.district,
//             party: data.party
//         }).then(async () => {
//             return await sendEmail(msg);
//         });
//     } catch (error) {
//         return 
//     }
// }

// const createNewUser = async (userRef, data, msg) => {
//     await userRef.set({
//         email: data.email,
//         name: data.name,
//         role: data.role,
//         imageUrl: null
//     }).then(async () => {
//         return await sendEmail(msg);
//     });
// }

// exports.confirmEmailDeputy = functions.region('europe-west3').https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         const userId = req.query.token;

//         await admin.auth().updateUser(userId, {
//             emailVerified: true
//         }).then(async (userRecord) => {
//             res.redirect("https://sluga.pl.ua/");
//         }).catch(err => res.status(err.code).send(err.message));
//     })
// })


// exports.sendCommentDeputy = functions.region('europe-west3').https.onRequest(async (req, res) => {
//     cors(req, res, async () => {
//         try {
//             const data = req.body;
//             const userRef = await admin.firestore().collection('users').doc(data.deputyId).get();
//             const user = userRef.data();
//             const text = 'Доброго дня, ' + user.name + 'Підтвердження запиту відхилино.' + data.appealId + 'Комментар: ' + data.message;
//             const msg = {
//                 userEmail: user.email,
//                 subject: 'Підтвердження запиту відхилино',
//                 text: text,
//                 html: `<h1>Доброго дня, ${user.name}</h1>
//                 <p>Підтвердження <a href='https://sluga.pl.ua/?id=${data.appealId}'>запиту</a> відхилино.</p>
//                 <h4>Комментар: </h4><p>${data.message}</p>`,
//             };
//             await sendEmail(msg);
//             res.send(data);
//         } catch (error) {
//             res.status(500).send(error.message);
//         }
//     })
// });

// const sendEmail = async (data) => {
//     const msg = {
//         to: data.userEmail,
//         cc: data.cc ? data.cc : 'em5796.sluga.pl.ua',
//         from: 'no-reply@em5796.sluga.pl.ua',
//         subject: data.subject,
//         text: data.text,
//         html: data.html,
//     };

//     await sgMail.send(msg)
//     .then(() => {
//         return true;
//     }).catch(err => {
//         return err;
//     });
// }


// exports.newReq = functions.region('europe-west3').https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         let emails = [];
//         const userRefs = await admin.firestore().collection('users', ref => ref.where('role', '==', 'admin')).get();
//         if (userRefs.size) {
//             userRefs.forEach(userRef => {
//                 const { email } = userRef.data();
//                 emails.push(email);
//             })
//         }
//         const msg = {
//             to: email[0],
//             cc: [emails],
//             from: 'no-reply@em5796.sluga.pl.ua',
//             subject: 'Доброго дня',
//             text: 'Доброго дня',
//             html: `<h1>Доброго дня</h1>`,
//         };
//         await sgMail.send(msg)
//         .then(() => {
//             res.send(true);
//         }).catch(err => {
//             res.status(500).send(err);
//         });
//     });
// });


// exports.createAppeal = functions.region('europe-west3').firestore.document('appeals/{appealId}').onCreate( async (snap, context) => {
//     const appeal = snap.data();
//     const userRef = admin.firestore().collection('users').doc(appeal.deputyId);
//     try {
//         await userRef.get().then(async span => {
//             await userRef.update({countAppeals: span.data().countAppeals + 1})
//             const data = {
//                 userEmail: span.data().email,
//                 subject: 'Створено новий запит',
//                 text: 'Доброго дня Для Вас було створено новий запит, перегляньте його https://sluga.pl.ua/',
//                 html: `<h1>Доброго дня</h1><p>Для Вас було створено новий запит, перегляньте його <a href='https://sluga.pl.ua/'>https://sluga.pl.ua/</a></p>`
//             }

//             return await sendEmail(data);
//         })
        
//     } catch (error) {
//         return error;
//     }
    
//     return true; 
// });

// exports.createMessage = functions.region('europe-west3').firestore.document('messages/{messageId}').onCreate( async (snap, context) => {
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
//                         rating = Number((historyRating.reduce((a, b) => (a + b)) / historyRating.length).toFixed(1));
//                     } else {
//                         rating = Number(messageObj.rating);
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
//             let emails = [];
//             const userRefs = await admin.firestore().collection('users', ref => ref.where('role', '==', 'admin')).get();
//             if (userRefs.size) {
//                 userRefs.forEach(userRef => {
//                     const { email } = userRef.data();
//                     emails.push(email);
//                 })
//             }
//             const data = {
//                 userEmail: emails[0],
//                 cc: emails,
//                 subject: 'Ваш запит виконано',
//                 text: 'Доброго дня. Запит виконано, перевiрте та підтвердіть запит https://sluga.pl.ua',
//                 html: `<h1>Доброго дня</h1><p>Запит виконано, перевiрте та підтвердіть його виконання. <a href='https://sluga.pl.ua/?id=${messageObj.appealId}'>https://sluga.pl.ua/?id=${messageObj.appealId}</a></p>`
//             }

//             return await sendEmail(data);
//         }
        
//     } catch (error) {
//         return error;
//     }
    
//     return true; 
// });

// exports.updateAppeal = functions.region('europe-west3').firestore.document('appeals/{appealId}').onUpdate( async (change, context) => {
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
//                     text: 'Доброго дня Ваш запит виконано, перевiрте та залиште вiдгук на сайтi sluga.pl.ua/',
//                     html: `<h1>Доброго дня</h1><p>Ваш запит виконано, перевiрте та залиште вiдгук на сайтi <a href='https://sluga.pl.ua/'>sluga.pl.ua/</a></p>`
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


// exports.blockAppeal = functions.region('europe-west3').https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         try {
//             const {id} = req.body;
//             await admin.firestore().collection('appeals').doc(id).update({isBlock: true});
//             let emails = [];
//             const userRefs = await admin.firestore().collection('users', ref => ref.where('role', '==', 'admin')).get();
//             if (userRefs.size) {
//                 userRefs.forEach(userRef => {
//                     const { email } = userRef.data();
//                     emails.push(email);
//                 })
//             }
//             const newUser = {
//                 userEmail: emails[0],
//                 cc: emails,
//                 subject: 'Відхилення запиту',
//                 text: 'Доброго дня. Депутат відхилив запит, перевірте його.',
//                 html: `<h1>Доброго дня</h1><p>Депутат відхилив запит, перевірте його.<a href='https://sluga.pl.ua/?id=${id}'>https://sluga.pl.ua/?id=${id}</a></p>`
//             }
//             await sendEmail(newUser);
//             res.send(true);
//         } catch (error) {
//             res.status(500).send(error);
//         }
//         return true; 
//     })  
// });


// exports.updateEmail = functions.region('europe-west3').https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         const data = req.body;

//         await admin.auth().updateUser(data.userId, {
//             email: data.email
//         }).then(async (userRecord) => {
//             res.send(userRecord);
            
//         }).catch(err => res.status(400).send(err));
//     })
// });

// exports.updateEmail = functions.region('europe-west3').https.onRequest(async (req, res) => {
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
//                     html: `<h1>Доброго дня</h1><p>Ваш email змiнено, для пiдтвердження натиснiть <a href='https://europe-west3-deputies-apps.cloudfunctions.net/checkEmail?token=${userId}'>Пiдтвердити</a></p>`
//                 }

//                 const oldUser = {
//                     userEmail: oldUserEmail,
//                     subject: 'Ваш email змiнено',
//                     text: 'Доброго дня Ваш email змiнено, якщо ви не змiнювали його натиснiть',
//                     html: `<h1>Доброго дня</h1><p>Ваш email змiнено, якщо ви не змiнювали його натиснiть <a href='https://europe-west3-deputies-apps.cloudfunctions.net/returnEmail?token=${userId}&email=${oldUserEmail}'>Вiдхилити змiни</a></p>`
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

// exports.checkEmail = functions.region('europe-west3').https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         const userId = req.query.token;
//         await admin.auth().updateUser(userId, {
//             emailVerified: true
//         }).then(async (userRecord) => {
//             res.redirect("https://sluga.pl.ua/");
//         }).catch(err => res.status(500).send(err));
//     })
// })

// exports.returnEmail = functions.region('europe-west3').https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         const userId = req.query.token;
//         const userEmail = req.query.email;
//         await admin.auth().updateUser(userId, {
//             emailVerified: true,
//             email: userEmail
//         }).then(async (userRecord) => {
//             const userRef = admin.firestore().collection('users').doc(userId);
//             await userRef.update({email: userEmail}).then(() => {
//                 res.redirect("https://sluga.pl.ua");
//             })
//         }).catch(err => res.status(500).send(err));
//     })
// })


// exports.editUser = functions.region('europe-west3').https.onRequest(async (req, res) => {
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


// exports.disabledUser = functions.region('europe-west3').https.onRequest(async (req, res) => {
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

// exports.deleteUser = functions.region('europe-west3').https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         const {userId} = req.body;
//         await admin.auth().deleteUser(userId).then(async (userRecord) => {
//             const userRef = admin.firestore().collection('users').doc(userId);
//             await userRef.delete().then(() => {
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

// exports.checkToken = functions.region('europe-west3').https.onRequest(async (req, res) => {
//     cors(req, res, async() => {
//         const token = req.body.token;
//         await admin.auth().verifyIdToken(token, true).then(result => {
//             res.send(result);
//         }).catch(err => res.status(500).send(err));
//     })
// })