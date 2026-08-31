import { useId } from 'react'

const W = 640
const H = 220
const PAD = { top: 16, right: 12, bottom: 28, left: 48 }

function niceMax(max) {
  const mag = Math.pow(10, Math.floor(Math.log10(max)))
  return Math.ceil(max / mag) * mag
}

export function LineChart({ data, valueKey = 'value', labelKey = 'month', format }) {
  const gradId = useId()
  const max = niceMax(Math.max(...data.map((d) => d[valueKey])))
  const innerW = W - PAD.left - PAD.right
  const innerH = H - PAD.top - PAD.bottom
  const x = (i) => PAD.left + (i / (data.length - 1)) * innerW
  const y = (v) => PAD.top + innerH - (v / max) * innerH

  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(d[valueKey])}`).join(' ')
  const area = `${line} L${x(data.length - 1)},${PAD.top + innerH} L${x(0)},${PAD.top + innerH} Z`
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label="Revenue over time">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {ticks.map((t) => (
        <g key={t}>
          <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className="grid" />
          <text x={PAD.left - 8} y={y(t) + 4} className="axis" textAnchor="end">
            {format ? format(t) : t}
          </text>
        </g>
      ))}

      <path d={area} fill={`url(#${gradId})`} />
      <path d={line} className="line" />

      {data.map((d, i) => (
        <g key={d[labelKey]}>
          <circle cx={x(i)} cy={y(d[valueKey])} r="3" className="dot">
            <title>{`${d[labelKey]}: ${format ? format(d[valueKey]) : d[valueKey]}`}</title>
          </circle>
          {i % 2 === 0 && (
            <text x={x(i)} y={H - 8} className="axis" textAnchor="middle">
              {d[labelKey]}
            </text>
          )}
        </g>
      ))}
    </svg>
  )
}

export function BarChart({ data, valueKey = 'value', labelKey = 'name', format }) {
  const max = niceMax(Math.max(...data.map((d) => d[valueKey])))
  const innerW = W - PAD.left - PAD.right
  const innerH = H - PAD.top - PAD.bottom
  const step = innerW / data.length
  const barW = step * 0.55

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label="Signups by channel">
      {[0, 0.5, 1].map((t) => {
        const yy = PAD.top + innerH - t * innerH
        return (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={yy} y2={yy} className="grid" />
            <text x={PAD.left - 8} y={yy + 4} className="axis" textAnchor="end">
              {format ? format(t * max) : t * max}
            </text>
          </g>
        )
      })}

      {data.map((d, i) => {
        const h = (d[valueKey] / max) * innerH
        const bx = PAD.left + i * step + (step - barW) / 2
        return (
          <g key={d[labelKey]}>
            <rect x={bx} y={PAD.top + innerH - h} width={barW} height={h} rx="4" className="bar">
              <title>{`${d[labelKey]}: ${d[valueKey]}`}</title>
            </rect>
            <text x={bx + barW / 2} y={H - 8} className="axis" textAnchor="middle">
              {d[labelKey]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
