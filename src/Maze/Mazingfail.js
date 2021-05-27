import React, { PureComponent } from "react";
import MazeContext from "./MazeContext";

function Position(x, y) {
  this.x = x;
  this.y = y;
}

Position.prototype.toString = function () {
  return this.x + ":" + this.y;
};

class Mazing extends PureComponent {
  static contextType = MazeContext;

  constructor(id) {
    super(id);
    this.mazeContainer = document.getElementById(id);

    this.mazeScore = document.createElement("div");
    this.mazeScore.id = "maze_score";

    this.mazeMessage = document.createElement("div");
    this.mazeMessage.id = "maze_message";

    this.heroScore = this.mazeContainer.getAttribute("data-steps") - 2;

    this.state = {
      heroPos: {},
    };
    this.maze = [];
    // this.heroPos = {};
    this.heroHasKey = false;
    this.childMode = false;

    this.utter = null;
  }

  enableSpeech = function () {
    this.utter = new SpeechSynthesisUtterance();
    this.setMessage(this.mazeMessage.innerText);
  };

  setMessage = function (text) {
    this.mazeMessage.innerHTML = text;
    this.mazeScore.innerHTML = this.heroScore;
    if (this.utter) {
      this.utter.text = text;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(this.utter);
    }
  };

  heroTakeTreasure = function () {
    this.maze[this.state.heroPos].classList.remove("nubbin");
    this.heroScore += 10;
    this.setMessage("yay, treasure!");
  };

  heroTakeKey = function () {
    this.maze[this.state.heroPos].classList.remove("key");
    this.heroHasKey = true;
    this.heroScore += 20;
    this.mazeScore.classList.add("has-key");
    this.setMessage("you now have the key!");
  };

  gameOver = function (text) {
    // de-activate control keys
    document.removeEventListener("keydown", this.keyPressHandler, false);
    this.setMessage(text);
    this.mazeContainer.classList.add("finished");
  };

  heroWins = function () {
    this.mazeScore.classList.remove("has-key");
    this.maze[this.state.heroPos].classList.remove("door");
    this.heroScore += 50;
    this.gameOver("you finished !!!");
  };

  tryMoveHero = function (pos) {
    if ("object" !== typeof this.maze[pos]) {
      return;
    }

    var nextStep = this.maze[pos].className;

    // before moving
    if (nextStep.match(/sentinel/)) {
      this.heroScore = Math.max(this.heroScore - 5, 0);
      if (!this.childMode && this.heroScore <= 0) {
        this.gameOver("sorry, you didn't make it");
      } else {
        this.setMessage("ow, that hurt!");
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
        this.setMessage("you need a key to unlock the door");
        return;
      }
    }

    // move hero one step
    this.maze[this.state.heroPos].classList.remove("hero");
    this.maze[pos].classList.add("hero");
    this.setState({ heroPos: pos });
    // this.heroPos = pos;

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
        this.gameOver("sorry, you didn't make it");
      } else {
        this.setMessage("...");
      }
    }
  };

  walkUp = function () {
    var tryPos = new Position(this.state.heroPos.x, this.state.heroPos.y);
    console.log("walkup de dentro");
    tryPos.x--;
  };
  walkLeft = function () {
    var tryPos = new Position(this.state.heroPos.x, this.state.heroPos.y);
    this.mazeContainer.classList.remove("face-right");
    tryPos.y--;
  };
  walkRight = function () {
    var tryPos = new Position(this.state.heroPos.x, this.state.heroPos.y);
    this.mazeContainer.classList.add("face-right");
    tryPos.y++;
  };
  walkDown = function () {
    var tryPos = new Position(this.state.heroPos.x, this.state.heroPos.y);
    tryPos.x++;
  };

  mazeKeyPressHandler = function (e) {
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

  setChildMode = function () {
    this.childMode = true;
    this.heroScore = 0;
    this.setMessage("collect all the treasure");
  };

  componentDidMount() {
    for (var i = 0; i < this.mazeContainer.children.length; i++) {
      for (var j = 0; j < this.mazeContainer.children[i].children.length; j++) {
        var el = this.mazeContainer.children[i].children[j];
        this.maze[new Position(i, j)] = el;
        if (el.classList.contains("entrance")) {
          // place hero at entrance
          this.setState({ heroPos: new Position(i, j) });
          // this.heroPos = new Position(i, j);
          this.maze[this.state.heroPos].classList.add("hero");
        }
      }
    }

    var mazeOutputDiv = document.createElement("div");
    mazeOutputDiv.id = "maze_output";

    mazeOutputDiv.appendChild(this.mazeScore);
    mazeOutputDiv.appendChild(this.mazeMessage);

    mazeOutputDiv.style.width = this.mazeContainer.scrollWidth + "px";
    this.setMessage("first find the key");

    this.mazeContainer.insertAdjacentElement("afterend", mazeOutputDiv);

    // activate control keys
    this.keyPressHandler = this.mazeKeyPressHandler.bind(this);
    document.addEventListener("keydown", this.keyPressHandler, false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.heroPos !== this.state.heroPos) {
      this.context.updateHeroPos(this.state.heroPos);
    }
  }

  render() {
    return <div></div>;
  }
}

export default Mazing;
