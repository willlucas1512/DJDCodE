function Position(x, y) {
  this.x = x;
  this.y = y;
}

Position.prototype.toString = function () {
  return this.x + ":" + this.y;
};

export function Mazing(id) {
  // bind to HTML element
  this.mazeContainer = document.getElementById(id);

  this.mazeScore = document.createElement("div");
  this.mazeScore.id = "maze_score";

  this.mazeMessage = document.createElement("div");
  this.mazeMessage.id = "maze_message";

  this.heroScore = this.mazeContainer.getAttribute("data-steps") - 2;

  this.maze = [];
  this.heroPos = {};
  this.heroHasKey = false;
  this.childMode = false;

  this.utter = null;

  for (var i = 0; i < this.mazeContainer.children.length; i++) {
    for (var j = 0; j < this.mazeContainer.children[i].children.length; j++) {
      var el = this.mazeContainer.children[i].children[j];
      this.maze[new Position(i, j)] = el;
      if (el.classList.contains("entrance")) {
        // place hero at entrance
        this.heroPos = new Position(i, j);
        this.maze[this.heroPos].classList.add("hero");
      }
    }
  }

  var mazeOutputDiv = document.createElement("div");
  mazeOutputDiv.id = "maze_output";

  mazeOutputDiv.appendChild(this.mazeScore);
  mazeOutputDiv.appendChild(this.mazeMessage);

  mazeOutputDiv.style.width = this.mazeContainer.scrollWidth + "px";
  this.setMessage("encontre a chave");

  this.mazeContainer.insertAdjacentElement("afterend", mazeOutputDiv);

  // activate control keys
  this.keyPressHandler = this.mazeKeyPressHandler.bind(this);
  document.addEventListener("keydown", this.keyPressHandler, false);
}

Mazing.prototype.enableSpeech = function () {
  this.utter = new SpeechSynthesisUtterance();
  this.setMessage(this.mazeMessage.innerText);
};

Mazing.prototype.setMessage = function (text) {
  this.mazeMessage.innerHTML = text;
  this.mazeScore.innerHTML = this.heroScore;
  if (this.utter) {
    this.utter.text = text;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(this.utter);
  }
};

Mazing.prototype.heroTakeTreasure = function () {
  this.maze[this.heroPos].classList.remove("nubbin");
  this.heroScore += 10;
  this.setMessage("uhu, tesouro!");
};

Mazing.prototype.heroTakeKey = function () {
  this.maze[this.heroPos].classList.remove("key");
  this.heroHasKey = true;
  this.heroScore += 20;
  this.mazeScore.classList.add("has-key");
  this.setMessage("agora você tem a chave!");
};

Mazing.prototype.gameOver = function (text) {
  // de-activate control keys
  document.removeEventListener("keydown", this.keyPressHandler, false);
  this.setMessage(text);
  this.mazeContainer.classList.add("finished");
};

Mazing.prototype.heroWins = function () {
  this.mazeScore.classList.remove("has-key");
  this.maze[this.heroPos].classList.remove("door");
  this.heroScore += 50;
  this.gameOver("você completou o labirinto!!!");
};

Mazing.prototype.tryMoveHero = function (pos) {
  if ("object" !== typeof this.maze[pos]) {
    return;
  }

  var nextStep = this.maze[pos].className;

  // before moving
  if (nextStep.match(/sentinel/)) {
    this.heroScore = Math.max(this.heroScore - 5, 0);
    if (!this.childMode && this.heroScore <= 0) {
      this.gameOver("poxa, não deu");
    } else {
      this.setMessage("ai, isso dói!");
    }
    return;
  }
  if (nextStep.match(/wall/)) {
    return;
  }
  if (nextStep.match(/exit/)) {
    if (this.heroHasKey) {
      this.heroWins();
    } else {
      this.setMessage("você precisa da chave para abrir a porta");
      return;
    }
  }

  // move hero one step
  this.maze[this.heroPos].classList.remove("hero");
  this.maze[pos].classList.add("hero");
  this.heroPos = pos;

  // after moving
  if (nextStep.match(/nubbin/)) {
    this.heroTakeTreasure();
    return;
  }
  if (nextStep.match(/key/)) {
    this.heroTakeKey();
    return;
  }
  if (nextStep.match(/exit/)) {
    return;
  }
  if (this.heroScore >= 1) {
    if (!this.childMode) {
      this.heroScore--;
    }
    if (!this.childMode && this.heroScore <= 0) {
      this.gameOver("poxa, não deu");
    } else {
      this.setMessage("...");
    }
  }
};

Mazing.prototype.walkUp = function () {
  console.log(this.heroPos);
  var tryPos = new Position(this.heroPos.x, this.heroPos.y);
  tryPos.x--;
  console.log(tryPos);
  this.tryMoveHero(tryPos);
};
Mazing.prototype.walkLeft = function () {
  var tryPos = new Position(this.heroPos.x, this.heroPos.y);
  this.mazeContainer.classList.remove("face-right");
  tryPos.y--;
  this.tryMoveHero(tryPos);
};
Mazing.prototype.walkRight = function () {
  var tryPos = new Position(this.heroPos.x, this.heroPos.y);
  this.mazeContainer.classList.add("face-right");
  tryPos.y++;
  this.tryMoveHero(tryPos);
};
Mazing.prototype.walkDown = function () {
  var tryPos = new Position(this.heroPos.x, this.heroPos.y);
  tryPos.x++;
  this.tryMoveHero(tryPos);
};

Mazing.prototype.mazeKeyPressHandler = function (e) {
  var tryPos = new Position(this.heroPos.x, this.heroPos.y);
  switch (e.keyCode) {
    case 37: // left
      this.walkLeft(tryPos);
      break;

    case 38: // up
      this.walkUp(tryPos);
      // tryPos.x--;
      break;

    case 39: // right
      this.walkRight(tryPos);
      break;

    case 40: // down
      this.walkDown(tryPos);
      break;

    default:
      return;
  }
  this.tryMoveHero(tryPos);
  e.preventDefault();
};

Mazing.prototype.setChildMode = function () {
  this.childMode = true;
  this.heroScore = 0;
  this.setMessage("colete todo o tesouro");
};

export default Mazing;
