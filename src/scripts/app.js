let personagem, person, person1, person2, person3
let grama, ocarina, espada, chave, porta, block, logo

let pxOcarina = 512
let pxEspada = 512
let pxChave = 256
let pxArvore1 = 448
let pxArvore2 = 512
let itens = 0

let som, songOfTime, title

let tocarOcarina = false

const tamanho = 64
const passo = 64

let andarX = 0
let andarY = 0

let botao, cima, baixo, esquerda, direita

function preload() {
  soundFormats('mp3')
  som = loadSound('src/sounds/hyrule-field.mp3')
  songOfTime = loadSound('src/sounds/song-of-time.mp3')
  title = loadSound('src/sounds/title-theme.mp3')

  person1 = loadImage('src/assets/p1.png')
  person2 = loadImage('src/assets/p2.png')
  person3 = loadImage('src/assets/p3.png')
  grama = loadImage('src/assets/grama.png')
  ocarina = loadImage('src/assets/ocarina.png')
  espada = loadImage('src/assets/espada.png')
  chave = loadImage('src/assets/chave.png')
  porta = loadImage('src/assets/porta.png')
  logo = loadImage('src/assets/logo.png')
  block = loadImage('src/assets/arvore.png')
  person = loadImage('src/assets/person.png')
}

function setup() {
  const jogo = document.getElementById('jogo')
  const canvas = createCanvas(576, 576)
  canvas.parent(jogo)

  som.play()

  personagem = person1

  botao = document.querySelector(".botao")
  botao.style.display = "none"

}

function draw() {
  background(220)

  if (andarX < 0) {
    andarX = 0
  }

  if (andarY < 0) {
    andarY = 0
  }

  if (andarX > tamanho * 8) {
    andarX = tamanho * 8
  }

  if (andarY > tamanho * 8) {
    andarY = tamanho * 8
  }

  if (andarX >= pxArvore1 && andarY === 0 && personagem === person1) {
    andarX = 384
  }

  if (andarX >= pxArvore2 && andarY === 64 && personagem === person1) {
    andarX = 448
  }

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      image(grama, 64 * x, 64 * y, tamanho, tamanho)
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
    somDoTempo()
  }

  if (tocarOcarina) {
    image(person, 100, 0)
  }

  image(personagem, andarX, andarY, tamanho, tamanho)

  if (andarX === tamanho * 8 && andarY === tamanho * 8 && itens === 3) {
    image(logo, -100, tamanho * 8 / 4)
    botao.style.display = 'inline-block'
    noLoop()
    som.stop()
    title.play()
  } else if (andarX === tamanho * 8 && andarY === tamanho * 8 && itens !== 3) {
    noStroke()
    rect(125, 260, 300, 70)
    textSize(17)
    text('NÃO PODE ENFRENTAR O CHEFÃO', 130, 300)
  }
}

function somDoTempo() {
  som.pause()
  songOfTime.play()

  setTimeout(() => {
    tocarOcarina = false
    som.play()
    songOfTime.stop()
  }, 10000)
}

function andarCima() {
  if (!tocarOcarina) {
    andarY -= passo
  }
}

function andarBaixo() {
  if (!tocarOcarina) {
    andarY += passo
  }
}

function andarEsquerda() {
  if (!tocarOcarina) {
    andarX -= passo
  }
}

function andarDireita() {
  if (!tocarOcarina) {
    andarX += passo
  }
}

function reset() {
  andarX = 0
  andarY = 0
  loop()
  botao.style.display = "none"
  title.stop()
  som.play()
  personagem = person1
  pxEspada = 512
  pxOcarina = 512
  pxChave = 256
  pxArvore1 = 448
  pxArvore2 = 512
  itens = 0
}

function keyPressed() {
  if (!tocarOcarina) {
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
