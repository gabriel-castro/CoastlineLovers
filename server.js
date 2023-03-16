const keys = require('./stripe/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var bAdultoN = 3000;
var bCriancaN = 1500;
var bAdultoE = 2000;
var bCriancaE = 1250;
var adminUser ="admin";
var adminPW ="55555";
var promo = ["promo123", "promo000"];
var BD;
var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

function sendInBlue(pNome,uNome,mail,data, hora, tour, adultos, criancas, bebes, preco){
    apiKey.apiKey = keys.sendinBlueAPIKey;
    var smtpApiInstance = new SibApiV3Sdk.SMTPApi();
    var contactsApiInstance = new SibApiV3Sdk.ContactsApi();
    var createContact = new SibApiV3Sdk.CreateContact(); 
    createContact = {
        email: mail,
        updateEnabled: true,
        attributes: {
          FIRSTNAME: pNome,
          LASTNAME: uNome,
          EMAIL: mail
        }
    }
    contactsApiInstance.createContact(createContact).then(function(data) {
        console.log('contact added');}, function(error) {
            console.error(error);});
    const emailData = {
        to: [{
            name: pNome,
            email: mail}],
        templateId: 1,
        params: {
          NOME: pNome + ' ' + uNome,
          DATA: data,
          HORA: hora,
          TOUR: tour,
          ADULTOS: adultos,
          CRIANCAS: criancas,
          BEBES: bebes,
          PRECO: preco
        }        
    };
    smtpApiInstance.sendTransacEmail(emailData).then(function() {
        console.log('email sent');}, function(error) {
            console.error(error);});
}

function handleDisconnect() {
    BD = mysql.createConnection({
        host : 'us-cdbr-iron-east-04.cleardb.net', //localhost
        user : 'bb3571693f7bee', //root
        password : 'a192f195', //root
        //port : '8889',
        database : 'heroku_3a464d27dbd82c7'
    });  
    BD.connect( function onConnect(err) {  
        if (err) {                                 
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 10000);    
        }
        console.log('Connected to database without errors');                                          
    });                                            
    BD.on('error', function onError(err) {
        console.log('db error', err);
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {   
            handleDisconnect();                         
        } else {                                        
            throw err;                                  
        }
    });
}
handleDisconnect();

app.get('/', function (req, res) {
    res.render(__dirname + '/public/views/index');
});

app.get('/views/booking', function (req, res) {
    res.render(__dirname + '/public/views/booking');
});


app.listen(process.env.PORT || 3000)

app.get('/Administrador', function(req, res){
    res.render(__dirname + '/public/views/admin');
});

app.post('/checkAdmin',(req, res) => {
    if(adminPW==req.body.pw && adminUser==req.body.user) res.send({ res: "ok" });
    else res.send({ res: "Wrong admin" });
});

app.post('/FreeReservation',(req, res) => {
    if (!promo.includes(req.body.code) && req.body.code!=adminPW){
        res.send({ code: "NO" });
        return;
    }
    var sqlStr, price, seats;
    var adults = req.body.adults;
    if (adults==0) return;
    var children = req.body.children;
    var mail = req.body.email;
    var text = req.body.obs;
    var time = req.body.time;
    var tour = req.body.tour;
    var babys = req.body.baby;
    var pNome = req.body.fName;
    var uNome = req.body.lName;
    var tel = req.body.tel;
    var date = req.body.date;
    seats = parseInt(adults, 10)+parseInt(children, 10);
    if (tour=="normal") {
        sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE (tour='normal' OR tour='private') AND hora= ? AND data= ? GROUP BY hora;";
        price = (parseInt(adults, 10)*bAdultoN)+(parseInt(children, 10)*bCriancaN);
    }
    else if (tour=="private") {
        sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour="+mysql.escape(tour)+" AND hora= ? AND data= ? GROUP BY hora;";
        seats=9;
        price = 30000;
        time="18h-20h;";
    }
    else if(tour=="express") {
        sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour="+mysql.escape(tour)+" AND hora= ? AND data= ? GROUP BY hora;";
        price = (parseInt(adults, 10)*bAdultoE)+(parseInt(children, 10)*bCriancaE);
        time="13h-14h;";
    }
    price = price/100;
    BD.query(sqlStr,[time,date], function(err,sqlRes) {
        if (err) console.log(err);
        if (sqlRes[0]==null || (sqlRes[0]['SUM(lugares)']+parseInt(seats, 10)<=9 && sqlRes[0]['SUM(bebes)']+parseInt(babys, 10)<=3)){
            var booking = "INSERT INTO bookings (`primeiroNome`,  `ultimoNome`, `email`, `telefone`, `tour`, `lugares`, `bebes`, `observacoes`, `data`, `hora`, `preco`, `promotor`, `stripeID`, `codigoPromo` ) ";
            booking += "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'FREE', ?)";
            BD.query(booking, [pNome,uNome,mail,tel,tour,seats,babys,text,date,time,price,req.body.code,req.body.promo], function(err,sqlRes) {
                if (err) console.log(err);
                else sendInBlue(pNome, uNome, mail, date, time, tour, adults, children, babys, price);
            });
            if(adminPW==req.body.code) res.send({ code: "ADMIN" });
            else if(promo.includes(req.body.code)) res.send({ code: "PROMO" });
        }else{
            res.send({ code: "FULL" });
        }
    });
});

