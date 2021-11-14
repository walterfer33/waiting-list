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
const data = [{ID:1, FECHA:'2021-11-03', ORGANO:'CORAZON', GENERO:'MASCULINO', HORA:'22:53:21', ATENDIDO:'DR. LARA', RESPONSABLE:'JUAN MENDEZ', SALA:'CIRUGIA',IMAGEN:'child.png', UNIDAD:'21'},
{ID:2, FECHA:'2021-11-03', ORGANO:'CORAZON', GENERO:'MASCULINO', HORA:'22:53:21', ATENDIDO:'DR. LARA', RESPONSABLE:'JUAN MENDEZ', SALA:'CIRUGIA',IMAGEN:'child.png', UNIDAD:'17'},
{ID:3, FECHA:'2021-10-05', ORGANO:'CORAZON', GENERO:'FEMENINO', HORA:'22:53:21', ATENDIDO:'DR. LARA', RESPONSABLE:'JUAN MENDEZ', SALA:'CIRUGIA',IMAGEN:'woman.png', UNIDAD:'31'},
{ID:4, FECHA:'2021-04-03', ORGANO:'CORAZON', GENERO:'MASCULINO', HORA:'22:53:21', ATENDIDO:'DR. LARA', RESPONSABLE:'JUAN MENDEZ', SALA:'CIRUGIA',IMAGEN:'man.png', UNIDAD:'12'},];



app.set('port',8080);
app.set('views',);
app.engine('html', require('ejs').renderFile);
app.use('/',express.static(__dirname + '/bootstrap/css'));
app.use('/',express.static(__dirname + '/bootstrap/js'));
app.use('/',express.static(__dirname + '/bootstrap/fontawesome/css'));
app.use('/',express.static(__dirname + '/img'));

app.get('/',(req,res)=>{
	res.render( __dirname+ '/view/index.html', {data: data});
   console.log(data);
 });

app.listen(app.get('port'),()=> {
	console.log('Servidor en el puerto', app.get('port'));
});


module.exports = router;



