class quizgame {
  //se mandar um obj = { tela: 1, idade: 2, etc: 3}
  //constructor vao ignorar o resto e pegar somente a propriedade desejada
  //tela
  constructor({ tela, util }) {
    this.tela = tela
    this.util = util
    //caminho do arquivo sempre relativo ao index.html!!
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

      obj.splice(indiceAleatorio, 1);
    }

    var num = 0;
    console.log(document.getElementById('secao') != undefined)
    if(document.getElementById('secao') != undefined)
    {
      if(document.getElementById('secao').innerText == '1')
      {
        num = 0;
      }
      else
      {
        num = parseInt(document.getElementById('secao').innerText) + 1;
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
      num = document.getElementById('secao').innerText + 1;
    }

    const perguntaSelecionada = this.perguntas.find(({ id }) => num === id)
  
    this.criarSecao(perguntaSelecionada.id)
    return perguntaSelecionada
      
  }
  
  criarSecao(perguntaSorteada) {
    // Cria um novo elemento de seção (pode ser qualquer outro tipo de elemento)
    var novaSecao = document.createElement('div');

    // Adiciona uma classe à nova seção para aplicar estilos (opcional)
    novaSecao.classList.add('secao');
    novaSecao.style.display = 'none'; 
    novaSecao.id = 'secao'; 

    // Adiciona algum conteúdo à seção (pode ser texto, HTML, etc.)
    novaSecao.textContent = perguntaSorteada;

    // Adiciona a nova seção ao corpo do documento (ou ao elemento pai desejado)
    document.body.appendChild(novaSecao);
  }

  esconderHerois(herois) {
    this.tela.atualizarImagens(heroisOcultos)
    //guardamos os herois para trabalhar com eles depois
    this.heroisEscondidos = heroisOcultos
  }

  exibirHerois(nomeDoHeroi) {
    //vamos procurar esse heroi pelo nome em nossos heroisIniciais
    //vamos obter somente a imagem dele
    const { img } = this.heroisIniciais.find(({ nome }) => nomeDoHeroi === nome)
    //vamos criar a funcao na tela, para exibir somente o heroi selecionado
    this.tela.exibirHerois(nomeDoHeroi, img)
  }

  verificarSelecao(id, nome) {
    const item = { id, nome }

    if(item.nome == 'resposta')
    {
      this.proximafase()
    }
    console.log(item);
    // //vamos verificar a quantidade de herois selecionados
    // //e tomar ação se escolheu certo ou errado
    // const heroisSelecionados = this.heroisSelecionados.length
    // let itemHTML = document.getElementById(id)
    // itemHTML.classList.add('border')
    // itemHTML.classList.add('border-success')
    // switch(heroisSelecionados) {
    //   case 0:
    //     //adiciona a escolha na lista, esperando pela próxima
    //     //clicada
    //     this.heroisSelecionados.push(item)
    //     break;
    //   case 1:
    //     itemHTML.classList.remove('border')
    //     itemHTML.classList.remove('border-success')

    //     this.heroisSelecionados.forEach(item => { 
    //       itemHTML = document.getElementById(item.id)
    //       itemHTML.classList.remove('border-3')
    //     itemHTML.classList.remove('border-success')
    //     })
    //     //se a quantidade for 1, significa
    //     //que o usuario só pode escolher mais um
    //     //vamos obter o primeiro item da lista
    //     const [opcao1] = this.heroisSelecionados //extrai somente a posição 0, pois nao foi informado indice
    //     //zerar itens para nao selecionar mais de dois
    //     this.heroisSelecionados = []
    //     //conferimos se os nomes e ids batem conforme
    //     //o esperado

    //     // Verifica se o par já foi encontrado ou está em processo de verificação
    //     if (this.paresEncontrados.has(nome) || this.emProcesso) {
    //       return; // Se o par já foi encontrado ou está em processo de verificação, não faz nada
    //     }

    //     if (opcao1.nome === item.nome && opcao1.id !== item.id) {
    //       this.exibirHerois(item.nome);
    //       this.tela.exibirMensagem();

    //       // Incrementar a pontuação quando houver uma combinação correta
    //      //this.pontuacao += 10; // Por exemplo, você pode ajustar a pontuação aqui
    //       //this.atualizarPontuacaoNaTela(); // Chame a função para atualizar a pontuação na tela
    //       this.paresEncontrados.add(opcao1.nome);
    //       this.paresEncontrados.add(item.nome);

    //       this.emProcesso = true;

    //       //se achar a resposta correta
    //       if(this.pontuacao == 40) 
    //       {

    //         alert("Parabéns você concluiu essa fase!!!!");
    //       }

    //       setTimeout(() => {
    //         this.emProcesso = false;
    //       }, 5000); // Tempo de espera para virar os cartões novamente (1 segundo)

    //       return;
    //     }

    //     this.tela.exibirMensagem(false)
    //     //fim do case!
    //     break;
    // }
  }

  // Adicione um método para atualizar a pontuação na tela
  // atualizarPontuacaoNaTela() {
  //   const pontuacaoElement = document.getElementById('pontuacao');
  //   pontuacaoElement.textContent = `Pontuação: ${this.pontuacao}`;
  // }

  mostrarHeroisEscondidos() {
    //vamos pegar todos os herois da tela e colocar seu
    //respectivo valor correto
    const heroisEscondidos = this.heroisEscondidos
    for (const heroi of heroisEscondidos) {
      const { img } = this.heroisIniciais.find(item => item.nome === heroi.nome)
      heroi.img = img
    }
    this.tela.atualizarImagens(heroisEscondidos)
  }


}