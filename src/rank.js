class Rating {
  constructor (voyage, history) {
    this._voyage = voyage;
    this._history = history;
  }

  get value () {
    const vpf = this.voyageProfitFactor;
    const vr = this.voyageRisk;
    const chr = this.captainHistoryRisk;
    if (vpf * 3 > (vr + chr * 2)) {
      return 'A';
    }
    else {
      return 'B';
    }
  }

  get voyageLengthFactor () {
    return this._voyage.length > 14 ? -1 : 0;
  }

  get historyLengthFactor () {
    return this._history.length > 8 ? 1 : 0;
  }

  get voyageProfitFactor () {
    let result = 2;
    if (this._voyage.zone === 'china') {
      result += 1;
    }
    if (this._voyage.zone === 'east-indies') {
      result += 1;
    }
    result += this.historyLengthFactor;
    result += this.voyageLengthFactor;
    return result;
  }

  get voyageRisk () {
    let result = 1;
    if (this._voyage.length > 4) {
      result += 2;
    }
    if (this._voyage.length > 8) {
      result += this._voyage.length - 8;
    }
    if ([
      'china',
      'east-indies',
    ].includes(this._voyage.zone)) {
      result += 4;
    }
    return Math.max(result, 0);
  }

  get captainHistoryRisk () {
    let result = 1;
    if (this._history.length < 5) {
      result += 4;
    }
    result += this._history.filter(v => v.profit < 0).length;
    return Math.max(result, 0);
  }

  get hasChinaHistory () {
    return this._history.some(v => 'china' === v.zone);
  }

}

class ExperiencedChinaRating extends Rating {
  get captainHistoryRisk () {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }

  get historyLengthFactor () {
    return this._history.length > 10 ? 1 : 0;
  }

  get voyageLengthFactor () {
    let result = 3;
    if (this._voyage.length > 12) {
      result += 1;
    }
    if (this._voyage.length > 18) {
      result -= 1;
    }
    return result;
  }

}

function createRating (voyage, history) {
  if (voyage.zone === 'china' && history.some(v => 'china' === v.zone)) {
    return new ExperiencedChinaRating(voyage, history);
  }
  return new Rating(voyage, history);
}

function rating (voyage, history) {
  return createRating(voyage, history).value;
}

module.exports = {};

const voyage = {
  zone: 'west-indies',
  length: 10,
};
const history = [
  {
    zone: 'east-indies',
    profit: 5,
  },
  {
    zone: 'west-indies',
    profit: 15,
  },
  {
    zone: 'china',
    profit: -2,
  },
  {
    zone: 'west-africa',
    profit: 7,
  },
];
const myRating = rating(voyage, history);
console.log(`myRating: ${myRating}`);
