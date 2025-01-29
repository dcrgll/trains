/**
 * Formats a number to a human-readable string with 'k' (thousands) or 'm' (millions) suffix
 * Examples: 1234 -> "1.2k", 1234567 -> "1.2m"
 */
export const formatNumber = (number: number): string => {
  const million = 1000000
  const thousand = 1000

  if (number >= million) {
    const millions = number / million
    return `${millions.toFixed(1)}m`
  }

  if (number >= thousand) {
    const thousands = number / thousand
    return `${thousands.toFixed(1)}k`
  }

  return number.toString()
}

/**
 *  Fetches the counter data from https://jasoncameron.dev/abacus/.
 *  */
export async function fetchCounterData() {
  if (!process.env.NEXT_PUBLIC_COUNTER_URL) {
    return
  }

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_COUNTER_URL)
    const { value: visitCount } = await response.json()

    return visitCount
  } catch (error) {
    console.error('Failed to fetch counter data:', error)
  }
}
