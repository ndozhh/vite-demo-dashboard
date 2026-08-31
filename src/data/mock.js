export const kpis = [
  { id: 'revenue', label: 'Revenue', value: 48250, format: 'currency', delta: 12.4 },
  { id: 'users', label: 'Active users', value: 3182, format: 'number', delta: 5.1 },
  { id: 'orders', label: 'Orders', value: 1274, format: 'number', delta: -2.3 },
  { id: 'churn', label: 'Churn rate', value: 3.8, format: 'percent', delta: -0.6 },
]

export const revenueSeries = [
  { month: 'Jan', value: 24100 },
  { month: 'Feb', value: 26800 },
  { month: 'Mar', value: 25400 },
  { month: 'Apr', value: 31200 },
  { month: 'May', value: 29900 },
  { month: 'Jun', value: 35600 },
  { month: 'Jul', value: 38100 },
  { month: 'Aug', value: 36400 },
  { month: 'Sep', value: 41200 },
  { month: 'Oct', value: 44050 },
  { month: 'Nov', value: 45900 },
  { month: 'Dec', value: 48250 },
]

export const channels = [
  { name: 'Organic', value: 4120 },
  { name: 'Referral', value: 2870 },
  { name: 'Paid ads', value: 3340 },
  { name: 'Email', value: 1960 },
  { name: 'Social', value: 2510 },
]

export const orders = [
  { id: 'ORD-1041', customer: 'Acme Corp', plan: 'Enterprise', amount: 4800, status: 'paid', date: '2026-08-28' },
  { id: 'ORD-1040', customer: 'Northwind', plan: 'Pro', amount: 1200, status: 'paid', date: '2026-08-27' },
  { id: 'ORD-1039', customer: 'Globex', plan: 'Pro', amount: 1200, status: 'pending', date: '2026-08-26' },
  { id: 'ORD-1038', customer: 'Initech', plan: 'Starter', amount: 290, status: 'failed', date: '2026-08-26' },
  { id: 'ORD-1037', customer: 'Umbrella', plan: 'Enterprise', amount: 5200, status: 'paid', date: '2026-08-25' },
  { id: 'ORD-1036', customer: 'Soylent', plan: 'Starter', amount: 290, status: 'paid', date: '2026-08-24' },
  { id: 'ORD-1035', customer: 'Hooli', plan: 'Pro', amount: 1450, status: 'pending', date: '2026-08-23' },
  { id: 'ORD-1034', customer: 'Vehement', plan: 'Starter', amount: 320, status: 'paid', date: '2026-08-22' },
  { id: 'ORD-1033', customer: 'Massive Dyn', plan: 'Enterprise', amount: 6100, status: 'paid', date: '2026-08-21' },
  { id: 'ORD-1032', customer: 'Cyberdyne', plan: 'Pro', amount: 1200, status: 'failed', date: '2026-08-20' },
  { id: 'ORD-1031', customer: 'Stark Ind.', plan: 'Enterprise', amount: 7300, status: 'paid', date: '2026-08-19' },
  { id: 'ORD-1030', customer: 'Wayne Ent.', plan: 'Pro', amount: 1350, status: 'paid', date: '2026-08-18' },
]

export const activity = [
  { who: 'Ana', what: 'closed a deal with Stark Ind.', when: '2h ago' },
  { who: 'Luis', what: 'updated the pricing page', when: '5h ago' },
  { who: 'System', what: 'deployed build #418 to production', when: '8h ago' },
  { who: 'Marta', what: 'invited 3 teammates', when: '1d ago' },
  { who: 'System', what: 'nightly backup completed', when: '1d ago' },
]
