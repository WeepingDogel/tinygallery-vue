// stores/Authentication.ts

import { defineStore } from "pinia";

export const Authentication = defineStore('Authentication', {
    state: () => ({
        isLogged: false
    }),
    actions: {
        setLogStatus(status:boolean){
            this.isLogged = status; 
        }
    }
    // getters: {
    //     CheckIfLogged: (state) => {
    //         if(window.localStorage.getItem("Token") != null){
    //             state.isLogged = !state.isLogged;
    //             return state.isLogged;
    //         }else{
    //             return state.isLogged;
    //         }
    //     }
    // }
})