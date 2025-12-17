export default function ProjectsLoading() {
  return (
    <div className="flex flex-col items-center py-8 px-4 md:px-0">
      <div className="font-electrolize font-bold text-6xl tracking-tighter border-4 rounded-full px-6 py-2 bg-amber-300 shadow-[2px_4px_0px_0px_black] uppercase">
        Projects
      </div>
      <p className="font-electrolize font-medium text-sm mt-4 opacity-60 text-center">
        Projects are a contrast: either they can help the world develop or just be a waste of resources.
      </p>
      <div className="w-160 border-b-4 border-dashed border-yellow-400 mt-6 mb-6"></div>
      
      {/* Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col bg-amber-50 w-full max-w-sm border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_black] overflow-hidden animate-pulse"
          >
            {/* Image skeleton */}
            <div className="h-48 bg-gray-200" />
            {/* Content skeleton */}
            <div className="p-5">
              <div className="w-2/3 h-6 bg-gray-300 rounded mb-2" />
              <div className="w-1/2 h-4 bg-gray-200 rounded mb-3" />
              <div className="w-full h-4 bg-gray-200 rounded mb-2" />
              <div className="w-3/4 h-4 bg-gray-200 rounded mb-4" />
              {/* Tags skeleton */}
              <div className="flex flex-wrap gap-2">
                <div className="w-16 h-6 bg-amber-200 rounded-full border-2 border-black" />
                <div className="w-20 h-6 bg-amber-200 rounded-full border-2 border-black" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



