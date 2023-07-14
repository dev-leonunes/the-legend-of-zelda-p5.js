let personagem
let p1
let p2
let grama
let coraçao
let espada
let chave
let porta

let posiçaoDoCoraçao = 512
let posiçaoDaEspada = 512
let posiçaoDaChave = 256
let itens = 0

const tamanho = 64
const passo = 64

let andarX = 0
let andarY = 0

let botao

//executa apenas uma vez ao iniciar o programa
function setup() {
  createCanvas(576, 576);
  p1 = loadImage('p1.png');
  p2 = loadImage('p2.png');
  grama = loadImage('grama.jpg');
  coraçao = loadImage('coraçao.png')
  espada = loadImage('espada.png')
  chave = loadImage('chave.png')
  porta = loadImage('porta.png')
  personagem = p1
}

//fica executando em loop até que o programa seja encerrado
function draw() {
  background(220);
  
  if (andarX < 0) {
    andarX = 0;
  }
  
  if (andarY < 0) {
    andarY = 0;
  }
  
  if (andarX > tamanho*8) {
    andarX = tamanho*8;
  }
  
  if (andarY > tamanho*8) {
    andarY = tamanho*8;
  }
  
  for(let x = 0; x < 9; x++) {
    for(let y = 0; y < 9; y++) {
      image(grama, 64*x, 64*y, tamanho, tamanho);
    }
  }
  
  image(coraçao, posiçaoDoCoraçao, 0, tamanho, tamanho)
  image(espada, 0, posiçaoDaEspada, tamanho, tamanho)
  image(chave, posiçaoDaChave, posiçaoDaChave, tamanho, tamanho)
  image(porta, 512, 512, tamanho, tamanho)
  
  
  if(andarX === posiçaoDoCoraçao && andarY === 0) {
    posiçaoDoCoraçao = 1000
    itens ++
  }
  
  if(andarX === 0 && andarY === posiçaoDaEspada) {
    personagem = p2
    posiçaoDaEspada = 1000
    itens ++
  } else {
    image(personagem, andarX, andarY, tamanho, tamanho);
  }
  
  if(andarX === posiçaoDaChave && andarY === posiçaoDaChave) {
    posiçaoDaChave = 1000
    itens ++
  }
  
  if(andarX === tamanho*8 && andarY === tamanho*8 && itens === 3) {
    //criar um retangulo
    rect (160, 260, 260, 100)
    //escrever um texto GANHOU
    textSize(17)
    text('PODE ENFRENTAR O CHEFÃO', 165, 300)
    //criar um botão
    botao = createButton('Reiniciar')
    botao.position(250, 320)
    //resetar o jogo
    botao.mousePressed(reset)
    //parar o jogo
    noLoop()
  } else if (andarX === tamanho*8 && andarY === tamanho*8 && itens !== 3) {
    rect (125, 260, 300, 70)
    textSize(17)
    text('NÃO PODE ENFRENTAR O CHEFÃO', 130, 300)
  }
}

function reset() {
  andarX = 0
  andarY = 0
  botao.remove()
  loop()
  personagem = p1
  posiçaoDaEspada = 512
  posiçaoDoCoraçao = 512
  posiçaoDaChave = 256
  itens = 0
}

//executa sempre que uma tecla for pressionada
function keyPressed() {
  if (keyIsDown(UP_ARROW)) {
    andarY -= passo
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    andarY += passo
  }
  
  if (keyIsDown(LEFT_ARROW)) {
    andarX -= passo
  }
  
  if (keyIsDown(RIGHT_ARROW)) {
    andarX += passo
  }
}