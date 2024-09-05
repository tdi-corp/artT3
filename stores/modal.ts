export const useModalStore = defineStore('modalStore', {
    state: () => ({
        toggle: false as boolean
    }),
    actions: {
        toggleModal() {
            this.toggle = !this.toggle
        }
    }
})