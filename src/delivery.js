function rushDeliveryTimeFor (deliveryState) {
  if ([
    'MA',
    'CT',
  ].includes(deliveryState)) {
    return 2;
  }
  if ([
    'NY',
    'NH',
  ].includes(deliveryState)) {
    return 3;
  }
  return 4;
}

function rushDeliveryDate (anOrder) {
  return anOrder.placedOn.plusDays(rushDeliveryTimeFor(anOrder.deliveryState));
}

function regularDeliveryTimeFor (deliveryState) {
  if ([
    'MA',
    'CT',
    'NY',
  ].includes(deliveryState)) {
    return 4;
  }
  if ([
    'ME',
    'NH',
  ].includes(deliveryState)) {
    return 5;
  }
  return 6;
}

function regularDeliveryDate (anOrder) {
  return anOrder.placedOn.plusDays(regularDeliveryTimeFor(anOrder.deliveryState));
}

function deliveryDate (anOrder, isRush) {
  if (isRush) {
    return rushDeliveryDate(anOrder);
  }
  else {
    return regularDeliveryDate(anOrder);
  }
}
