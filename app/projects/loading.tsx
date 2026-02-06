export default function ProjectsLoading() {
  return (
    <div className="flex flex-col items-center px-4 py-8 md:px-0">
      <div className="font-electrolize rounded-full border-4 bg-amber-300 px-6 py-2 text-6xl font-bold tracking-tighter uppercase shadow-[2px_4px_0px_0px_black]">
        Projects
      </div>
      <p className="font-electrolize mt-4 text-center text-sm font-medium opacity-60">
        Projects are a contrast: either they can help the world develop or just
        be a waste of resources.
      </p>
      <div className="mt-6 mb-6 w-160 border-b-4 border-dashed border-yellow-400"></div>

      {/* Skeleton Cards */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex w-full max-w-sm animate-pulse flex-col overflow-hidden rounded-2xl border-4 border-black bg-amber-50 shadow-[4px_4px_0px_0px_black]"
          >
            {/* Image skeleton */}
            <div className="h-48 bg-gray-200" />
            {/* Content skeleton */}
            <div className="p-5">
              <div className="mb-2 h-6 w-2/3 rounded bg-gray-300" />
              <div className="mb-3 h-4 w-1/2 rounded bg-gray-200" />
              <div className="mb-2 h-4 w-full rounded bg-gray-200" />
              <div className="mb-4 h-4 w-3/4 rounded bg-gray-200" />
              {/* Tags skeleton */}
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-16 rounded-full border-2 border-black bg-amber-200" />
                <div className="h-6 w-20 rounded-full border-2 border-black bg-amber-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
