function rushDeliveryTimeFor (deliveryState) {
  switch (deliveryState) {
    case 'MA':
    case 'CT':
      return 2;
    case 'NY':
    case 'NH':
      return 3;
    default:
      return 4;
  }
}

function rushDeliveryDate (anOrder) {
  return anOrder.placedOn.plusDays(rushDeliveryTimeFor(anOrder.deliveryState));
}

function regularDeliveryTimeFor (deliveryState) {
  switch (deliveryState) {
    case 'MA':
    case 'CT':
    case 'NY':
      return 4;
    case 'ME':
    case 'NH':
      return 5;
    default:
      return 6;
  }
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

// remove function deliveryDate
// use rushDeliveryDate or regularDeliveryDate
// for example:
// deliveryDate(anOrder, true); => rushDeliveryDate(anOrder)
// deliveryDate(anOrder, false); => regularDeliveryDate(anOrder)
