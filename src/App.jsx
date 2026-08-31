import { useEffect, useState } from 'react'
import { LineChart, BarChart } from './components/Charts.jsx'
import OrdersTable from './components/OrdersTable.jsx'
import { kpis, revenueSeries, channels, orders, activity } from './data/mock.js'
import { formatKpi, formatCompactCurrency, formatNumber } from './format.js'

const ROUTES = [
  { id: 'overview', label: 'Overview', icon: '▦' },
  { id: 'orders', label: 'Orders', icon: '▤' },
  { id: 'activity', label: 'Activity', icon: '◔' },
]

function useHashRoute() {
  const read = () => window.location.hash.replace('#/', '') || 'overview'
  const [route, setRoute] = useState(read)

  useEffect(() => {
    const onChange = () => setRoute(read())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return ROUTES.some((r) => r.id === route) ? route : 'overview'
}

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

function KpiCard({ kpi }) {
  const up = kpi.delta >= 0
  return (
    <div className="card kpi">
      <span className="kpi-label">{kpi.label}</span>
      <strong className="kpi-value">{formatKpi(kpi.value, kpi.format)}</strong>
      <span className={`kpi-delta ${up ? 'up' : 'down'}`}>
        {up ? '▲' : '▼'} {Math.abs(kpi.delta).toFixed(1)}% vs last month
      </span>
    </div>
  )
}

function Overview() {
  return (
    <>
      <div className="kpi-grid">
        {kpis.map((k) => (
          <KpiCard key={k.id} kpi={k} />
        ))}
      </div>

      <div className="chart-grid">
        <section className="card">
          <div className="card-head">
            <h2>Revenue</h2>
            <span className="muted">Last 12 months</span>
          </div>
          <LineChart data={revenueSeries} format={formatCompactCurrency} />
        </section>

        <section className="card">
          <div className="card-head">
            <h2>Signups by channel</h2>
            <span className="muted">This quarter</span>
          </div>
          <BarChart data={channels} format={formatNumber} />
        </section>
      </div>
    </>
  )
}

function Activity() {
  return (
    <section className="card">
      <div className="card-head">
        <h2>Activity feed</h2>
      </div>
      <ul className="feed">
        {activity.map((a, i) => (
          <li key={i}>
            <span className="avatar">{a.who[0]}</span>
            <div>
              <p>
                <strong>{a.who}</strong> {a.what}
              </p>
              <span className="muted">{a.when}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function App() {
  const route = useHashRoute()
  const [theme, toggleTheme] = useTheme()

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">◈</span>
          <span>Demo Dash</span>
        </div>
        <nav>
          {ROUTES.map((r) => (
            <a key={r.id} href={`#/${r.id}`} className={route === r.id ? 'active' : undefined}>
              <span className="icon">{r.icon}</span>
              {r.label}
            </a>
          ))}
        </nav>
        <footer className="sidebar-foot muted">
          <div>env: {import.meta.env.MODE}</div>
          <div>built: {new Date(__BUILD_TIME__).toLocaleString()}</div>
        </footer>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>{ROUTES.find((r) => r.id === route).label}</h1>
            <p className="muted">A static Vite dashboard for testing deploys.</p>
          </div>
          <button type="button" className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀ Light' : '☾ Dark'}
          </button>
        </header>

        {route === 'overview' && <Overview />}
        {route === 'orders' && <OrdersTable rows={orders} />}
        {route === 'activity' && <Activity />}
      </main>
    </div>
  )
}
