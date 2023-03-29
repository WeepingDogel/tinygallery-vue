<script lang="ts">
import axios from 'axios';

export default {
    props: {
        modelValue: Boolean
    },
    emits: ['update:modelValue'],
    data() {
        return {
            newUserName: "",
            backgroundImage: null,
            avatarFile: null,
            Timezone: "",
        }
    },
    methods: {
        loadAvatar(event: any) {
            this.avatarFile = event.target.files[0];
            console.log(this.avatarFile);
        },
        loadBackground(event: any) {
            this.backgroundImage = event.target.files[0];
            console.log(this.backgroundImage);
        },
        CloseAndSaveSettings() {
            // This function will close the Settings Panel and save the profile.
            if (this.newUserName != "") {

            } else if (this.avatarFile != null) {
                const token = localStorage.getItem('Token')
                const BodyFormData = new FormData()
                const config = {
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                }
                BodyFormData.append('avatar', this.avatarFile)
                axios.put('/userdata/set/avatar', BodyFormData, config).then((response) => {
                    console.log(response.data.status)
                })
            }
            if (this.backgroundImage != null) {
                const token = localStorage.getItem("Token");
                const BodyFormData = new FormData();
                const config = {
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                }
                BodyFormData.append('background', this.backgroundImage)
                axios.put('/userdata/set/background', BodyFormData, config)
                    .then((response) => {
                        console.log(response.data.status)
                    })
            } else if (this.Timezone != "") {
                console.log(this.Timezone);
            }
            this.newUserName = "";
            this.avatarFile = null;
            this.backgroundImage = null;
            this.$emit('update:modelValue', false);
        },
        DiscardSettings() {
            // This function will not save any information when user clicked and close the Settings Panel.
            this.$emit('update:modelValue', false);
        }

    }
}

</script>


<template>
    <!-- <button @click="test">test</button> -->
    <div v-if="modelValue" class="ProfileSettings">
        <div class="SettingsBox">
            <h2 class="ProfileSettingsTitle">General Information</h2>
            <p class="ProfileText">
                Change UserName:
                <input v-model="newUserName" class="ProfileTextInputer" type="text" placeholder="New UserName?" />
            </p>
            <p class="ProfileText">
                Avatar:
                <input @change="loadAvatar" class="ProfileTextFile" placeholder="ChangeAvatar" type="file">
            </p>
            <p class="ProfileText">
                Background:
                <input @change="loadBackground" class="ProfileTextFile" placeholder="ChangeBackground" type="file">
            </p>
        </div>
        <div class="SettingsBox">
            <h2 class="ProfileSettingsTitle">Time Zone</h2>
            <p class="ProfileText">
                Select your timezone:
                <select v-model="Timezone">
                    <option value="-11">-11</option>
                    <option value="-10">-10</option>
                    <option value="-9">-9</option>
                    <option value="-8">-8</option>
                    <option value="-7">-7</option>
                    <option value="-6">-6</option>
                    <option value="-5">-5</option>
                    <option value="-4">-4</option>
                    <option value="-3">-3</option>
                    <option value="-2">-2</option>
                    <option value="-1">-1</option>
                    <option value="0">0</option>
                    <option value="1">+1</option>
                    <option value="2">+2</option>
                    <option value="3">+3</option>
                    <option value="4">+4</option>
                    <option value="5">+5</option>
                    <option value="6">+6</option>
                    <option value="7">+7</option>
                    <option value="8">+8</option>
                    <option value="9">+9</option>
                    <option value="10">+10</option>
                    <option value="11">+11</option>
                    <option value="12">12</option>
                </select>
            </p>
        </div>
        <button @click="CloseAndSaveSettings" class="ProfileFinishButton"> Apply </button>
        <button @click="DiscardSettings" class="ProfileFinishButton">Discard</button>
    </div>
</template>

<style scoped>
@keyframes SlideIn {
    from {
        transform: translateY(-80%);
    }

    to {
        transform: translateY(0%);
    }
}

.SettingsBox {
    display: flex;
    width: 100%;
    height: auto;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 25px;
}


.ProfileText {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    padding: 10px;
    color: #212121;
    text-align: justify;
}


.NoteText {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    padding: 10px;
    color: #ff0000;
    text-align: justify;
}

.ProfileTextFile {
    width: 300px;
    color: #212121;
    border: none;
    outline: none;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    padding: 10px;
}

.ProfileTextFile::file-selector-button {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    background-color: #7C4DFF;
    color: #FFFFFF;
    padding: 5px;
    outline: none;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.ProfileTextFile::file-selector-button:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    transition: background-color 0.5s ease;
}

.ProfileTextInputer {
    width: 300px;
    color: #212121;
    border: none;
    border-bottom: solid 1px #BDBDBD;
    outline: none;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    padding: 10px;
}

.ProfileTextInputer::placeholder {
    color: #757575;
}

.ProfileTextInputer:focus {
    border-bottom: solid 1px #212121;
}

.ProfileSettingsTitle {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 24px;
    line-height: 50px;
    padding: 10px;
}

.ProfileSettings {
    width: 80%;
    height: auto;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    background-color: #FFFFFF;
    animation: FadeIn 0.5s;
    animation: SlideIn 1s;
    margin: 5px auto;
    border-radius: 10px;
    transition: 0.5s ease-in-out;
}

.ProfileFinishButton {
    font-family: Arial, Helvetica, sans-serif;
    outline: none;
    border: none;
    background-color: #7C4DFF;
    padding: 12px;
    margin: 12px;
    color: #FFFFFF;
    letter-spacing: 2px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.ProfileFinishButton:hover {
    background-color: #303F9F;
    color: #C5CAE9;
    transition: background-color 0.5s ease;
}
</style>