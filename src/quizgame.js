class quizgame {
  constructor({ tela, util }) {
    this.tela = tela
    this.util = util
    this.aleatorias = [
      {img: './arquivos/aleatorias/1.png', id: 1, nome: 'correta'},
      {img: './arquivos/aleatorias/2.png', id: 2, nome: 'correta'},
      {img: './arquivos/aleatorias/3.png', id: 3, nome: 'correta'},
      {img: './arquivos/aleatorias/4.png', id: 4, nome: 'correta'},
      {img: './arquivos/aleatorias/5.png', id: 5, nome: 'correta'},
      {img: './arquivos/aleatorias/6.png', id: 6, nome: 'correta'},
      {img: './arquivos/aleatorias/7.png', id: 7, nome: 'correta'},
      {img: './arquivos/aleatorias/8.png', id: 8, nome: 'correta'},
      {img: './arquivos/aleatorias/9.png', id: 9, nome: 'correta'},
      {img: './arquivos/aleatorias/10.png', id: 10, nome: 'correta'},
      {img: './arquivos/aleatorias/11.png', id: 11, nome: 'correta'},
      {img: './arquivos/aleatorias/12.png', id: 12, nome: 'correta'},
      {img: './arquivos/aleatorias/13.png', id: 13, nome: 'correta'},
      {img: './arquivos/aleatorias/14.png', id: 14, nome: 'correta'},
      {img: './arquivos/aleatorias/15.png', id: 15, nome: 'correta'}
    ]
    this.perguntas = [
      {img: './arquivos/perguntas/Pergunta1.png', id: 1},
      {img: './arquivos/perguntas/Pergunta2.png', id: 2},
      {img: './arquivos/perguntas/Pergunta3.png', id: 3},
      {img: './arquivos/perguntas/Pergunta4.png', id: 4},
      {img: './arquivos/perguntas/Pergunta5.png', id: 5},
      {img: './arquivos/perguntas/Pergunta6.png', id: 6},
      {img: './arquivos/perguntas/Pergunta7.png', id: 7},
      {img: './arquivos/perguntas/Pergunta8.png', id: 8},
      {img: './arquivos/perguntas/Pergunta9.png', id: 9}
    ]

    this.respostas = [
      {img: './arquivos/respostas/Resposta1.png', id: 1, nome: 'resposta'},
      {img: './arquivos/respostas/Resposta2.png', id: 2, nome: 'resposta'},
      {img: './arquivos/respostas/Resposta3.png', id: 3, nome: 'resposta'},
      {img: './arquivos/respostas/Resposta4.png', id: 4, nome: 'resposta'},
      {img: './arquivos/respostas/Resposta5.png', id: 5, nome: 'resposta'},
      {img: './arquivos/respostas/Resposta6.png', id: 6, nome: 'resposta'},
      {img: './arquivos/respostas/Resposta7.png', id: 7, nome: 'resposta'},
      {img: './arquivos/respostas/Resposta8.png', id: 8, nome: 'resposta'},
      {img: './arquivos/respostas/Resposta9.png', id: 9, nome: 'resposta'}
    ]

    this.selecionadas = []

    this.heroisEscondidos = []
    //this.pontuacao = 0;
    this.paresEncontrados = new Set();
    this.emProcesso = false;
   // this.atualizarPontuacaoNaTela();
    this.heroisSelecionados = []
  }
  //para usar o this, não podemos usar static!!
  inicializar() {
    this.tela.atualizarPergunta(this.escolherPergunta());
    this.tela.atualizarImagens(this.juntaAleatoriasRespostas())
    this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))
  }


  juntaAleatoriasRespostas()
  {
    var obj = this.aleatorias;
    var selecionadas = [];

    for (var i = 0; i < 11; i++) {

      var indiceAleatorio = Math.floor(Math.random() * obj.length);


      selecionadas.push(obj[indiceAleatorio]);

      //obj.splice(indiceAleatorio, 1);
    }

    var num;
    if(document.getElementById('secao') != undefined)
    {
      if(parseInt(document.getElementById('secao').innerText) == 1)
      {
        num = 0;
      }
      else
      {
        num = parseInt(document.getElementById('secao').innerText) - 1;
      }
    }

    selecionadas.push(this.respostas[num]);

    this.embaralharArray(selecionadas);
    return selecionadas;
  }


  embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  escolherPergunta() {

    var num = 1;
    if(document.getElementById('secao'))
    {
      num = parseInt(document.getElementById('secao').innerText) + 1;
    }

    const perguntaSelecionada = this.perguntas.find(({ id }) => num === id)
  
    if(num > 1)
    {
      this.atualizaSecao(perguntaSelecionada.id)
    }
    else
    {
      this.criarSecao(perguntaSelecionada.id)
    }
    return perguntaSelecionada
      
  }
  
  criarSecao(perguntaSorteada) {
    var novaSecao = document.createElement('div');

    novaSecao.classList.add('secao');
    novaSecao.style.display = 'none'; 
    novaSecao.id = 'secao'; 

    novaSecao.textContent = perguntaSorteada;

    document.body.appendChild(novaSecao);
  }

  atualizaSecao(id)
  {
    var secao = document.getElementById('secao');
    secao.textContent = id;
    document.body.appendChild(secao);

  }

  proximafase()
  {
    var pergunta = this.escolherPergunta()

    switch (pergunta.id) {
      case 2:
        document.getElementById('titulo').innerText =  'Quiz das Matrizes (Barbadinha)'
        break;
      
      case 3:
        document.getElementById('titulo').innerText =  'Quiz das Matrizes (Normal)'
        break;

      case 4:
        document.getElementById('titulo').innerText =  'Quiz das Matrizes (Começando a esquentar)'
        break;


      case 5:
        document.getElementById('titulo').innerText =  'Quiz das Matrizes (Ta pegando fogo bixo)'
        break;

      case 6:
        document.getElementById('titulo').innerText =  'Quiz das Matrizes (Alien)'
        break;
      
      
      case 7:

      document.getElementById('titulo').innerText =  'Quiz das Matrizes (Semi-Deus)'
      break;

      case 8:
        document.getElementById('titulo').innerText =  'Quiz das Matrizes (GOD)'
        break;
      case 9:

        document.getElementById('titulo').innerText =  'Quiz das Matrizes (Bonus)'
        break;

    }


    this.tela.atualizarPergunta(pergunta)
    this.tela.atualizarImagens(this.juntaAleatoriasRespostas())
  }

  verificarSelecao(id, nome) {
    const item = { id, nome }

    if(item.nome == 'resposta')
    {
      if(item.id == 9)
      {
        alert("Parabens você ganhou!!!! Seu tempo foi de " + document.getElementById('contador').innerText + " Segundos");
        window.location.href = 'index.html';
      }
      else
      {
        alert("Você acertou!")
        this.proximafase()
        
       
      }
    }
    else
    {
      alert("Você errou!!! Foi adicionado 30 segundos em seu tempo!!")
      adicionarSegundos()
    }
  }

}