
export function invertHex(hex: string) {
  hex = hex.replace('#', '')

  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)

  r = 255 - r
  g = 255 - g
  b = 255 - b

  return (
    '#' +
		((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  )
}

interface VTTEntry {
	id: string
	startTime: number
	endTime: number
	text: string
}

export function parseVTT(content: string): VTTEntry[] {
  const lines = content.trim().split('\n')
  const entries: VTTEntry[] = []
  let entry: VTTEntry | null = null

  lines.forEach((line) => {
    if (!entry) {
      if (!isNaN(Number(line))) {
        entry = { id: line, startTime: 0, endTime: 0, text: '' }
      }
      return
    }
    const timeMatch = line.match(
      /(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})/
    )
    if (timeMatch) {
      entry.startTime = convertToSeconds(timeMatch[1])
      entry.endTime = convertToSeconds(timeMatch[2])
    } else if (line.trim() === '') {
      entries.push(entry)
      entry = null
    } else {
      entry.text += (entry.text ? ' ' : '') + line
    }
  })

  return entries
}

function convertToSeconds(time: string): number {
  const [hours, minutes, seconds] = time.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds
}

export const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
		.filter(Boolean)
		.join(':')
}


const stripePercentageFee: number = 0.029
const stripeFixedFee: number = 0.30
const stripeAccountFee: number = 2
const platformFeePercentage: number = 0.10

function calculateNetIncome(activeAccounts: number, averageRevenuePerAccount: number): number {
  const totalRevenue: number = activeAccounts * averageRevenuePerAccount;
  const totalPlatformFees: number = totalRevenue * platformFeePercentage;
  const stripeTransactionFees: number = (totalRevenue * stripePercentageFee) + (activeAccounts * stripeFixedFee);
  const totalStripeFees: number = stripeTransactionFees + (activeAccounts * stripeAccountFee);
  const netIncome: number = totalPlatformFees - totalStripeFees;
  return netIncome;
}

const activeAccounts: number = 500
const averageRevenuePerAccount: number = 200

const netIncome: number = calculateNetIncome(activeAccounts, averageRevenuePerAccount)
console.log(`Net Income: $${netIncome}`)