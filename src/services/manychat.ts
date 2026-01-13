import { FetchHandler } from '@/utils/fetch.js'

export class ManyChatBase extends FetchHandler {
  apiDomain: string | null = null

  options = {
    headers: {
      'Authorization': `Bearer ${process.env.MANYCHAT_API_KEY}`
    }
  }

  /** Initialize the subscriber service */
  constructor () {
    super()

    if (!process.env.MANYCHAT_API_KEY) {
      throw new Error('MANYCHAT_API_KEY is not set')
    }

    if (!process.env.MANYCHAT_API_DOMAIN) {
      throw new Error('MANYCHAT_API_DOMAIN is not set')
    }

    this.apiDomain = process.env.MANYCHAT_API_DOMAIN
  }
}
