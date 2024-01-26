const db = require('../db');

class UserModel {
  static async getUserByEmail(userEmail) {
    try {
      const foundedEmail = await db.any('SELECT email FROM users WHERE email = $1', [userEmail]);

      if (foundedEmail.length > 0) {
        return foundedEmail[0].email;
      } else {
        return null;
      }
    
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user: ' + error.message);
    }
  }

  static async getUserByUsername(userName) {
    try {
      const foundedUser = await db.oneOrNone('SELECT * FROM users WHERE name = $1', [userName]);

      return foundedUser;
    } catch (error) {
      console.error('Error to retrieve user:', error);
      throw new Error('Error to retrieve user: ' + error.message);
    }
  }

  static async createUser(userName, password, email) {
    try {
      const newUser = await db.query(
        'INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *',
        [userName, password, email]
      );

      return newUser;
    
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user: ' + error.message);
    }
  }
}

module.exports = UserModel;