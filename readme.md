# Tic Tac Toe

Generating the Win Table Dynamically

## Using `map`

```javascript
function winTable() {

  const horiz = [1,4,7].map(i => ([i, i+1, i+2]));
  const vert = [1,2,3].map(i => ([i, i+3, i+6]));
  const diag = [[1,5,9], [3,5,7]];

  return [...horiz, ...vert, ...diag];
}

const wins = winTable();
```

Output:

```javascript
// const wins = [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9],
//   [1,4,7],
//   [2,5,8],
//   [3,6,9],
//   [1,5,9],
//   [3,5,7],
// ];
```

## Using chunks
