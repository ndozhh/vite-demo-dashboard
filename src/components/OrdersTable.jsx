import { useMemo, useState } from 'react'
import { formatCurrency } from '../format.js'

const COLUMNS = [
  { key: 'id', label: 'Order' },
  { key: 'customer', label: 'Customer' },
  { key: 'plan', label: 'Plan' },
  { key: 'amount', label: 'Amount', numeric: true },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' },
]

const STATUSES = ['all', 'paid', 'pending', 'failed']
const PAGE_SIZE = 6

export default function OrdersTable({ rows }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState({ key: 'date', dir: 'desc' })
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const out = rows.filter((r) => {
      const matchesQuery = !q || r.customer.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
      const matchesStatus = status === 'all' || r.status === status
      return matchesQuery && matchesStatus
    })
    return out.sort((a, b) => {
      const dir = sort.dir === 'asc' ? 1 : -1
      const av = a[sort.key]
      const bv = b[sort.key]
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir
      return String(av).localeCompare(String(bv)) * dir
    })
  }, [rows, query, status, sort])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pageCount - 1)
  const visible = filtered.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE)

  function toggleSort(key) {
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }))
    setPage(0)
  }

  return (
    <div className="card">
      <div className="card-head">
        <h2>Recent orders</h2>
        <div className="table-controls">
          <input
            type="search"
            placeholder="Search customer or order…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(0)
            }}
          />
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(0)
            }}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === 'all' ? 'All statuses' : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  className={c.numeric ? 'num' : undefined}
                  aria-sort={sort.key === c.key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  <button type="button" onClick={() => toggleSort(c.key)}>
                    {c.label}
                    <span className="sort">{sort.key === c.key ? (sort.dir === 'asc' ? '▲' : '▼') : ''}</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id}>
                <td className="mono">{r.id}</td>
                <td>{r.customer}</td>
                <td>{r.plan}</td>
                <td className="num">{formatCurrency(r.amount)}</td>
                <td>
                  <span className={`badge ${r.status}`}>{r.status}</span>
                </td>
                <td className="mono">{r.date}</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length} className="empty">
                  No orders match those filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pager">
        <span>
          {filtered.length} order{filtered.length === 1 ? '' : 's'} · page {current + 1} of {pageCount}
        </span>
        <div>
          <button type="button" onClick={() => setPage(current - 1)} disabled={current === 0}>
            Prev
          </button>
          <button type="button" onClick={() => setPage(current + 1)} disabled={current >= pageCount - 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
