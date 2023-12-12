DROP DATABASE IF EXISTS ProjecteM16 ;
CREATE DATABASE ProjecteM16;
USE ProjecteM16;
DROP TABLE IF EXISTS usuari;

CREATE TABLE usuari( 
nom_usuari varchar(25)UNIQUE,
correu varchar(35) UNIQUE,
contrasenya varchar(30),
PRIMARY KEY(nom_usuari)
);
