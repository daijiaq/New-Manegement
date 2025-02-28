<template>
  <div class="directionChooseFront">
    <div class="directionChooseText">{{ directionName }}</div>
    <el-button
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      @click="getApplyInfo(button.key, button.text)"
      class="directionBtn"
      v-if="twoPostNav"
    >
      {{ button.text }}
    </el-button>
  </div>
  <div class="lunciStatusContainer">
    <div class="lunci" v-for="(status, index) in lunciStatus" :key="index">
      <el-dropdown
        @visible-change="
          (visible) => handleDropdownVisibleChange(visible, index, status)
        "
      >
        <span class="el-dropdown-link">
          {{ status }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="notStarted">未开始</el-dropdown-item>
            <el-dropdown-item @click="onGoing">进行中</el-dropdown-item>
            <!-- <el-dropdown-item>已完成</el-dropdown-item> -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <div class="allStatus">整体进度状态</div>
  <el-table
    :data="allStatusTableData"
    stripe
    style="width: 90%"
    class="table-form"
    height="360"
  >
    <el-table-column
      prop="所属方向"
      label="所属方向"
      v-if="ifShowFirstColumn"
    />

    <el-table-column prop="面试" label="面试" />
    <el-table-column prop="第一轮考核" label="第一轮考核" />
    <el-table-column prop="第二轮考核" label="第二轮考核" />
    <el-table-column prop="第三轮考核" label="第三轮考核" />
  </el-table>
</template>

<script setup>
import { ref, toRefs, onBeforeMount } from "vue";
import { staffDetailStore } from "../../../store/modules/staff";
import { unifiedPaces } from "../../../api/unifiedPaces";
let { directionNum, directionName, turnNum, turnName, status } = toRefs(
  staffDetailStore()
);
import { updatePaceStarted } from "../../../api/updatePaceStarted";
const buttons = [
  { key: 0, type: "primary", text: "前端" },
  { key: 1, type: "primary", text: "后台" },
  { key: 2, type: "primary", text: "安卓" },
  { key: 3, type: "primary", text: "UI" },
  { key: 4, type: "primary", text: "深度学习" },
  { key: 5, type: "primary", text: "硬件" },
];

const lunciStatus = ref(["面试", "第一轮考核", "第二轮考核", "第三轮考核"]);
const allStatusTableData = ref([
  {
    所属方向: "前端",
    面试: "未开始",
    第一轮考核: "未开始",
    第二轮考核: "未开始",
    第三轮考核: "未开始",
  },
  {
    所属方向: "后台",
    面试: "未开始",
    第一轮考核: "未开始",
    第二轮考核: "未开始",
    第三轮考核: "未开始",
  },
  {
    所属方向: "安卓",
    面试: "未开始",
    第一轮考核: "未开始",
    第二轮考核: "未开始",
    第三轮考核: "未开始",
  },
  {
    所属方向: "UI",
    面试: "未开始",
    第一轮考核: "未开始",
    第二轮考核: "未开始",
    第三轮考核: "未开始",
  },
  {
    所属方向: "深度学习",
    面试: "未开始",
    第一轮考核: "未开始",
    第二轮考核: "未开始",
    第三轮考核: "未开始",
  },
  {
    所属方向: "硬件",
    面试: "未开始",
    第一轮考核: "未开始",
    第二轮考核: "未开始",
    第三轮考核: "未开始",
  },
]);

const ifShowFirstColumn = ref(true);
const getApplyInfo = (buttonKey, text) => {
  directionNum.value = buttonKey;
  directionName.value = text;

  // if (buttonKey == 6) {
  //   ifShowFirstColumn.value = true;
  // } else {
  //   ifShowFirstColumn.value = false;
  // }
};

//导航栏是否出现
let twoPostNav = ref(true);
let twoPostTurn = ref(true);

const notStarted = async () => {
  status.value = 0;
  console.log(directionNum.value, turnNum.value, status.value);
  await updatePaceStarted(directionNum.value, turnNum.value, status.value);
  await updateAllList();
};
const onGoing = async () => {
  status.value = 1;
  await updatePaceStarted(directionNum.value, turnNum.value, status.value);
  await updateAllList();
};
const handleDropdownVisibleChange = (visible, index, status) => {
  if (visible) {
    handleOpen(index, status);
  } else {
    handleClose();
  }
};
// 打开下拉菜单
const handleOpen = (index, status) => {
  turnNum.value = index;
  turnName.value = status;
};
const updateAllList = async () => {
  const res = await unifiedPaces();
  for (const item of res.data) {
    const targetIndex = item.target; // 获取 target 值
    const direction = allStatusTableData.value[targetIndex]; // 找到对应的方向

    // 更新面试状态
    direction.面试 = item.interview === 1 ? "进行中" : "未开始";

    // 更新第一轮考核状态
    direction.第一轮考核 = item.statusOne === 1 ? "进行中" : "未开始";

    // 更新第二轮考核状态
    direction.第二轮考核 = item.statusTwo === 1 ? "进行中" : "未开始";

    // 更新第三轮考核状态
    direction.第三轮考核 = item.statusThree === 1 ? "进行中" : "未开始";
  }
};

onBeforeMount(async () => {
  await updateAllList();
});

// 关闭下拉菜单
const handleClose = () => {
  turnNum.value = -1;
};
</script>

<style lang="less" scoped>
.lunci {
  margin-top: 20px;
}
.lunciStatusContainer {
  display: flex;
  align-items: flex-end;
  //   margin-left: 60px;
  gap: 35px;
}
.allStatus {
  margin-top: 20px;
  font-size: 22px;
}
.table-form {
  margin-top: 20px;
}
.alreadyChooseClass {
  color: rgb(197, 128, 1);
  font-size: 28px;
}
.directionBtn:active {
  background-color: #03509c;
}
.directionChooseFront {
  display: flex;
  justify-content: start;
  align-items: center;
}
.directionChooseText {
  margin-right: 30px;
  font-size: 28px;
  color: rgb(197, 128, 1);
}
</style>
