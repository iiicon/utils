const plays = {
  hamlet: {
    name: "Hamlet",
    type: "tragedy",
  },
  "as-like": {
    name: "As you like it",
    type: "comedy",
  },
  othello: {
    name: "Othello",
    type: "tragedy",
  },
};

const invoice = [
  {
    customer: "godBai",
    performances: [
      {
        playId: "hamlet",
        audience: "35",
      },
      {
        playId: "as-like",
        audience: "55",
      },
      {
        playId: "othello",
        audience: "35",
      },
    ],
  },
];

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}`;
  const format = new Intl.NumberFormat("zh-Hans-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 2,
  }).format;

  for (let perf in invoice.performances) {
    const play = plays[perf.playId];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 20) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 1000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;

      default:
        throw new Error(`unknow type: ${play.type}`);
    }

    volumeCredits += Math.max(perf.audience - 30, 0);
    if (play.type === "comedy") {
      volumeCredits += Math.floor(perf.audience / 5);
    }

    result += `$(play.name): ${format(thisAmount / 100)} (${
      perf.audience
    } sets)\n`;
    totalAmount += thisAmount;
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} creidts \n`;
  console.log(result);
  return result;
}

statement(invoice, plays);
