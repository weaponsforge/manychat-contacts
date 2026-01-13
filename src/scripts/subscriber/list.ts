import path from 'path'

import { SubscriberService } from '@/services/subscriber.js'
import { directory } from '@/utils/helpers.js'
import { csv } from '@/utils/csv.js'
import { writeExcel } from '@/utils/excel.js'

import type {
  SubscriberType,
  SubscriberResponse
} from '@/services/subscriber.js'

/**
 * Fetches partial ManyChat Subscribers (Contacts) data
 * and writes them in an Excel file.
 */
export const getSubscribersData = async (fileNameNoExt: string = 'contacts') => {
  try {
    const subscriber = new SubscriberService()

    // Read Subscriber list from CSV file
    const dataFolderPath = path.join(directory(import.meta.url), '..', '..', '..', 'data')
    const csvFilePath = path.join(dataFolderPath, `${fileNameNoExt}.csv`)
    const subscriberIds: string[] = await csv(csvFilePath)

    // Fetch Subscribers data
    const subscribers = <Record<string, string>[]>(
      await subscriber.getSubscribers(subscriberIds, { windowMs: 5000 })
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

    const excelFilePath = path.join(dataFolderPath, `${fileNameNoExt}.xlsx`)
    writeExcel(subscribersList, excelFilePath)

    console.log(`\nFetched ${subscribersList.length}/${subscribers.length} active Subscribers`)
    console.log(`Saved to Excel file in ${excelFilePath}`)
  } catch (error) {
    if (error instanceof Error) {
      console.log('[ERROR]', error.message)
    } else {
      console.log('[ERROR]', String(error))
    }
  }
}
