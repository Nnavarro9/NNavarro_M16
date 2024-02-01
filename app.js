const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); // Importar body-parser para analizar los datos del formulari
const multer = require('multer');
const fs = require('fs');
const ejs = require('ejs');
const app = express();
const port = 33010;
// Utilizar body-parser para analizar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const db = mysql.createConnection({
  host: 'nodejsMysql_db', //IP: 192.168.1.225 I DINTRE CLASTER: nodejsMysql_db
  user: 'narcis', //User: narcis
  password: 'narcis1234', //Pass: narcis1234
  database: 'M16_narcis',//DB: M16_narcis
});

// Configuración de multer para gestionar la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // límite de tamaño en bytes (50 MB)
  },
});

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.render('index');
});
app.post('/upload', upload.single('documento'), (req, res) => {
  const { nom_modul, nom_doc, descripcio } = req.body;
  const documentoPath = req.file.path;

  fs.readFile(documentoPath, (err, data) => {
    if (err) {
      // Manejar el error
      console.error('Error al leer el archivo:', err);
      return res.status(500).json({ mensaje: 'Error al leer el archivo.' });
    }

    // Insertar en la base de datos después de leer el archivo
    db.query(
      'INSERT INTO arxius (nom_modul, nom, descripcio, arxiu) VALUES (?, ?, ?, ?)',
      [nom_modul, nom_doc, descripcio, data],
      (err, result) => {
        if (err) {
          // Manejar el error
          console.error('Error al insertar en la base de datos:', err);
          return res.status(500).json({ mensaje: 'Error al insertar en la base de datos.' });
        }

        // Determinar la ruta de redirección según el módulo
        let redirectPath = `/veure${nom_modul}`;
        res.redirect(`${redirectPath}?mensaje=Documento%20subido%20correctamente`);
      }
    );

    // Eliminar el archivo después de la inserción en la base de datos
    fs.unlinkSync(documentoPath);
  });
});
   // Ruta para mostrar todas las imágenes
 app.get('/veureM1', (req, res) => {
  // Obtener todas las imágenes de la base de datos
  db.query('SELECT * FROM arxius', (err, results) => {
    if (err) throw err;

   // Renderizar la página verImagenes.html y pasar los resultados de la consulta
   res.render('veureM1', { arxius: results });
  });
});

