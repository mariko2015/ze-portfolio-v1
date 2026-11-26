import { toZonedTime } from 'date-fns-tz';
import { format, parseISO } from 'date-fns'

export const formatBlogSlug = (slug: string) => slug

export const formatDate = (date: string, type = 'MMMM dd, yyyy') => {
  const formattedDate = format(toZonedTime(parseISO(date), 'Asia/Jakarta'), type)
  return formattedDate
}
