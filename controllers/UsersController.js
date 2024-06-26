// const redisClient = require('../utils/redis');
const sha1 = require('sha1');
const dbClient = require('../utils/db');

class UsersController {
  static async postNew(req, res) {
    // Verify rquest body
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
    }

    // Reject existing email
    const uDocName = 'users';
    const existingUser = await dbClient.db.collection(uDocName).findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'Already exist' });
    } else {
      // Hash password
      const passwordHashed = sha1(password);
      const insertionInfo = await dbClient.db.collection(uDocName).insertOne({
        email,
        password: passwordHashed,
      });

      res.status(201).json({
        id: insertionInfo.insertedId,
        email,
      });
    }
  }
}

module.exports = UsersController;
