const MaxCapacity = 9;
var currDay, currMonth, currYear, selectedDay, selectedMonth, selectedYear, date;
var newOrder, oldOrder;
var lugaresMax = [10,10,10,10,10];
var bebeLugaresMax = [3,3,3,3,3];
var adultCount = 0;
var criancaCount = 0;
var bebeCount = 0;
var bAdultoN = 3000;
var bCriancaN = 1500;
var bAdultoE = 2000;
var bCriancaE = 1250;
var maxSeats = 9;
var bebeMaxSeats = 3;
var tour="normal";
var conditions = ["09h-11h", "11h-13h", "14h-16h", "16h-18h", "18h-20h"];
var strangeChars = [",","&","'","!",'"',"#","+","*","(","?",";",":",")"];
var stripePublicKey = "pk_test_mO123Ap9UupBtLlNhyDl37Db00nxyjzZ89";
var code ="";
var arrow="&uarr;";

window.onload = function() {
	checkAndChangeTour();
	translateBooking();
	date = new Date();
	let day = date.getDate();
	let month = date.getMonth();
	let year = date.getFullYear();
	currDay = day;
	currMonth = month;
	currYear = year;
	selectedDay = day;
	selectedMonth = month+1;
	selectedYear = year;
	getSeatsFromDate();
	document.getElementById('date_Field').value = selectedDay + "/"+ selectedMonth +"/"+selectedYear;
};

function checkAndChangeTour(){
	if(window.location.href.includes("#normal")){
		document.getElementById('rb-normal').checked=true;
		document.getElementById('txt-normal').style.display = "block";
		document.getElementById('txt-private').style.display = "none";
		document.getElementById('txt-express').style.display = "none";
	}else if(window.location.href.includes("#private")){
		document.getElementById('rb-private').checked=true;
		document.getElementById('txt-normal').style.display = "none";
		document.getElementById('txt-private').style.display = "block";
		document.getElementById('txt-express').style.display = "none";
	}else if(window.location.href.includes("#express")){
		document.getElementById('rb-express').checked=true;
		document.getElementById('txt-normal').style.display = "none";
		document.getElementById('txt-private').style.display = "none";
		document.getElementById('txt-express').style.display = "block";
	}
}

function convertDateFromat(str){
	var index = str.indexOf("/");
	var month = str.substring(0,index);
	str = str.substring(index+1);
	index = str.indexOf("/");
	var day = str.substring(0,index);
	var year = str.substring(index+1);
	return {y:year,m:month,d:day};
}

function dateSelected(e){
	var str = document.getElementById('date_Field').value;
	var date = convertDateFromat(str);
	selectedMonth = date.m;
	selectedDay = date.d;
	selectedYear = date.y;
	getSeatsFromDate();
}

