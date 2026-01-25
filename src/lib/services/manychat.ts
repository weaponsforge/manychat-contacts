import { FetchHandler } from '@/utils/fetch.js'

export class ManyChatBase extends FetchHandler {
  apiDomain: string | null = null

  options = {
    headers: {
      'Authorization': 'Bearer -'
    }
  }

  /** Initialize the subscriber service */
  constructor (apiKey?: string) {
    super()

    const serviceApiKey = apiKey ?? process.env.MANYCHAT_API_KEY

    if (typeof serviceApiKey !== 'string') {
      throw new Error('Invalid API key')
    }

    if (!serviceApiKey) {
      throw new Error('MANYCHAT_API_KEY is not set')
    }

    if (!process.env.MANYCHAT_API_DOMAIN) {
      throw new Error('MANYCHAT_API_DOMAIN is not set')
    }

    this.apiDomain = process.env.MANYCHAT_API_DOMAIN
    this.options.headers.Authorization = `Bearer ${serviceApiKey}`
  }
}
