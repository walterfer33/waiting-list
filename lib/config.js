const mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "paciente"
});

	con.connect(function(err) {
  if (err) throw err;
      console.log('Conexion satisfactoria');
	});

module.exports = con;


