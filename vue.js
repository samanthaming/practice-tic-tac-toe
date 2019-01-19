const wins = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7],
];

function checkMatch(nums) {
  return wins.some(win => {
    return win.every(w => nums.includes(w));
  });
}

Vue.component('cell', {
  template: '#cell-template',
  props: ['info', 'turn', 'resetCell', 'stopCell'],
  data() {
    return {
      active: false,
      player: '',
    }
  },
  methods: {
    clickCell() {
      if(this.stopCell || this.active) {
        return;
      }

      this.active = true;
      this.player = `player${this.turn}`;
      this.$emit('bus-cell', this.info);
    }
  },
  watch: {
    resetCell(newValue, oldVal) {
      /* This watcher gets triggered twice:
        1. Parent's restart()
        2. Parent's onCellChange()

        When we click the restart button (trigger 1) we want to reset the cells. The newValue parameter will be `true`.

        However, when we click the cell (trigger 2) thereafter, we don't want to activiate the reset in this function. The newValue parameter will be `false`, hence we have this check.
      */
      if(newValue) {
        this.active = false;
        this.player = '';
      }
    }
  },
})

var vm = new Vue({
  el: '#app',
  data: {
    isCellReset: false,
    hasWin: false,
    turn: 1,
    player1: [],
    player2: [],
  },
  computed: {
    message() {
      return this.hasWin ? 'Winner' : 'Turn';
    }
  },
  methods: {
    onCellChange(cellIndex) {
      if(this.hasWin) {
        return
      }

      if (this.turn === 1) {
        this.player1.push(cellIndex);
      } else {
        this.player2.push(cellIndex)
      }

      this.isCellReset = false;
      this.checkWinner();
      this.updateGameStatus();
    },
    checkWinner() {
      if (this.turn === 1) {
        this.hasWin = checkMatch(this.player1);
      } else {
        this.hasWin = checkMatch(this.player2);
      }
    },
    updateGameStatus() {
      if (!this.hasWin) {
        this.turn = this.turn === 1 ? 2 : 1;
      } else {
        this.hasWin = true;
      }
    },
    clickRestart() {
      this.hasWin = false;
      this.isCellReset = true;
      this.turn = 1;
      this.player1 = [];
      this.player2 = [];
    },
  }
});
