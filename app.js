const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); // Importar body-parser para analizar los datos del formulari
const multer = require('multer');
const fs = require('fs');
const ejs = require('ejs');
const app = express();
const port = 3010;
// Utilizar body-parser para analizar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost', //IP: 192.168.1.225
  user: 'root', //User: narcis
  password: 'Pa$$word98..', //Pass: narcis1234
  database: 'M16_Project',//DB: M16_narcis
});

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.render('index');
});

// Ruta para la página de login
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/registre', (req, res) => {
    res.render('registre');
  });

  app.get('/main', (req, res) => {
    res.render('main');
  });
  app.get('/apunts', (req, res) => {
    res.render('apunts');
  });
  app.get('/m1', (req, res) => {
    res.render('m1');
  });
  app.get('/m2', (req, res) => {
    res.render('m2');
  });
  app.get('/m3', (req, res) => {
    res.render('m3');
  });
  app.get('/m4', (req, res) => {
    res.render('m4');
  });
  app.get('/m5', (req, res) => {
    res.render('m5');
  });
  app.get('/m6', (req, res) => {
    res.render('m6');
  });
  app.get('/m7', (req, res) => {
    res.render('m7');
  });
  app.get('/m8', (req, res) => {
    res.render('m8');
  });
  app.get('/m10', (req, res) => {
    res.render('m10');
  });

  app.get('/jocs', (req, res) => {
    res.render('jocs');
  });

  app.get('/flour', (req, res) => {
    res.render('flour');
  });

  app.get('/casospract', (req, res) => {
    res.render('casospract');
  });
//FUNCIONS BD 
// Registrament Usaris
 // Ruta para el registro de usuarios
app.post('/registrarUsuario', (req, res) => {
  console.log('Ruta /registrarUsuario ejecutada');
  const { nom_usuari, correu, contrasenya } = req.body;

  // Verificar si los campos están vacíos
  if (!nom_usuari || !correu || !contrasenya) {
      return res.status(400).json({ mensaje: 'Si us plau, completi tots els camps ' });
  }

  // Verificar si el nombre de usuario o el correo ya existen en la base de datos
  db.query(
      'INSERT INTO usuari (nom_usuari, correu, contrasenya) VALUES (?, ?, ?)',
      [nom_usuari, correu, contrasenya],
      (err, result) => {
          if (err) {
              console.error(err);
              if (err.code === 'ER_DUP_ENTRY') {
                  // Clave primaria duplicada (nombre de usuario o correo ya existen)
                  return res.status(400).json({ error: 'usuario_existente', mensaje: 'El nom de usuari o correo ja existe.' });
              } else {
                  return res.status(500).json({ mensaje: 'Error al registrar el usuario.' });
              }
          }
          res.json({ mensaje: 'Usuari registrat correctamente.' });
      }
  );
});



// Validacio de Usuari
app.post('/verificarUsuario', (req, res) => {
  console.log('Ruta /verificarUsuario ejecutada');
  const { nom_usuari, contrasenya } = req.body;

  // Realizar la consulta para verificar el usuario y contraseña
  db.query(
      'SELECT * FROM usuari WHERE nom_usuari = ? AND contrasenya = ?',
      [nom_usuari, contrasenya],
      (err, results) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ mensaje: 'Error al verificar el usuario.' });
          }

          // Verificar si hay resultados
          const existe = results.length > 0;
          res.json({ existe });
      }
  );
});

// Ruta para archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));
db.connect((err) => {
  if (err) {
      console.error('Error de conexión a la base de datos:', err);
  } else {
      console.log('Conexión exitosa a la base de datos');
  }
});
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});