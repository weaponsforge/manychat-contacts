import { SubscriberService } from '@/services/subscriber'
import { file } from '@/utils/helpers.js'
import { csv } from '@/utils/csv.js'

import type {
  SubscriberType,
  SubscriberResponse
} from '@/services/subscriber.js'

const main = async () => {
  try {
    const subscriber = new SubscriberService()

    // Read Subscriber list from CSV file
    const subscriberIds: string[] = await csv(
      file(import.meta.url, 'contacts_mvc.csv')
    )

    // Fetch Subscribers data
    const subscribers = await subscriber.getSubscribers(subscriberIds)

    // Transform Subscribers data
    const subscribersList = subscribers.reduce((
      list: SubscriberType[],
      subscriber: SubscriberResponse
    ) => {
      if (!subscriber?.data) return list

      const {
        id,
        page_id: pageId,
        first_name: firstName,
        last_name: lastName,
        name,
        status,
        subscribed,
        profile_pic: profilePic
      } = subscriber?.data ?? {}

      if (!name) return list
      list.push({ id, pageId, firstName, lastName, name, status, subscribed, profilePic })
      return list
    }, [])

    console.log(`Fetched ${subscribersList.length}/${subscribers.length} active Subscribers`)
  } catch (error) {
    if (error instanceof Error) {
      console.log('ERROR HERE', error.message)
    } else {
      console.log('ERROR HERE', String(error))
    }
  }
}

main()
