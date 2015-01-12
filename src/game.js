/**
 * Created by Deepak Sisodiya on 10/01/15.
 */


function Game(dataStore, size, turn) {
  this.dataStore = dataStore;
  this.size= size;
  this.turn = turn;
  this.moves = 0;
  this.startGame();
}

Game.prototype = {

  startGame: function () {
    this.turn = "X";
    this.moves = 0;
    this.dataStore = [];
    for (var j = 0; j < this.size; j++) {
      var x = [];
      for (var i = 0; i < this.size; i++) {
        x.push(" ");
      }
      this.dataStore.push(x);
    }
  },

  mark: function (rowNumber, columnNumber, obj) {
    if(this.dataStore[rowNumber - 1][columnNumber - 1] === " ") {
      this.dataStore[rowNumber - 1][columnNumber - 1] = this.turn;
      obj.render();
      this.checkWin(this.turn, obj);
      this.moves = this.moves + 1;
      this.checkForDraw();
      return true;
    } else {
      return false;
    }
  },

  checkForDraw : function () {
    if(this.moves === this.size*this.size) {
      alert("Game Draw");
      this.startGame();
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

  checkWin: function (turn, obj) {

    for (var a = 0; a < parseInt(this.size); a++) {
      var increment = 0;
      var row = this.dataStore[a];
      for (var cell = 0; cell < parseInt(this.size); cell++) {
        if (row[cell] === turn) {
          increment++;
        }
        if (increment === parseInt(this.size)) {
          alert(turn + " Win");
          this.startGame();
          obj.render();
          return false;
        }
      }
    }

    for (var e = 0; e < parseInt(this.size); e++) {
      var columnArray = this.getColumns(e);
      var increment = 0;
      for (var cell = 0; cell < parseInt(this.size); cell++) {
        if (columnArray[cell] === turn) {
          increment++;
        }
        if (increment === parseInt(this.size)) {
          alert(turn + " Win");
          this.startGame();
          obj.render();
          return false;
        }
      }
    }

    var increment = 0;
    for (var a = 0; a < parseInt(this.size); a++) {
      var row = this.dataStore[a];
      if (row[a] === turn) {
        increment++;
      }
      if (increment === parseInt(this.size)) {
        alert(turn + " Win");
        this.startGame();
        obj.render();
        return false;
      }
    }

    var increment2 = 0;
    var rowLength = parseInt(this.size);
    for (var f = 0; f < parseInt(this.size); f++) {
      var row = this.dataStore[f];

      if (row[rowLength - 1] === turn) {
        increment2++;
      }
      if (increment2 === parseInt(this.size)) {
        alert(turn + " Win");
        this.startGame();
        obj.render();
        return false;
      }
      rowLength--;
    }
    this.changePlayer(this.turn);
  },

  getColumns: function (colNumber) {
    var columnArray = [];
    for (var d = 0; d < parseInt(this.size); d++) {
      var row = this.dataStore[d][colNumber];
      columnArray.push(row);
    }
    return columnArray;
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
      if(i % size === 0) {
        newDataStore.push(rowData);
        rowData = [];
      }
    }
    this.dataStore = newDataStore;
    this.size = size;
    this.turn = turn;
  }

};

Game.prototype.constructor = Game;