import dotenv from 'dotenv'

import { API_ROUTES } from '@/utils/routes.js'
import { ManyChatBase } from './manychat.js'
import { sleep } from '@/utils/helpers.js'

import type { FetchSubscribersOptions } from '@/types.js'

dotenv.config()


// ManyChat Subscriber Service
export class SubscriberService extends ManyChatBase {

  /**
   * Fetches a subscriber from the ManyChat Subscriber API
   * @param subscriberId - The ID of the subscriber to fetch
   * @returns The subscriber data
   */
  async getSubscriber (subscriberId: string) {
    const url = `${this.apiDomain}/${API_ROUTES.SUBSCRIBER.getInfo}?subscriber_id=${subscriberId}`
    return await this.get(url, this.options)
  }

  /**
   * Fetches a list of Subscriber data by batch given a list of ManyChat Subscriber IDs
   * @param {string[]} subscriberIds - List of ManyChat Subscriber IDs
   * @param {FetchSubscribersOptions} options - Batch data fetching options
   * @returns Promise that resolves into an array of Subscriber data
   */
  async getSubscribers (subscriberIds: string[], options?: FetchSubscribersOptions): Promise<unknown[]> {
    const { rateLimit, windowMs } = options ?? {}

    const RATE_LIMIT = rateLimit ?? 10
    const RATE_WINDOW_MS = windowMs ?? 1000
    const results: unknown[] = []

    // Fetch Subscriber data by batch
    for (let i = 0; i < subscriberIds.length; i += RATE_LIMIT) {
      const batchPromises: Promise<unknown>[] = []

      const start = i + 1
      const end = i + RATE_LIMIT
      const ts = new Date().toISOString().replace('T', ' ').slice(0, 19)

      console.log(`[${ts}]: Downloading ${start} - ${end} of ${subscriberIds.length} Contacts...`)

      for (let j = i; j < i + RATE_LIMIT && j < subscriberIds.length; j += 1) {
        const subscriberId = subscriberIds[j]?.[0] ?? null

        if (subscriberId) {
          batchPromises.push(this.getSubscriber(subscriberId))
        }
      }

      if (batchPromises.length === 0) continue

      // Fetch this batch
      const batchResults = await Promise.all(batchPromises)
      results.push(...batchResults)

      // If there are more subscribers left, wait 1s before next batch
      if (i + RATE_LIMIT < subscriberIds.length) {
        await sleep(RATE_WINDOW_MS)
      }
    }

    return results
  }
}
