const { MongoClient } = require('mongodb');
// import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || '0.0.0.0';
    this.port = process.env.DB_PORT || 27017;
    this.dbName = process.env.DB_DATABASE || 'files_manager';

    this.uri = `mongodb://${this.host}:${this.port}`;
    this.client = null;
    this.connected = false;
    this.connect();
    this.db = null;
  }

  /**
   * Connect the client to the database server
   * @returns {void}
   */
  async connect() {
    try {
      this.client = await MongoClient.connect(`mongodb://${this.host}:${this.port}/${this.dbName}`, { useUnifiedTopology: true });
      this.connected = true;
      this.db = this.client.db(); // Select database
    } catch (error) {
      console.error('Error connecting to MongoDb:', error);
    }
  }

  /**
   * Check if the client is connected to the Mongod server
   * @returns {boolean}
   */
  isAlive() {
    return this.connected && this.client.isConnected();
  }

  /**
   * Return the number of users
   * @returns {number} The count or -1 on error
   */
  async nbUsers() {
    // Get the users collection
    const docName = 'users';
    try {
      return await this.db.collection(docName).countDocuments();
    } catch (error) {
      console.error(`Error counting documents in the ${docName} colection:`, error);
      return -1; // Indicating error
    }
  }

  /**
   * Return the number of files
   * @returns {number} The count or -1 on error
   */
  async nbFiles() {
    // Get the files collection
    const docName = 'files';
    try {
      return await this.db.collection(docName).countDocuments();
    } catch (error) {
      console.error(`Error counting documents in the ${docName} colection:`, error);
      return -1; // Indicating error
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
