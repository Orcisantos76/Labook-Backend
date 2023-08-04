-- Active: 1691107977999@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
);
CREATE TABLE posts(
    id TEXT UNIQUE PRIMARY KEY,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (creator_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO users(id, name, email, password, role)
VALUES
    ('u001','Orci','orci@email','orci1234','ADM'),
    ('u002','Ana','ana@email','ana1234','NORMAL'),
    ('u003','Arthur','arthur@email','arthur1234','NORMAL');

INSERT INTO posts(id, created_at, content)
VALUES
    ()

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes_dislikes;
DROP TABLE users;
DROP TABLE posts;
DROP TABLE likes_dislikes;