function reserva(){
	var flag = 0;
	var hora=0;
	const currDate = new Date();
	const cb1 = document.getElementById('cb1');
	const cb2 = document.getElementById('cb2');
	const cb3 = document.getElementById('cb3');
	const cb4 = document.getElementById('cb4');
	const cb5 = document.getElementById('cb5');
	const field1 = document.getElementById('field1');
	const field2 = document.getElementById('field2');
	const field3 = document.getElementById('field3');
	const field4 = document.getElementById('field4');
	const field5 = document.getElementById('field5');
	const promo = document.getElementById('promo-code');
	var time = ""
	if (cb1.checked){
		time = "09h-11h;";
		hora = 9;
	}else if (cb2.checked){
		time = "11h-13h;";
		hora=11;
	}else if (cb3.checked){
		time = "14h-16h;";
		hora=14;
	}	else if (cb4.checked){
		time = "16h-18h;";
		hora=16;
	}	else if (cb5.checked){
		time = "18h-20h;";
		hora=18;
	}
	var selDate = new Date(selectedYear,(selectedMonth-1),selectedDay,hora,30,0,0);
	if (tour=="private") hora=18;
	else if(tour=="express") hora=13;
	if (tour=="normal" && !cb1.checked && !cb2.checked && !cb3.checked && !cb4.checked && !cb5.checked){
		document.getElementById('required1').innerHTML = jsTranslations[0];
		flag=1;
	}else{
		document.getElementById('required1').innerHTML = "*";
	}
	if (field1.value=="" || field2.value==""){
		document.getElementById('required2').innerHTML = jsTranslations[1];
		flag=1;
	}else if (strangeChars.some(el => field2.value.includes(el)) || strangeChars.some(el => field1.value.includes(el))){
		document.getElementById('required2').innerHTML = jsTranslations[2];
		flag=1;
	}else{
		document.getElementById('required2').innerHTML = "*";
	}
	if (field3.value==""){
		document.getElementById('required3').innerHTML = jsTranslations[3];
		flag=1;
	}else if (!isEmail(field3.value)){
		document.getElementById('required3').innerHTML = jsTranslations[4];
		flag=1;
	}else{
		document.getElementById('required3').innerHTML = "*";
	}
	if (field4.value==""){
		document.getElementById('required4').innerHTML = jsTranslations[5];
		flag=1;
	}else if (!onlyDigit(field4.value)){
		document.getElementById('required4').innerHTML = jsTranslations[6];
		flag=1;
	}else{
		document.getElementById('required4').innerHTML = "*";
	}
	if(adultCount==0 && criancaCount==0 && tour!="private"){
		document.getElementById('required5').innerHTML = jsTranslations[7];
		flag=1;
	}else if(tour=="private" && maxSeats==0){
		document.getElementById('required5').innerHTML = jsTranslations[8];
		flag=1;
	}else{
		document.getElementById('required5').innerHTML = "*";
	}if(currDate>selDate){
		document.getElementById('required6').innerHTML = jsTranslations[9];
		document.getElementById('required1').innerHTML = jsTranslations[9];
		flag=1;
	}else{
		document.getElementById('required6').innerHTML = "*";
	}
	if (flag==0){
		var date = selectedYear+"-"+selectedMonth+"-"+selectedDay;
		var stripeHandler = StripeCheckout.configure({
			key: stripePublicKey,
			image: "../assets/icon.png",
			name: "Coastline Lovers",
			locale: 'auto',
			email: field3.value,
			token: function(token) {
				fetch('/PaidReservation', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					body: JSON.stringify({stripeTokenId: token.id,date:date, time:time, fName:field1.value, lName:field2.value, email:field3.value.toLowerCase(), tel:getFullPhoneNumber(),
						 obs:field5.value, adults:adultCount,children:criancaCount, tour:tour, baby:bebeCount})
				}).then(function(res) {
					return res.json()
				}).then(function(data) {
					location.reload();
				}).catch(function(error) {
					console.error(error)
				})
			}
		});
		var codeObj = document.getElementById('codeField');
		if(codeObj!=null) code = codeObj.value;
		fetch('/FreeReservation', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({code:code,date:date, time:time, fName:field1.value, lName:field2.value, email:field3.value.toLowerCase(), tel:getFullPhoneNumber(), obs:field5.value, adults:adultCount,children:criancaCount, tour:tour, baby:bebeCount,promo:promo.value})
		}).then(function(res) {
			return res.json()
		}).then(function(data) {
			if(data.code=="ADMIN" || data.code=="PROMO"){
				getSeatsFromDate();
				swal(jsTranslations[10],jsTranslations[11], "success");
				return;
			} else if(data.code=="NO"){
				selDate = new Date(selectedYear,(selectedMonth-1),selectedDay,hora,0,0,0);
				if (currDate>=selDate){
					swal(jsTranslations[12], jsTranslations[13], "error");
					return;
				}
				purchaseClicked(stripeHandler);
			}
			if (data.code=="PROMO") code="";
			 swal(jsTranslations[12],jsTranslations[14], "error");
		}).catch(function(error) {
			console.error(error)
		})
	}
}

