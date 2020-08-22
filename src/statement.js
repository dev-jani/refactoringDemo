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

const statement = (invoice, plays) => {
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    //print line for this order
    result += ` ${playFor(plays, perf).name}: ${(usd(amountFor(playFor(plays, perf), perf)))} (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(totalAmount(invoice, plays))}\n`;
  result += `You earned ${(volumeCreditsFor(invoice, plays))} credits \n`;
  return result;
};

module.exports = {
  statement,
};
