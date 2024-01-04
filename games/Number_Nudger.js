/*
@title: Number_Nudger
@tags: ['strategy']
@img: ""
@addedOn: 2023-01-02
@author: Boon

Instructions:
Use the red player to move the blue number blocks into the green slots.
Avoid obstacles.
Press J to reset level
*/

// Define Sounds
const connect = tune `
519.4805194805194,
129.87012987012986: f4-129.87012987012986 + a4-129.87012987012986,
129.87012987012986,
129.87012987012986: a4-129.87012987012986 + c5-129.87012987012986,
3246.7532467532465`
const win = tune `
590.5511811023622,
118.11023622047244: f4-118.11023622047244 + d4~118.11023622047244 + a4/118.11023622047244,
118.11023622047244: b4-118.11023622047244 + g4~118.11023622047244 + d5/118.11023622047244,
118.11023622047244: g5-118.11023622047244 + e5~118.11023622047244 + c5/118.11023622047244,
118.11023622047244: g5-118.11023622047244 + e5~118.11023622047244 + c5/118.11023622047244,
118.11023622047244: g5-118.11023622047244 + e5~118.11023622047244 + c5/118.11023622047244,
118.11023622047244: a5-118.11023622047244 + f5~118.11023622047244 + d5/118.11023622047244 + g5^118.11023622047244 + e5^118.11023622047244,
2480.314960629921`

// Define characters for objects
const player = "a"
const k = ["0", "n", "m", "o", "p", "q", "r", "s", "t", "u", "v"]
const rb = "x";
const mag  = "y";
const magd = "z";
const magl = "b";
const magr = "c";
const g = ["1", "d", "e", "f", "g", "h", "i", "j", "k", "l", "w"]

// Create arrays to check if box is in right spot
let truearr = ["t", "t", "t", "t","t", "t","t", "t","t", "t"];
let clicked = ["f", "f", "f", "f","f", "f","f", "f","f", "f"];

// Define Sprites for Objects
setLegend(
  [ player, bitmap`
...3333333......
...3666663..3333
3..3666663..3333
3..3333333.33663
3.....3....33663
333...3..3333663
3..3333333..3663
3.....33....3663
3.....33....3663
3....333....3663
3...33..3...3333
....3...33......
...33....3......
..33.....33.....
..3.......3.....
.33.......3.....`],
  [ k[1], bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555535555555
5555555335555555
5555555335555555
5555553535555555
5555535535555555
5555555535555555
5555555535555555
5555555535555555
5555553333355555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ],
  [ k[2], bitmap`
5555555555555555
5555555555555555
5555333333555555
5555555333555555
5555555553555555
5555555533555555
5555555535555555
5555553335555555
5555553355555555
5555533555555555
5555533333335555
5555555333355555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ k[3], bitmap`
5555555555555555
5555555555555555
5555555555555555
5555533333555555
5555335553355555
5555555553355555
5555555333555555
5555533333555555
5555555553355555
5555555555355555
5555555555355555
5555335553355555
5555533333555555
5555555555555555
5555555555555555
5555555555555555`],
  [ k[4], bitmap`
5555555555555555
5555555555555555
5555555553555555
5555555533555555
5555555353555555
5555555353555555
5555553553555555
5555535553555555
5555333333335555
5555555553555555
5555555553555555
5555555553555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ k[5], bitmap`
5555555555555555
5555555555555555
5555555555555555
5555553333335555
5555553555555555
5555553555555555
5555553555555555
5555553333555555
5555555553555555
5555555553555555
5555555553555555
5555553333555555
5555553355555555
5555555555555555
5555555555555555
5555555555555555`],
  [ k[6], bitmap`
5555555555555555
5555555555555555
5555555333555555
5555553355555555
5555553555555555
5555535555555555
5555335555555555
5555333335555555
5555355533555555
5555355553555555
5555355553555555
5555335533555555
5555533335555555
5555555555555555
5555555555555555
5555555555555555`],
  [ k[7], bitmap`
5555555555555555
5555555555555555
5555555555555555
5555333333355555
5555555555355555
5555555553555555
5555555553555555
5555555535555555
5555555535555555
5555555355555555
5555555355555555
5555553555555555
5555553555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ k[8], bitmap`
5555555555555555
5555555555555555
5555555533555555
5555533353555555
5555335553555555
5555355533555555
5555355535555555
5555333335555555
5555533333555555
5555535553355555
5555535555355555
5555535553355555
5555533335555555
5555555555555555
5555555555555555
5555555555555555`],
  [ k[9], bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555333355555
5555553355335555
5555553555535555
5555553555535555
5555553355535555
5555555333335555
5555555555335555
5555555555355555
5555555553555555
5555555533555555
5555553335555555
5555555555555555
5555555555555555`],
  [ k[10], bitmap`
5555555555555555
5555555555555555
5555555555555555
5555535553335555
5555535533533555
5555535535553555
5555535535553555
5555535535553555
5555535535553555
5555535535553555
5555535535553555
5555535533533555
5555535553335555
5555555555555555
5555555555555555
5555555555555555`],
  [rb, bitmap`
.....9999.......
.....99999......
....999999......
....9999999.....
....9222229.....
...99222229.....
...922222299....
...999999999....
...999999999....
..99999999999...
.992222222229...
.992222222229...
.9222222222299..
99999999999999..
999999999999999.
9999999999999999`],
  [mag, bitmap`
......335555....
....333355555...
...33333555555..
..333333555555..
..3333335555555.
.33333335555555.
.33333335555555.
.33333335555555.
.33333335555555.
.33333335555555.
..3333335555555.
.33333335555555.
.33LLL33.5LLLL5.
..3LLL3..5LLLL5.
..3LLL3..5LLLL5.
..33333..55555..`],
  [magd, bitmap`
..55555..33333..
.5LLLL5..3LLL3..
.5LLLL5..3LLL3..
.5LLLL5.33LLL33.
.55555553333333.
.5555555333333..
.55555553333333.
.55555553333333.
.55555553333333.
.55555553333333.
.55555553333333.
.5555555333333..
..555555333333..
..55555533333...
...555553333....
....555533......`],
  [magl, bitmap `
................
....55555555555.
..5555555555LLL5
.55555555555LLL5
555555555555LLL5
555555555555LLL5
5555555555555555
555555555555....
3333333333333...
3333333333333333
.33333333333LLL3
.33333333333LLL3
..3333333333LLL3
...3333333333333
.....33333.33...
................`],
  [magr,bitmap `
................
...33.33333.....
3333333333333...
3LLL3333333333..
3LLL33333333333.
3LLL33333333333.
3333333333333333
...3333333333333
....555555555555
5555555555555555
5LLL555555555555
5LLL555555555555
5LLL55555555555.
5LLL5555555555..
.55555555555....
................`],
  [ g[1], bitmap`
................
................
................
........4.......
.......44.......
.......44.......
......4.4.......
.....4..4.......
........4.......
........4.......
........4.......
......44444.....
................
................
................
................` ],
  [ g[2], bitmap`
................
................
....444444......
.......444......
.........4......
........44......
........4.......
......444.......
......44........
.....44.........
.....4444444....
.......4444.....
................
................
................
................`],
  [ g[3], bitmap`
................
................
................
.....44444......
....44...44.....
.........44.....
.......444......
.....44444......
.........44.....
..........4.....
..........4.....
....44...44.....
.....44444......
................
................
................`],
  [ g[4], bitmap`
................
................
.........4......
........44......
.......4.4......
.......4.4......
......4..4......
.....4...4......
....44444444....
.........4......
.........4......
.........4......
................
................
................
................`],
  [ g[5], bitmap`
................
................
................
......444444....
......4.........
......4.........
......4.........
......4444......
.........4......
.........4......
.........4......
......4444......
......44........
................
................
................`],
  [ g[6], bitmap`
................
................
.......444......
......44........
......4.........
.....4..........
....44..........
....44444.......
....4...44......
....4....4......
....4....4......
....44..44......
.....4444.......
................
................
................`],
  [ g[7], bitmap`
................
................
................
....4444444.....
..........4.....
.........4......
.........4......
........4.......
........4.......
.......4........
.......4........
......4.........
......4.........
................
................
................`],
  [ g[8], bitmap`
................
................
........44......
.....444.4......
....44...4......
....4...44......
....4...4.......
....44444.......
.....44444......
.....4...44.....
.....4....4.....
.....4...44.....
.....4444.......
................
................
................`],
  [ g[9], bitmap`
................
................
................
.......4444.....
......44..44....
......4....4....
......4....4....
......44...4....
.......44444....
..........44....
..........4.....
.........4......
........44......
......444.......
................
................`],
  [ g[10], bitmap`
................
................
................
.....4...444....
.....4..44.44...
.....4..4...4...
.....4..4...4...
.....4..4...4...
.....4..4...4...
.....4..4...4...
.....4..4...4...
.....4..44.44...
.....4...444....
................
................
................`],
  
);

