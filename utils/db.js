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
  }

  async connect() {
    try {
      this.client = await MongoClient.connect(`mongodb://${this.host}:${this.port}/${this.dbName}`, { useUnifiedTopology: true });
      this.connected = true;
    } catch (error) {
      console.error('Error connecting to MongoDb:', error);
    }
  }

  isAlive() {
    return this.connected && this.client.isConnected();
  }
}

const dbClient = new DBClient();
export default dbClient;
