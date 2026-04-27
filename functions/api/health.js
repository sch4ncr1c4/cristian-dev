import { handleHealthRequest } from './_contact.js'

export async function onRequestGet(context) {
  return handleHealthRequest(context.request, context.env)
}
