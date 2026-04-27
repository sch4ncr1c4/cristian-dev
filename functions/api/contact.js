import { handleContactRequest } from './_contact.js'

export async function onRequestPost(context) {
  return handleContactRequest(context.request, context.env)
}
