# CIRCLES

![CIRCLES](/assets/circle_title.png)

[Live](https://albertngo1.github.io/CIRCLES/)

### Background
CIRCLES is a game of circles where the goal is to eat as many circles smaller than you while not getting eaten yourself. Get a high score and have your name etched in history. The game draws inspiration from the popular massively-multiplayer online game Agar.io.

To get started, enter your name (if desired) and click play. Use `W` `A` `S` `D` keys to move around directionally and your circle (etched with your name on it) will start at the center of the screen.

### How It Works

#### Firebase Integration

To induce replayability, a Firebase database was supplied to house persisting data for viewing across different plays and different users.

```javascript
let database = window.firebase.database();
database.ref().on("value", function(snapshot) {
      highScores = snapshot.val();});
if (this.userCircles.length === 0) {
this.gameOver = true;
database.ref().push({
name: `${playerOneName}`,
score: this.score
});

Object.keys(highScores).map(el => highScores[el])
highScores = _.orderBy(highScores, ['score'], ['desc'] )
this.highScores = highScores.slice(0, 6);

```

An event listener was applied on the database so that when new data is introduced to the database, a "snapshot" of the data is returned for use.

#### asdk



#### Tech

- jQuery - JavaScript library that is used for DOM manipulation and event listening.
- Firebase - Integrated a database to allow for a leaderboard containing high scores, making the game have high replayability and competitiveness.
- JavaScript
- HTML5 Canvas
- CSS
