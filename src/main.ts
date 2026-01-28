import { getSubscribersData } from '@/subscriber/list.js'
import { readSubscribersData } from '@/subscriber/listJson.js'
import { getargs } from '@/utils/helpers.js'

/**
 * Main program start.
 * Usage: `npm run subscriber:list --filename=contacts`
 */
const main = async () => {
  try {
    const args = getargs({ params: ['filename', 'isjson'], optional: ['isjson'] })
    const csvFilename = args?.filename
    const isJson = args?.isjson

    if (typeof csvFilename !== 'string') {
      throw new Error('Missing or invalid file name')
    }

    if (!isJson) {
      // Fetches and writes all subscribers data into an Excel file.
      await getSubscribersData(csvFilename)
    } else {
      readSubscribersData({
        fileNameNoExt: csvFilename,
        fbPageId: process.env.FB_PAGE_ID
      })
    }
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