app.get('/veureM2', (req, res) => {
  // Obtener todas las imágenes de la base de datos
  db.query('SELECT * FROM arxius', (err, results) => {
    if (err) throw err;

   // Renderizar la página verImagenes.html y pasar los resultados de la consulta
   res.render('veureM2', { arxius: results });
  });
});
app.get('/veureM3', (req, res) => {
  // Obtener todas las imágenes de la base de datos
  db.query('SELECT * FROM arxius', (err, results) => {
    if (err) throw err;

   // Renderizar la página verImagenes.html y pasar los resultados de la consulta
   res.render('veureM3', { arxius: results });
  });
});
app.get('/veureM4', (req, res) => {
  // Obtener todas las imágenes de la base de datos
  db.query('SELECT * FROM arxius', (err, results) => {
    if (err) throw err;

   // Renderizar la página verImagenes.html y pasar los resultados de la consulta
   res.render('veureM4', { arxius: results });
  });
});
app.get('/veureM5', (req, res) => {
  // Obtener todas las imágenes de la base de datos
  db.query('SELECT * FROM arxius', (err, results) => {
    if (err) throw err;

   // Renderizar la página verImagenes.html y pasar los resultados de la consulta
   res.render('veureM5', { arxius: results });
  });
});
app.get('/veureM6', (req, res) => {
  // Obtener todas las imágenes de la base de datos
  db.query('SELECT * FROM arxius', (err, results) => {
    if (err) throw err;

   // Renderizar la página verImagenes.html y pasar los resultados de la consulta
   res.render('veureM6', { arxius: results });
  });
});
app.get('/veureM7', (req, res) => {
  // Obtener todas las imágenes de la base de datos
  db.query('SELECT * FROM arxius', (err, results) => {
    if (err) throw err;

   // Renderizar la página verImagenes.html y pasar los resultados de la consulta
   res.render('veureM7', { arxius: results });
  });
});
app.get('/veureM8', (req, res) => {
  // Obtener todas las imágenes de la base de datos
  db.query('SELECT * FROM arxius', (err, results) => {
    if (err) throw err;

   // Renderizar la página verImagenes.html y pasar los resultados de la consulta
   res.render('veureM8', { arxius: results });
  });
});
app.get('/veureM10', (req, res) => {
  // Obtener todas las imágenes de la base de datos
  db.query('SELECT * FROM arxius', (err, results) => {
    if (err) throw err;

   // Renderizar la página verImagenes.html y pasar los resultados de la consulta
   res.render('veureM10', { arxius: results });
  });
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
 //ACTIVITATS FLUOR
  app.get('/fluor', (req, res) => {
    res.render('fluor');
  });

  app.get('/act_fl1', (req, res) => {
    res.render('act_fl1');
  });

  app.get('/act_fl2', (req, res) => {
    res.render('act_fl2');
  });

  app.get('/act_fl3', (req, res) => {
    res.render('act_fl3');
  });
  app.get('/act_fl3_resp', (req, res) => {
    // Realizar la consulta de la base de datos para obtener los datos de los botones
  db.query('SELECT * FROM botons WHERE nomBoto IN (?, ?, ?)', ["Boto1", "Boto2", "Boto3"], (err, queryResult) => {
    if (err) throw err;

    // Obtener los datos de la pregunta
    const question = queryResult[0];

    // Organizar las opciones (resultados) de manera aleatoria
    const resultats = shuffle([
      { id: 'correctOption', esCorrecta: queryResult[0].encertat, imagen: queryResult[0].imatge },
      { id: 'wrongOption1', esCorrecta: !queryResult[0].encertat, imagen: queryResult[1].imatge },
      { id: 'wrongOption2', esCorrecta: !queryResult[0].encertat, imagen: queryResult[2].imatge }
    ]);

    // Asociar datos a los botones
    const botones = [
      { id: 'boton1', alt: 'RESP1', data: resultats[0] },
      { id: 'boton2', alt: 'RESP2', data: resultats[1] },
      { id: 'boton3', alt: 'RESP3', data: resultats[2] },
    ];

    // Generar estilos aleatorios para los botones (ajusta según tus necesidades)
    const estilosAleatorios = botones.map(boton => ({
      top: Math.floor(Math.random() * 500) + 'px',
      left: Math.floor(Math.random() * 1200) + 'px',
    }));

    // Renderizar la página y pasar los datos de los botones y estilos aleatorios
    res.render('act_fl3_resp', { question, botones, estilosAleatorios });
  });
});

app.get('/act_fl4', (req, res) => {
  res.render('act_fl4');
});

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // Mientras queden elementos a mezclar
  while (currentIndex !== 0) {

    // Seleccionar un elemento sin mezclar
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // E intercambiarlo con el elemento actual
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

app.get('/act_fl4_resp', (req, res) => {
  // Realizar la consulta de la base de datos para obtener los datos de los botones
  db.query('SELECT * FROM botons WHERE nomBoto IN (?, ?, ?)', ["Boto4", "Boto5", "Boto6"], (err, queryResult) => {
    if (err) throw err;

    // Obtener los datos de la pregunta
    const question = queryResult[0];

    // Organizar las opciones (resultados) de manera aleatoria
    const resultats = shuffle([
      { id: 'correctOption', esCorrecta: queryResult[0].encertat, imagen: queryResult[0].imatge },
      { id: 'wrongOption1', esCorrecta: !queryResult[0].encertat, imagen: queryResult[1].imatge },
      { id: 'wrongOption2', esCorrecta: !queryResult[0].encertat, imagen: queryResult[2].imatge }
    ]);

    // Asociar datos a los botones
    const botones = [
      { id: 'boton1', alt: 'RESP1', data: resultats[0] },
      { id: 'boton2', alt: 'RESP2', data: resultats[1] },
      { id: 'boton3', alt: 'RESP3', data: resultats[2] },
    ];

    // Generar estilos aleatorios para los botones (ajusta según tus necesidades)
    const estilosAleatorios = botones.map(boton => ({
      top: Math.floor(Math.random() * 500) + 'px',
      left: Math.floor(Math.random() * 1200) + 'px',
    }));

    // Renderizar la página y pasar los datos de los botones y estilos aleatorios
    res.render('act_fl4_resp', { question, botones, estilosAleatorios });
  });
});
app.get('/act_fl5', (req, res) => {
  res.render('act_fl5');
});

app.get('/act_fl6', (req, res) => {
  res.render('act_fl6');
});

app.get('/act_fl7', (req, res) => {
  res.render('act_fl7');
});

app.get('/act_fl8', (req, res) => {
  res.render('act_fl8');
});
//VIDEO BOCA INTERACTIVA 
app.get('/bocaInteract', (req, res) => {
  res.render('bocaInteract');
});

//CASOS PRACTICS 
app.get('/prediontogramas_1', (req, res) => {
  res.render('prediontogramas_1');
});
app.get('/prediontogramas_2', (req, res) => {
  res.render('prediontogramas_2');
});
app.get('/prediontogramas_3', (req, res) => {
  res.render('prediontogramas_3');
});
app.get('/prediontogramas_4', (req, res) => {
  res.render('prediontogramas_4');
});

app.get('/prediontogramas_5', (req, res) => {
  res.render('prediontogramas_5');
});
app.get('/prediontogramas_6', (req, res) => {
  res.render('prediontogramas_6');
});

app.get('/odontograma_1', (req, res) => {
  res.render('odontograma_1');
});
app.get('/odontograma_2', (req, res) => {
  res.render('odontograma_2');
});
app.get('/odontograma_3', (req, res) => {
  res.render('odontograma_3');
});
app.get('/odontograma_4', (req, res) => {
  res.render('odontograma_4');
});
app.get('/odontograma_5', (req, res) => {
  res.render('odontograma_5');
});
app.get('/odontograma_6', (req, res) => {
  res.render('odontograma_6');
});
app.get('/odontograma_7', (req, res) => {
  res.render('odontograma_7');
});
app.get('/odontograma_8', (req, res) => {
  res.render('odontograma_8');
});



  app.get('/pagConstruccio', (req, res) => {
    res.render('pagConstruccio');
  });

  app.get('/pagConstruccioCP', (req, res) => {
    res.render('pagConstruccioCP');
  });

  app.get('/casospract', (req, res) => {
    res.render('casospract');
  });

  app.get('/pujar', (req, res) => {
    res.render('pujar');
  });
//FUNCIONS BD 
// Registrament Usaris
// Validacion de Usuario
app.post('/verificarUsuario', (req, res) => {
  console.log('Ruta /verificarUsuario ejecutada');
  const { nom_usuari, contrasenya } = req.body;

  // Realizar la consulta para verificar el usuario y contraseña
  db.query(
      'SELECT * FROM usuari WHERE nom_usuari = ?',
      [nom_usuari],
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

// Registro de Usuario
app.post('/registrarUsuario', (req, res) => {
  console.log('Ruta /registrarUsuario ejecutada');
  const { nom_usuari, correu, contrasenya } = req.body;

  // Verificar si los campos están vacíos
  if (!nom_usuari || !correu || !contrasenya) {
      return res.status(400).json({ mensaje: 'Si us plau, completi tots els camps ' });
  }

  // Verificar si el usuario ya está registrado
  db.query(
      'SELECT * FROM usuari WHERE nom_usuari = ?',
      [nom_usuari],
      (err, results) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ mensaje: 'Error al verificar el usuario.' });
          }

          // Verificar si el usuario ya existe
          const usuarioExistente = results.length > 0;

          if (usuarioExistente) {
              return res.status(400).json({ error: 'usuario_existente', mensaje: 'El nom de usuari ja existe.' });
          }

          // Si el usuario no existe, proceder con el registro
          db.query(
              'INSERT INTO usuari (nom_usuari, correu, contrasenya) VALUES (?, ?, ?)',
              [nom_usuari, correu, contrasenya],
              (err, result) => {
                  if (err) {
                      console.error(err);
                      return res.status(500).json({ mensaje: 'Error al registrar el usuario.' });
                  }
                  res.json({ mensaje: 'Usuari registrat correctamente.' });
              }
          );
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