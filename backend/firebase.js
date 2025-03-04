const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.join(__dirname, "..", "solarsystem-fc801-firebase-adminsdk-fbsvc-bcec00982a.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

db.collection("test-connection").add({ check: "connected", timestamp: admin.firestore.Timestamp.now() })
  .then(() => console.log("✅ Firestore connection successful!"))
  .catch((error) => console.error("❌ Firestore connection failed:", error));

module.exports = { db, admin }; // Export both db and admin

