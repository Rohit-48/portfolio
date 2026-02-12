export default function BlogsLoading() {
  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="group font-electrolize relative w-full max-w-[860px] animate-pulse rounded-xl border-4 border-black bg-amber-50 shadow-[6px_6px_0px_0px_black]">
        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full border-2 border-black bg-amber-400" />
        <div className="block p-6">
          {/* Header skeleton */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-gray-300" />
              <div className="h-4 w-24 rounded bg-gray-300" />
            </div>
          </div>
          {/* Title skeleton */}
          <div className="mb-2 h-8 w-3/4 rounded bg-gray-300" />
          {/* Excerpt skeleton */}
          <div className="mb-2 h-4 w-full rounded bg-gray-200" />
          <div className="mb-4 h-4 w-2/3 rounded bg-gray-200" />
          {/* Divider */}
          <div className="mb-4 w-full border-b-2 border-dashed border-amber-300" />
          {/* Tags skeleton */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 rounded-full border-2 border-black bg-amber-200" />
            <div className="h-6 w-20 rounded-full border-2 border-black bg-amber-200" />
            <div className="h-6 w-14 rounded-full border-2 border-black bg-amber-200" />
          </div>
        </div>
      </div>
    </div>
  )
}
