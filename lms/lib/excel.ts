import * as XLSX from 'xlsx'

export function buildWorkbook(sheetName: string, headers: string[], rows: (string | number | null)[][]) {
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])

  /* Header row styling — bold + teal fill */
  const range = XLSX.utils.decode_range(ws['!ref'] ?? 'A1')
  for (let c = range.s.c; c <= range.e.c; c++) {
    const cell = XLSX.utils.encode_cell({ r: 0, c })
    if (!ws[cell]) continue
    ws[cell].s = { font: { bold: true }, fill: { fgColor: { rgb: '00B8A3' } }, alignment: { horizontal: 'center' } }
  }

  /* Column widths */
  ws['!cols'] = headers.map(h => ({ wch: Math.max(h.length + 4, 16) }))

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, sheetName)
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
}

export function excelResponse(buffer: unknown, filename: string) {
  return new Response(buffer as BodyInit, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
