// Corroboro que la página cargue correctamente para luego ejecutar la función
$(function () {
  console.log("Página cargada correctamente con Jquery");
  //CUANDO LA PÁGINA ESTA CARGADA SALIDA POR CONSOLA

  // Incorporacion de AJAX al simulador

  var datosJSON;

  $.get("datos.json", function (response, status) {
    console.log(response, status);
    datosJSON = response;
  });

  console.log(datosJSON);

  // window.onload = function () {
  //   console.log("PAGINA CARGADA");
  // };

  // Declaración de Eventos (APLICANDO JQUERY)

  $("#Boton").click(function () {
    transfCmPie();
  });
  $("#Limpiar").click(function () {
    limpiar();
  });
  RellenarSelect();

  $("#tiposMadera").change(muestroMadera);

  $("#boton2").click(function () {
    calculoTotal();
  });

  var pt1 = 0;
  var valorMadera = 0;
  var total = 0;

  // Funcion Principal Procesadora de Centimetros a Pie Tablar

  function transfCmPie() {
    // Capturo los imputs igresados por el usuario y se los asigno a una variable

    var espesor = $("#IngresoEspesor").val();
    var ancho = $("#IngresoAncho").val();
    var largo = $("#IngresoLargo").val();

    const Pulg = 2.5; // Definicion de valor pulgada
    const Coe = 0.2734; // Coeficiente de convercion

    // Fragmento de codigo que me permite que se muestre en pantalla solamente una linea de resultado y evitar que se acumulen los resultados cada vez que el usuario hace Click en el boton

    var contenedorPadre = $("#resultado");
    contenedorPadre.empty();
    // var contenedorHijo = $("#resultado").child();
    // contenedorHijo.empty();

    if (validarCampos()) {
      var pt = (((((espesor / Pulg) * ancho) / Pulg) * largo) / 100) * Coe; // Calculo
      pt1 = pt.toFixed(2);
      $("#resultado").show();
      $("#resultado")
        .append(`<h4> La cantidad de pies equivale a ${pt1}</h4>`)
        .attr("class", "blue");
    } else {
      $("#resultado")
        .append(`<h4> Verifique los valores ingresados </h4>`)
        .attr("class", "rojo");
    }
  }

  function limpiar() {
    $("#formulario")[0].reset();
    $("#resultado").fadeOut(1000);
    $("#montoTotal").fadeOut(1000);
    $("#maderas").fadeOut(1000);

  }

  // RELLENAR SELECT CON LA CANTIDAD DE MADERAS DISPONIBLES QUE SE ENCUENTRA EN "DATOS.JS"

  let maderaX = [];
  let contenedorMadera = [];

  function RellenarSelect() {
    for (const maderaX of datosMaderas) {
      // console.log(maderaX.Madera);
      var nuevaOpcion = document.createElement("option"); // Genero un nuevo elemento en Html "Option"
      nuevaOpcion.innerHTML = maderaX.Madera; // Genero un texto para el nuevo nodo
      // nuevaOpcion.appendChild(contenido); // Introduzco el texto (cotenido) a cada "Option"
      var contenedor = document.getElementById("tiposMadera"); // Genero el Padre (contenedor)
      contenedor.appendChild(nuevaOpcion); // Le asigno el hijo (nuevaOpcion) al padre (contenedor)
    }
  }

  function muestroMadera(e) {
    var contenedorPadre = $("#maderas");
    contenedorPadre.empty();
    $("#madera.child").remove();
    console.log(e.target.options.selectedIndex);
    let valorElegido = e.target.options.selectedIndex;
    console.log(valorElegido);

    for (const elemento of datosMaderas) {
      if (elemento.id == valorElegido) {
        valorMadera = elemento.PrecioPie;
        $("#maderas").append(
          `<h4>El precio por Pie de ${elemento.Madera} es: $ ${elemento.PrecioPie}.-<h4>`
        ).attr("class", "blue");
      }
    }
    $("#maderas").show();
  }

  // Funcion creada para validacion de campo imputs. Me aseguro que el usuario ingrese siempre un valor distinto de CERO
  // la INTENCION ES QUE SI EL USUARIO INGRESA "0" O DEJA EN BLANCO UNA CELDA EN BLANCO, EL PROGRAMA ME ARROJE UN CARTEL (QUE NO SEA UN "ALERT") INDICANDO QUE DEBE INGRESAR VALORES DIFERENTES DE CERO. CON EL METODO "REQUIRED" EN HTML NO ES SUFICIENTE PORQUE ME SIGUE CALCULANDO LOS PIES (PT)

  function validarCampos() {
    let espesor = $("#IngresoEspesor").val();
    let ancho = $("#IngresoAncho").val();
    let largo = $("#IngresoLargo").val();

    if (espesor == 0 || ancho == 0 || largo == 0) {
      return false;
    } else {
      return true;
    }
  }

  // Funcion que no Funciona

  function muestroMaderaS() {
    let caja1 = document.createElement("h2"); // Creo el elemeneto caja
    let contenido1 = tiposMadera.innerHTML; // Aqui es donde no se que poner para que me elija la opcion seleccionada en el select
    caja1.appendChild(contenido1); // Le inyecto el contenido (tipo de madera) a la Caja
    let contenedor1 = $("#formulario2"); // selecciono al Nodo padre
    contenedor1.appendChild(caja1); // Le inyecto el hijo (caja1) al Nodo padre (contenedor1).
  }

  // var contenedorPadre1 = $("#montoTotal");
  // contenedorPadre1.empty();
  $("#montoTotal").hide();
  $("#maderas").hide();

  function calculoTotal() {
    $("#montoTotal").show();
    var contenedorPadre = $("#montoTotal");
    contenedorPadre.empty();
    if (pt1 != 0) {
      total = (pt1 * valorMadera).toFixed(0);
      console.log(total);
      $("#montoTotal").append(`<h4> El monto a pagar es de $ ${total}.-</h4>`)
        .attr("class", "blue wood");
    } else {
      $("#montoTotal").append(`<h4> Verifique los valores ingresados </h4>`)
        .attr("class", "rojo wood");
    }
  }
});
