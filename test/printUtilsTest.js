const test = require('ava');
import {statement} from '../src/printUtils';

const plays = {
  'hamlet': {
    'name': 'Hamlet',
    'type': 'tragedy',
  },
  'as-like': {
    'name': 'As You Like It',
    'type': 'comedy',
  },
  'othello': {
    'name': 'Othello',
    'type': 'tragedy',
  },
};

test('statement case 1. Customer BigCo without performance. ', t => {
  const invoice = {
    'customer': 'BigCo',
    'performances': [],
  };

  const result = statement(invoice, plays);

  t.is(result, 'Statement for BigCo\nAmount owed is $0.00\nYou earned 0 credits \n');
});

test('statement case 2. Customer BigCo has one performance hamlet and the audience is 30. ', t => {
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 30,
      },
    ],
  };

  const result = statement(invoice, plays);

  t.is(result, 'Statement for BigCo\n' +
    ' Hamlet: $400.00 (30 seats)\n' +
    'Amount owed is $400.00\n' +
    'You earned 0 credits \n');
});

test('statement. ', t => {

  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 55,
      },
      {
        'playID': 'as-like',
        'audience': 35,
      },
      {
        'playID': 'othello',
        'audience': 40,
      },
    ],
  };

  const result = statement(invoice, plays);

  // "Statement for BigCo\n
  // Hamlet: $650.00 (55 seats)\n
  // As You Like It: $580.00 (35 seats)\n
  // Othello: $500.00 (40 seats)\n
  // Amount owed is $1,730.00\n
  // You earned 47 credits \n"
  t.is(result, 'Statement for BigCo\n Hamlet: $650.00 (55 seats)\n As You Like It: $580.00 (35 seats)\n Othello: $500.00 (40 seats)\nAmount owed is $1,730.00\nYou earned 47 credits \n');
});
