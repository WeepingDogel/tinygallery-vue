// stores/UpdateImages

import { defineStore } from "pinia"

export const UpdateImages = defineStore('UpdateImage', {
    state: () => ({
        update: 1
    }),
    actions: {
        Update(status:number) {
            this.update = this.update + status
        }
    }
})