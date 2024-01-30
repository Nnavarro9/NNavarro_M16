use projectem16;

DROP TABLE IF EXISTS botons;

CREATE TABLE botons(
nomBoto varchar(15),
encertat boolean,
imatge LONGBLOB,
PRIMARY KEY(nomBoto)
);
