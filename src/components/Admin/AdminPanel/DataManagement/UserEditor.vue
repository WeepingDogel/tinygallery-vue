<script lang="ts">
import axios from 'axios';
import { use } from 'echarts';

export default {
    props: {
        user_uuid: {
            type: String,
            require: true
        },
        modelValue: Boolean
    },
    emits: ['update:modelValue'],
    data() {
        return {
            user_data: Object,
            avatar_link: ''
        }
    },
    methods: {
        GetUserData(user_uuid: string | undefined) {
            // Get the token.
            const Token = localStorage.getItem('Token');
            // Get the data
            axios.get('/admin/get_single_user', {
                headers: {
                    "Authorization": "Bearer " + Token
                },
                params: {
                    user_uuid: user_uuid
                }
            })
                .then(
                    (response) => {
                        this.user_data = response.data;
                        this.GetTheAvatarLink();
                        console.log(response.data);
                    }
                )
                .catch(
                    (error) => {
                        console.log('Unable to find the user.');
                    }
                );
        },
        GetTheAvatarLink() {
            axios.get('/resources/avatar/' + ((this.user_data as any).user_name as string))
                .then(
                    (response) => {
                        this.avatar_link = response.data.full_image;
                    }
                )
                .catch(
                    (error) => {
                        console.log('Unable to fetch avatar.')
                    }
                )
        },
        CloseTheEditor() {
            this.$emit('update:modelValue', false)
        }
    },
    mounted() {
        this.GetUserData(this.user_uuid);
       
    }

};
</script>

<template>
    <div class="mask" v-if="modelValue">
        <div class="EditBox">
            <div class="TopControl">
                <button class="CloseButton" @click="CloseTheEditor">X</button>
            </div>
            <div class="MidControl">
                <img :src="avatar_link" class="AVATAR" />
                <p class="UUID">{{ user_uuid }}</p>
                <input type="text" class="USERNAME" placeholder="USERNAME"
                    :value="((user_data as any).user_name as string)" />
                <input type="password" class="PASSWORD" placeholder="PASSWORD"
                    :value="((user_data as any).password as string)" />
                <input type="email" class="EMAIL" placeholder="EMAIL" :value="((user_data as any).email as string)" />
                <input type="text" class="DATE" placeholder="DATE" :value="((user_data as any).date as string)" />
            </div>
            <div class="FootControl">
                <button class="Submit">Submit</button>
                <button class="Cancel">Cancel</button>
                <button class="Block">Block User</button>
                <button class="Delete">Delete User</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes WipeFromRight {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0%);
    }
}

@keyframes FadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 100%;
    }
}

.mask {
    width: 1588px;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    z-index: 2;
    position: fixed;
    justify-content: flex-end;
    animation: FadeIn 0.5s;
}

.EditBox {
    width: 50%;
    height: 100%;
    background-color: white;
    display: flex;
    animation: WipeFromRight 1s;
    flex-direction: column;
}

.TopControl {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
}

.CloseButton {
    width: 40px;
    height: 40px;
    border: none;
    outline: none;
    background-color: white;
    color: #212121;
    cursor: pointer;
    transition: ease-in-out 250ms;
}

.CloseButton:hover {
    transition: ease-in-out 250ms;
    color: white;
    background-color: #7C4DFF;
}

.MidControl {
    display: flex;
    flex-direction: column;
    padding: 20px;
    font-family: Arial, Helvetica, sans-serif;
    justify-content: center;
    align-items: center;
}

.AVATAR {
    width: 400px;
    height: 400px;
    border: solid 2px #7C4DFF;
    border-radius: 100%;
    margin-bottom: 20px;
}

.UUID {
    width: 400px;
    height: 24px;
    font-size: 18px;
    border-bottom: solid 1px #212121;
    margin-bottom: 20px;
}

.USERNAME {
    width: 400px;
    height: 24px;
    font-size: 18px;
    outline: none;
    border: none;
    color: #212121;
    border-bottom: solid 1px #212121;
    margin-bottom: 20px;
}

.PASSWORD {
    width: 400px;
    height: 24px;
    font-size: 18px;
    outline: none;
    border: none;
    color: #212121;
    border-bottom: solid 1px #212121;
    margin-bottom: 20px;
}

.EMAIL {
    width: 400px;
    height: 24px;
    font-size: 18px;
    outline: none;
    border: none;
    color: #212121;
    border-bottom: solid 1px #212121;
    margin-bottom: 20px;
}

.DATE {
    width: 400px;
    height: 24px;
    font-size: 18px;
    outline: none;
    border: none;
    color: #212121;
    border-bottom: solid 1px #212121;
    margin-bottom: 20px;
}

.FootControl {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.Submit {
    outline: none;
    border: none;
    margin: 2.5px;
    width: 80px;
    height: 40px;
    border-radius: 5px;
    background-color: #7C4DFF;
    color: #FFFFFF;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.Cancel {
    outline: none;
    border: none;
    margin: 2.5px;
    width: 80px;
    height: 40px;
    border-radius: 5px;
    background-color: #7C4DFF;
    color: #FFFFFF;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.Block {
    outline: none;
    border: none;
    margin: 2.5px;
    width: 80px;
    height: 40px;
    border-radius: 5px;
    background-color: #000000;
    color: #FFFFFF;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.Delete {
    outline: none;
    border: none;
    margin: 2.5px;
    width: 80px;
    height: 40px;
    border-radius: 5px;
    background-color: #ff0000;
    color: #FFFFFF;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}
</style>