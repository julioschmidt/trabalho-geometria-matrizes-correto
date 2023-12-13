function onLoad() {
  const dependencias = {
    tela: Tela, //a classe Tela é global
    util: Util
  }
  //inicializamos o jogo da memoria
  const quiz = new quizgame(dependencias)
  quiz.inicializar()
  

  // console.log(`Carregou a tela!!!`, Tela, JogoDaMemoria)
  // const heroi = {
    //sempre relativo ao index.hmtl
    // img: './arquivos/batman.png',
    // name: 'batman'
  // }

  // Tela.atualizarImagens([
  //   heroi,
  //   heroi,
  //   heroi,
  //   heroi
  // ])
// const codigoHTML = Tela.obterCodigoHTML(heroi)
// Tela.alterarConteudoHTML(codigoHTML.concat(codigoHTML).concat(codigoHTML))
}
window.onload = onLoad