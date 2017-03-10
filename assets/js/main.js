$(function() {

    //BEGIN - Hover do submenu da navbar
    $(".navbarSubmenu").parent().hover(function() {
        $(this).find("ul").slideDown(100);
    }, function() {
        $(this).find("ul").slideUp(100);
    });
    //END - Hover do submenu da navbar


    //BEGIN - Slide
    var dataSlide = [];
    $.ajax({
        type: "GET",
        url: "assets/json/slide.json",
        dataType: "json",
        async: false,
        success: function(data) {
            //Passa o conteudo do json para um array
            dataSlide = data;
        },
        error: function(data) {
            console.log("slide.json não encontrado ou leitura não permitida.");
        }
    });

    var nomesImagens = [];
    var posicaoArrayImagemAtual = 0;

    function trocaImagem(key) {
        //Altera o background do slide para a imagem selecionada
        $("#sectionSlide").animate({opacity: 0}, "fast", function() {
            $(this).css("background-image", "url('assets/img/slide/" + nomesImagens[key] + "')")
            .animate({opacity: 1});
        });
        //Desmarca como ativo o botao de pagina da imagem anterior
        $(".btSlidePageActive").removeClass("btSlidePageActive");
        //Marca como ativo o botao de pagina da imagem selecionada
        $('[data-img-key="' + key + '"]').addClass("btSlidePageActive");
        //Guarda a posicao do array da imagem selecionada
        posicaoArrayImagemAtual = key;
    }

    function proximaImagem() {
        //Se a primeira imagem do array estiver selecionada, entao troca para a ultima
        if (posicaoArrayImagemAtual == 0) {
            posicaoArrayImagemAtual = nomesImagens.length-1;
        }
        //Se nao for nem a primeira imagem que estiver selecionada, entao volta uma imagem no array
        else {
            posicaoArrayImagemAtual --;
        }
        trocaImagem(posicaoArrayImagemAtual);
    }

    function imagemAnterior() {
        //Se a ultima imagem do array estiver selecionada, entao troca para a primeira
        if (posicaoArrayImagemAtual == (nomesImagens.length-1)) {
            posicaoArrayImagemAtual = 0;
        }
        //Se nao for nem a primeira imagem que estiver selecionada, entao avanca uma imagem no array
        else {
            posicaoArrayImagemAtual ++;
        }
        trocaImagem(posicaoArrayImagemAtual);
    }

    //Pega os nomes (e a ordem) das imagens e adiciona um botao de selecao de pagina para cada uma
    $.each(dataSlide, function(key, value) {
        $.each(value.imagens, function(key, value) {
            nomesImagens.push(value);
            $("#divSlidePageButtons").append('<div data-img-key="' + key + '" class="btSlidePage">&nbsp;</div>');
        });
    });

    //Adiciona a primeira imagem do array como background do slide
    trocaImagem(0);

    //Comportamento do clique das setas do slide
    $("#btSlideArrowLeft").click(function() {
        proximaImagem();
    });
    $("#btSlideArrowRight").click(function() {
        imagemAnterior();
    });

    //Comportamento do clique dos botoes de pagina
    $(".btSlidePage").click(function() {
        trocaImagem($(this).data("img-key"));
    });

    //Troca automatica de imagem por tempo
    var tempoTrocaImagem = 10; //em segundos
    window.setInterval(function(){
        imagemAnterior();
    }, tempoTrocaImagem * 1000);
    //END - Slide


    //BEGIN - Editoria
    var dataEditoria = [];
    $.ajax({
        type: "GET",
        url: "assets/json/noticias.json",
        dataType: "json",
        async: false,
        success: function(data) {
            //Passa o conteudo do json para um array
            dataEditoria = data;
        },
        error: function(data) {
            console.log("noticias.json não encontrado ou leitura não permitida.");
        }
    });
    
    var nomesEditorias = [];
    var noticias = [];

    $.each(dataEditoria, function(key, value) {
        $.each(value.Editorias, function(key, value) {
            var editoriaAtual = {"Editoria": value.Editoria};
            //Pega os nomes das editorias
            nomesEditorias.push(value.Editoria);
            //Pega as noticias
            $.each(value.Notícias, function(key, value) {
                //Adiciona o objeto Editoria como parte do array noticias
                noticias.push($.extend(value, editoriaAtual));
            });
        });
    });

    //Remove possiveis duplicatas e ordena as editorias alfabeticamente
    $.unique(nomesEditorias).sort();
    //Adiciona as editorias no select de filtragem
    $.each(nomesEditorias, function(key, value) {
        $("#selectFiltrarEditoria").append('<option value="' + value + '">' + value.toUpperCase() + '</option>');
    });

    //Function para listar as noticias (por ordem e filtro)
    function listaNoticias(ordem, filtro) {
        //Esconde a div das noticias para psoteriormente animar a aparicao das mesmas
        $("#divConteudoDinamicoNoticias").hide();
        //Limpa a div das noticias
        $("#divConteudoDinamicoNoticias").html("");
        //Filtra as noticias por editoria
        var noticiasFiltradas = [];
        if (filtro == "") {
            noticiasFiltradas = noticias;
        }
        else {
            $.each(noticias, function(key, value) {
                if (value.Editoria == filtro) {
                    noticiasFiltradas.push(value);
                }
            });
        }
        //Ordena as noticias por data de publicacao ou ordem alfabetica
        var noticiasFiltradasOrdenadas = [];
        if (ordem == "data") {
            var auxNoticiasFiltradas = [];
            $.each(noticiasFiltradas, function(key, value) {
                var dia = value["Data de publicação"].slice(0,2);
                var mes = value["Data de publicação"].slice(3,5);
                var ano = value["Data de publicação"].slice(6,10);
                var auxDataPublicacao = {"AuxOrdemData": ano + mes + dia};
                auxNoticiasFiltradas.push($.extend(value, auxDataPublicacao));
            });
            noticiasFiltradasOrdenadas = auxNoticiasFiltradas.sort(function(a, b) {
                return a.AuxOrdemData > b.AuxOrdemData ? -1 : a.AuxOrdemData < b.AuxOrdemData ? 1 : 0;
            });
            //alert(JSON.stringify(noticiasFiltradasOrdenadas));
        }
        else if (ordem == "alfabetica") {
            noticiasFiltradasOrdenadas = noticiasFiltradas.sort(function(a, b) {
                return a.Título < b.Título ? -1 : a.Título > b.Título ? 1 : 0;
            });
        }
        else {
            noticiasFiltradasOrdenadas = noticiasFiltradas;
        }
        //Adiciona as noticias no DOM
        var eachNoticiasFinalizado = false;
        $.each(noticiasFiltradasOrdenadas, function(key, value) {
            $("#divConteudoDinamicoNoticias").append(
                '<div class="noticia">' +
                    '<span class="noticiaDataPublicacao">' +
                        value["Data de publicação"].replace(/-/g , "/") +
                    '</span>' +
                    '<span class="noticiaCategoria">' + value.Editoria + '</span>' +
                    '<img src="assets/img/noticias/' + value.Foto + '" alt="' + value.Título + '">' +
                    '<div class="noticiaTitulo textoSubtitulo">' + value.Título + '</div>' +
                    '<div class="noticiaTexto">' + value.Texto + '</div>' +
                    '<div class="noticiaSaibaMais">' +
                        '<a href="#">Saiba mais</a>' +
                    '</div>' +
                '</div>'
            );
            //Marca o termino do each e consequentemente a complitude de seu DOM
            if (noticiasFiltradasOrdenadas.length-1 == key) {
                eachNoticiasFinalizado = true;
            }
        });
        //Pega o maior height dentre as divs de notica e insere esse mesmo height nas outras divs
        var intervalSetNoticiasHeight = setInterval(function() {
            var maiorHeight = 0;
            $(".noticia").each(function() {
                if ($(this).height() > maiorHeight) {
                    maiorHeight = $(this).height();
                }
            });
            $(".noticia").each(function() {
                $(this).height(maiorHeight);
            });
            if (eachNoticiasFinalizado) {
                clearInterval(intervalSetNoticiasHeight);
            }
        }, 200);
        //Anima a aparicao das noticias
        $("#divConteudoDinamicoNoticias").fadeIn();
    }

    //Lista todas as noticias em ordem de data de publicacao e sem filtro por editoria
    listaNoticias("data", "");

    //Lista as noticias novamente em caso de alteracao de algum select
    $("#spanSelectsEditorias select").change(function() {
        var valOrdem = $("#selectOrdenarEditoria").val();
        var valFiltro = $("#selectFiltrarEditoria").val();
        listaNoticias(valOrdem, valFiltro);
    });
    //END - Editoria


    //BEGIN - Grafico
    var dataGrafico = [
        {'editoria': 'Carnaval', 'valor': 50},
        {'editoria': 'Férias', 'valor': 30},
        {'editoria': 'Governo', 'valor': 75},
        {'editoria': 'Esporte', 'valor': 45},
        {'editoria': 'Outros', 'valor': 25}
    ];

    //Ordena o array por maior valor e o armazena em um novo
    var dataGraficoOrdenado = [];
    dataGraficoOrdenado = dataGrafico.sort(function(a, b) {
        return a.valor > b.valor ? -1 : a.valor < b.valor ? 1 : 0;
    });

    //Pega os nomes das editorias e seus valores e os coloca em um array preparado para o Highcharts
    var dataHighcharts = [];
    $.each(dataGraficoOrdenado, function(key, value) {
        if (key == 0) {
            dataHighcharts.push({"name": value.editoria, "y": value.valor, "color": "#ce282b", "dataLabels": { "color": "#ce282b" }});
        }
        else {
            dataHighcharts.push({"name": value.editoria, "y": value.valor});
        }
    });

    //BEGIN - Highcharts
    Highcharts.chart('divGrafico', {
        chart: { type: 'column' },
        title: { text: '' },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: { text: '' },
            labels: { enabled: false }
        },
        legend: { enabled: false },
        tooltip: { enabled: false },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: { enabled: true }
            }
        },
        colors: ['black'],
        series: [{
            name: 'Editorias',
            colorByPoint: true,
            data: dataHighcharts
        }]
    });
    //END - Highcharts

    //Altera visualmente o Highcharts
    $(".highcharts-grid.highcharts-yaxis-grid, .highcharts-axis.highcharts-xaxis, .highcharts-credits").hide();
    //END - Grafico

});
