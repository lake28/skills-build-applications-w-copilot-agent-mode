import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function getRows(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

function formatValue(value) {
  if (value == null || value === '') return '—'
  if (Array.isArray(value)) return value.map(formatValue).join(', ')
  if (typeof value === 'object') {
    return value.name ?? value.title ?? value._id ?? JSON.stringify(value)
  }
  return String(value)
}

export default function ResourceList({ resource, title, description, columns }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRows() {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(`${apiBaseUrl}/api/${resource}/`, {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        setRows(getRows(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadRows()
    return () => controller.abort()
  }, [resource])

  return (
    <section className="resource-view" aria-labelledby="resource-title">
      <div className="resource-heading">
        <div>
          <p className="eyebrow">OCTOFIT / {resource.toUpperCase()}</p>
          <h1 id="resource-title">{title}</h1>
          <p className="resource-description">{description}</p>
        </div>
        <span className="record-count" aria-live="polite">
          {loading ? 'Loading' : `${rows.length} records`}
        </span>
      </div>

      {error ? (
        <div className="alert alert-warning" role="alert">
          Could not load {title.toLowerCase()}: {error}. Check that the API is running at {apiBaseUrl}.
        </div>
      ) : null}

      <div className="table-responsive data-table-wrap">
        <table className="table align-middle mb-0 data-table">
          <thead>
            <tr>
              {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length} className="table-message">Loading records...</td></tr>
            ) : rows.length ? (
              rows.map((row, index) => (
                <tr key={row._id ?? row.id ?? index}>
                  {columns.map((column) => (
                    <td key={column.key}>{formatValue(row[column.key])}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr><td colSpan={columns.length} className="table-message">No records to show yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}