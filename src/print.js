function printBanner () {
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');
}

function printDetails (invoice) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${(outstandingFor(invoice))}`);
  console.log(`amount: ${invoice.dueDate.toLocaleDateString()}`);
}

function outstandingFor (invoice) {
  return invoice.borderSpacing.reduce((total, o) => total + o.amount, 0);
}

function recordDueDate (invoice) {
  const today = new Date();
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

function printOwing (invoice) {
  printBanner();
  recordDueDate(invoice);
  printDetails(invoice);
}
