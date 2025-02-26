<template>
  <div class="profile">
    <p class="profile-short"><b>分组人员</b></p>
    <div class="directionChooseFront">
      <div class="directionChooseText">{{ directionName }}</div>
      <div class="groups">
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
    </div>
  </div>

  <div class="lunci directionChooseFront">
    <el-dropdown v-if="twoPostTurn">
      <span class="el-dropdown-link">
        选择轮次
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="interviewClick">面试</el-dropdown-item>
          <el-dropdown-item @click="firstClick">第一轮</el-dropdown-item>
          <el-dropdown-item @click="secondClick">第二轮</el-dropdown-item>
          <el-dropdown-item @click="thirdClick">第三轮</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="alreadyChooseClass" v-if="alreadyChoose">
      {{ turnName }}
    </div>
  </div>

  <div class="list-form">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      class="table-form"
      height="600"
    >
      <el-table-column prop="学号" label="学号" width="110" />
      <el-table-column prop="姓名" label="姓名" width="80" />
      <el-table-column prop="学院专业" label="学院专业" />
      <el-table-column prop="电话" label="电话" width="120" />
      <el-table-column prop="组别方向" label="组别方向" width="200" />
      <el-table-column prop="职业规划" label="职业规划" />
      <el-table-column prop="自我介绍" label="自我介绍" show-overflow-tooltip />
      <el-table-column prop="最新进度" label="最新进度" />
      <el-table-column fixed="right" label="操作" min-width="80">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="changeStatus(scope.$index, scope.row)"
          >
            进度编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="footer">
      <div class="pagination">
        <!-- <div>Total:4</div> -->
        <el-pagination layout="prev, pager, next" :total="1" />
      </div>
      <span class="totalNum">共{{ tableData.length }}人</span>
    </div>
  </div>

  <el-dialog v-model="dialogTableVisible" width="800">
    <div>
      <el-radio-group v-model="radio1">
        <el-radio :value="3" size="large" @click="pass">通过</el-radio>
        <el-radio :value="4" size="large" @click="fail">不通过</el-radio>
      </el-radio-group>
    </div>
    <el-button plain class="sure" @click="makeSure">确认</el-button>
    <el-button plain class="cancel" @click="cancel">取消</el-button>
  </el-dialog>
</template>

<script setup>
import { useGroupStore } from "../../../store/group";
const groupStore = useGroupStore();
import { onMounted, ref, toRefs } from "vue";
import { getApply } from "../../../api/getApply";
import {
  updatePaceInterview,
  updatePaceStatusOne,
  updatePaceStatusTwo,
  updatePaceStatusThree,
} from "../../../api/updatePace";
let { tableData, directionNum, directionName, turnNum, turnName } = toRefs(
  useGroupStore()
);

const buttons = [
  { key: 0, type: "primary", text: "前端" },
  { key: 1, type: "primary", text: "后台" },
  { key: 2, type: "primary", text: "安卓" },
  { key: 3, type: "primary", text: "UI" },
  { key: 4, type: "primary", text: "深度学习" },
  { key: 5, type: "primary", text: "硬件" },
];

const rawDataArray = ref([]);
//进度编辑的进度id数组
const paceIdArray = ref([]);
//通过3不通过4
const status = ref(-1);
const pass = () => {
  status.value = 2;
};
const fail = () => {
  status.value = 3;
};
const getAllUser = async () => {
  paceIdArray.value = [];

  const res = await getApply(directionNum.value, turnNum.value);
  rawDataArray.value = res.data;
  // 使用map函数转换数组
  const transformedDataArray = rawDataArray.value.map(transformData);
  console.log(transformedDataArray);
  // 输出转换后的数组
  groupStore.tableData = transformedDataArray;
};
const getApplyInfo = async (target, text) => {
  directionNum.value = target;
  directionName.value = text;
  if (directionName.value != "" && turnName.value != "") {
    getAllUser();
  }
};

