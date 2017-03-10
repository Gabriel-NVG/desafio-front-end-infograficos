## Requerimentos
* [Node.js](https://nodejs.org/) v4.4.0 ou superior

## Para executar o projeto, existem duas opções
1. Na linha de comando, navegar até o diretório do projeto e rodar:
    ```sh
    $ npm start
    ```
    Após, acessar [http://localhost:3000/](http://localhost:3000/)

2. Acessar [http://www.gowebit.com.br/desafio-front-end-infograficos/index.html](http://www.gowebit.com.br/desafio-front-end-infograficos/index.html)

## Observações
* Os dados que populam o gráfico dinâmico, se encontram na variável "dataGrafico" dentro do "main.js".
* Optei pelo uso do jQuery como framework JS por ter sido o único framework mencionado nas instruções (mais especificamente na parte do slide).
* Apesar de não ser mais organizado a nível de código, preferi deixar todo o JS e o CSS em um único arquivo para cada, a fim de melhorar o desempenho do request da página.
* Mesmo não tendo sido requisitado, tomei a liberdade de adicionar um favicon e metatags pois acredito serem sempre importantes para qualquer página na web.
* Não fiz a width responsiva propositalmente, a fim de seguir com exatidão a width presente no PSD.
* O uso do Node.js no projeto se limita somente a se ter um servidor para permitir os HTTP request dos json locais.
