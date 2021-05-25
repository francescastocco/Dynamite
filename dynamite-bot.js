

// dynamite is limited to 100 sticks, but you have as many water bombs as you like.

// Each round is worth one point and your bots will play until one player reaches 1000 points

// A maximum of 2500 rounds are played, at which point the game is considered a draw.



// {rounds:[
//     {
//         p1 : "R",
//         p2 : "D"
//     },
//     {
//         p1 : "W",
//         p2 : "S"
//     },
//     ...]
// }

// calls makemove
// updates gamestate
// number of dynamite we used is stored in gamestate

// R, P, S, W, D

//rockbot
//randombot
//clever
//strategy bot

// gamestate.rounds[0].p2 

function countRounds(gamestate) {
    return gamestate.rounds.length;
}

//     {
//         p1 : "W",
//         p2 : "S"
//     },


// let array = [{a},{b},{c},3,4,5,6,7,8,9]

function countDynamiteUsed(gamestate) {
    let dynamiteUsed = 0; 
    gamestate.rounds.forEach(function (round) {
        if (round.p1 === "D") {
            dynamiteUsed++;
        }
    })
    return dynamiteUsed;
}

function countOpponentMoves(gamestate) {

    let PRSWD = {'P': 0, 'R':0, 'S':0, 'W':0, 'D':0};

    gamestate.rounds.forEach(function (move) {
        PRSWD[move.p2]++;
    })
    return PRSWD;
}

function countOurMoves(gamestate) {

    let PRSWD = {'P': 0, 'R':0, 'S':0, 'W':0, 'D':0};

    gamestate.rounds.forEach(function (move) {
        PRSWD[move.p2]++;
    })
    return PRSWD;
}

// function countScore(gamestate) {
//     let score = [0, 0];
//     let carry = 0;

//     gamestate.rounds.forEach(function (round) {
//         let ourMove = round.p1;
//         let oppMove = round.p2;



//         if (oppMove === "D" && ourMove !== "W"){
//             if (ourMove === "D") {
//                 carry++;
//             } else {
//                 score[1]++;
//             }
//         }
//         if (oppMove === "W" && ourMove)
//     })
// }

class Bot {
    makeMove(gamestate) {
        let numberOfRounds = countRounds(gamestate);
        let dynamiteUsed = countDynamiteUsed(gamestate);
        let opponentsStatus = countOpponentMoves(gamestate); //object
        let ourStatus = countOurMoves(gamestate);
        let randomNumber = Math.round(Math.random()*30)

        console.log(opponentsStatus);
        // console.log(ourStatus);

        let dynamiteOppUsed = opponentsStatus['D'];


        // if (numberOfRounds < 51) {
        //     return 'D';
        // };

        if (numberOfRounds > 0) {
            if (gamestate.rounds[numberOfRounds - 1].p1 === gamestate.rounds[numberOfRounds - 1].p2) {
                if (dynamiteUsed < 100) {
                    return 'D'
                }
            }
        }

        // if (numberOfRounds === 51) {
        //     return 'W';
        // }

        if (opponentsStatus['R'] === numberOfRounds) {
            return 'P';
        };

        if (opponentsStatus['S'] === numberOfRounds) {
            return 'R';
        };

        if (opponentsStatus['P'] === numberOfRounds) {
            return 'S';
        };

        if (randomNumber < 3) {
            if (randomNumber < 10) {
                return 'P';
            } else if (randomNumber < 20) {
                return 'R';
            } else {
                return 'S';
            }
        }

        let oppHighest = Object.keys(opponentsStatus).reduce((a, b) => opponentsStatus[a] > opponentsStatus[b] ? a : b);
        if (oppHighest === 'R') {
            return 'P';
        }
        if (oppHighest === 'P') {
            return 'S';
        }
        if (oppHighest === 'S') {
            return 'R';
        }
        if (oppHighest === 'D' && dynamiteOppUsed < 100) {
            return 'W';
        }
        

        if (randomNumber < 10) {
            return 'P';
        } else if (randomNumber < 20) {
            return 'R';
        } else {
            return 'S';
        }

    }

}

module.exports = new Bot();
// node dynamite-cli.js  "Ilyas Franc Bot.js" bot2.js 