<script lang="ts">
import axios from "axios";
import * as echarts from "echarts";

export default {
  data() {
    return {
      user_num: String,
      posts_num: String,
      comments_num: String,
    };
  },
  methods: {
    GetTheData() {
      axios.get("/userdata/get/user_num").then((response) => {
        this.user_num = response.data.toLocaleString();
      });
      axios.get("/userdata/get/posts_num").then((response) => {
        this.posts_num = response.data.toLocaleString();
      });
      axios.get("/userdata/get/comments_num").then((response) => {
        this.comments_num = response.data.toLocaleString();
      });
      // Output the log with the data.
      console.log(this.user_num);
      console.log(this.posts_num);
      console.log(this.comments_num);
    },
    async renderChart() {
      const Token = localStorage.getItem("Token");
      const chartConatainer = this.$refs.line_chart_tendency;
      const chart = echarts.init(chartConatainer as any);
      setInterval(async () => {
        const response = await axios.get("/admin/user_tendency_addition", {
          headers: { Authorization: "Bearer " + Token },
        });
        chart.setOption(JSON.parse(response.data));
      }, 3000);
    },
    async renderToplistChart() {
      const Token = localStorage.getItem("Token");
      const chartConatainer = this.$refs.bar_chart_tendency;
      const chart = echarts.init(chartConatainer as any);
      setInterval(async () => {
        const response = await axios.get("/admin/posts_toplist", {
          headers: {
            Authorization: "Bearer " + Token,
          },
        });
        chart.setOption(JSON.parse(response.data));
      }, 3000);
    },
  },
  mounted() {
    this.GetTheData();
    this.renderChart();
    this.renderToplistChart();
  },
};
</script>

<template>
  <div class="OverviewPanel">
    <h1 class="OverviewTitle">Current Data Count</h1>
    <p class="OverviewPara">
      User count: <span class="InfoNumber">{{ user_num }}</span>
    </p>
    <p class="OverviewPara">
      Posts count: <span class="InfoNumber">{{ posts_num }}</span>
    </p>
    <p class="OverviewPara">
      Comments count: <span class="InfoNumber">{{ comments_num }}</span>
    </p>
    <div
      ref="line_chart_tendency"
      style="width: 100%; height: 600px; margin-top: 20px"
    ></div>
    <div
      ref="bar_chart_tendency"
      style="width: 100%; height: 600px; margin-top: 20px"
    ></div>
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
  color: #7c4dff;
}
</style>
