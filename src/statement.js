function amountFor (play, perf) {
  let thisAmount = 0;
  switch (play.type) {
    case 'tragedy':
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case 'comedy':
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount;
}

function usd (thisAmount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(thisAmount / 100);
}

function volumeCreditsFor (invoice, plays) {
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === playFor(plays, perf).type) volumeCredits += Math.floor(perf.audience / 5);
  }
  return volumeCredits;
}

function totalAmount (invoice, plays) {
  let totalAmount = 0;
  for (let perf of invoice.performances) {
    totalAmount += amountFor(playFor(plays, perf), perf);
  }
  return totalAmount;
}

function playFor (plays, perf) {
  return plays[perf.playID];
}

function createStatementData (invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(function (aPerformance) {
    const result = Object.assign({}, aPerformance);
    result.play = playFor(plays, result);
    return result;
  });
  result.totalAmount = totalAmount(invoice, plays);
  result.totalVolumeCredits = volumeCreditsFor(invoice, plays);
  return result;
}

function renderPlainText (data) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${(usd(amountFor(perf.play, perf)))} (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits \n`;
  return result;
}

const statement = (invoice, plays) => {
  return renderPlainText(createStatementData(invoice, plays));
};

module.exports = {
  statement,
};
