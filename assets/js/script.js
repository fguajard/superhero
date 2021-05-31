const validationNumber = (number) => {
    if (!number)return false;
    else return true;    
  }; 

$(document).ready(function(){
$("#formulario").on("submit",function(e){
    e.preventDefault();
})

$("#buscar").on("click",function(){
    valueInput = $("#valueInput").val()
    if (!validationNumber(+valueInput) || +valueInput <= 0 ) {
        alert("Busqueda Invalida");
        return false;
      }    
    $.ajax({
        url: "https://www.superheroapi.com/api.php/2973630296293444/" + valueInput,
        success: function({response,name,powerstats,biography,appearance,work,connections,image}){ 
            if(response == "error"){
                alert("Invalid id")
                return false
            } 
            $(".circle-0").css(`background`, `rgba(98, 208, 240, .02) url(${image.url}) center/98% no-repeat`)            
            //recoleccion de datos para estadisticas de superheroe
            let estadisticas = []            
            Object.entries(powerstats).forEach(function(s){
                console.log(s);
                estadisticas.push({
                    label: s[0],
                    y: +s[1],
                })
            })
            //objeto de configuracion para CANVASJS
            let config = {                
                theme: "dark1",
                exportEnabled: true,
                animationEnabled: true,
                
                axisY: {
                    title: "Valor",
                    includeZero: true,
                },
                axisX: {
                    title: "Estadistica",
                    labelPlacement: "inside",
                    
                },
                data: [{
                    type: "bar",
                    indexLabel: "{y}",
                    dataPoints: estadisticas,

                }],
            }

            let chart = new CanvasJS.Chart("stats",config);
            chart.render()

            //Datos del superheroe

            $("#divDatos").html(`
            <div>
            <h4> Nombre: ${name}</h4>
            <hr/>
            <h4> Biografia </h4>
            <h6> Nombre Completo: ${biography["full-name"]}</h6>
            <h6> Alter-Egos: ${biography["alter-egos"]}</h6>
            <h6> Alias: ${biography.aliases[0]}</h6>
            <h6> Lugar de Nacimiento: ${biography["place-of-birth"]}</h6>
            <h6> Primera Aparicion: ${biography["first-appearance"]}</h6> 
            <h6> Editora: ${biography["publisher"]}</h6>
            <h6> Asociacion: ${biography["alignment"]}</h6>    
            <h4> Apariencia </h4>
            <h6> Genero: ${appearance.gender}</h6>
            <h6> Raza: ${appearance.race}</h6>
            <h6> Altura: ${appearance.height[1]}</h6>
            <h6> Peso: ${appearance.weight[1]}</h6>
            <h6> Color de Ojos: ${appearance["eye-color"]}</h6>
            <h6> Color de Pelo: ${appearance["hair-color"]}</h6>
            <h4> Trabajo </h4>
            <h6> Ocupacion: ${work["occupation"]}</h6>            
            </div>
            `);
        },
        error: function(){
            alert("error 404")
        }
})
})
})