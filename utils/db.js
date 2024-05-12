const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.dbName = process.env.DB_DATABASE || 'files_manager';

    this.uri = `mongodb://${this.host}:${this.port}`;
    this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.db = null;

    // Connect
    this.client.connect()
      .then((client) => {
        this.db = client.db(database);
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });
  }

  isAlive() {
    return this.client.isConnected();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
