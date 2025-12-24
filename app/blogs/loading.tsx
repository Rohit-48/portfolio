export default function BlogsLoading() {
  return (
    <div className="flex mt-20 justify-center items-center">
      <div className="group relative font-electrolize bg-amber-50 w-full max-w-[860px] rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_black] animate-pulse">
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 border-2 border-black rounded-full" />
        <div className="block p-6">
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <div className="w-24 h-4 bg-gray-300 rounded" />
            </div>
          </div>
          {/* Title skeleton */}
          <div className="w-3/4 h-8 bg-gray-300 rounded mb-2" />
          {/* Excerpt skeleton */}
          <div className="w-full h-4 bg-gray-200 rounded mb-2" />
          <div className="w-2/3 h-4 bg-gray-200 rounded mb-4" />
          {/* Divider */}
          <div className="w-full border-b-2 border-dashed border-amber-300 mb-4" />
          {/* Tags skeleton */}
          <div className="flex flex-wrap gap-2">
            <div className="w-16 h-6 bg-amber-200 rounded-full border-2 border-black" />
            <div className="w-20 h-6 bg-amber-200 rounded-full border-2 border-black" />
            <div className="w-14 h-6 bg-amber-200 rounded-full border-2 border-black" />
          </div>
        </div>
      </div>
    </div>
  );
}




















