var admin = require("firebase-admin");

let serviceAccount;

serviceAccount = require('../hamsterwarsKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function getDatabase() {
  return admin.firestore();
}

module.exports = getDatabase;