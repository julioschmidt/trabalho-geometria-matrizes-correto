function onLoad() {
  const dependencias = {
    tela: Tela,
    util: Util
  }
  const quiz = new quizgame(dependencias)
  quiz.inicializar()
  
}
window.onload = onLoad