import { dbConfig } from "../config/config.js";
import sql from "mssql";

export const retrieveusers = async (req, res) => {
    try {
      const connection = await sql.connect(dbConfig);
      const query = "SELECT user_id, username, email, post_id, title, comment_id, content FROM Users u LEFT JOIN Posts p ON u.user_id = p.user_id LEFT JOIN Comments c ON p.post_id = c.post_id ORDER BY u.user_id, p.post_id, c.comment_id;";
      const result = await connection.request().query(query);
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ message: error.message });
    } finally {
      connection.close();
    }
  };
  // retrieve user with their post comment
  export const retrieveUserWithCommentsAndPosts = async (req, res) => {
    try {
      const connection = await sql.connect(dbConfig);
      const { user_id } = req.params;
  
      // Retrieve the user information
      const userQuery = "SELECT * FROM Users WHERE user_id = @user_id";
      const userResult = await connection
        .request()
        .input("user_id", sql.Int, user_id)
        .query(userQuery);
  
      // Retrieve the user's posts
      const postsQuery = "SELECT * FROM Posts WHERE user_id = @user_id";
      const postsResult = await connection
        .request()
        .input("user_id", sql.Int, user_id)
        .query(postsQuery);
  
      // Retrieve the user's comments
      const commentsQuery =
        "SELECT * FROM Comments WHERE user_id = @user_id";
      const commentsResult = await connection
        .request()
        .input("user_id", sql.Int, user_id)
        .query(commentsQuery);
  
      const user = userResult.recordset[0];
      const posts = postsResult.recordset;
      const comments = commentsResult.recordset;
  
      const userData = {
        user,
        posts,
        comments,
      };
  
      res.json(userData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    } finally {
      await sql.close();
    }
  };
  
  
  //retrieve single user from the database
  export const retrieveuser = async (req, res) => {
    try {
      const { id } = req.params;
      const query = "SELECT * FROM users WHERE user_id = @user_id";
      const connection = await sql.connect(dbConfig);
      const user = await connection
        .request()
        .input("id", sql.Int, id)
        .query(query);
      res.json(user.recordset);
    } catch (error) {
      res.json(error);
    } finally {
      sql.close();
    }
  };
  //add user to the database -- signup user 
  //if exist redirect to login
  export const adduser= async (req, res) => {
    try {
      const connection = await sql.connect(dbConfig);
      const { username, password, email } = req.body;
      const query1 = "SELECT * FROM Users WHERE username = @username";
      const results = await connection
        .request()
        .input("username", sql.VarChar, username)
        .query(query1);
      if (results.recordset[0]) {
        return res.json({ message: "User already exists,login with your account" });
      }
      const hashedpassword = bcrypt.hashSync(password,10)
      const query2 =
        "INSERT INTO users (username, password, email) VALUES (@username, @password, @email)";
      await connection
        .request()
        .input("username", sql.VarChar, username)
        .input("password", sql.VarChar, hashedpassword)
        .input("email", sql.VarChar, email)
        .query(query2);
      res.json({message: "Account created!"});
    } catch (error) {
      res.json(error.message);
    }
  };
  //update user
  export const updateUser = async (req, res) => {
    try {
      const connection = await sql.connect(dbConfig);
  
      const { user_id } = req.params;
      const { username, email, password } = req.body;
  
      const query = "UPDATE Users SET username = @username, email = @email, password = @password WHERE user_id = @user_id";
      const result = await connection
        .request()
        .input("username", sql.VarChar, username)
        .input("email", sql.VarChar, email)
        .input("password", sql.VarChar, password)
        .input("user_id", sql.Int, user_id)
        .query(query);
  
      if (result.rowsAffected[0] === 0) {
        return res.json({ message: "User not found" });
      }
  
      res.json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    } finally {
      await sql.close();
    }
  };
  
  
  
  //delete user
  
  export const deleteuser = async (req, res) => {
    try {
      const { id } = req.params;
      const query = "DELETE FROM Users WHERE user_id = @user_id";
      const connection = await sql.connect(dbConfig);
      await connection.request().input("id", sql.Int, id).query(query);
      res.json({ message: "user deleted succucessfully" });
    } catch (error) {
      res.json(error.message);
    } finally {
      sql.close();
    }
  };
  