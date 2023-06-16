import { dbConfig } from "../config/config.js";
import sql from "mssql";
//ADD POST
export const addPost = async (req, res) => {
  try {
    const connection = await sql.connect(dbConfig);
    const { title, content, user_id } = req.body;
    const query1 = "SELECT * FROM Posts WHERE post_id = @post_id";
    const results = await connection
      .request()
      .input("post_id", sql.Int, user_id)
      .query(query1);
    if (results.recordset[0]) {
      return res.json({ message: "Post already exists" });
    }
    const query2 =
      "INSERT INTO Posts (title, content, user_id) VALUES (@title, @content, @user_id)";
    await connection
      .request()
      .input("title", sql.VarChar, title)
      .input("content", sql.Text, content)
      .input("user_id", sql.Int, user_id)
      .query(query2);
    res.json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update post
export const updatePost = async (req, res) => {
  try {
    const connection = await sql.connect(dbConfig);

    const { post_id } = req.params;
    const { title, content } = req.body;

    const query = "UPDATE Posts SET title = @title, content = @content WHERE post_id = @post_id";
    const result = await connection
      .request()
      .input("title", sql.VarChar, title)
      .input("content", sql.Text, content)
      .input("post_id", sql.Int, post_id)
      .query(query);

    if (result.rowsAffected[0] === 0) {
      return res.json({ message: "Post not found" });
    }

    res.json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await sql.close();
  }
};
//delete post
export const deletePost = async (req, res) => {
  try {
    const connection = await sql.connect(dbConfig);

    const { post_id } = req.params;

    const query = "DELETE FROM Posts WHERE post_id = @post_id";
    const result = await connection
      .request()
      .input("post_id", sql.Int, post_id)
      .query(query);

    if (result.rowsAffected[0] === 0) {
      return res.json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await sql.close();
  }
};

