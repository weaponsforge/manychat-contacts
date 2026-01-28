/**
 * ---------- Subscribers types ----------
 */

/** `Subscriber.getSubscribers()` parameter types */
export type FetchSubscribersOptions = {
  /** Number of requests per batch */
  rateLimit?: number;
  /** Next batch timeout interval in MS */
  windowMs?: number;
}

/** Internal custom Subscriber shape for Excel output corresponding to `SubscriberFields` */
export interface SubscriberType {
  id: string;
  pageId: string;
  firstName: string;
  lastName: string;
  name: string;
  status: string;
  subscribed: string;
  profilePic: string;
  liveChatURL: string;
}

/** ManyChat `Subscriber.data` types required by this tool */
export interface SubscriberFields {
  id: string;
  page_id: string;
  first_name: string;
  last_name: string;
  name: string;
  status: string;
  subscribed: string;
  profile_pic: string;
  live_chat_url: string;
}

/** ManyChat GET Subscriber response shape (from the API) */
export type SubscriberResponse = {
  data?: SubscriberFields
}

/** ManyChat Subscriber response types (from the web Contacts UI dashboard) */
export type SubscriberFileType = {
  user_id: string;
  first_name: string;
  last_name: string;
  title: string;
  status: string;
  raw_ts_added: number; // timestamp
  avatar: string;
}

/**
 * ---------- ManyChatBase class types ----------
 */

/** ManyChatBase class constructor parameter `options` types */
export interface ManyChatOptionsType {
  /** Facebook Page ID */
  fbPageId: string | undefined;
}
