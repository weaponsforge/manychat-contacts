import { getSubscribersData } from '@/subscriber/list.js'

/** Main program start */
const main = async () => {
  try {
    // Fetches and writes all subscribers data into an Excel file.
    await getSubscribersData()
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
