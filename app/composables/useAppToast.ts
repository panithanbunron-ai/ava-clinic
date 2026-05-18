export interface ToastOptions {
    duration?: number
    icon?: string
}

export const useAppToast = () => {
    const toast = useToast()

    const success = (title: string, description?: string, options?: ToastOptions) => {
        toast.add({
            title,
            description,
            icon: options?.icon || 'i-heroicons-check-circle-20-solid',
            color: 'success',
            duration: options?.duration || 3000
        })
    }

    const error = (title: string, description?: string, options?: ToastOptions) => {
        toast.add({
            title,
            description,
            icon: options?.icon || 'i-heroicons-x-circle-20-solid',
            color: 'error',
            duration: options?.duration || 4000
        })
    }

    const warning = (title: string, description?: string, options?: ToastOptions) => {
        toast.add({
            title,
            description,
            icon: options?.icon || 'i-heroicons-exclamation-triangle-20-solid',
            color: 'warning',
            duration: options?.duration || 4000
        })
    }

    const info = (title: string, description?: string, options?: ToastOptions) => {
        toast.add({
            title,
            description,
            icon: options?.icon || 'i-heroicons-information-circle-20-solid',
            color: 'primary',
            duration: options?.duration || 3000
        })
    }

    return { success, error, warning, info }
}