function purchaseClicked(stripeHandler) {
	var price = 0;
	if (tour=="normal") price = ((parseInt(adultCount, 10)*bAdultoN)+(parseInt(criancaCount, 10)*bCriancaN));
    else if (tour=="private") {price = 30000;adultCount=MaxCapacity}
    else if(tour=="express") price = ((parseInt(adultCount, 10)*bAdultoE)+(parseInt(criancaCount, 10)*bCriancaE));
    stripeHandler.open({ amount: price })
}

function changeButtonName() {
	var sPath = window.location.pathname;
	var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
	if(sPage == "booking.html"){
		if(document.getElementById('codeField').value=="") document.getElementById('reservebutton').innerHTML = jsTranslations[16];
		else document.getElementById('reservebutton').innerHTML = jsTranslations[17];
	}
}

async function adminCheck(){
	if (event.key === "Enter") {
		var user = document.getElementById('adminuserField').value;
		var pw = document.getElementById('adminpwField').value;
		const options = {
			method: 'POST',
			headers:{'Content-Type':'application/json'},
			body: JSON.stringify({user:user,pw:pw})
		};
		fetch('/checkAdmin', options).then(function(res) {
			return res.json()
		}).then(function(data) {
			if(data.res=="ok"){
				code = document.getElementById('adminpwField').value;
				showAllBookings("",0,"","","","","");
				document.getElementById('admin-login').style.display = "none";
				document.getElementById('adminpage').style.display = "block";
				document.getElementById("div_search").style.display = "block";
				document.getElementById("sqlresult").style.display = "block";
				document.getElementById("deleteBookings").style.display = "none";
				document.getElementById("modBookings").style.display = "block";
				document.getElementById("insert_booking").style.display = "none";
			}
		}).catch(function(error) {
			console.error(error)
		})
	}
}

