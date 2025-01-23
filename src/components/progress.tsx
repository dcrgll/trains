export default function CircularProgressBar() {
  return (
    <div className="relative h-6 w-6">
      <svg className="h-full w-full" viewBox="0 0 32 32">
        <circle
          className="text-background"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="14"
          cx="16"
          cy="16"
        />
        <circle
          className="text-primary"
          strokeWidth="4"
          strokeDasharray={Math.PI * 28}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="14"
          cx="16"
          cy="16"
          transform="rotate(-90 16 16)"
        >
          <animate
            attributeName="stroke-dashoffset"
            from={Math.PI * 28}
            to="0"
            dur="15s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  )
}
