function rushDeliveryTimeFor (anOrder) {
  if ([
    'MA',
    'CT',
  ].includes(anOrder.deliveryState)) {
    return 1;
  }
  if ([
    'NY',
    'NH',
  ].includes(anOrder.deliveryState)) {
    return 2;
  }
  return 3;
}

function rushDeliveryDate (anOrder) {
  return anOrder.placedOn.plusDays(1 + rushDeliveryTimeFor(anOrder));
}

function regularDeliveryTimeFor (anOrder) {
  if ([
    'MA',
    'CT',
    'NY',
  ].includes(anOrder.deliveryState)) {
    return 2;
  }
  if ([
    'ME',
    'NH',
  ].includes(anOrder.deliveryState)) {
    return 3;
  }
  return 4;
}

function regularDeliveryDate (anOrder) {
  return anOrder.placedOn.plusDays(2 + regularDeliveryTimeFor(anOrder));
}

function deliveryDate (anOrder, isRush) {
  if (isRush) {
    return rushDeliveryDate(anOrder);
  }
  else {
    return regularDeliveryDate(anOrder);
  }
}
