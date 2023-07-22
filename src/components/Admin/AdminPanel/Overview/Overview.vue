<script lang="ts">
import axios from 'axios';
import * as echarts from 'echarts';
import { ref, onMounted, reactive } from 'vue';

export default {
    data() {
        return {
            user_num: String,
            posts_num: String,
            comments_num: String
        }
    },
    methods: {
        GetTheData() {
            axios.get('/userdata/get/user_num')
                .then(
                    (response) => {
                        this.user_num = response.data.toLocaleString();
                    }
                );
            axios.get('/userdata/get/posts_num')
                .then(
                    (response) => {
                        this.posts_num = response.data.toLocaleString();
                    }
                )
            axios.get('/userdata/get/comments_num')
                .then(
                    (response) => {
                        this.comments_num = response.data.toLocaleString();
                    }
                )
            console.log(this.user_num);
            console.log(this.posts_num);
            console.log(this.comments_num);
        },
        async renderUsersChart() {
            const Token = localStorage.getItem('Token');
            const chartConatainer = this.$refs.line_chart_user_tendency;
            const chart = echarts.init((chartConatainer as any))
            const response = await axios.get('/admin/user_tendency_addition', { headers: { "Authorization": "Bearer " + Token } })
            const data = (response as any).data;
            const xAxisData = data.map((item: { date: any; }) => item.date);
            const yAxisData = data.map((item: { count: any; }) => item.count);

            const option = {
                xAxis: {
                    type: 'category',
                    name: 'Date',
                    data: xAxisData,
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value',
                    name: 'Addittion of users'
                },
                series: [
                    {
                        data: yAxisData,
                        type: 'line',
                        color: '#7C4DFF',
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                fontSize: 20,
                                color: '#7C4DFF'
                            }
                        },
                        areaStyle: {
                            color: '#7C4DFF'
                        },

                    }
                ],
            };
            chart.setOption(option);
        },
        async renderPostsChart() {
            const Token = localStorage.getItem('Token');
            const chartConatainer = this.$refs.line_chart_posts_tendency;
            const chart = echarts.init((chartConatainer as any));
            const response = await axios.get('/admin/posts_tendency_addition', { headers: { "Authorization": "Bearer " + Token } });
            const data = (response as any).data;
            const xAxisData = data.map((item: { date: any; }) => item.date);
            const yAxisData = data.map((item: { count: any; }) => item.count);

            const option = {
                xAxis: {
                    type: 'category',
                    name: 'Date',
                    data: xAxisData,
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value',
                    name: 'Addittion of posts'
                },
                series: [
                    {
                        data: yAxisData,
                        type: 'line',
                        color: '#7C4DFF',
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                fontSize: 20,
                                color: '#7C4DFF'
                            }
                        },
                        areaStyle: {
                            color: '#7C4DFF'
                        },

                    }
                ],
            };
            chart.setOption(option);
        },
    },
    mounted() {
        this.GetTheData();
        this.renderUsersChart();
        this.renderPostsChart();
    }
}
</script>

<template>
    <div class="OverviewPanel">
        <h1 class="OverviewTitle">Current Data Count</h1>
        <p class="OverviewPara">User count: <span class="InfoNumber">{{ user_num }}</span></p>
        <p class="OverviewPara">Posts count: <span class="InfoNumber">{{ posts_num }}</span></p>
        <p class="OverviewPara">Comments count: <span class="InfoNumber">{{ comments_num }}</span></p>
        <h1 class="OverviewTitle">Tendency Of Users' Addition </h1>
        <div ref="line_chart_user_tendency" style="width: 100%; height: 400px"></div>
        <h1 class="OverviewTitle">Tendency Of Posts' Addition</h1>
        <div ref="line_chart_posts_tendency" style="width: 100%; height: 400px;"></div>
        <h1 class="OverviewTitle">Tendency Of Comments</h1>
    </div>
</template>

<style scoped>
@keyframes FadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.OverviewPanel {
    width: 90%;
    height: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    animation: FadeIn 1s;
    overflow-y: scroll;
    scrollbar-width: none;
}

.OverviewTitle {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 25px;
    line-height: 60px;
    animation: FadeIn 1s;
}

.OverviewPara {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    font-size: 18px;
    padding: 10px;
    text-align: justify;
    line-height: 10px;
    animation: FadeIn 1s;
}

.InfoNumber {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bolder;
    font-size: 28px;
    padding: 10px;
    text-align: justify;
    line-height: 20px;
    color: #7C4DFF;
}
</style>