async function getSeatsFromDate(){
	paintCallendar();
	resetValues();
	lugaresMax = [MaxCapacity,MaxCapacity,MaxCapacity,MaxCapacity,MaxCapacity];
	bebeLugaresMax = [3,3,3,3,3];
	var finaldate = selectedYear+'-'+selectedMonth+'-'+selectedDay;
	const options = {
		method: 'POST',
		headers:{'Content-Type':'application/json'},
		body: JSON.stringify({type:tour, date:finaldate})
	};
	const res = await fetch('/getDateBooking', options);
	const data = await res.json();
	if(tour=="normal"){
		document.getElementById("cb1").checked = true;
		if(data.bookings[0]==null){
			document.getElementById("cb1Text").innerHTML = " ("+MaxCapacity+ jsTranslations[18]+")";
			document.getElementById("cb2Text").innerHTML = " ("+MaxCapacity+jsTranslations[18]+")";
			document.getElementById("cb3Text").innerHTML = " ("+MaxCapacity+jsTranslations[18]+")";
			document.getElementById("cb4Text").innerHTML = " ("+MaxCapacity+jsTranslations[18]+")";
			document.getElementById("cb5Text").innerHTML = " ("+MaxCapacity+jsTranslations[18]+")";
			document.getElementById("bebeSeatsNum").innerHTML = " (3"+ jsTranslations[18]+")";
		}
		for(var i = 0; i < data.bookings.length; i++){
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("09h-11h")){
				lugaresMax[0] = (MaxCapacity-data.bookings[i]["SUM(lugares)"]);
				bebeLugaresMax[0] = (3-data.bookings[i]["SUM(bebes)"]);
				if (data.bookings[i]["SUM(lugares)"]>9)	document.getElementById('cb1').disabled = true;
			}
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("11h-13h")){
				lugaresMax[1] = (MaxCapacity-data.bookings[i]["SUM(lugares)"]);
				bebeLugaresMax[1] = (3-data.bookings[i]["SUM(bebes)"]);
				if (data.bookings[i]["SUM(lugares)"]>9)	document.getElementById('cb2').disabled = true;
			}
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("14h-16h")){
				lugaresMax[2] = (MaxCapacity-data.bookings[i]["SUM(lugares)"]);
				bebeLugaresMax[2] = (3-data.bookings[i]["SUM(bebes)"]);
				if (data.bookings[i]["SUM(lugares)"]>9)	document.getElementById('cb3').disabled = true;
			}
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("16h-18h")){
				lugaresMax[3] = (MaxCapacity-data.bookings[i]["SUM(lugares)"]);
				bebeLugaresMax[3] = (3-data.bookings[i]["SUM(bebes)"]);
				if (data.bookings[i]["SUM(lugares)"]>9)	document.getElementById('cb4').disabled = true;
			}
			if (data.bookings[i]["GROUP_CONCAT(hora SEPARATOR '; ')"].includes("18h-20h")){
				lugaresMax[4] = (MaxCapacity-data.bookings[i]["SUM(lugares)"]);
				bebeLugaresMax[4] = (3-data.bookings[i]["SUM(bebes)"]);
				if (data.bookings[i]["SUM(lugares)"]>9)	document.getElementById('cb5').disabled = true;
			}
			document.getElementById("cb1Text").innerHTML = " ("+ lugaresMax[0] + jsTranslations[18]+")";
			document.getElementById("cb2Text").innerHTML = " ("+ lugaresMax[1] + jsTranslations[18]+")";
			document.getElementById("cb3Text").innerHTML = " ("+ lugaresMax[2] + jsTranslations[18]+")";
			document.getElementById("cb4Text").innerHTML = " ("+ lugaresMax[3] + jsTranslations[18]+")";
			document.getElementById("cb5Text").innerHTML = " ("+ lugaresMax[4] + jsTranslations[18]+")";
			document.getElementById("bebeSeatsNum").innerHTML = " ("+ bebeLugaresMax[0] + jsTranslations[18]+")";
		}
		maxSeats = lugaresMax[0];
		bebeMaxSeats = bebeLugaresMax[0];
	}else if(tour=="private"){
		document.getElementById("cbprivate").checked = true;
		if(data.bookings[0]==null) {
			maxSeats=MaxCapacity;
			bebeMaxSeats=3;
			document.getElementById("cbprivate").disabled = false;
			document.getElementById("rPrivateText").innerHTML =jsTranslations[19];
		}else {
			maxSeats = 0;
			bebeMaxSeats=0;
			document.getElementById("cbprivate").disabled = true;
			document.getElementById("rPrivateText").innerHTML = jsTranslations[20];
		}
	}else if(tour=="express"){
		document.getElementById("cbexpress").checked = true;
		maxSeats=MaxCapacity;
		if (data.bookings[0]!=null) {
			maxSeats = (MaxCapacity-data.bookings[0]["SUM(lugares)"]);
			bebeLugaresMax[0] = (3-data.bookings[0]["SUM(bebes)"]);
			bebeMaxSeats = bebeLugaresMax[0];
			document.getElementById("bebeSeatsNum").innerHTML = "(" + bebeMaxSeats +jsTranslations[18]+")";
		}
		document.getElementById("rExpressText").innerHTML = " ("+ maxSeats + jsTranslations[18]+")";
	}
}

function resetValues(){
	document.getElementById('cb1').disabled = false;
	document.getElementById('cb2').disabled = false;
	document.getElementById('cb3').disabled = false;
	document.getElementById('cb4').disabled = false;
	document.getElementById('cb5').disabled = false;
	document.getElementById('cb1').checked=true;
	document.getElementById('required1').innerHTML = "*";
	document.getElementById('required2').innerHTML = "*";
	document.getElementById('required3').innerHTML = "*";
	document.getElementById('required4').innerHTML = "*";
	document.getElementById('required5').innerHTML = "*";
	document.getElementById("adultonum").value=0;
	document.getElementById("ciancanum").value=0;
	document.getElementById("bebenum").value=0;
	document.getElementById('date_Field').value = selectedDay + "/"+ selectedMonth +"/"+selectedYear;
	document.getElementById('field1').value="";
	document.getElementById('field2').value="";
	document.getElementById('field3').value="";
	document.getElementById('field4').value="";
	document.getElementById('field5').value="";
	var codeObj = document.getElementById('codeField');
	if(codeObj!=null) codeObj.value="";
	changeButtonName();
	adultCount = 0;
	criancaCount = 0;
	bebeCount = 0;
}

