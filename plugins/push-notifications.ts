// plugins/push-notifications.ts
import { PushNotifications } from '@capacitor/push-notifications'
import { useRouter } from 'vue-router'

export default defineNuxtPlugin(() => {
  const router = useRouter()

  // Demande de permission pour les notifications
  PushNotifications.requestPermissions().then(result => {
    if (result.receive === 'granted') {
      PushNotifications.register()
    } else {
      console.warn('Notifications permission denied')
    }
  })

  // Écoute de l'enregistrement du token
  PushNotifications.addListener('registration', (token) => {
    console.log('Token de notification :', token.value)
    // Envoyer ce token au serveur pour l'enregistrer si besoin
  })

  // Gestion des erreurs d'enregistrement
  PushNotifications.addListener('registrationError', (error) => {
    console.error('Erreur d\'enregistrement :', error)
  })

  // Recevoir une notification en premier plan
  PushNotifications.addListener('pushNotificationReceived', (notification) => {
    console.log('Notification reçue :', notification)
    // Afficher la notification dans l'application, ou mettre à jour l'UI
  })

  // Lorsque l'utilisateur clique sur la notification
  PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
    console.log('Notification action :', notification)
    const { data } = notification.notification

    router.push('/notifications')
  })
})
