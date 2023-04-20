// store/UpdateRemarks

import { defineStore } from "pinia";

export const UpdateRemarks = defineStore('UpdateRemarks', {
    state: () => ({
        update: 1
    }),
    actions: {
        Update(status:number){
            this.update = this.update + status
        }
    }
})