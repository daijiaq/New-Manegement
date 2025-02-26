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
  <div class="one">
    <div class="Published">已发布时间</div>
    <div class="lunci">
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
  </div>

  <el-table
    :data="tableDataPublished"
    stripe
    style="width: 90%"
    class="table-form"
    height="300"
  >
    <el-table-column prop="日期" label="日期" />
    <el-table-column prop="开始时间" label="开始时间" />
    <el-table-column prop="结束时间" label="结束时间" />
    <el-table-column fixed="right" label="操作" min-width="120">
      <!-- <template #default>
        <el-button link type="primary" size="small" @click="deleteTime">
          删除
        </el-button> -->
      <!-- <el-button link type="primary" size="small" @click="viewRegistered">
          查看已报名人员
        </el-button> -->
      <!-- </template> -->
      <template #default="scope">
        <el-button
          size="small"
          type="danger"
          @click="viewRegistered(scope.$index, scope.row)"
        >
          查看已报名人员
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 点击删除的弹出层 -->
  <el-dialog v-model="dialogDeleteVisible" title="提示" width="500">
    <span>确定要删除该时间段吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogDeleteVisibleSure"
          v-if="dialogDeleteVisible == true"
        >
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 点击查看已报名学生信息的弹出层 -->
  <el-dialog v-model="dialogTableVisible" title="已报名学生信息" width="800">
    <el-table :data="registeredData">
      <el-table-column property="学号" label="学号" width="200" />
      <el-table-column property="姓名" label="姓名" width="150" />
      <el-table-column property="学院专业" label="学院专业" width="300" />
      <el-table-column property="电话" label="电话" width="200" />
    </el-table>
  </el-dialog>

  <div class="two">
    <!-- <div class="sureAddLine"> -->
    <span class="unPublished">保存但未发布时间</span>
    <span class="Announce" @click="successAddPreTime">发布</span>
  </div>
  <el-table
    :data="tableDataUnPublished"
    stripe
    style="width: 90%"
    class="table-form"
    height="300"
  >
    <el-table-column prop="日期" label="日期" />
    <el-table-column prop="开始时间" label="开始时间" />
    <el-table-column prop="结束时间" label="结束时间" />
    <el-table-column fixed="right" label="操作" min-width="120">
      <!-- <template #default>
        <el-button link type="primary" size="small" @click="deletePreTime">
          删除
        </el-button>
      </template> -->
      <template #default="scope">
        <el-button
          size="small"
          type="danger"
          @click="deletePreTime(scope.$index, scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="three">
    <div class="addTime">添加预约时间</div>
    <div class="divideTimeBtn">
      <span class="Announce tenMins" @click="tenMinsSaveClick"
        >确认保存(十分钟一段)</span
      >
      <span class="Announce sureTime" @click="sureSaveClick">确认保存</span>
    </div>
    <!-- <div class="lunci">
      <el-dropdown>
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
      </el-dropdown> -->
    <!-- <div class="alreadyChooseClass" v-if="alreadyChoose">
        现添加的是{{ turnName }}的预约时间 -->
    <!-- </div> -->
    <!-- </div>  -->
  </div>

  <div class="demo-datetime-picker" :style="{ marginLeft: '-413px' }">
    <div class="block">
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        format="YYYY-MM-DD HH:mm:ss"
        date-format="YYYY/MM/DD ddd"
        time-format="A hh:mm:ss"
        @change="showTime(value2)"
      />
    </div>
  </div>

  <!-- <div>{{ formattedDateRange }}</div> -->
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, onBeforeMount } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { compile } from "vue";
import { timeManagementStore } from "../../store/modules/timeManagement";
import { getAddTime } from "../../api/getAddTime";
import { addPreTime } from "../../api/addPreTime";
import { getTimeChoiceDetail } from "../../api/getTimeChoiceDetail";

const timeManagementStoreList = timeManagementStore();
let {
  showTime,
  timeSlots,
  matchTimeStartEnd,
  tenMinsClick,
  sureClick,
  directionNum,
  directionName,
  turnNum,
  turnName,
  tenMinsSaveClickStore,
  sureSaveClickStore,
  matchTimeStartEndObj,
  timeId,
} = toRefs(timeManagementStore());
const buttons = [
  { key: 0, type: "primary", text: "前端" },
  { key: 1, type: "primary", text: "后台" },
  { key: 2, type: "primary", text: "安卓" },
  { key: 3, type: "primary", text: "UI" },
  { key: 4, type: "primary", text: "深度学习" },
  { key: 5, type: "primary", text: "硬件" },
];

//导航栏是否出现
let twoPostNav = ref(true);
let twoPostTurn = ref(true);

//是否选择轮次
let alreadyChoose = ref(false);

const getApplyInfo = (key, text) => {
  directionNum.value = key;
  directionName.value = text;
  if (tableDataUnPublished.value != null) {
    twoPostNav.value = false;
    twoPostTurn.value = false;
  }
  if (directionName.value != "" && turnName.value != "") {
    getAddTimeAPI();
  }
};
const interviewClick = () => {
  turnNum.value = 0;
  alreadyChoose.value = true;
  turnName.value = "面试";
  if (directionName.value != "" && turnName.value != "") {
    getAddTimeAPI();
  }
};
const firstClick = () => {
  turnNum.value = 1;
  alreadyChoose.value = true;
  turnName.value = "一轮";
  if (directionName.value != "" && turnName.value != "") {
    getAddTimeAPI();
  }
};
const secondClick = () => {
  turnNum.value = 2;
  alreadyChoose.value = true;
  turnName.value = "二轮";
  if (directionName.value != "" && turnName.value != "") {
    getAddTimeAPI();
  }
};
const thirdClick = () => {
  turnNum.value = 3;
  alreadyChoose.value = true;
  turnName.value = "三轮";
  if (directionName.value != "" && turnName.value != "") {
    getAddTimeAPI();
  }
};

