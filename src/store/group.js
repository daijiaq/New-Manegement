import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useGroupStore = defineStore("group", () => {
  const tableData = reactive([]);

  //选择的方向代表的数字
  const directionNum = ref(-1);
  const directionName = ref("");
  //选择的轮次
  const turnNum = ref(-1);
  const turnName = ref("");

  return {
    tableData,
    directionNum,
    directionName,
    turnNum,
    turnName,
  };
});
