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
      if (el.classList.contains("tile-6-1")) {
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
  this.maze[this.heroPos].classList.remove("tile-1-7");
  this.maze[this.heroPos].classList.remove("tile-1-7");
  this.maze[this.heroPos].classList.remove("tile-1-7");
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

  const tilesToMatch = [
    "tile-1-1",
    "tile-1-2",
    "tile-1-3",
    "tile-1-4",
    "tile-1-5",
    "tile-1-6",
    "tile-2-1",
    "tile-2-2",
    "tile-2-3",
    "tile-2-4",
    "tile-2-5",
    "tile-2-6",
    "tile-3-1",
    "tile-3-2",
    "tile-3-3",
    "tile-3-4",
    "tile-3-5",
    "tile-3-6",
    "tile-4-1",
    "tile-4-2",
    "tile-4-3",
    "tile-4-4",
    "tile-4-5",
    "tile-5-1",
    "tile-5-2",
    "tile-5-3",
    "tile-5-4",
    "tile-5-5",
    "tile-5-6",
    "tile-5-7",
    "tile-5-8",
    "tile-6-1",
    "tile-6-2",
    "tile-6-7",
    "tile-6-8",
    "tile-7-1",
    "tile-7-2",
    "tile-7-3",
    "tile-7-4",
    "tile-7-5",
    "tile-7-6",
    "tile-7-7",
    "tile-7-8",
    "tile-8-1",
    "tile-8-2",
    "tile-8-3",
    "tile-8-4",
    "tile-8-5",
    "tile-8-6",
    "tile-8-7",
    "tile-8-8",
  ];

  const regexPattern = new RegExp(`${tilesToMatch.join("|")}`);

  // before moving
  if (nextStep) {
    if (nextStep.match(/tile-4-7|tile-4-8/)) {
      this.setMessage("ai, isso dói!");
      return;
    }
    if (nextStep.match(regexPattern)) {
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
  this.maze[this.heroPos]?.classList.remove("tile-6-1");
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
  }, 1000);
};
Mazing.prototype.walkLeft = function (pCounter) {
  setTimeout(() => {
    var tryPos = new Position(this.heroPos.x, this.heroPos.y);
    this.mazeContainer.classList.remove("face-right");
    tryPos.y--;
    this.tryMoveHero(tryPos);
  }, 1000);
};
Mazing.prototype.walkRight = function (pCounter) {
  setTimeout(() => {
    var tryPos = new Position(this.heroPos.x, this.heroPos.y);
    this.mazeContainer.classList.add("face-right");
    tryPos.y++;
    this.tryMoveHero(tryPos);
  }, 1000);
};
Mazing.prototype.walkDown = function (pCounter) {
  setTimeout(() => {
    var tryPos = new Position(this.heroPos.x, this.heroPos.y);
    tryPos.x++;
    this.tryMoveHero(tryPos);
  }, 1000);
};

export default Mazing;
