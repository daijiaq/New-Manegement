
<template>
  <div class="profile">
    <p class="profile-short"><b>分组人员</b></p>
    <div class="groups">
      <el-button
        v-for="(button) in buttons"
        :key="button.text"
        :type="button.type"
        @click="getApplyInfo(button.key)"
      >
        {{ button.text }}
      </el-button>
    </div>

  </div>

  <div class="list-form">
    <el-table
      :data="groupStore.tableData"
      stripe
      style="width: 100%"
      class="table-form"
      height="600"
    >
      <el-table-column
        prop="学号"
        label="学号"
        width="110"
      />
      <el-table-column
        prop="姓名"
        label="姓名"
        width="80"
      />
      <el-table-column
        prop="学院专业"
        label="学院专业"
      />
      <el-table-column
        prop="电话"
        label="电话"
        width="120"
      />
      <el-table-column
        prop="组别方向"
        label="组别方向"
        width="200"
      />
      <el-table-column
        prop="职业规划"
        label="职业规划"
      />
      <el-table-column
        prop="自我介绍"
        label="自我介绍"
        show-overflow-tooltip
      />
      <el-table-column
        prop="最新进度"
        label="最新进度"
      />
      <el-table-column
        prop="面试时间"
        label="面试时间"
      />
      <el-table-column
        fixed="right"
        label="操作"
        min-width="80"
      >
        <template #default>
          <el-button
            link
            type="primary"
            size="small"
            @click="changeStatus"
          >
            进度编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="footer">
      <div class="pagination">
        <!-- <div>Total:4</div> -->
        <el-pagination
          layout="prev, pager, next"
          :total="1"
        />
      </div>
      <span class="totalNum">共{{groupStore.tableData.length}}人</span>
    </div>

  </div>

  <el-dialog
    v-model="dialogTableVisible"
    width="800"
  >

    <div>
      <el-radio-group v-model="radio1">
        <el-radio
          value="1"
          size="large"
        >通过</el-radio>
        <el-radio
          value="2"
          size="large"
        >不通过</el-radio>
      </el-radio-group>
    </div>

    <div>
      <el-radio-group v-model="radio2">
        <el-radio
          value="1"
          size="large"
        >面试</el-radio>
        <el-radio
          value="2"
          size="large"
        >第一轮考核</el-radio>
        <el-radio
          value="3"
          size="large"
        >第二轮考核</el-radio>
        <el-radio
          value="4"
          size="large"
        >第三轮考核</el-radio>
      </el-radio-group>
    </div>

    <el-button
      plain
      class="sure"
      @click="makeSure"
    >确认</el-button>
    <el-button
      plain
      class="cancel"
      @click="cancel"
    >取消</el-button>
  </el-dialog>

</template>
  
  
  <script setup>
import { useGroupStore } from "../../../store/group";
const groupStore = useGroupStore();
import { onMounted, ref } from "vue";
import { getApply } from "../../../api/getApply";

const buttons = [
  { key: 0, type: "primary", text: "前端" },
  { key: 1, type: "primary", text: "后台" },
  { key: 2, type: "primary", text: "安卓" },
  { key: 3, type: "primary", text: "UI" },
  { key: 4, type: "primary", text: "深度学习" },
  { key: 5, type: "primary", text: "硬件" },
];

const rawDataArray = ref([]);
const getApplyInfo = async (target) => {
  const res = await getApply(target);
  rawDataArray.value = res.data;

  // 使用map函数转换数组
  const transformedDataArray = rawDataArray.value.map(transformData);

  // 输出转换后的数组
  groupStore.tableData = transformedDataArray;
};


// 转换函数，与之前单个对象的转换函数相同
function transformData(data) {
  return {
    学号: data.account,
    姓名: data.userName,
    学院专业: data.major,
    电话: data.phone,
    组别方向: getGroupDirection(data),
    职业规划: data.plan,
    自我介绍: data.introduction,
    最新进度: "面试 : 未开始",
    面试时间: "",
  };
}

// 根据数据确定组别方向的函数
function getGroupDirection(data) {
  const directions = {
    backend: "后台",
    headend: "前端",
    deeplearn: "深度学习",
    android: "安卓",
    uidesign: "UI",
    hardware: "硬件",
  };

  let direction = [];
  for (let key in directions) {
    if (data[key]) {
      direction.push(directions[key]);
    }
  }

  return direction.join("、"); // 使用顿号分隔多个方向
}

const dialogTableVisible = ref(false);
const changeStatus = () => {
  dialogTableVisible.value = true;
};
const radio1 = ref("1");
const radio2 = ref("1");

const makeSure = () => {
  dialogTableVisible.value = false;
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

.groups {
  margin-top: 20px;
}
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
</style>