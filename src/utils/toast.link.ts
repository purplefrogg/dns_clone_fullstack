import { type TRPCLink } from '@trpc/client'
import { observable } from '@trpc/server/observable'
import { toastCall } from '~/components/modules/toaster/toaster'
import { type AppRouter } from '~/server/api/root'

export const customLink: TRPCLink<AppRouter> = () => {
  // here we just got initialized in the app - this happens once per app
  // useful for storing cache for instance
  return ({ next, op }) => {
    // this is when passing the result to the next link

    // each link needs to return an observable which propagates results
    return observable((observer) => {
      const unsubscribe = next(op).subscribe({
        next(value) {
          observer.next(value)
        },
        error(err) {
          toastCall({ message: err.message, type: 'error' })
          observer.error(err)
        },
        complete() {
          observer.complete()
        },
      })

      return unsubscribe
    })
  }
}
