export default function Loader() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative flex items-center justify-center">
        <div className="h-10 w-10 rounded-full bg-indigo-500/20 animate-ping absolute"></div>
        <div className="h-6 w-6 rounded-full bg-indigo-500 animate-pulse"></div>
      </div>
    </div>
  );
}
