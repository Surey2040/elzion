// Case study content. Everything here is taken from the real app screens.
export const JOTHI = {
  theme: 'wine',
  number: '01',
  name: 'Jothi Vel Chits',
  kicker: 'Chit fund operations · Android app',
  intro: 'A mobile app that runs a chit fund business day to day: chits, members, collections, deliveries and the daily cash closing, all in one place.',
  hero: ['jothi/login.jpg', 'jothi/dashboard.jpg', 'jothi/screen-7.jpg'],
  facts: [
    ['Industry', 'Chit funds'],
    ['Platform', 'Android'],
    ['Core screens', 'flows we designed', 7],
    ['Our role', 'Design · Build · Launch'],
  ],
  steps: [
    { tag: 'Sign in', img: 'jothi/login.jpg', title: 'A PIN, not a password.', copy: 'Staff open the app with a 4-digit PIN. Admin and Labour roles see only what they need.' },
    { tag: 'Home', img: 'jothi/dashboard.jpg', title: 'The day at a glance.', copy: 'Pending amounts, cloud sync status and shortcuts to today’s work, day closing, new chit and new member.' },
    { tag: 'Chits', img: 'jothi/screen-2.jpg', title: 'Create a chit in seconds.', copy: 'Chit number, name, value, months and members, set once and kept together for the whole cycle.' },
    { tag: 'Members', img: 'jothi/screen-4.jpg', title: 'Add members to a group.', copy: 'Customer code, mobile, installment, address and joining date, linked straight to the chit group.' },
    { tag: 'Collect', img: 'jothi/screen-7.jpg', title: 'Every payment, traceable.', copy: 'Pick the chit and customer, see the current due, take cash or UPI and send a receipt.' },
    { tag: 'Deliver', img: 'jothi/screen-6.jpg', title: 'Payouts recorded too.', copy: 'Chit deliveries are logged by customer and mode, cash, UPI or bank, with recent entries below.' },
    { tag: 'Close', img: 'jothi/screen-8.jpg', title: 'Close the day in one tap.', copy: 'Cash, UPI, bank, settlement and delivery add up against what was expected, then share the summary.' },
  ],
  roles: [
    ['Owner / Admin', 'Sets up chits and members, watches pending amounts and checks the daily closing.'],
    ['Collection staff', 'Collect payments in the field with a fast form and send receipts on the spot.'],
    ['Accounts', 'A full ledger and a shareable closing summary instead of paper registers.'],
  ],
  next: { name: 'Kadaikutty POS', to: '/projects/kadaikutty-pos', img: 'namba/screen-09.jpg' },
};

export const KADAIKUTTY = {
  theme: 'grove',
  number: '02',
  name: 'Kadaikutty POS',
  kicker: 'Retail store system · Android app',
  intro: 'A point-of-sale and store manager for small retail shops: products, stock coming in, billing, reports, staff and backups, built to work at the counter.',
  hero: ['namba/screen-20.jpg', 'namba/screen-09.jpg', 'namba/screen-01.jpg'],
  facts: [
    ['Industry', 'Retail'],
    ['Platform', 'Android'],
    ['Modules', 'connected parts', 8],
    ['Our role', 'Design · Build · Launch'],
  ],
  steps: [
    { tag: 'Set up', img: 'namba/screen-01.jpg', title: 'Master data, all in one place.', copy: 'Categories, products, customers, suppliers, expenses and ledgers. Import from CSV or Excel to start fast.' },
    { tag: 'Stock in', img: 'namba/screen-08.jpg', title: 'Record stock as it arrives.', copy: 'Draft a purchase order by supplier and invoice, scan barcodes, set quantity and cost, then pay and save.' },
    { tag: 'Credit', img: 'namba/screen-05.jpg', title: 'Know who owes what.', copy: 'Customer credits receivable and supplier credits payable, with dues per person.' },
    { tag: 'Reports', img: 'namba/screen-09.jpg', title: 'Stock value, live.', copy: 'Stock value, inward, sold and closing units for today, this month or all time.' },
    { tag: 'Profit', img: 'namba/screen-11.jpg', title: 'Sales and profit, honestly.', copy: 'Sales, cost of goods, expenses and net profit side by side, plus every bill.' },
    { tag: 'Counter', img: 'namba/screen-20.jpg', title: 'Close the register.', copy: 'Count the cash in the drawer, tally the shift and keep a shift history.' },
    { tag: 'Hardware', img: 'namba/screen-15.jpg', title: 'Prints on real receipts.', copy: 'Bluetooth, USB or network thermal printers, 58 mm or 80 mm, with a live receipt preview.' },
    { tag: 'Safe', img: 'namba/screen-19.jpg', title: 'Backed up, always.', copy: 'Cloud sync, cloud backup and a live local backup that mirrors every change to a folder.' },
  ],
  roles: [
    ['Shop owner', 'Sees stock value, profit and credit at a glance, and controls staff access.'],
    ['Cashier', 'Bills customers and closes the register with a simple counter screen.'],
    ['Store manager', 'Brings stock in, manages suppliers and keeps product data clean.'],
  ],
  next: { name: 'Jothi Vel Chits', to: '/projects/jothi-vel-chits', img: 'jothi/dashboard.jpg' },
};
