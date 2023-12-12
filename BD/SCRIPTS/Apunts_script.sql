USE projectem16;

DROP TABLE IF EXISTS arxius;
DROP TABLE IF EXISTS modul;
DROP TABLE IF EXISTS cicle;

CREATE TABLE cicle(
nom varchar(25),
descripcio TEXT,
PRIMARY KEY(nom)
);

CREATE TABLE modul(
nom varchar(25),    
nom_cicle varchar(25),
descripcio TEXT,
FOREIGN KEY(nom_cicle) REFERENCES cicle(nom),
PRIMARY KEY(nom,nom_cicle)
);

CREATE TABLE arxius(
nom varchar(25),
nom_modul varchar(25),
descripcio TEXT,
arxiu LONGBLOB,
FOREIGN KEY(nom_modul) REFERENCES modul(nom),
PRIMARY KEY(nom,nom_modul)
);

