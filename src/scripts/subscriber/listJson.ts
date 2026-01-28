import path from 'path'

import { ManyChatBase } from '@/services/manychat.js'
import { directory, readFile } from '@/utils/helpers.js'
import { writeExcel } from '@/utils/excel.js'

import type {
  SubscriberFileType,
  SubscriberType
} from '@/types.js'

interface ReadSubscribersDataParams {
  /** JSON file name without the `.json` extension */
  fileNameNoExt: string;
  /** Facebook Page ID */
  fbPageId?: string;
}

/**
 * Reads ManyChat Subscribers (Contacts) data from a full JSON database
 * and writes them in an Excel file.
 */
export const readSubscribersData = async (params: ReadSubscribersDataParams) => {
  try {
    const { fileNameNoExt, fbPageId } = params

    const mChat = new ManyChatBase(
      process.env.MANYCHAT_API_KEY,
      { fbPageId }
    )

    if (!fileNameNoExt || !fbPageId) {
      throw new Error('Missing required parameters')
    }

    // Read Subscriber list from a JSON file
    const dataFolderPath = path.join(directory(import.meta.url), '..', '..', '..', 'data')
    const jsonFilePath = path.join(dataFolderPath, `${fileNameNoExt}.json`)

    const invalidContacts: SubscriberFileType[] = []
    const subscribers = JSON.parse(readFile(jsonFilePath))

    // Transform Subscribers data
    const subscribersList = subscribers.reduce((
      list: SubscriberType[],
      subscriber: SubscriberFileType
    ) => {
      if (!subscriber?.title) {
        invalidContacts.push(subscriber)
        return list
      }

      const {
        user_id,
        first_name,
        last_name,
        title,
        status,
        raw_ts_added,
        avatar
      } = subscriber ?? {}

      const subscribedDate = new Date(raw_ts_added / 1000).toISOString()
      const liveChatURL = mChat.getliveChatURL(user_id)

      list.push({
        id: user_id ?? '',
        pageId: fbPageId,
        firstName: first_name ?? '',
        lastName: last_name ?? '',
        name: title ?? '',
        status: status ?? '',
        subscribed: subscribedDate ?? '',
        profilePic: avatar ?? '',
        liveChatURL
      })
      return list
    }, [])

    const excelFilePath = path.join(dataFolderPath, `${fileNameNoExt}.xlsx`)
    writeExcel(subscribersList, excelFilePath)

    console.log(`\nRead ${subscribersList.length}/${subscribers.length} active Subscribers`)
    console.log(`Skipped saving ${invalidContacts.length} invalid Subscribers`)
    console.log(`Saved to Excel file in ${excelFilePath}`)
  } catch (error) {
    if (error instanceof Error) {
      console.log('[ERROR]', error.message)
    } else {
      console.log('[ERROR]', String(error))
    }
  }
}
