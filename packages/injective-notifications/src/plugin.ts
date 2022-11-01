// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: resolved with Nuxt
import type { NuxtApp } from 'nuxt3'
import { ref, reactive } from 'vue'
import {
  NotificationData,
  NotificationOptions,
  NotificationType
} from './types'
import { defineNuxtPlugin } from '#app'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: resolved with Nuxt
// import optionsLoader from '#build/something.options.mjs'

const state = reactive({
  notifications: [] as Array<NotificationData>,
  idCounter: 0
})

const ntfs = ref([] as Array<string>)

const notifications = {
  state,
  ntfs,
  error(options: NotificationOptions) {
    this.notify(options, NotificationType.Error)
  },

  warning(options: NotificationOptions) {
    this.notify(options, NotificationType.Warning)
  },

  success(options: NotificationOptions) {
    this.notify(options, NotificationType.Success)
  },

  info(options: NotificationOptions) {
    this.notify(options, NotificationType.Info)
  },

  deactivate(id: number) {
    const notifications = [...state.notifications]
    const index = notifications.findIndex((n: NotificationData) => n.id === id)

    if (index === -1) {
      return
    }

    const notification = notifications[index]
    clearTimeout(notification.timeout)

    state.notifications.splice(index, 1)
  },

  notify(options: NotificationOptions, type: NotificationType) {
    const { title, timeout } = options

    const duration = timeout || 6000
    const id = state.idCounter++
    const description = options.description || ''

    state.notifications.push({
      id,
      type,
      title,
      description,
      createdAt: Date.now(),
      timeout: setTimeout(() => this.deactivate(id), duration),
      timeoutStartedAt: Date.now(),
      timeoutRemainder: duration,
      timeoutDuration: duration,
      paused: false,
      showDeactivationTimer: false,
      actions: options.actions
    })

    ntfs.value.push('a')
  }
}
export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  // const yourOptions = await optionsLoader()
})

export const useNotifications = () => notifications
