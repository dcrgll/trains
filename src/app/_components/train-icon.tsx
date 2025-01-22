export default function TrainIcon({ departing }: { departing: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-6 w-6 ${departing ? '' : 'rotate-180 transform'}`}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h2" />
      <path d="M15 15h2" />
      <path d="M3 6v5" />
      <path d="M21 6v5" />
    </svg>
  )
}