app.post('/PaidReservation',(req, res) => {
    var sqlStr, price, seats;
    var adults = req.body.adults;
    if (adults==0) return;
    var children = req.body.children;
    var mail = req.body.email;
    var text = req.body.obs;
    var time = req.body.time;
    var tour = req.body.tour;
    var babys = req.body.baby;
    var pNome = req.body.fName;
    var uNome = req.body.lName;
    var tel = req.body.tel;
    var date = req.body.date;
    seats = parseInt(adults, 10)+parseInt(children, 10);
    if (tour=="normal") {
        sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE (tour='normal' OR tour='private') AND hora= ? AND data= ? GROUP BY hora;";
        price = (parseInt(adults, 10)*bAdultoN)+(parseInt(children, 10)*bCriancaN);
    }
    else if (tour=="private") {
        sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour="+mysql.escape(tour)+" AND hora= ? AND data= ? GROUP BY hora;";
        seats=9;
        price = 30000;
        time="18h-20h;";
    }
    else if(tour=="express") {
        sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour="+mysql.escape(tour)+" AND hora= ? AND data= ? GROUP BY hora;";
        price = (parseInt(adults, 10)*bAdultoE)+(parseInt(children, 10)*bCriancaE);
        time="13h-14h;";
    }
    BD.query(sqlStr,[time,date], function(err,sqlRes) {
        if (err) console.log(err);
        if (sqlRes[0]==null || (sqlRes[0]['SUM(lugares)']+parseInt(seats, 10)<=9 && sqlRes[0]['SUM(bebes)']+parseInt(babys, 10)<=3)){   
            stripe.charges.create({
                amount: price,
                source: req.body.stripeTokenId,
                currency: 'eur',
                receipt_email: mail
            }).then(charge =>  {
                price = price/100;
                var booking = "INSERT INTO bookings (`primeiroNome`,  `ultimoNome`, `email`, `telefone`, `tour`, `lugares`, `bebes`, `observacoes`, `data`, `hora`, `preco`, `stripeID`, `codigoPromo` ) ";
                booking += "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                BD.query(booking, [pNome,uNome,mail,tel,tour,seats,babys,text,date,time,price,charge.id,req.body.promo], function(err,sqlRes) {
                    if (err) console.log(err);
                    else sendInBlue(pNome, uNome, mail, date, time, tour, adults, children, babys, price);
                });
            }).catch(error => {
                console.log(error);
                res.status(500).end();
            });
            res.send({ insert: "OK" });
        }else{
            res.send({ insert: "ERROR" });
        }
    });

});

