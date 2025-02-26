import { ref } from "vue";
import { defineStore } from "pinia";

export const staffDetailStore = defineStore("staffDetail", () => {
  //选择的方向代表的数字
  const directionNum = ref(0);
  const directionName = ref("");
  //选择的轮次
  const turnNum = ref(0);
  const turnName = ref("");

  const status = ref(-1);

  return {
    directionNum,
    directionName,
    turnNum,
    turnName,
    status,
  };
});