const value2 = ref("");

let tableDataPublished = ref([]);

let tableDataUnPublished = ref([]);

const tenMinsSaveClick = () => {
  tenMinsSaveClickStore.value();
  tableDataUnPublished.value = JSON.parse(
    localStorage.getItem("matchTimeStartEndObj")
  );
  console.log(tableDataUnPublished.value);
  twoPostNav.value = false;
  twoPostTurn.value = false;
  localStorage.removeItem("matchTimeStartEndObj");
};
const sureSaveClick = () => {
  sureSaveClickStore.value();
  tableDataUnPublished.value = JSON.parse(
    localStorage.getItem("matchTimeStartEndObj")
  );
  console.log(tableDataUnPublished.value);
  twoPostNav.value = false;
  twoPostTurn.value = false;
  localStorage.removeItem("matchTimeStartEndObj");
};

const dialogDeleteVisible = ref(false);

const dialogDeleteVisibleSure = () => {
  dialogDeleteVisible.value = false;
  localStorage.removeItem("matchTimeStartEndObj");
  localStorage.setItem(
    "matchTimeStartEndObj",
    JSON.stringify(tableDataUnPublishedAfterDelete.value)
  );
  tableDataUnPublished.value = tableDataUnPublishedAfterDelete.value;
  tableDataUnPublishedAfterDelete.value = [];
  console.log(tableDataUnPublished.value);
};

let tableDataUnPublishedAfterDelete = ref([]);
const deletePreTime = (index, row) => {
  dialogDeleteVisible.value = true;
  console.log(index, row);
  tableDataUnPublished.value.forEach((item, tableIndex) => {
    if (index != tableIndex) {
      tableDataUnPublishedAfterDelete.value[
        tableDataUnPublishedAfterDelete.value.length
      ] = item;
    }
  });
};

//获取已发布的预约时间
const getAddTimeAPI = async () => {
  tableDataPublished.value = [];
  timeId.value = [];
  const resTimeList = await getAddTime(directionNum.value, turnNum.value);
  console.log(resTimeList.data);
  resTimeList.data.forEach((item) => {
    let [dateStart, timeStart] = item.timeStart.split(" ");
    let [dateEnd, timeEnd] = item.timeEnd.split(" ");
    let [timeStartHour, timeStartMin, startSecond] = timeStart.split(":");
    let [timeEndHour, timeEndMin, endSeconds] = timeEnd.split(":");
    tableDataPublished.value[tableDataPublished.value.length] = {
      日期: dateStart,
      开始时间: timeStartHour + ":" + timeStartMin,
      结束时间: timeEndHour + ":" + timeEndMin,
    };
    timeId.value[timeId.value.length] = item.id;
  });
  console.log(timeId.value);
};
//添加预约时间
const successAddPreTime = async () => {
  for (const item of tableDataUnPublished.value) {
    console.log(item);
    await addPreTime(
      item.日期 + " " + item.开始时间 + ":00",
      item.日期 + " " + item.结束时间 + ":00",
      directionNum.value,
      turnNum.value
    );
  }
  localStorage.removeItem("matchTimeStartEndObj");
  tableDataUnPublished.value = JSON.parse(
    localStorage.getItem("matchTimeStartEndObj")
  );
  matchTimeStartEndObj.value = [];
  twoPostNav.value = true;
  twoPostTurn.value = true;
  getAddTimeAPI();
};

const dialogTableVisible = ref(false);

const registeredData = ref([]);

const viewRegistered = async (index, row) => {
  dialogTableVisible.value = true;
  const res = await getTimeChoiceDetail(timeId.value[index]);
  if (res.data) {
    registeredData.value = [];
    registeredData.value[registeredData.value.length] = {
      学号: res.data.account,
      姓名: res.data.userName,
      学院专业: res.data.major,
      电话: res.data.phone,
    };
  } else {
    registeredData.value = [];
    registeredData.value[registeredData.value.length] = {
      学号: "该时间还没有被预约",
      姓名: "",
      学院专业: "",
      电话: "",
    };
  }
};

onBeforeMount(() => {
  tableDataUnPublished.value = JSON.parse(
    localStorage.getItem("matchTimeStartEndObj")
  );
  getAddTimeAPI();
});
</script>

<style lang="less" scoped>
.Published {
  margin-top: 20px;
  font-size: 22px;
}
.unPublished,
.addTime {
  margin-top: 100px;
  font-size: 22px;
}

.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
  margin-bottom: 50px;
}
.demo-datetime-picker .block {
  padding: 21px 0;
  text-align: center;
}

.table-form {
  margin-top: 30px;
}

.one,
.two,
.three {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.lunci {
  margin-left: 50px;
}
.Announce {
  border-radius: 30px;
  margin-left: -801px;
  margin-right: 150px;
  background-color: rgb(121.3, 187.1, 255);
  width: 80px;
  line-height: 35px;
  height: 35px;
  text-align: center;
}
.divideTimeBtn {
  // padding-right: 50px;
  display: flex;
  justify-content: first baseline;
  align-items: center;
  // gap: 20px;
}
.tenMins {
  width: 180px;
  margin-left: 0;
}
.sureTime {
  margin-left: 0;
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
