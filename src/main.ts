import { getSubscribersData } from '@/subscriber/list.js'
import { getargs } from '@/utils/helpers.js'

/**
 * Main program start.
 * Usage: `npm run subscriber:list --filename=contacts`
 */
const main = async () => {
  try {
    const args = getargs({ params: ['filename'] })
    const csvFilename = args?.filename

    // Fetches and writes all subscribers data into an Excel file.
    await getSubscribersData(csvFilename)
  } catch (error) {
    if (error instanceof Error) {
      console.log('[ERROR]', error.message)
    } else {
      console.log('[ERROR]', String(error))
    }
  }
}

if (process.env.IS_DOCKER) {
  setTimeout(() => {
    console.log('Starting process')
    main()
  }, 5000)
} else {
  main()
}
