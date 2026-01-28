import { FetchHandler } from '@/utils/fetch.js'
import type { ManyChatOptionsType } from '@/types.js'

export class ManyChatBase extends FetchHandler {
  /** ManyChat API root domain URL */
  apiDomain: string | null = null

  /** Facebook Page ID */
  fbPageId: string | null = null

  /** ManyChat live chat URL */
  liveChatURL: string = 'https://app.manychat.com/fb{FB_PAGE_ID}/chat/{USER_ID}' as const

  /** API header options */
  options = {
    headers: {
      'Authorization': 'Bearer -'
    }
  }

  /** Initialize the subscriber service */
  constructor (
    serviceApiKey: string | undefined,
    options?: ManyChatOptionsType
  ) {
    super()

    // ManyChat API key setup
    if (!serviceApiKey) {
      throw new Error('MANYCHAT_API_KEY is not set')
    }

    if (typeof serviceApiKey !== 'string') {
      throw new Error('Invalid API key')
    }

    if (!process.env.MANYCHAT_API_DOMAIN) {
      throw new Error('MANYCHAT_API_DOMAIN is not set')
    }

    this.apiDomain = process.env.MANYCHAT_API_DOMAIN
    this.options.headers.Authorization = `Bearer ${serviceApiKey}`

    // ManyChat options setup
    if (options) {
      const { fbPageId } = options

      if (typeof fbPageId === 'string') {
        this.fbPageId = fbPageId
      }
    }
  }

  /**
   * Returns a user's ManyChat live chat URL. Requires the `FB_PAGE_ID` env.
   * @param {string} fbUserId - Facebook user ID
   * @returns {string} ManyChat live chat URL given a Facebook user ID
   */
  getliveChatURL (fbUserId: string): string {
    if (!this.fbPageId) {
      throw new Error('Missing FB user ID or env FB_PAGE_ID')
    }

    if (!fbUserId) {
      throw new Error('Missing FB user ID')
    }

    return this.liveChatURL
      .replace('{FB_PAGE_ID}', this.fbPageId)
      .replace('{USER_ID}', fbUserId)
  }

  /**
   * Returns a user's ManyChat live chat URL by
   * extracting the FB page ID in the avatar URL between "ava/" and the next "/"
   * @param avatarUrl - ManyChat profile picture URL of a user
   * @returns ManyChat live chat URL given a ManyChat live chat URL
   */
  extractLiveChatURL (avatarUrl: string) {
    if (typeof avatarUrl !== 'string') return '-'

    // Extract the FB page ID
    const fbPageIdRegex = /ava\/(\d+)\//
    const fbPageIdMatch = avatarUrl?.match(fbPageIdRegex)
    const fbPageId = fbPageIdMatch ? fbPageIdMatch[1] : null

    if (!fbPageId) return '-'

    // Extract the FB user ID
    const fbUserId = avatarUrl.substring(
      avatarUrl.indexOf(fbPageId) + fbPageId.length + 1,
      avatarUrl.lastIndexOf('/')
    ) ?? '-'

    return this.liveChatURL
      .replace('{FB_PAGE_ID}', fbPageId)
      .replace('{USER_ID}', fbUserId)
  }
}
