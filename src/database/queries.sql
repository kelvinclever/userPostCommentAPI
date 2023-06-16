
create database restapichat
use restapichat;


CREATE TABLE Users (
  user_id INT IDENTITY(1,1) PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE Posts (
  post_id INT IDENTITY(1,1) PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Comments (
  comment_id INT IDENTITY(1,1) PRIMARY KEY,
  content TEXT,
  user_id INT,
  post_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);
