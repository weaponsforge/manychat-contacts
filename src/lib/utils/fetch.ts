type FetchOptions = {
  headers?: Record<string, string>;
  body?: string;
  params?: string;
}

/** NodeJS `fetch` handler - simplifies handling GET requests and responses using fetch. */
export class FetchHandler {
  defautHeaders = {
    'Content-Type': 'application/json'
  }

  /**
   * Transforms the fetch response from an API to a JSON object
   * @param response - The response an API call
   * @returns The transformed JSON response
   * @throws {Error} Throws an error if response received is not OK
   */
  async handleFetch (url: string, options: FetchOptions) {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`Failed to fetch subscriber: ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Returns data from a fetch GET action
   * @param url - URL to GET data
   * @param options - custom `fetch()` options
   * @returns JSON data
   */
  async get (url: string, options: FetchOptions) {
    const opts = {
      method: 'GET',
      headers: { ...this.defautHeaders, ...options?.headers }
    }

    return this.handleFetch(url, opts)
  }
}
