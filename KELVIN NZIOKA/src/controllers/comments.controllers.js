import { dbConfig } from "../config/config.js";
import sql from "mssql";

export const addComment = async (req, res) => {
    try {
      const connection = await sql.connect(dbConfig);
      const { comment_id, content } = req.body;
      const query1 = "SELECT * FROM Comments WHERE comment_id = @comment_id";
      const results = await connection
        .request()
        .input("comment_id", sql.Int, comment_id)
        .query(query1);
      if (results.recordset[0]) {
        return res.json({ message: "Comment already exists" });
      }
      const query2 = "INSERT INTO Comments (comment_id, content) VALUES (@comment_id, @content)";
      await connection
        .request()
        .input("comment_id", sql.Int, comment_id)
        .input("content", sql.Text, content)
        .query(query2);
  
      res.json({ message: "Comment added successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    } finally {
      await sql.close();
    }
  };
  //delete comment
  export const deleteComment = async (req, res) => {
    try {
      const connection = await sql.connect(dbConfig);
  
      const { comment_id } = req.params;
  
      const query = "DELETE FROM Comments WHERE comment_id = @comment_id";
      const result = await connection
        .request()
        .input("comment_id", sql.Int, comment_id)
        .query(query);
  
      if (result.rowsAffected[0] === 0) {
        return res.json({ message: "Comment not found" });
      }
  
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    } finally {
      await sql.close();
    }
  };
  //update comment
  export const updateComment = async (req, res) => {
    try {
      const connection = await sql.connect(dbConfig);
  
      const { comment_id } = req.params;
      const { content } = req.body;
  
      const query = "UPDATE Comments SET content = @content WHERE comment_id = @comment_id";
      const result = await connection
        .request()
        .input("content", sql.Text, content)
        .input("comment_id", sql.Int, comment_id)
        .query(query);
  
      if (result.rowsAffected[0] === 0) {
        return res.json({ message: "Comment not found" });
      }
  
      res.json({ message: "Comment updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    } finally {
      await sql.close();
    }
  };
  
  