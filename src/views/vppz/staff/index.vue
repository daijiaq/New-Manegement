<template>
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
    <div class="lunciStatusContainer">
        <div class="lunci" v-for="(status,index) in lunciStatus" :key="index">
      <el-dropdown>
    <span class="el-dropdown-link">
      {{ status }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>未开始</el-dropdown-item>
        <el-dropdown-item>进行中</el-dropdown-item>
        
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    </div>
    </div>

    <div class="allStatus">整体进度状态</div>
    <el-table :data="allStatusTableData" stripe style="width: 90%" class="table-form" height="180">
      <el-table-column prop="所属方向" label="所属方向" v-if="ifShowFirstColumn"/>

      <el-table-column prop="面试" label="面试"/>
          <el-table-column prop="第一轮考核" label="第一轮考核"  />
          <el-table-column prop="第二轮考核" label="第二轮考核" />
          <el-table-column prop="第三轮考核" label="第三轮考核" />
        
    </el-table>
   
  
</template>

<script setup>
import { ref } from 'vue';
 const buttons = [
    { key:0,type: 'primary', text: '前端' },
    { key:1,type: 'primary', text: '后台' },
    { key:2,type: 'primary', text: '安卓' },
    { key:3,type: 'primary', text: 'UI' },
    { key:4,type: 'primary', text: '深度学习' },
    { key:5,type: 'primary', text: '硬件' },
    { key:6,type: 'primary', text: '所有组别' }
  ] 

const lunciStatus=ref(["面试","第一轮考核","第二轮考核","第三轮考核"])
const allStatusTableData = [
  {
    所属方向:'前端',
    面试: '未开始',
    第一轮考核: '未开始',
    第二轮考核: '未开始',
    第三轮考核:'未开始'
  },
  {
    所属方向:'后台',
    面试: '未开始',
    第一轮考核: '未开始',
    第二轮考核: '未开始',
    第三轮考核:'未开始'
  },
  {
    所属方向:'安卓',
    面试: '未开始',
    第一轮考核: '未开始',
    第二轮考核: '未开始',
    第三轮考核:'未开始'
  }
]

  const ifShowFirstColumn=ref(false)
  const getApplyInfo=(buttonKey)=>{
    console.log(buttonKey);
    
    if(buttonKey==6){
      ifShowFirstColumn.value=true
    }
    else{
      ifShowFirstColumn.value=false

    }
  }
</script>

<style lang="less" scoped>
.lunci{
    margin-top: 20px;
}
.lunciStatusContainer{
    display: flex;
  align-items: flex-end; 
//   margin-left: 60px;
gap: 35px;
}
.allStatus{
    margin-top: 20px;
    font-size: 22px;
}
.table-form{
    margin-top: 20px;
}
</style>