// Define and set levels
const levels = [map `
.a..........
.nmopqrstuv.
............
.x..........
.defghijklw.
.zzzzzzzzzz.`,map`
............
anmopqrstuv.
............
.xxxxxxxx.x.
..........x.
dwlkjihgfe..`,
map `
.xxxxxxxxxx.
x..........x
xanrmtosu..x
x..v......xx
x.q.p....x.x
xx..xxxxxxxx
xdefghijklwx
.xxxxxxxxxx.`,map`
dhxxexxxxxxi
x....x...xxr
x.xq.n.p.x..
xl......xa.x
x.m.a...ugxj
x..v.tao.x.s
xdxfx.....k.
.xxwxxxxxxxx`, ]
let level = 0;
addText(`Level ${level+1}`)
setMap(levels[level]);

// Set properties for objects
setSolids([player,rb,mag, magl,magd, magr, k[1],k[2], k[3],k[4],k[5],k[6],k[7], k[8], k[9],k[10]]);
setPushables({
  [ player ]: [player, k[1], k[2], k[3], k[4], k[5], k[6], k[7], k[8], k[9], k[10]]

});
// Handle Inputs
onInput("w", () => {
  getFirst(player).y -= 1
});

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    setMap(currentLevel);
    clicked = ["f", "f", "f", "f","f", "f","f", "f","f", "f"];
  }
});

onInput("s", () => {
  getFirst(player).y += 1
});

onInput("a", () => {
  getFirst(player).x -= 1
});

onInput("d", () => {
  getFirst(player).x += 1
});

afterInput(() => {
  for (let i = 1; i<=10; i++) {
    
    // Check if tiles are in place
    if (tilesWith(k[i], g[i]).length > 0 && clicked[i-1] === "f") {
      playTune(connect, 1);
      clicked[i-1] = "t";

      // If all tiles are in place, change level
      if (truearr.every((val, index) => val === clicked[index])) {
        addText("VICTORY")
        clicked = ["f", "f", "f", "f","f", "f","f", "f","f", "f"];
        playTune(win, 1)
        if (level+1 < levels.length){
        setMap(levels[++level]);
        clearText();
        addText(`Level ${level+1}`)
      }
    }
  }
}
});
