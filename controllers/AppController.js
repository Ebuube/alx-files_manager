const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  /**
   * Return welcome note
   * @returns{obect} server response
   */
  static async getHomepage(req, res) {
    console.log('Getting homepage'); // testing
    res.status(200).send('Welcome to Files Manager');
  }

  /**
   * Check if redis and MongoDB server are active
   * @returns{obect} server response
   */
  static async getStatus(req, res) {
    console.log('Getting status'); // testing
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  static async getStats(req, res) {
    console.log('Getting stats'); // testing
    // return res.status(200).json({"stats": "in progress"});
    try {
      res.status(200).json({
        users: await dbClient.nbUsers(),
        files: await dbClient.nbFiles(),
      });
    } catch (error) {
      console.error('Error getting stats:', error);
      res.status(500).json({ error: 'Could not get stats' });
    }
  }
}

module.exports = AppController;