function clearColors(){
	var month = (currMonth+1);
	if (month<10) month = '0'+month;
	for(var i = 0; i< 32; i++){
		var day = i;
		if (day<10) day = '0'+i;
		var finaldate = day +" / "+month+" / "+currYear;
		var dayDiv = document.getElementsByClassName("day "+finaldate);
		if(dayDiv.length!=0) dayDiv[0].style.backgroundColor = "transparent";
	}
}

async function paintCallendar(){
	document.getElementsByClassName("datepicker-days")[0].innerHTML=document.getElementsByClassName("datepicker-days")[0].innerHTML.split(" full red").join("");
	const options = {
		method: 'POST',
		headers:{'Content-Type':'application/json'},
		body: JSON.stringify({tour:tour})
	};
	const res = await fetch('/paintCallendar', options);
	const data = await res.json();
	for (var i = 0; i < data.bookings.length; i++){
		var str = data.bookings[i].data;
		str = str.replace("T00:00:00.000Z", "");
		var index = str.indexOf("-");
		var ano = str.substring(0,index);
		str = str.substring(index+1);
		index = str.indexOf("-");
		var mes =str.substring(0,index);
		var dia = str.substring(index+1);
		finaldate = dia+" / "+mes+" / "+ano;
		var dayDiv = document.getElementsByClassName("day "+finaldate);
		if(tour=="normal" && dayDiv.length!=0 && data.bookings[i]['SUM(lugares)']>=(MaxCapacity*5)) {
			dayDiv[0].className += " full red";
		}else if(tour=="private" && dayDiv.length!=0){
			dayDiv[0].className += " full red";
		}else if(tour=="express" && dayDiv.length!=0 && data.bookings[i].lugares>=MaxCapacity){
			dayDiv[0].className += " full red";
		}
	}
}

function adultoMenos(){
	if(adultCount == 0) return
	adultCount--;
	if(adultCount == 0) {
		criancaCount=0;
		bebeCount=0;
		document.getElementById("ciancanum").value = 0;
		document.getElementById("bebenum").value = 0;
	}
	document.getElementById("adultonum").value=adultCount;
}
function adultoMais(){
	if((adultCount + criancaCount) > (maxSeats-1)) return
	adultCount++;
	document.getElementById("adultonum").value=adultCount;
}
function criancaMenos(){
	if(criancaCount == 0) return
	criancaCount--;
	document.getElementById("ciancanum").value=criancaCount;
}
function criancaMais(){
	if(adultCount==0) return;
	if((adultCount + criancaCount) > (maxSeats-1)) return
	criancaCount++;
	document.getElementById("ciancanum").value=criancaCount;
}
function bebeMenos(){
	if(bebeCount == 0) return
	bebeCount--;
	document.getElementById("bebenum").value=bebeCount;
}
function bebeMais(){
	if((bebeCount > (bebeMaxSeats-1)) || adultCount==0) return
	bebeCount++;
	document.getElementById("bebenum").value=bebeCount;
}

function radioClick(radio){
	clearColors();
	if (radio=='1'){
		tour="normal";
		document.getElementById("normaltour").style.display = "block";
		document.getElementById("privatetour").style.display = "none";
		document.getElementById("expresstour").style.display = "none";
		document.getElementById("lugares_adulto").style.display = "block";
		document.getElementById("lugares_crianca").style.display = "block";
		document.getElementById("lugares_bebes").style.display = "block";
		document.getElementById("privatetourdiv").style.display = "none";
		document.getElementById("la-normal").style.display = "block";
		document.getElementById("la-express").style.display = "none";
		document.getElementById("lc-normal").style.display = "block";
		document.getElementById("lc-express").style.display = "none";
	}else if(radio=='2'){
		tour="private";
		document.getElementById("normaltour").style.display = "none";
		document.getElementById("privatetour").style.display = "block";
		document.getElementById("expresstour").style.display = "none";
		document.getElementById("lugares_adulto").style.display = "none";
		document.getElementById("lugares_crianca").style.display = "none";
		document.getElementById("lugares_bebes").style.display = "none";
		document.getElementById("privatetourdiv").style.display = "block";
	}else{
		tour="express";
		document.getElementById("normaltour").style.display = "none";
		document.getElementById("privatetour").style.display = "none";
		document.getElementById("expresstour").style.display = "block";
		document.getElementById("lugares_adulto").style.display = "block";
		document.getElementById("lugares_crianca").style.display = "block";
		document.getElementById("lugares_bebes").style.display = "block";
		document.getElementById("privatetourdiv").style.display = "none";
		document.getElementById("la-normal").style.display = "none";
		document.getElementById("la-express").style.display = "block";
		document.getElementById("lc-normal").style.display = "none";
		document.getElementById("lc-express").style.display = "block";
	}
	getSeatsFromDate();
}

