import * as mongoose from 'mongoose';

export class DatabaseConnection {
  public connect({ dbHost, dbPort, dbName }) {
    mongoose
      .connect(`mongodb://${dbHost + ':' + dbPort}/${dbName}`)
      .then(() => {
        console.log(
          'Database connection successful to ' + dbHost + ':' + dbPort
        );
      })
      .catch((err) => {
        console.error('Database connection error');
        console.error(err);
      });
  }
}
