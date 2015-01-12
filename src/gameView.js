/**
 * Created by Deepak Sisodiya on 12/01/15.
 */


var GameView = function (config) {
  this.config = config;
  this.$ = document.getElementById(this.config.id);
  this.init();
};

GameView.prototype = {
  init: function () {
    var self = this;
    document.getElementById("submit").onclick = function () {
      var size = document.getElementById("size").value;
      if (size >= 3 && size <= 100) {
        self.gameObj = new Game([], size, "X");
        self.render();
        document.getElementById("restart").style.display = "block";
        document.getElementById("save").style.display = "block";
        document.getElementById("load").style.display = "block";
      } else {
        alert("Please Enter Size Between 3 to 100");
      }
    };
    document.getElementById("restart").onclick = function () {
      self.gameObj.startGame();
      self.render();
    };
    document.getElementById("save").onclick = function () {
      self.gameObj.saveGameToLocalStorage();
    };
    document.getElementById("load").onclick = function () {
      self.gameObj.loadGameFromLocalStorage();
      self.render();
    };
  },
  render: function () {
    var self = this;
    var table = document.createElement("table");
    table.setAttribute("border", "1px solid black");
    table.setAttribute("id", "board");
    for (var g = 0; g < parseInt(this.gameObj.size); g++) {
      var tr = document.createElement("tr");
      table.appendChild(tr);
      var row = this.gameObj.dataStore[g];
      for (var h = 0; h < row.length; h++) {
        var td = document.createElement("td");
        td.width = td.height = 50;
        td.align = td.vAlign = "center";
        td.innerHTML = row[h];
        td.onclick = (function(g,h) {
          return function() {
            self.gameObj.mark(g,h, self);
          }
        })(g+1, h+1);
        tr.appendChild(td);
      }
    }
    this.$.innerHTML = "";
    this.$.appendChild(table);
  }
};

GameView.prototype.constructor = GameView;