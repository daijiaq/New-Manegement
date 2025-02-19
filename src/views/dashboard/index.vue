<template>
    <el-button
        v-for="(button) in buttons"
        :key="button.text"
        :type="button.type"
        @click="getApplyInfo(button.key)"
      >
        {{ button.text }}
      </el-button>
<div class="one">
  <div class="Published">已发布时间</div>
      <div class="lunci">
      <el-dropdown>
    <span class="el-dropdown-link">
      选择轮次
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>面试</el-dropdown-item>
        <el-dropdown-item>第一轮</el-dropdown-item>
        <el-dropdown-item>第二轮</el-dropdown-item>
        <el-dropdown-item>第三轮</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    </div>
</div>
     
      <el-table :data="tableDataPublished" stripe style="width: 90%" class="table-form" height="300">
      <el-table-column prop="日期" label="日期"  />
          <el-table-column prop="开始时间" label="开始时间"  />
          <el-table-column prop="结束时间" label="结束时间" />
          <el-table-column fixed="right" label="操作" min-width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="deleteTime" >
          删除
        </el-button>
        <el-button link type="primary" size="small" @click="viewRegistered" >
          查看已报名人员
        </el-button>
      </template>
    </el-table-column>
    </el-table>

    <!-- 点击删除的弹出层 -->
    <el-dialog
    v-model="dialogDeleteVisible"
    title="提示"
    width="500"
   
  >
    <span>确定要删除该时间段吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogDeleteVisible = false">
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
    <span class="unPublished">保存但未发布时间</span>
    <span class="Announce">发布</span>
      <div class="lunci">
      <el-dropdown>
    <span class="el-dropdown-link">
      选择轮次
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>面试</el-dropdown-item>
        <el-dropdown-item>第一轮</el-dropdown-item>
        <el-dropdown-item>第二轮</el-dropdown-item>
        <el-dropdown-item>第三轮</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    </div>
  </div>
  <el-table :data="tableDataunPublished" stripe style="width: 90%" class="table-form" height="300">
      <el-table-column prop="日期" label="日期"  />
          <el-table-column prop="开始时间" label="开始时间"  />
          <el-table-column prop="结束时间" label="结束时间" />
          <el-table-column fixed="right" label="操作" min-width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="deleteTime" >
          删除
        </el-button>
      </template>
    </el-table-column>
    </el-table>

  <div class="three">
    <div class="addTime">添加预约时间</div>
      <div class="lunci">
      <el-dropdown>
    <span class="el-dropdown-link">
      选择轮次
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>面试</el-dropdown-item>
        <el-dropdown-item>第一轮</el-dropdown-item>
        <el-dropdown-item>第二轮</el-dropdown-item>
        <el-dropdown-item>第三轮</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    </div>

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
import { ref,reactive } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
    const buttons = [
    { key:0,type: 'primary', text: '前端' },
    { key:1,type: 'primary', text: '后台' },
    { key:2,type: 'primary', text: '安卓' },
    { key:3,type: 'primary', text: 'UI' },
    { key:4,type: 'primary', text: '深度学习' },
    { key:5,type: 'primary', text: '硬件' },
  ] 

const value2 = ref('')
const formattedDateRange=ref(null)
const showTime=(value)=>{
    console.log(value[0]);
    const startDate=value[0]
    const endDate=value[1]
    const formattedStartDate = startDate.toISOString().replace('T', ' ').replace(/\..+/, '').replace('Z', '');
    const formattedEndDate = endDate.toISOString().replace('T', ' ').replace(/\..+/, '').replace('Z', '');
    formattedDateRange.value = `${formattedStartDate} - ${formattedEndDate}`
    
}

const tableDataPublished = [
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  },
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  },
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  }
  ,
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  },
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  },
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  },
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  },
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  }
  ]


  const tableDataunPublished = [
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  },
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  },
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  }
  ,
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  },
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  },
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  },
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  },
  {
    日期: '2016-05-03',
    开始时间: '16:15',
    结束时间: '16:30',
  }
  ]

  const dialogDeleteVisible=ref(false)
  const deleteTime=()=>{
    dialogDeleteVisible.value=true
    console.log('click');
    
  }


  const dialogTableVisible = ref(false)

  const viewRegistered=()=>{
    console.log('viewRegistered');
    dialogTableVisible.value=true
    console.log(dialogTableVisible.value);
    
    
  }

  const   registeredData = reactive(
      [
     
        {
          学号: '3223004642',
              姓名: 'Tom',
              学院专业: '计算机学院软件工程',
              电话:'12345678986'
        },
        {
          学号: '3223004642',
          学号: '3223004642',
              姓名: 'Tom',
              学院专业: '计算机学院软件工程',
              电话:'12345678986'

          
        }
      ])

      
</script>

<style lang="less" scoped>
.Published{
    margin-top: 20px;
    font-size: 22px;
}
.unPublished,.addTime{
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

.table-form{
  margin-top: 30px;
}

.one,.two,.three{
  display: flex;
  justify-content: space-between; 
  align-items: flex-end; 
}
.lunci{
  margin-left: 50px;
}
.Announce{
  border-radius: 30px;
    margin-left: -801px;
    background-color: rgb(121.3, 187.1, 255);
    width: 80px;
    line-height: 35px;
    height: 35px;
    text-align: center;
}
</style>