function cbClick(cb){
	maxSeats = (lugaresMax[cb-1]);
	bebeMaxSeats = (bebeLugaresMax[cb-1]);
	adultCount=0;
	criancaCount=0;
	bebeCount=0;
	document.getElementById("bebeSeatsNum").innerHTML = "(" + bebeMaxSeats +jsTranslations[18]+")";
	document.getElementById("adultonum").value=0;
	document.getElementById("ciancanum").value=0;
	document.getElementById("bebenum").value=0;
}

async function eliminarReservas(){
    var id = document.getElementById("idField").value;
    if (id=="") {
        swal("Preencha o ID");
        return;
	}
	swal({
		title: "Tem a certeza?",
		text: "Impossivel recuperar reservas eliminadas!",
		icon: "warning",
		buttons: ['Não!','Sim!'],
		dangerMode: true,
	  }).then(async function(isConfirm) {
		if (isConfirm) {
			const options = {
				method: 'POST',
				headers:{'Content-Type':'application/json'},
				body: JSON.stringify({id:id,code:code})
			};
			const res = await fetch('/deleteReservation', options);
			const data = await res.json();
			if (data.client.affectedRows==1) swal("Sucesso!", "Eliminado com sucesso!", "success");
			else swal("Erro ao eliminar (O ID escolhido existe?)");
			showAllBookings("",0,"","","","","");
		} else {
		  swal("Cancelado", "A reserva não foi cancelada", "error");
		}
	  });
	  resetAdminFields();
}

