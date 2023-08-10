-- Active: 1691634193672@@127.0.0.1@3306

CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now', 'localtime')) NOT NULL
    );

CREATE TABLE
    posts(
        id TEXT UNIQUE PRIMARY KEY,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT (0) NOT NULL,
        dislikes INTEGER DEFAULT (0) NOT NULL,
        created_at TEXT DEFAULT (datetime('now', 'localtime')) NOT NULL,
        updated_at TEXT DEFAULT (datetime('now', 'localtime')) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) 
            ON UPDATE CASCADE 
            ON DELETE CASCADE
    );

CREATE TABLE
    likes_dislikes(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) 
            ON UPDATE CASCADE  
            ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) 
            ON UPDATE CASCADE 
            ON DELETE CASCADE
    );

INSERT INTO
    users(id, name, email, password, role)
VALUES
    -- senha orci123 
    (   'u001',
        'Orci',
        'orci@email',
        '$2a$12$fvV/xB9/dMSzCfXDqD5tDuiEBKtkAWnPgYanbyPCRCL3qS7TZU/ae',
        'ADMIN'
    ),
    -- senha ana123 
    (   'u002',
        'Ana',
        'ana@email',
        '$2a$12$H1prbS7h0CihO6axtQQW4uyDrQFhuBYbLG4U8858LUy5kTY0GjGhS',
        'NORMAL'
    ),
    -- senha arthur123 
    (   'u003',
        'Arthur',
        'arthur@email',
        '$2a$12$PwfNHkKlMha6UcklLZXAYOHCnUr1k3oyGHGVTiNYlgzaioHd/ZkWu',
        'NORMAL'
    );

INSERT INTO posts(id, creator_id, content)
VALUES (
        "p001",
        "u001",
        "Projeto labook pegando"
    ),(
        "p002",
        "u001",
        "Vai sobrar tempo pra mim"
    ), (
        "p003",
        "u002",
        "Eu no ply4 ainda"
    );

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
    ('u002', 'p001', 1),
    ('u003', 'p001', 1),
    ('u001', 'p002', 1),
    ('u003', 'p002', 0);

UPDATE posts
SET likes = 2, dislikes = 0
WHERE id = 'p001';
UPDATE posts
SET likes = 1, dislikes = 1
WHERE id = 'p002';



SELECT *
FROM users;

SELECT * FROM posts;

SELECT * FROM likes_dislikes;


-- Queris de Deleção, Ordem correta caso queira dropar as tabelas
DROP TABLE likes_dislikes;
DROP TABLE posts;
DROP TABLE users;




SELECT
    posts.id,
    posts.creator_id,
    posts.content,
    posts.likes,
    posts.dislikes,
    posts.created_at,
    posts.updated_at,
    users.name As creator_name
FROM posts
    INNER JOIN users ON users.id = posts.creator_id;