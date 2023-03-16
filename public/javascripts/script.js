// MENU hamburger
function showBurger(clas) {
  var x = document.getElementById(clas);
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function hamburgerChange(){
  var x = document.getElementById('icon__effect');
  if (document.documentElement.clientWidth >= 768){
    x.className = "fas fa-bars fa-3x";
  } else if (document.documentElement.clientWidth < 768){
    x.className = "fas fa-bars fa-2x";
  };
}

function linkWithTour(tour){
  window.open("/views/booking#"+gLang+"#"+tour,'_self');
}

// Hamburger color change
window.onscroll = function () {
  //console.log(this.scrollY);
  var nav = document.getElementById('icon__effect');
  var viewport = document.getElementById('about');
  var x;
  //console.log(viewport.getBoundingClientRect().top)
  if (nav.className == "fas fa-bars fa-2x"){
    x = 88;
  } else if (nav.className == "fas fa-bars fa-3x") {
    x = 100;
  }

  if(viewport.getBoundingClientRect().top > x){
    //console.log('branco');
    nav.style.color = '#FFFFFF';
    nav.style.borderColor = '#FFFFFF'; 
  } else {
    //console.log('azul');
    nav.style.color = '#0E3356';
    nav.style.borderColor = '#0E3356';
  };
}

//get fotos from instagram
function getInstaFeed(acc){
    function makeHttpObject() {
      try {return new XMLHttpRequest();}
      catch (error) {}
      try {return new ActiveXObject("Msxml2.XMLHTTP");}
      catch (error) {}
      try {return new ActiveXObject("Microsoft.XMLHTTP");}
      catch (error) {}
      throw new Error("Could not create HTTP request object.");
    }
    var request = makeHttpObject();
    request.open("GET", "https://www.instagram.com/"+acc+"/", true);
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState == 4)
        var str = request.responseText;
        var index1 = 1;
        var index2 = 1;
        var cont = 0;
        while(index1!=-1 || index2!=-1 || cont<3){
          if(str===undefined) break;
          index1 = str.indexOf('"shortcode":"');
          index2 = str.indexOf('","edge_media_to_comment"');
          if(index1==-1 || index2==-1) break;
          cont++;
          var foto = str.substring(index1+13,index2);
          buildInstaFeedHTML(foto, cont);
          str = str.slice(index2+20);
        }
    };
}

function buildInstaFeedHTML(foto, cont){
  str='<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-'+cont+'"\
    src="https://www.instagram.com/p/'+foto+'/embed/?cr=1&amp;v=12&amp;wp=540&amp;rd=http%3A%2F%2F192.168.1.98%3A3000&amp;rp=%2F#%7B%22ci%22%3A0%2C%22os%22%3A913.7850000115577%2C%22ls%22%3A667.4449999991339%2C%22le%22%3A670.0450000062119%7D"\
     allowtransparency="true" allowfullscreen="true" frameborder="0" height="746" data-instgrm-payload-id="instagram-media-payload-'+cont+'" scrolling="no"\
      style="background: white; max-width: 540px; width: calc(100% - 2px); border-radius: 3px; border: 1px solid rgb(219, 219, 219); box-shadow: none;\
        display: inline; margin: 0px 0px 12px; min-width: 326px; padding: 0px;"></iframe>'
  document.getElementById('html_instafeed').innerHTML += str;          
}

function mapChange(lang) {
    var imagem = document.getElementById('about__map');
    var janela = document.documentElement.clientWidth;
    if (lang!='pt') lang='uk';
    if ( janela >= 768 && janela < 1280){
      imagem.src = "../assets/mapa_tablet_tablet-"+lang+".jpg";
    } else if ( janela >= 1280){
      imagem.src = "../assets/mapa_website_website-"+lang+".jpg";
    } else {
      imagem.src = "../assets/mapa_phone_phone-"+lang+".jpg";
    }
}