async function modReservas(){
	var data;
    var id = document.getElementById("idField").value;
    if (id=="") {
        swal("ERRO", "Preencha o ID", "error");
        return;
    }
    var fName = document.getElementById("newfNameField").value;
    var lName = document.getElementById("newlNameField").value;
    var tel = document.getElementById("newtelField").value;
    var email = document.getElementById("newemailField").value.toLowerCase();
    var obs = document.getElementById("newobsField").value;
    var receber = document.getElementById("newrecField").value;
    var pagar = document.getElementById("newpagField").value.toLowerCase();
    //-----------------------------------------------------------------------
    var e = document.getElementById("newtourField");
    var tour = e.options[e.selectedIndex].value;
    var e3 = document.getElementById("newfieldadults");
    var adultos = e3.options[e3.selectedIndex].value;
    var e4 = document.getElementById("newfieldchildren");
    var criancas = e4.options[e4.selectedIndex].value;
    var e5 = document.getElementById("newfieldbaby");
    var bebes = e5.options[e5.selectedIndex].value;
	var date = document.getElementById("newdateField").value;
	var e = document.getElementById("newtimeSelect");
	var hora = e.options[e.selectedIndex].value + ";";
	var novaHora = parseInt(hora.substring(0, 2));
	if(date.includes("/")){
		dateObj = convertDateFromat(date);
		const currDate = new Date();
		const selDate = new Date(dateObj.y,(dateObj.m-1),dateObj.d,novaHora,30,0,0);
		date = dateObj.y+"-"+dateObj.m+"-"+dateObj.d;
		if(currDate>selDate){
			swal("ERRO", "Data / Hora inválida", "error");
			return;
		}
	} else if(date!=""){
		swal("ERRO", "Data ", "error");
		return;
	}
    if(parseInt(adultos, 10)+parseInt(criancas, 10)>MaxCapacity) {
        swal("ERRO", "Demasiados lugares", "error");
        return;
    }
    if(bebes>3) {
        swal("ERRO", "Demasiados bebés", "error");
        return;
    }
    if(tour!="express" && hora=="13h-14h;"){
        swal("ERRO", "Hora inválida para essa tour", "error");
        return;
    }
    if(tour=="express" && hora!="13h-14h;"){
        swal("ERRO", "Hora inválida para essa tour", "error");
        return;
    }
    if(tour=="private" && hora!="18h-20h;"){
        swal("ERRO", "Hora inválida para essa tour", "error");
        return;
    }
    if(fName=="" && lName=="" && tel=="" && email=="" && obs=="" && receber=="" && pagar=="" && tour=="same" && adultos=="" && criancas=="" && bebes=="" && date=="" && hora=="same;") {
        swal("ERRO", "Todos os campos a modificar vazios", "error");
        return;
    }
    if(tour=="same" && adultos=="" && criancas=="" && bebes=="" && date=="" && hora=="same;"){
        const options = {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({code:code,id:id,fName:fName,lName:lName,email:email,tel:tel,obs:obs,receber:receber,pagar:pagar,tour:tour,adults:adultos,children:criancas,baby:bebes,date:date,time:hora})
          };
          const res = await fetch('/simpleModReservation', options);
          data = await res.json();
          showAllBookings(id,0,"","","","","");
    }else{
        const options = {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({code:code,id:id,fName:fName,lName:lName,email:email,tel:tel,obs:obs,receber:receber,pagar:pagar,tour:tour,adults:adultos,children:criancas,baby:bebes,date:date,time:hora})
          };
          const res = await fetch('/deleteANDinsertReservation', options);
		  data = await res.json();
		  swal("Sucesso!", "Novo ID:" + data.id, "success");
          showAllBookings(id,0,"","","","","");
	}
	resetAdminFields();
    if(data.mod=="NULL") swal("ERRO", "ID não existe", "error");
    if(data.mod=="ERROR") swal("ERRO", "Vagas ocupadas para esse horaio / data?", "error");
}

function textEnter(r){
    if (event.key === "Enter" || r=="btn") {
		var id = document.getElementById("idField").value;
        var e = document.getElementById("tourField");
        var tour = e.options[e.selectedIndex].value;
		var date = document.getElementById("dateField").value;
		if(date.includes("/")){
			date = convertDateFromat(date);
			date= date.y+"-"+date.m+"-"+date.d;
		}
        var fName = document.getElementById("fNameField").value;
        var lName = document.getElementById("lNameField").value;
        var email = document.getElementById("emailField").value.toLowerCase();
		var tel = document.getElementById("telField").value;
        showAllBookings(id,tour,date,fName,lName,email,tel);
    }
}
function resetAdminFields(){
	document.getElementById("idField").value="";
	document.getElementById("dateField").value="";
	document.getElementById("fNameField").value="";
	document.getElementById("lNameField").value="";
	document.getElementById("emailField").value="";
	document.getElementById("telField").value="";
    document.getElementById("newfNameField").value="";
    document.getElementById("newlNameField").value="";
    document.getElementById("newtelField").value="";
    document.getElementById("newemailField").value="";
    document.getElementById("newobsField").value="";
    document.getElementById("newrecField").value="";
    document.getElementById("newpagField").value="";
	document.getElementById("newdateField").value="";
	var elements = document.getElementsByTagName("select");
	for (var ii=0; ii < elements.length; ii++) {
			elements[ii].selectedIndex = 0;
	}
}

