import * as mongoose from 'mongoose';

export class DatabaseConnection {
  public connect({ database }) {
    mongoose
      .connect(database)
      .then(() => {
        console.log('Database connection successful to ' + database);
      })
      .catch((err) => {
        console.error('Database connection error');
        console.error(err);
      });
  }
}