let alreadyChoose = ref(false);
//导航栏是否出现
let twoPostNav = ref(true);
let twoPostTurn = ref(true);
const interviewClick = () => {
  turnNum.value = 0;
  alreadyChoose.value = true;
  turnName.value = "面试";
  if (directionName.value != "" && turnName.value != "") {
    getAllUser();
  }
};
const firstClick = () => {
  turnNum.value = 1;
  alreadyChoose.value = true;
  turnName.value = "一轮";
  if (directionName.value != "" && turnName.value != "") {
    getAllUser();
  }
};
const secondClick = () => {
  turnNum.value = 2;
  alreadyChoose.value = true;
  turnName.value = "二轮";
  if (directionName.value != "" && turnName.value != "") {
    getAllUser();
  }
};
const thirdClick = () => {
  turnNum.value = 3;
  alreadyChoose.value = true;
  turnName.value = "三轮";
  if (directionName.value != "" && turnName.value != "") {
    getAllUser();
  }
};

// 转换函数，与之前单个对象的转换函数相同
const transformData = (item) => {
  const { paceId, paceInfo, informationDto } = item;
  const roles = [];

  paceIdArray.value[paceIdArray.value.length] = paceId;

  // 检查每个字段，如果为 true，则添加到 roles 数组
  if (informationDto.backend) roles.push("后台");
  if (informationDto.hardware) roles.push("硬件");
  if (informationDto.headend) roles.push("前端");
  if (informationDto.android) roles.push("安卓");
  if (informationDto.deeplearn) roles.push("深度学习");
  if (informationDto.uidesign) roles.push("UI设计");

  let progressStatus;
  switch (paceInfo) {
    case 0:
      progressStatus = "未开始";
      break;
    case 1:
      progressStatus = "进行中";
      break;
    case 2:
      progressStatus = "已通过";
      break;
    case 3:
      progressStatus = "未通过";
      break;
    default:
      progressStatus = "未知状态"; // 处理未知的 paceInfo 值
  }

  return {
    学号: informationDto.account,
    姓名: informationDto.userName,
    学院专业: informationDto.major,
    电话: informationDto.phone,
    组别方向: roles.join("、"), // 将数组转换为字符串，用 "、" 分隔
    职业规划: informationDto.plan,
    自我介绍: informationDto.introduction,
    最新进度: `${turnName.value}:${progressStatus}`,
  };
};

const dialogTableVisible = ref(false);

//进度id
const paceId = ref(-1);
const changeStatus = (index, row) => {
  dialogTableVisible.value = true;
  paceId.value = paceIdArray.value[index];
  console.log(paceIdArray.value[index]);
  console.log(paceId.value);
};
const radio1 = ref("1");
const radio2 = ref("1");

const makeSure = () => {
  dialogTableVisible.value = false;
  console.log(paceId.value, status.value);
  if (turnNum.value == 0) updatePaceInterview(paceId.value, status.value);
  if (turnNum.value == 1) updatePaceStatusOne(paceId.value, status.value);
  if (turnNum.value == 2) updatePaceStatusTwo(paceId.value, status.value);
  if (turnNum.value == 3) updatePaceStatusThree(paceId.value, status.value);
  getAllUser();
};
const cancel = () => {
  dialogTableVisible.value = false;
};
</script>

<style lang="less" scoped>
.profile {
  margin-bottom: 15px;
}
.profile-long {
  margin-top: 6px;
}
::v-deep .table-form[data-v-804726e0] {
  margin-top: 22px;
}
.list-form {
  background-color: white;
  padding-bottom: 6px;
}
.pagination {
  margin-top: 12px;
}

// .groups {
//   // margin-top: 20px;
// }
// .active-button {
//   background-color: blue;
//   color: white; /* 可选：改变文字颜色以确保可读性 */
// }
.sure,
.cancel {
  margin-top: 20px;
}

.footer {
  display: flex;
  align-items: center;
}

.totalNum {
  margin-top: 10px;
  margin-left: 15px;
}

.alreadyChooseClass {
  color: rgb(197, 128, 1);
  font-size: 28px;
  margin-left: 30px;
}

.directionBtn:active {
  background-color: #03509c;
}
.directionChooseFront {
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 20px;
}
.directionChooseText {
  margin-right: 30px;
  font-size: 28px;
  color: rgb(197, 128, 1);
}
</style>
