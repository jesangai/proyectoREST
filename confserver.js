//llamar a modulos
var http     = require('http'),
	bodyParser   = require('body-parser');
const pg    = require('pg');
var express = require('express');
var util = require('util');

//conexion base de datos
pg.defaults.ssl = true;
const connectionString = process.env.DATABASE_URL || 'postgres://ec2-54-227-244-12.compute-1.amazonaws.com:5432/d4c5e306fap2ft';
var conString = "postgres://gbfafvrsqoyftb:5f7450bea5982bd945053e0ac45289678ddfe9b810924074e1a9c865ce20ed15@ec2-54-227-244-12.compute-1.amazonaws.com:5432/d4c5e306fap2ft";
//const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/proyecto';
//var conString = "postgres://postgres:postgres@localhost:5432/proyecto";


var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('port', (process.env.PORT || 8080))

//FUNCIONES GET
app.get('/flistarexcursiones', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM excursiones', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/flistarexcursionesporusuario', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("SELECT * FROM excursiones WHERE idusuario="+req.body.idusuario+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/flistarexcursionBusqueda', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("SELECT * FROM excursiones WHERE titulo LIKE '"+req.body.titulo+"%' AND idusuario="+req.body.idusuario+";"
                     ,function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});
app.post('/fcargaralumnoporid', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("SELECT * FROM alumnos WHERE id="+req.body.idalumno+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/fcargarusuarioporid', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("SELECT * FROM usuarios WHERE id="+req.body.iduser+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.get('/flistaralumnos', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM alumnos', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.get('/flistarusuarios', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM usuarios', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/frecibirexcursion', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("SELECT * FROM excursiones WHERE id="+req.body.idExcursion+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.put('/feditarPaso', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        client.query("UPDATE pasos SET video='"+req.body.pasovideo+"',pregunta='"+req.body.pregunta+"',respuesta="+req.body.respuesta+",opciona='"+req.body.opciona+"',opcionb='"+req.body.opcionb+"',opcionc='"+req.body.opcionc+"' WHERE id="+req.body.id+";", function(err, result) {
            if(err) {
                return console.error('error running query paso', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/fguardarPaso', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        client.query("INSERT INTO pasos (video,pregunta,respuesta,opciona,opcionb,opcionc,idexcursion) VALUES ('"+req.body.pasovideo+"','"+req.body.pregunta+"',"+req.body.respuesta+",'"+req.body.opciona+"','"+req.body.opcionb+"','"+req.body.opcionc+"',"+req.body.idexcursion+");", function(err, result) {
            if(err) {
                return console.error('error running query paso', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/fguardarAlumno', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        client.query("INSERT INTO alumnos (nombre,puntaje,avatar) VALUES ('"+req.body.nombre+"',"+req.body.puntaje+",'"+req.body.avatar+"');", function(err, result) {
            if(err) {
                return console.error('error running query paso', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});


app.post('/fguardarUsuario', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        client.query("INSERT INTO usuarios (nombre,usuario,pass) VALUES ('"+req.body.nombre+"','"+req.body.usuario+"','"+req.body.pass+"');", function(err, result) {
            if(err) {
                return console.error('error running query paso', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});


app.get('/ultimoidEx', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        client.query('SELECT id FROM excursiones ORDER BY id DESC ;', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            console.log("mi: "+result.rows[0].idcuento);
            client.end();
            return res.json(result.rows);
        });
    });
});

app.put('/fguardarpuntajealumno', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        console.error(req.body.id);
        client.query("UPDATE alumnos SET puntaje="+req.body.nvpuntaje+" WHERE id="+req.body.idalumno+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});
app.put('/fguardarEditarExcursion', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        console.error(req.body.id);
        client.query("UPDATE excursiones SET titulo='"+req.body.titulo+"',portada='"+req.body.portada+"',descripcion='"+req.body.descripcion+"',creditos='"+req.body.creditos+"' WHERE id="+req.body.id+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.put('/feditaralumnoporid', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        console.error(req.body.id);
        client.query("UPDATE alumnos SET nombre='"+req.body.nombre+"',puntaje='"+req.body.puntaje+"',avatar='"+req.body.avatar+"' WHERE id="+req.body.idalumno+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});


app.put('/feditarusuarioporid', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        console.error(req.body.id);
        client.query("UPDATE usuarios SET nombre='"+req.body.nombre+"',usuario='"+req.body.usuario+"',pass='"+req.body.pass+"' WHERE id="+req.body.idusuario+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/fguardarExcursion', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
        console.error(req.body.id);
        client.query("INSERT INTO excursiones (titulo,portada,descripcion,creditos,idusuario) VALUES ('"+req.body.titulo+"','"+req.body.portada+"','"+req.body.descripcion+"','"+req.body.creditos+"',"+req.body.idUsuario+");", function(err, result) {
            if(err) {
                return console.error('error running query ex', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/flistarpasos', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("SELECT * FROM pasos WHERE idexcursion="+req.body.idExcursion+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/feliminarexcursion', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("DELETE FROM excursiones WHERE id="+req.body.idExcursion+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});
app.delete('/feliminaralumno', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("DELETE FROM alumnos WHERE id="+req.body.idalumno+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});
app.delete('/feliminarusuario', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("DELETE FROM usuarios WHERE id="+req.body.idusuario+";", function(err, result) {
            if(err) {
                return console.error('error running query elus', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});
app.delete('/feliminarpasos', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("DELETE FROM pasos WHERE idexcursion="+req.body.idExcursion+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.delete('/feliminarpasoporid', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("DELETE FROM pasos WHERE id="+req.body.idPaso+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});


// escuchar
app.listen(process.env.PORT || 8080, function(){console.log("servidor iniciado");});