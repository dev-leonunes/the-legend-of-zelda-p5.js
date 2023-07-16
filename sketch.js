let personagem
let person
let person1
let person2
let person3
let grama
let ocarina
let espada
let chave
let porta
let logo
let block

let pxOcarina = 512
let pxEspada = 512
let pxChave = 256
let pxArvore1 = 448
let pxArvore2 = 512
let itens = 0

let tocarOcarina = false

const tamanho = 64
const passo = 64

let andarX = 0
let andarY = 0

let botao
let cima
let baixo
let esquerda
let direita

//executa apenas uma vez ao iniciar o programa
function setup() {
  createCanvas(576, 576);
  person1 = loadImage('p1.png')
  person2 = loadImage('p2.png')
  person3 = loadImage('p3.png')
  grama = loadImage('grama.png')
  ocarina = loadImage('ocarina.png')
  espada = loadImage('espada.png')
  chave = loadImage('chave.png')
  porta = loadImage('porta.png')
  logo = loadImage('logo.png')
  block = loadImage('arvore.png')
  person = loadImage('person.png')

  personagem = person1;

  //criando botões
  cima = createButton('Cima')
  cima.mousePressed(andarCima)

  esquerda = createButton('Esquerda')
  esquerda.mousePressed(andarEsquerda)

  baixo = createButton('Baixo')
  baixo.mousePressed(andarBaixo)

  direita = createButton('Direita')
  direita.mousePressed(andarDireita)
}

//fica executando em loop até que o programa seja encerrado
function draw() {
  background(220)

  if (andarX < 0) {
    andarX = 0;
  }

  if (andarY < 0) {
    andarY = 0;
  }

  if (andarX > tamanho * 8) {
    andarX = tamanho * 8;
  }

  if (andarY > tamanho * 8) {
    andarY = tamanho * 8;
  }

  if (andarX >= pxArvore1 && andarY === 0 && personagem === person1) {
    andarX = 384
  }

  if (andarX >= pxArvore2 && andarY === 64 && personagem === person1) {
    andarX = 448
  }

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      image(grama, 64 * x, 64 * y, tamanho, tamanho);
    }
  }

  image(ocarina, pxOcarina, 0, tamanho, tamanho)
  image(espada, 0, pxEspada, tamanho, tamanho)
  image(chave, pxChave, pxChave, tamanho, tamanho)
  image(porta, 512, 512, tamanho, tamanho)
  image(block, pxArvore1, 0, tamanho, tamanho)
  image(block, pxArvore2, 64, tamanho, tamanho)

  if (andarX === 0 && andarY === pxEspada) {
    pxEspada = 1000
    itens++
    personagem = person2
  }

  if (andarX === pxArvore1 && andarY === 0 && personagem === person2 || personagem === person3) {
    pxArvore1 = 1000
  }
  if (andarX === pxArvore2 && andarY === 64 && personagem === person2 || personagem === person3) {
    pxArvore2 = 1000
  }

  if (andarX === pxChave && andarY === pxChave) {
    pxChave = 1000
    itens++
  }

  if (andarX === pxOcarina && andarY === 0) {
    pxOcarina = 1000
    itens++
    personagem = person3
    tocarOcarina = true

    setTimeout(() => {
      tocarOcarina = false
    }, 1000);
  }

  if (tocarOcarina === true) {
    image(person, 100, 0)
  }

  image(personagem, andarX, andarY, tamanho, tamanho)

  if (andarX === tamanho * 8 && andarY === tamanho * 8 && itens === 3) {
    image(logo, -100, tamanho * 8 / 4)
    botao = createButton('Reiniciar')
    botao.position(330, 355)
    botao.mousePressed(reset)
    noLoop()
  } else if (andarX === tamanho * 8 && andarY === tamanho * 8 && itens !== 3) {
    noStroke()
    rect(125, 260, 300, 70)
    textSize(17)
    text('NÃO PODE ENFRENTAR O CHEFÃO', 130, 300)
  }
}

//fazendo os botões funcionarem
function andarCima() {
  andarY -= passo
}

function andarBaixo() {
  andarY += passo
}

function andarEsquerda() {
  andarX -= passo
}

function andarDireita() {
  andarX += passo
}

function reset() {
  andarX = 0
  andarY = 0
  botao.remove()
  loop()
  personagem = person1
  pxEspada = 512
  pxOcarina = 512
  pxChave = 256
  pxArvore1 = 448
  pxArvore2 = 512
  itens = 0
}

//executa sempre que uma tecla for pressionada
function keyPressed() {
  if (tocarOcarina === false) {
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
}
