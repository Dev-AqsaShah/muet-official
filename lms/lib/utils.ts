export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-PK', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export function formatDateTime(date: Date | string) {
  return new Date(date).toLocaleString('en-PK', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export function getAttendanceStatus(percent: number): 'eligible' | 'at-risk' | 'not-eligible' {
  if (percent >= 90) return 'eligible'
  if (percent >= 75) return 'at-risk'
  return 'not-eligible'
}

export function attendanceColor(status: 'eligible' | 'at-risk' | 'not-eligible') {
  return { eligible: '#00E5C8', 'at-risk': '#FBBF24', 'not-eligible': '#EF4444' }[status]
}

export function timeUntil(date: Date | string) {
  const diff = new Date(date).getTime() - Date.now()
  if (diff < 0) return 'Overdue'
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  if (days > 0) return `${days}d ${hours}h left`
  const mins = Math.floor((diff % 3600000) / 60000)
  if (hours > 0) return `${hours}h ${mins}m left`
  return `${mins}m left`
}