app.post('/paintCallendar',(req, res) => {
    var sqlStr = "";
    if (req.body.tour=='express')  sqlStr = "SELECT data, lugares FROM `bookings` WHERE data>current_date AND tour='express'";
    else if(req.body.tour=='private') sqlStr = "SELECT tour, data FROM `bookings` WHERE data>current_date AND tour='private' OR (tour='normal' AND hora='18h-20h;')";
    else sqlStr = "SELECT SUM(lugares), data FROM `bookings` WHERE data>current_date AND (tour='normal' OR tour='private') GROUP BY data;";
    BD.query(sqlStr, function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/getDateBooking',(req, res) => {
    var sqlStr = "";
    if (req.body.type=='express')  sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour='express' AND data= ? GROUP BY hora;";
    else if(req.body.type=='private') sqlStr = "SELECT tour, SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE (tour='private' OR (tour='normal' AND hora='18h-20h;')) AND data= ? GROUP BY hora";
    else sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE (tour='normal' OR tour='private') AND data= ? GROUP BY hora;";
    BD.query(sqlStr, [req.body.date], function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/filterReservations',(req, res) => {
    if(req.body.code!=adminPW) return;
    var sqlExtra="";
    var order =req.body.order;
    if(order=="" || order==undefined) order="data desc, hora";
    if(req.body.fname!="") sqlExtra+= " AND primeiroNome LIKE '%"+req.body.fname+"%'";
    if(req.body.tour!="") sqlExtra+= " AND tour="+mysql.escape(req.body.tour);
    if(req.body.date!="") sqlExtra+= " AND data="+mysql.escape(req.body.date);
    if(req.body.lname!="") sqlExtra+= " AND ultimoNome LIKE '%"+req.body.lname+"%'";;
    if(req.body.email!="") sqlExtra+= " AND email LIKE '%"+req.body.email+"%'";;
    if(req.body.telefone!="") sqlExtra+= " AND telefone LIKE '%"+req.body.telefone+"%'";;
    if(req.body.id!="") sqlExtra+= " AND (ID="+mysql.escape(+req.body.id)+" OR oldID="+mysql.escape(+req.body.id)+")";
    BD.query("SELECT * FROM bookings WHERE data>'2000-01-01'"+sqlExtra+" ORDER BY "+order, function(err,sqlRes) {
        if (err) console.log(err);
        res.send({ bookings: sqlRes });
    });
});

app.post('/deleteReservation',(req, res) => {
    if(req.body.code!=adminPW) return;
    var sqlCommand = "UPDATE bookings SET info_apagada=data, data='1999-01-01' WHERE data>'2000-01-01' AND ID= ? OR oldID= ?";
    BD.query(sqlCommand, [req.body.id,req.body.id],function(err,sqlRes) {
        if (err) console.log(err)
        res.send({ client: sqlRes });
    });
});

app.post('/simpleModReservation',(req, res) => {
    if(req.body.code!=adminPW) return;
    var sqlExtra="";
    if(req.body.fName!="") sqlExtra+= " primeiroNome="+mysql.escape(req.body.fName)+",";
    if(req.body.lName!="") sqlExtra+= " ultimoNome="+mysql.escape(req.body.lName)+",";
    if(req.body.email!="") sqlExtra+= " email="+mysql.escape(req.body.email)+",";
    if(req.body.tel!="") sqlExtra+= " telefone="+mysql.escape(req.body.tel)+",";
    if(req.body.obs!="") sqlExtra+= " observacoes="+mysql.escape(req.body.obs)+",";
    if(req.body.preco!="") sqlExtra+= " preco="+mysql.escape(req.body.preco)+",";
    if(req.body.receber!="") sqlExtra+= " aReceber="+mysql.escape(req.body.receber)+",";
    if(req.body.pagar!="") sqlExtra+= " aPagar="+mysql.escape(req.body.pagar)+",";
    sqlExtra = sqlExtra.slice(0, -1);
    BD.query("UPDATE bookings SET "+sqlExtra+" WHERE (ID= ? OR oldID= ?) AND  data>'2000-01-01';",[req.body.id,req.body.id], function(err,sqlRes) {
        if (err) console.log(err);
        if(sqlRes.changedRows==0) res.send({ mod: "NULL" });
        else res.send({ mod: "OK" });
    });
});

app.post('/deleteANDinsertReservation',(req, res) => {
    if(req.body.code!=adminPW) return;
    var price,lugares;
    BD.query("SELECT * FROM bookings WHERE (ID= ? OR oldID= ?) AND  data>'2000-01-01';",[req.body.id,req.body.id], function(err,sqlRes) {
        if (err) console.log(err);
        if(sqlRes[0]==null){
            res.send({ mod: "NULL" });
            return;
        }
        if(req.body.date==""){
            date = JSON.stringify(sqlRes[0].data);
            date =date.replace("T00:00:00.000Z", "");
            date =date.replace('"', '');
            date =date.replace('"', '');
        }else{date = req.body.date;}
        var pNome= req.body.fName;
        var uNome= req.body.lName;
        var mail= req.body.email; 
        var tel= req.body.tel;
        var text= req.body.obs;
        var receber= req.body.receber; 
        var pagar=req.body.pagar;
        var adults=req.body.adults;
        var children=req.body.children;
        var babys= req.body.baby;        
        var time = req.body.time;
        var tour = req.body.tour;
        var date = req.body.date;
        if(adults=="") adults=0;
        if(children=="") children=0;
        if(req.body.fName=="") pNome = sqlRes[0].primeiroNome;
        if(req.body.lName=="") uNome = sqlRes[0].ultimoNome;
        if(req.body.email=="") mail = sqlRes[0].email;
        if(req.body.tel=="") tel = sqlRes[0].telefone;
        if(req.body.obs=="") text = sqlRes[0].observacoes;
        if(req.body.receber=="") receber = sqlRes[0].aReceber;
        if(req.body.pagar=="") pagar = sqlRes[0].aPagar;
        if(req.body.baby=="") babys = sqlRes[0].bebes;
        if(req.body.time=="same;") time = sqlRes[0].hora;
        if(req.body.tour=="same") tour = sqlRes[0].tour;
        if(req.body.date==""){
            date = JSON.stringify(sqlRes[0].data);
            date =date.replace("T00:00:00.000Z", "");
            date =date.replace('"', '');
            date =date.replace('"', '');
        } 
        if(adults==0 && children ==0) {
            lugares = sqlRes[0].lugares;
            price = sqlRes[0].preco;
        }else {
            lugares =  parseInt(adults)+parseInt(children);
            if (tour=="normal") {
                price = (((parseInt(adults)*bAdultoN)+(parseInt(children)*bCriancaN))/100);
            }
            else if (tour=="private") {
                lugares=9;
                price = 300;
            }
            else if(tour=="express") {
                price = (((parseInt(adults)*bAdultoE)+(parseInt(children)*bCriancaE))/100);
            }
        }
        var sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour!='express' AND hora= ? AND data= ? AND ID!= ? AND oldID!= ? GROUP BY hora;";
        if(tour=='express')  sqlStr = "SELECT SUM(lugares), SUM(bebes), data, GROUP_CONCAT(hora SEPARATOR '; ') FROM `bookings` WHERE tour='express' AND hora= ? AND data= ? AND ID!= ? AND oldID!= ? GROUP BY hora;";
        BD.query(sqlStr,[time,date,req.body.id,req.body.id], function(err,sqlRes2) {
            if (err) console.log(err);
            if (sqlRes2[0]==null || (sqlRes2[0]['SUM(lugares)']+parseInt(lugares)<=9 && sqlRes2[0]['SUM(bebes)']+parseInt(babys)<=3)){
                BD.query("UPDATE bookings SET info_apagada=data, data='1999-01-01' WHERE (ID= ? OR oldID= ?)", [req.body.id,req.body.id],function(err,sqlRes) {
                    if (err) console.log(err);
                });
                var booking = "INSERT INTO bookings (`primeiroNome`,  `ultimoNome`, `email`, `telefone`, `tour`, `lugares`, `bebes`, `observacoes`, `data`, `hora`, `preco`, `aReceber`, `aPagar`, `oldID` ) ";
                booking += "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";        
                BD.query(booking, [pNome,uNome,mail,tel,tour,lugares,babys,text,date,time,price,receber,pagar,req.body.id],function(err,sqlRes3) {
                    if (err) console.log(err);
                    res.send({ mod: "OK" ,id:sqlRes3.insertId});
                });
            }else{
                res.send({ mod: "ERROR" });
            }
        });
    });
});