export default function ResultCard({ label, confidence }) {
  const isAI = label === "AI";
  const percentage = (confidence * 100).toFixed(2);

  return (
    <div
      className={`p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-md transition-all duration-300 ${
        isAI ? "bg-red-600/10 text-red-400" : "bg-green-600/10 text-green-400"
      }`}
    >
      {/* Status */}
      <h2 className="text-2xl font-bold text-center mb-2">
        {isAI ? "⚠️ AI Generated" : "✅ Real Image"}
      </h2>

      {/* Optional info */}
      <p className="text-center text-sm text-gray-300 mb-4">
        Model confidence
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            isAI ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Percentage */}
      <p className="text-center mt-3 font-semibold text-lg">
        {percentage}%
      </p>
    </div>
  );
}
