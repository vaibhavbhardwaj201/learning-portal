const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

const logger = require("firebase-functions/logger");

const cors = require("cors")({origin: true});


admin.initializeApp();

const db = admin.firestore();

// Verify access token and store user data in Firestore
exports.storeUserData = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const authHeader = req.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).send("Unauthorized");
      return;
    }
    const idToken = authHeader.split("Bearer ")[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      if (!decodedToken) {
        res.status(401).send("Unauthorized");
        return;
      }
      const {name, email, phone, role} = req.body;
      const user = {
        name,
        email,
        phone,
        role,
        uid: decodedToken.uid,
      };

      // check if user already exists in collection if not add user
      const docRef = db.collection("users").doc(decodedToken.uid);
      const doc = await docRef.get();
      if (!doc.exists) {
        await docRef.set(user);
      }

      res.status(200).json({
        success: true,
        message: "User data stored successfully",
      });
    } catch (error) {
      logger.error(error);
      res.status(401).send("Unable to store user data, please try again");
    }
  });
});
