import { create } from "zustand";
import { NotificationType } from "../types/types";

interface NotificationsStore{
    notifications: NotificationType[],
    addNotification: ( notification: NotificationType) => void,
    removeNotification: (id: string) => void,
}

export const useNotificationsStore = create<NotificationsStore>(set=>({
    notifications: [],

    addNotification: (notification) => {
        set((state) => ({
          notifications: [...state.notifications, notification],
        }));
      },
    
      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter(
            (notification) => notification.id !== id
          ),
        }));
      },
}))