function adminrChange(rb){
	resetAdminFields();
	getSeatsFromDate();
    if(rb === "2"){
        document.getElementById("div_search").style.display = "block";
        document.getElementById("sqlresult").style.display = "block";
        document.getElementById("deleteBookings").style.display = "block";
        document.getElementById("modBookings").style.display = "none";
        document.getElementById("insert_booking").style.display = "none";
    }else if(rb=="3"){
		showAllBookings("",0,"","","","","");
        document.getElementById("div_search").style.display = "block";
        document.getElementById("sqlresult").style.display = "block";
        document.getElementById("modBookings").style.display = "block";
        document.getElementById("deleteBookings").style.display = "none";
        document.getElementById("insert_booking").style.display = "none";
    }else if(rb=="4"){
        document.getElementById("div_search").style.display = "none";
        document.getElementById("sqlresult").style.display = "none";
        document.getElementById("insert_booking").style.display = "block";
        document.getElementById("deleteBookings").style.display = "none";
        document.getElementById("modBookings").style.display = "none";
    }

}

async function showAllBookings(id,tour,date,fName,lName,email,tel,order){
    var sqlr = document.getElementById("sqlresult");
    sqlr.innerHTML="<table id='sqltable'>";
    var sqlTable = document.getElementById("sqltable");
	const options = {
	  method: 'POST',
	  headers:{'Content-Type':'application/json'},
	  body: JSON.stringify({code:code,id:id, tour:tour,date:date,fname:fName,lname:lName,email:email,telefone:tel,order:order})
	};
	const res = await fetch('/filterReservations', options);
    const data = await res.json();
	sqlTable.innerHTML+="<tr><th class='dedo' onclick=\"order('id')\">"+arrow+" ID "+arrow+"</th><th>Nome</th><th>Email</th><th>Telefone</th><th class='dedo' onclick=\"order('tour')\">"+arrow+" Tour "+arrow+"</th><th>NºLugares</th>\
	<th>NºBebes</th><th>observações</th><th class='dedo' onclick=\"order('data')\">"+arrow+" Data "+arrow+"</th><th>Hora</th><th>Preço</th><th>A Receber</th><th>A Pagar</th><th>Promotor</th><th>Código Promo</th><th>Código Stripe</th><th>ID antigo</th></tr>";
	for (var i = 0; i < data.bookings.length; i++){
        var date =data.bookings[i].data.replace("T00:00:00.000Z", "");
		sqlTable.innerHTML+="<tr><td> "+data.bookings[i].ID+" </td><td> "+data.bookings[i].primeiroNome +" "+data.bookings[i].ultimoNome+" </td><td> "+data.bookings[i].email+" </td><td> "+data.bookings[i].telefone+"</td><td> "+data.bookings[i].tour+" </td>\
		<td> "+data.bookings[i].lugares+" </td><td> "+data.bookings[i].bebes+" </td><td> "+data.bookings[i].observacoes+" </td><td> "+date+" </td><td> "+data.bookings[i].hora+"</td><td> "+data.bookings[i].preco+" </td><td> "+data.bookings[i].aPagar+" </td>\
		<td> "+data.bookings[i].aReceber+" </td><td> "+data.bookings[i].promotor+" </td><td> "+data.bookings[i].codigoPromo+" </td><td> "+data.bookings[i].stripeID+" </td><td> "+data.bookings[i].oldID+" </td></tr> ";
    }
    sqlr.innerHTML+="</table>";
}

function order(o){
    newOrder = o;
    if(newOrder == oldOrder){
		o=o+" desc";
		arrow = "&uarr;";
	} else{
		arrow = "&darr;";
	}
    showAllBookings("",0,"","","","","",o);
    oldOrder=o;
}

function tourChange(){
    var e = document.getElementById("tourSelect");
    var tour = e.options[e.selectedIndex].value;
    document.getElementById("normalSelect").style.display = "none";
    document.getElementById("privateSelect").style.display = "none";
    document.getElementById("expressSelect").style.display = "none";
    if (tour=="normal") document.getElementById("normalSelect").style.display = "block";
    else if (tour=="private") document.getElementById("privateSelect").style.display = "block";
    else if (tour=="express") document.getElementById("expressSelect").style.display = "block";
}

function onlyDigit(str) {
	var patt = /^[0-9]*$/;
	if (str.match(patt)==null) return false;
	else return true;
}

function isEmail(str) {
	var patt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (str.match(patt)==null) return false;
	else return true;
}
