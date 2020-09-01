function rushDeliveryTimeFor (anOrder) {
  if ([
    'MA',
    'CT',
  ].includes(anOrder.deliveryState)) {
    return 2;
  }
  if ([
    'NY',
    'NH',
  ].includes(anOrder.deliveryState)) {
    return 3;
  }
  return 4;
}

function rushDeliveryDate (anOrder) {
  return anOrder.placedOn.plusDays(rushDeliveryTimeFor(anOrder));
}

function regularDeliveryTimeFor (anOrder) {
  if ([
    'MA',
    'CT',
    'NY',
  ].includes(anOrder.deliveryState)) {
    return 4;
  }
  if ([
    'ME',
    'NH',
  ].includes(anOrder.deliveryState)) {
    return 5;
  }
  return 6;
}

function regularDeliveryDate (anOrder) {
  return anOrder.placedOn.plusDays(regularDeliveryTimeFor(anOrder));
}

function deliveryDate (anOrder, isRush) {
  if (isRush) {
    return rushDeliveryDate(anOrder);
  }
  else {
    return regularDeliveryDate(anOrder);
  }
}
