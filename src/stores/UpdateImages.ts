// stores/UpdateImages

import { defineStore } from "pinia"

export const UpdateImages = defineStore('UpdateImage', {
    state: () => ({
        pages: 1
    }),
    actions: {
        AddPages(status:number) {
            this.pages = this.pages + status
        }
    }
})