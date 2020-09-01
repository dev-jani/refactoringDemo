function printBanner () {
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');
}

function printDetails (invoice, outstanding) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`amount: ${invoice.dueDate.toLocaleDateString()}`);
}

function calculateOutstanding (invoice) {
  return invoice.borderSpacing.reduce((total, o) => total + o.amount, 0);
}

function recordDueDate (invoice) {
  const today = new Date();
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

function printOwing (invoice) {
  printBanner();

  const outstanding = calculateOutstanding(invoice);

  recordDueDate(invoice);

  printDetails(invoice, outstanding);
}
