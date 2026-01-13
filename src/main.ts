import { SubscriberService } from '@/services/subscriber.js'
import { file } from '@/utils/helpers.js'
import { csv } from '@/utils/csv.js'

import type {
  SubscriberType,
  SubscriberResponse
} from '@/services/subscriber.js'
import { writeExcel } from './utils/excel.js'

const main = async () => {
  try {
    const subscriber = new SubscriberService()

    // Read Subscriber list from CSV file
    const subscriberIds: string[] = await csv(
      file(import.meta.url, 'contacts_mvc.csv')
    )
    // Fetch Subscribers data
    const subscribers = <Record<string, string>[]>(
      await subscriber.getSubscribers(subscriberIds)
    )

    // Transform Subscribers data
    const subscribersList = subscribers.reduce((
      list: SubscriberType[],
      subscriber: SubscriberResponse
    ) => {
      if (!subscriber?.data) return list

      const {
        id,
        page_id,
        first_name,
        last_name,
        name,
        status,
        subscribed,
        profile_pic
      } = subscriber?.data ?? {}

      if (!name) return list

      list.push({
        id: id ?? '',
        pageId: page_id ?? '',
        firstName: first_name ?? '',
        lastName: last_name ?? '',
        name: name ?? '',
        status: status ?? '',
        subscribed: subscribed ?? '',
        profilePic: profile_pic ?? ''
      })
      return list
    }, [])

    console.log(`Fetched ${subscribersList.length}/${subscribers.length} active Subscribers`)

    const fileName = file(import.meta.url, 'contacts.xlsx')
    writeExcel(subscribersList, fileName)
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

