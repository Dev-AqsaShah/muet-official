export default function ProjectLoading() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="bg-brand-navy pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-3 w-40 bg-white/20 rounded mb-4" />
          <div className="h-8 w-2/3 bg-white/20 rounded mb-3" />
          <div className="h-4 w-1/2 bg-white/10 rounded" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero image skeleton */}
        <div className="w-full h-72 bg-gray-200 rounded-2xl mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Main */}
          <div className="space-y-4">
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-5/6" />
            <div className="h-5 bg-gray-200 rounded w-4/6" />
            <div className="h-5 bg-gray-200 rounded w-full mt-4" />
            <div className="h-5 bg-gray-200 rounded w-3/4" />
          </div>
          {/* Sidebar */}
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
