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

  this.mazeMessage = document.createElement("div");
  this.mazeMessage.id = "maze_message";

  this.maze = [];
  this.heroPos = {};
  this.heroHasKey = false;
  this.initialHeroPos = {};

  for (var i = 0; i < this.mazeContainer.children.length; i++) {
    for (var j = 0; j < this.mazeContainer.children[i].children.length; j++) {
      var el = this.mazeContainer.children[i].children[j];

      this.maze[new Position(i, j)] = el;
      if (el.classList.contains("tile-4-6")) {
        // place hero at entrance
        this.heroPos = new Position(i, j);
        this.initialHeroPos = new Position(i, j);
        this.maze[this.heroPos].classList.add("hero");
      }
    }
  }

  var mazeOutputDiv = document.createElement("div");
  mazeOutputDiv.id = "maze_output";

  mazeOutputDiv.appendChild(this.mazeMessage);

  mazeOutputDiv.style.width = this.mazeContainer.scrollWidth + "px";
  this.setMessage("encontre a chave");

  this.mazeContainer.insertAdjacentElement("afterend", mazeOutputDiv);
}

Mazing.prototype.setMessage = function (text) {
  this.mazeMessage.innerHTML = text;
};

Mazing.prototype.heroTakeTreasure = function () {
  this.maze[this.heroPos].classList.remove("nubbin");
  this.setMessage("uhu, tesouro!");
};

Mazing.prototype.heroTakeKey = function () {
  this.maze[this.heroPos].classList.remove("tile-1-8");
  this.maze[this.heroPos].classList.remove("tile-2-8");
  this.maze[this.heroPos].classList.remove("tile-3-8");
  this.heroHasKey = true;
  this.setMessage("agora você tem a chave!");
};

Mazing.prototype.gameOver = function (text) {
  this.setMessage(text);
  this.mazeContainer.classList.add("finished");
};

Mazing.prototype.heroWins = function () {
  // this.maze[this.heroPos].classList.remove("tile-6-3");
  // this.maze[this.heroPos].classList.remove("tile-6-4");
  // this.maze[this.heroPos].classList.remove("tile-6-5");
  // this.maze[this.heroPos].classList.remove("tile-6-6");
  this.gameOver("você completou o labirinto!!!");
};

Mazing.prototype.heroBackToStart = function () {
  this.maze[this.heroPos].classList.remove("hero");
  this.maze[this.initialHeroPos].classList.add("hero");
  this.heroPos = this.initialHeroPos;
};

Mazing.prototype.tryMoveHero = function (pos) {
  // if ("object" !== typeof this.maze[pos]) {
  //   return;
  // }

  var nextStep = this.maze[pos]?.className;

  // before moving
  if (nextStep) {
    if (nextStep.match(/sentinel/)) {
      this.setMessage("ai, isso dói!");
      return;
    }
    if (nextStep.match(/wall/)) {
      return;
    }
    if (nextStep.match(/tile-6-3|tile-6-4|tile-6-5|tile-6-6/)) {
      if (this.heroHasKey) {
        this.heroWins();
      } else {
        this.setMessage("você precisa da chave para abrir a porta");
        return;
      }
    }
  }
  // move hero one step
  this.maze[this.heroPos]?.classList.remove("hero");
  this.maze[pos]?.classList.add("hero");
  this.heroPos = pos;

  // after moving
  if (nextStep) {
    if (nextStep.match(/tile-1-7|tile-2-7|tile-3-7/)) {
      this.heroTakeTreasure();
      return;
    }
    if (nextStep.match(/tile-1-8|tile-2-8|tile-3-8/)) {
      this.heroTakeKey();
      return;
    }
    if (nextStep.match(/tile-6-3|tile-6-4|tile-6-5|tile-6-6/)) {
      return;
    }
  }
};

Mazing.prototype.walkUp = function (pCounter) {
  setTimeout(() => {
    var tryPos = new Position(this.heroPos.x, this.heroPos.y);
    tryPos.x--;
    this.tryMoveHero(tryPos);
  }, 1000 * pCounter);
};
Mazing.prototype.walkLeft = function (pCounter) {
  setTimeout(() => {
    var tryPos = new Position(this.heroPos.x, this.heroPos.y);
    this.mazeContainer.classList.remove("face-right");
    tryPos.y--;
    this.tryMoveHero(tryPos);
  }, 1000 * pCounter);
};
Mazing.prototype.walkRight = function (pCounter) {
  setTimeout(() => {
    var tryPos = new Position(this.heroPos.x, this.heroPos.y);
    this.mazeContainer.classList.add("face-right");
    tryPos.y++;
    this.tryMoveHero(tryPos);
  }, 1000 * pCounter);
};
Mazing.prototype.walkDown = function (pCounter) {
  setTimeout(() => {
    var tryPos = new Position(this.heroPos.x, this.heroPos.y);
    tryPos.x++;
    this.tryMoveHero(tryPos);
  }, 1000 * pCounter);
};

export default Mazing;
