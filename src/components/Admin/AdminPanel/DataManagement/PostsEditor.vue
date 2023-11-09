<script lang="ts">
import axios from "axios";

export default {
  props: {
    post_uuid: {
      type: String,
      require: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    GetPostData(post_uuid: string) {
      axios.get("", {}).then((response) => {});
    },
  },
  mounted() {},
};
</script>

<template>
  <div class="mask">
    <div class="EditorBox">
      <div class="top-control">
        <input type="text" />
      </div>
      <div class="mid-control">
        <input type="text" />
      </div>
      <div class="foot-control">
        <input type="text" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.mask {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.EditorBox {
  width: 700px;
  height: 400px;
  background-color: white;
}
</style>
