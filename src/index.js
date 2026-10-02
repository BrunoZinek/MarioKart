const player1 = {
  name: "Mario",
  velocity: 4,
  curves: 3,
  power: 3,
  points: 0,
};

const player2 = {
  name: "Luigi",
  velocity: 3,
  curves: 4,
  power: 4,
  points: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;

    default:
      result = "CONFRONTO";
      break;
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}: `);

    let block = await getRandomBlock();

    console.log(`Bloco: ${block} `);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.velocity;
      totalTestSkill2 = diceResult2 + character2.velocity;

      await logRollResult(
        player1.name,
        "velocidade",
        diceResult1,
        character1.velocity
      );
      await logRollResult(
        player2.name,
        "velocidade",
        diceResult2,
        character2.velocity
      );
    }
    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.curves;
      totalTestSkill2 = diceResult2 + character2.curves;

      await logRollResult(
        player1.name,
        "manobrabilidade",
        diceResult1,
        character1.curves
      );
      await logRollResult(
        player2.name,
        "manobrabilidade",
        diceResult2,
        character2.curves
      );
    }
    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.power;
      let powerResult2 = diceResult2 + character2.power;

      await logRollResult(player1.name, "poder", diceResult1, character1.power);
      await logRollResult(player2.name, "poder", diceResult2, character2.power);

      if (powerResult1 > powerResult2) {
        if (character2.points > 0) {
          character2.points--;
          console.log(
            `${character1.name} venceu o confronto! ${character2.name} perdeu 1 ponto`
          );
        } else {
          console.log(
            `${character1.name} venceu o confronto! ${character2.name} não possui pontos para perder`
          );
        }
      }

      if (powerResult2 > powerResult1) {
        if (character1.points > 0) {
          character1.points--;
          console.log(
            `${character2.name} venceu o confronto! ${character1.name} perdeu 1 ponto`
          );
        } else {
          console.log(
            `${character2.name} venceu o confronto! ${character1.name} não possui pontos para perder`
          );
        }
      }

      console.log(
        powerResult1 === powerResult2 ? "Empate! Ninguem perde ponto" : ""
      );
    }

    if (block != "CONFRONTO") {
      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${character1.name} marcou um ponto!`);
        character1.points++;
      } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(`${character2.name} marcou um ponto!`);
        character2.points++;
      } else {
        console.log("Empate");
      }
    }

    console.log("\n---------------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.name}: ${character1.points} ponto(s)`);
  console.log(`${character2.name}: ${character2.points} ponto(s)`);

  if (character1.points > character2.points) {
    console.log(`\n${character1.name} venceu a corrida!\n`);
  } else if (character1.points < character2.points) {
    console.log(`\n${character2.name} venceu a corrida!\n`);
  } else {
    console.log("\nA corrida terminou em empate\n");
  }
}

(async function main() {
  console.log(
    `🏁 🚨 Corrida entre ${player1.name} e ${player2.name} começando... \n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
