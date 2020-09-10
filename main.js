const score = document.querySelector('.score'),
start = document.querySelector('.start'),
gameArea = document.querySelector('.gameArea'),
car = document.createElement('div');
car.classList.add('car');

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

const settings = { //настройки
  start: false,
  score: 0,
  speed: 6,
  traffic: 4
};

function getQuantityElementElements(heightElement){
  return document.documentElement.clientHeight / heightElement +1;
}

function startGame(){  //скрывает текст начала и добавляет машинку
  start.classList.add('hide');
  gameArea.classList.remove('hide');
  gameArea.innerHTML = '';
  
  for (let i = 0; i < getQuantityElementElements(50); i++){
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i *100) + 'px';
    line.y = i*100;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElementElements(100 * settings.traffic); i++){
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -100 * settings.traffic * (i+1);
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) +'px';
    enemy.style.top = enemy.y +'px';
    gameArea.appendChild(enemy);
  }

  settings.score = 0;
  settings.start = true;
  gameArea.appendChild(car);
  car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
  car.style.top = 'auto';
  car.style.bottom = '10px';
  requestAnimationFrame(playGame);
  settings.x = car.offsetLeft;
  settings.y = car.offsetTop
};

function playGame() { //анимирует
  moveRoad();
  moveEnemy();
  if (settings.start) {
    settings.score += settings.speed*settings.traffic;
    score.innerHTML = 'Score<br>' + settings.score;
    if (keys.ArrowLeft && settings.x > 0) {
      settings.x -= settings.speed /2;
    }
    if (keys.ArrowRight && settings.x <(gameArea.offsetWidth - 50)){
      settings.x += settings.speed /2;
    }
    if (keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)){
      settings.y +=settings.speed /2;
    }
    if(keys.ArrowUp && settings.y > 0){
      settings.y -= settings.speed /2;
    }
    car.style.left = settings.x + 'px';
    car.style.top = settings.y + 'px';
    requestAnimationFrame(playGame);
  }
};

function startRun(event){ //начинает движение машинки, если нажата стрелочка
  event.preventDefault();
  keys[event.key] = true;
};

function stopRun(event) { //прекращает движение машинки, если стрелочка отжата
  event.preventDefault();
  keys[event.key] = false;
};

function moveRoad(){
  let lines = document.querySelectorAll('.line');
  lines.forEach(function(line, i){
    line.y += settings.speed;
    line.style.top = line.y + 'px';
    if (line.y >= document.documentElement.clientHeight){
      line.y = -100;
    }
  }
  )
}

function moveEnemy(){
  let enemy = document.querySelectorAll('.enemy');
  enemy.forEach(function(item){
    let carRect = car.getBoundingClientRect();
    let enemyRect = item.getBoundingClientRect();

    if (carRect.top <= enemyRect.bottom && carRect.bottom >= enemyRect.top && carRect.right >= enemyRect.left && carRect.left <= enemyRect.right) {
      settings.start = false;
      start.classList.remove('hide');
      start.style.top = score.offsetHeight;
    }

    item.y += settings.speed /2;
    item.style.top = item.y + "px";
    if (item.y >= document.documentElement.clientHeight){
    item.y = -100 * settings.traffic;
    item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
  }
  });

  
}

start.addEventListener('click', startGame); //запускает функцию startGame при клике мышью

document.addEventListener('keydown', startRun); //запускает функцию startRun при нажатии любой клавиши на клавиатуре
document.addEventListener('keyup', stopRun); //запускает функцию startRun при отпускании любой клавиши на клавиатуре