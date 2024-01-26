const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

class UserController {
  static async registerUser(req, res) {
    const { userName, password, userEmail  } = req.body;

    try {
      const emailExist = await UserModel.getUserByEmail(userEmail);

      if (emailExist) {
        res.status(403).json({ error: 'Email already exist' });
        return;
      }

      const newUser = await UserModel.createUser(userName, password, userEmail);

      res.status(201).json({ message: 'User registered successfully', newUser });

    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async loginUser(req, res) {
    const { userName, password } = req.body;
    
    try {
      const user = await UserModel.getUserByUsername(userName);

      
      if (!user || user.password !== password) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;
