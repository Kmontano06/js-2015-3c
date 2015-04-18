var app={};
//Creacion del ajax para llamar el JSON
app.ajaxRequest=function(){
var mygetrequest =new XMLHttpRequest();
//Funcion para el JSON
mygetrequest.onreadystatechange = function(){
  //if para verificar que el JSON esta completamente cargado
  if (mygetrequest.readyState === 4 &&  mygetrequest.status == 200){
    //Variable donde se va almacenar el documento JSON
    var jsonObj = JSON.parse(mygetrequest.responseText);
      //Llamado de la funcion que imprimira los proyectos pasandole por parametros el documento JSON
      app.proyectos.imprimirProyectos(jsonObj.proyectos);   
  }
}
mygetrequest.open("GET", "js/proyectos.json", true);
mygetrequest.send();
}();
//Funcion que contiene todas las otras funciones para proyectos
app.proyectos = function(){
  return{
    //Funcion que se llamo en el Ajax y que se le paso por parametros el documento JSON
    //La funcion imprime los proyectos en el HTML.
    imprimirProyectos:function(proyectos){
      //Variable que va almacenar los Proyectos
       var list_proyectos ="";
                //Ciclo for para que recorra cada posicion de JSON
                //Se esta utilizando el Parametro
                for(i=0; i < proyectos.length; i++){
                  //Creacion de cada proyecto 
                   list_proyectos += '<li class="list-project-item"><img class="item-image" src="'+proyectos[i].imagen+'"/><h2  class="item-title">'+proyectos[i].nombre+'</h2><div onclick="app.proyectos.ajaxProyecto('+i+')" class="button-more"></div></li>'; 
                   //El div se le esta dando un evento onclick que esta llamando a la funcion ajaxProyecto.
                   //Y se le esta pasando por parametro el i.

                }
                //Aca se estan imprimiendo la variable list_proyectos en el html
                document.getElementById("proyectos").innerHTML= "<ul class='list-project'>"+list_proyectos+"</ul>";
                 //El llamado de lafuncion para darle estilo a los li
                 app.styleList();
    },
    //Creacion del ajax para cada Proyecto
    ajaxProyecto:function(indice){
      var httpproyecto =new XMLHttpRequest();
      httpproyecto.onreadystatechange = function(){
        if (httpproyecto.readyState === 4 &&  httpproyecto.status == 200){
          var jsonPro = JSON.parse(httpproyecto.responseText);
          //Llamado de la funcion que creara el PopUp
          //Se le esta pasando por parametro el JSON y el indice.
          app.proyectos.mostrarPopUp(jsonPro.proyectos, indice); 
          
        }
      }
      httpproyecto.open("GET", "js/proyectos.json", true);
      httpproyecto.send();
    },
    //Funcion que crea el PopUp 
    //Parametros: el JSON y el Indice del div que fue tocado.
    mostrarPopUp:function(proyectos, indice){
      //Vriable que va almacenar el Pop Up
      var pop_up="";
      //Cambia la clase al elemento para que se muestre
      document.getElementById("content-popUp").className="container-popup";
      //Ciclo for para que recorra cada posicion de JSON
      for(i=0; i < proyectos.length; i++){
        //if para comparar indice(parametro) con la posicion por la que se pasa en ese momento gracias al ciclo for
        if(indice === i){
          //Creacion del PopUp
          var pop_up='<div class="window-pop-up"><img class="pop-up-image" src="'+proyectos[i].imagen+'"/><div class="pop-up-container-info"><h2 class="pop-up-title">'+proyectos[i].nombre+'</h2><p class="pop-up-description">'+proyectos[i].descripcion+'</p><a class="pop-up-link" href="'+proyectos[i].url+'">Ir al Sitio</a></div><div class="button-close" onclick="app.proyectos.cerrarPopUp()"></div></div>'
        }
      }
      //Con esto se Imprime el Pop Up
      document.getElementById("content-popUp").innerHTML= pop_up;
    },
    //Funcion que cierra el PopUp
    cerrarPopUp:function(){
      //Cambia la clase al elemento para que se oculte
      document.getElementById("content-popUp").className="close-content";
    }
  };
 
}();
//Funcion que da estilo a la li
//Augmenting types
app.styleList=function(){
  Function.prototype.method = function(name, func){   
    if(!this.prototype[name]){
        this.prototype[name] = func;
    } 
    return this;
  };
  //Llamado de los elementos por clase
  var list=document.getElementsByClassName("list-project-item");
  var title=document.getElementsByClassName("item-title");
  //Creacion de la funcion para darle estilo a la li 
  //Todos los parametros son los valores de los estilos
  Element.method('liStyles', function(border, display, width, margin, height, position){
      this.style.border = border;
      this.style.display=display;
      this.style.width=width;
      this.style.margin=margin;
      this.style.height=height;
      this.style.position=position;
     return this;
  });
  //Creacion de la funcion para darle estilo al h2 
  //Todos los parametros son los valores de los estilos
  Element.method('titleStyle', function(background, color,padding, width, font){
      this.style.background = background;
      this.style.color = color;
      this.style.padding = padding;
      this.style.width = width;
      this.style.fontSize = font;
      return this;
  });
  //El ciclo es para que le ponga los estilos a todos los elementos que tengan esa clase
  for(i=0; i<list.length;i++){
    //Llamado de la funcion para los li con los valores para cada estilo
    list[i].liStyles('3px solid #4F1D28', 'inline-block', '25%','35px','270px','relative');
  }
  for(i=0; i<title.length;i++){
    title[i].titleStyle('#4F1D28', '#fff', '10px','100%', '20px');
  }
};
function validacion() {
 var email_correcto=false;
 var name_correcto=false;
 var textarea_correcto=false;
 var name = document.getElementById("name-value").value;
 if(name.length === 0 || name.length <= 10){
  document.getElementById("message-name").className="incorrecto";
   document.getElementById("message-name").innerHTML="El nombre no esta completo. Ingrese su nombre completo por favor";

 }
 else{
  document.getElementById("message-name").className="correcto";
  document.getElementById("message-name").innerHTML="El nombre ingresado es correcto";
  name_correcto=true;
 }
var email = document.getElementById("email").value;
    var email_patron = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    var resultado_email = email_patron.test(email);
    if(resultado_email === true){
      document.getElementById("message-email").className="correcto";
      document.getElementById("message-email").innerHTML="El email es correcto";
      email_correcto=true;
    }else{
      document.getElementById("message-email").className="incorrecto";
        document.getElementById("message-email").innerHTML="El email es incorrecto. Vuelvelo a ingresar";
    }
    var textarea = document.getElementById("textarea-value").value;
    if(textarea.length === 0 || textarea.length <= 10){
      document.getElementById("message-textarea").className="incorrecto";
      document.getElementById("message-textarea").innerHTML="El mensaje no esta completo. Ingrese su mensaje completo por favor";

    }else{
      document.getElementById("message-textarea").className="correcto";
      document.getElementById("message-textarea").innerHTML="El mensaje ha sido ingresado correctamente";
      textarea_correcto=true;
    }

    if(name_correcto === true && email_correcto === true){
      alert("El mensaje ha sido enviado");
    }
};