const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');
const { inspect } = require('util');
const sha1 = require ('sha1');

class UsersController {
  static async postNew(req, res) {
    console.log(`Body: ${inspect(req.body)}`); // testing
    // Verify rquest body
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ error: "Missing email" });
    }
    if (!password) {
      res.status(400).json({ error: "Missing password" });
    }

    // Reject existing email
    const uDocName = 'users'
    const existingUser = await dbClient.db.collection(uDocName).findOne({ email });
    if (existingUser) {
      console.log(`Email [${email}] already exists`);
      res.status(400).json({ error: 'Already exist' });
    }

    // Hash password
    const passwordHashed = sha1(password);
    const insertionInfo = await dbClient.db.collection(uDocName).insertOne({
      email,
      password: passwordHashed,
    });
    console.log(`InsertionInfo: ${insertionInfo}`);

    res.status(200).json({
      id: insertionInfo.insertedId,
      email,
    });
  }
}

module.exports = UsersController;
