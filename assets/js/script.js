$(function() {

    //BEGIN - Hover do submenu da navbar
    $(".navbarSubmenu").parent().hover(function() {
        $(this).find("ul").slideDown(100);
    }, function() {
        $(this).find("ul").slideUp(100);
    });
    //END - Hover do submenu da navbar

    //BEGIN - Grafico
    var data = [
        {'nome': 'Carnaval', 'valor': 50},
        {'nome': 'Férias', 'valor': 30},
        {'nome': 'Governo', 'valor': 75},
        {'nome': 'Esporte', 'valor': 45},
        {'nome': 'Outros', 'valor': 25}
    ];

    $.each(data, function(key, value) {
        //console.log("Valor: " + JSON.stringify(value.valor));
    });

    // $.ajax({
    //     type: "GET",
    //     url: "http://www.gowebit.com.br/desafio-front-end-infograficos/assets/json/grafico.json",
    //     dataType: "json",
    //     success: function(data){
    //         $.each(data, function(key, value) {
    //             console.log(JSON.stringify(data.valor));
    //         });
    //     },
    //     error: function(data){
    //         console.log("json não encontrado");
    //     }
    // });
    //END - Grafico

});
