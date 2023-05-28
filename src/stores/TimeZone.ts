import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment-timezone";

export const Timezone = defineStore(
    'TimeZone',
    {
        state: () => ({
            TimeZoneServer: '',
            TimeZoneBrowser: '' 
        }),
        actions: {
            GetTheTimeZoneOfServer(){
                axios.get('/userdata/get/timezone')
                .then(
                    (response) => {
                        // console.log(response);
                        this.TimeZoneServer = response.data;
                        console.log(this.TimeZoneServer);
                    }
                )
                .catch(
                    (error) => {
                        // console.log(error);
                        return error.detail;
                    }
                )
            },
            GetTheLocalTimeZone(){
                const TimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                this.TimeZoneBrowser = TimeZone;
                console.log(this.TimeZoneBrowser);
            },
            CaculateTheCorrectDate(OriginalDate: String){
                const dateString = OriginalDate;
                return moment.tz(dateString, this.TimeZoneServer)
                .clone()
                .tz(this.TimeZoneBrowser)
                .format('YYYY-MM-DD HH:mm');
            }
        }
    }
)