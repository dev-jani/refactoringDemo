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

function regularDeliveryDate (anOrder) {
  let deliveryTime;
  if ([
    'MA',
    'CT',
    'NY',
  ].includes(anOrder.deliveryState)) {
    deliveryTime = 2;
  }
  else if ([
    'ME',
    'NH',
  ].includes(anOrder.deliveryState)) {
    deliveryTime = 3;
  }
  else {
    deliveryTime = 4;
  }
  return anOrder.placedOn.plusDays(2 + deliveryTime);
}

function deliveryDate (anOrder, isRush) {
  if (isRush) {
    return rushDeliveryDate(anOrder);
  }
  else {
    return regularDeliveryDate(anOrder);
  }
}
