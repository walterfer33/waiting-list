/* Desarrollado por Walter Rodríguez T31751087 */
	//npm install fs-extra
	//npm install ejs
	//npm insall msql
	//npm install mysql
	//nom install express
	//npm install html

const http = require('http');
const html = require('html');
const express = require('express');
const fs = require('fs');
const { prommisify } = require('util');
const app = express();
const router = express.Router();
const db=require('./lib/config.js');



app.set('port',8080);
app.set('views',);
app.engine('html', require('ejs').renderFile);
app.use('/',express.static(__dirname + '/bootstrap/css'));
app.use('/',express.static(__dirname + '/bootstrap/js'));
app.use('/',express.static(__dirname + '/bootstrap/fontawesome/css'));
app.use('/',express.static(__dirname + '/img'));

app.get('/',(req,res)=>{
	var sql= 'SELECT *,TIMESTAMPDIFF(DAY, FECHA, CURDATE()) As TIEMPO FROM tabla_pacientes ORDER BY FECHA ASC';
	db.query(sql, function(err,data,fields){
		if (err) throw err;
	res.render( __dirname+ '/view/index.html', {data: data});
   console.log(data);
	});
});

app.listen(app.get('port'),()=> {
	console.log('Servidor en el puerto', app.get('port'));
});


module.exports = router;



