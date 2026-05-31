export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#020B18' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'rgba(0,229,200,0.3)', borderTopColor: '#00E5C8' }} />
        <p className="text-xs" style={{ color: '#607896' }}>Loading MUET LMS...</p>
      </div>
    </div>
  )
}
