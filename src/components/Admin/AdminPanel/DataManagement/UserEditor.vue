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
                        console.log(response.data)
                    }
                )
                .catch(
                    (error) => {
                        console.log('Unable to find the user.')
                    }
                );
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
            <!-- {{ user_uuid }} -->
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
}
</style>