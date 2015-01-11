/**
 * Created by Deepak Sisodiya on 10/01/15.
 */


function Game(dataStore, size, turn) {
  this.dataStore = dataStore;
  this.size= size;
  this.turn = turn;
}

Game.prototype = {

  setBoardSize: function (n) {
    this.size = n;
  },

  startGame: function () {
    this.dataStore = [];
    for (var j = 0; j < this.size; j++) {
      var x = [];
      for (var i = 0; i < this.size; i++) {
        x.push(" ");
      }
      this.dataStore.push(x);
    }
    this.render();
  },

  mark: function (rowNumber, columnNumber) {
    if(this.dataStore[rowNumber - 1][columnNumber - 1] === " ") {
      this.dataStore[rowNumber - 1][columnNumber - 1] = this.turn;
      this.render();
      this.checkWin(this.turn);
      this.changePlayer(this.turn);
      return true;
    } else {
      return false;
    }
  },

  changePlayer: function (turn) {
    if (turn === "X") {
      this.turn = "O"
    }
    if (turn === "O") {
      this.turn = "X";
    }
  },

  checkWin: function (turn) {

    for (var a = 0; a < this.size; a++) {
      var increment = 0;
      var row = this.dataStore[a];
      for (var cell = 0; cell < this.size; cell++) {
        if (row[cell] === turn) {
          increment++;
        }
        if (increment === this.size) {
          alert(turn + " Win");
          this.startGame();
          return false;
        }
      }
    }

    for (var e = 0; e < this.size; e++) {
      var columnArray = this.getColumns(e);
      var increment = 0;
      for (var cell = 0; cell < this.size; cell++) {
        if (columnArray[cell] === turn) {
          increment++;
        }
        if (increment === this.size) {
          alert(turn + " Win");
          this.startGame();
          return false;
        }
      }
    }

    var increment = 0;
    for (var a = 0; a < this.size; a++) {
      var row = this.dataStore[a];
      if (row[a] === turn) {
        increment++;
      }
      if (increment === this.size) {
        alert(turn + " Win");
        this.startGame();
        return false;
      }
    }

    var increment2 = 0;
    var rowLength = this.size;
    for (var f = 0; f < this.size; f++) {
      var row = this.dataStore[f];

      if (row[rowLength - 1] === turn) {
        increment2++;
      }
      if (increment2 === this.size) {
        alert(turn + " Win");
        this.startGame();
        return false;
      }
      rowLength--;
    }

  },

  getColumns: function (colNumber) {
    var columnArray = [];
    for (var d = 0; d < this.size; d++) {
      var row = this.dataStore[d][colNumber];
      columnArray.push(row);
    }
    return columnArray;
  },

  render: function () {
    var self = this;
    var table = document.createElement("table");
    table.setAttribute("border", "1px solid black");
    table.setAttribute("id", "board");
    for (var g = 0; g < this.size; g++) {
      var tr = document.createElement("tr");
      table.appendChild(tr);
      var row = this.dataStore[g];
      for (var h = 0; h < row.length; h++) {
        var td = document.createElement("td");
        td.width = td.height = 50;
        td.align = td.vAlign = "center";
        td.innerHTML = row[h];
        td.onclick = (function(g,h) {
          return function() {
            self.mark(g,h);
          }
        })(g+1, h+1);
        tr.appendChild(td);
      }
      document.getElementById("tictactoe").innerHTML = "";
      document.getElementById("tictactoe").appendChild(table);
    }
  },

  saveGameToLocalStorage: function () {
    localStorage.setItem("dataStore", this.dataStore);
    localStorage.setItem("turn", this.turn);
    localStorage.setItem("size", this.size);
  },

  loadGameFromLocalStorage: function () {
    var dataStore = localStorage.getItem("dataStore");
    var turn = localStorage.getItem("turn");
    var size = localStorage.getItem("size");
    var arr = dataStore.split(",");
    var newDataStore = [];
    var rowData = [];
    for(var i=1; i<=arr.length; i++) {
      rowData.push(arr[i-1]);
      if(i % this.size === 0) {
        newDataStore.push(rowData);
        rowData = [];
      }
    }
    this.dataStore = newDataStore;
    this.render();
  }

};

Game.prototype.constructor = Game;


var gameObj = new Game([], 3, "X");
gameObj.startGame();