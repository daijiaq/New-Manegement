<template>
    <div class="announcement">公告</div>
    <div class="announcementContainer">
        <el-input
    v-model="textareaAnnouncement"
    style="width: 600px"
    :autosize="{ minRows: 10, maxRows: 40 }"
    type="textarea"
    placeholder="请输入公告"
  />
    </div>
    <button class="saveAnnouncementInfo" @click="sendAnnouncement(textareaAnnouncement,[],0)">发布</button>
    <button class="deleteAnnouncementInfo" @click="clearAnnouncement">清空</button>

    <div class="workAnnouncement">工作室介绍</div>
    <div class="workAnnouncementContainer">
        <el-input
    v-model="textareaWork"
    style="width: 600px"
    :autosize="{ minRows: 10, maxRows: 40 }"
    type="textarea"
    placeholder="请输入工作室介绍"
  />
    </div>
    <button class="saveworkAnnouncementInfo" @click="sendWorkAnnouncement(textareaWork,[],1)">发布</button>
    <button class="deleteworkAnnouncementInfo" @click="clearWorkAnnouncement">清空</button>

    <div class="direction">方向介绍</div>
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
    <div class="dierctionContainer">
        <el-input
    v-model="textareaDirection"
    style="width: 600px"
    :autosize="{ minRows: 10, maxRows: 40 }"
    type="textarea"
    placeholder="请输入方向介绍"
  />
    </div>
  <button class="saveDirectionInfo" @click="sendDirectionAnnouncement(textareaDirection,[],directionKey+2)">发布</button>
  <button class="deleteDirectionInfo" @click="clearDirectionAnnouncement">清空</button>

<div class="top">
  <div class="danmaku">弹幕通知</div>
  <button class="addDanmaku" @click="handleAdd">添加</button>
</div>
<div class="danmakuContainer" v-if="isShowAddContainer"   >
  <div v-for="(input, index) in danmakuInputs"   :key="index" class="smallDanmakuContainer">
    <el-input
    class="danmaku-input"
    v-model="input.content"
    type="textarea"
    placeholder="请输入弹幕通知"
  />
  <button class="saveDanmakuInfo" v-if="isShowAddContainer" @click="sendDanma(input.content,[],8)">发布</button>
  <button class="deleteDanmakuInfo" v-if="isShowAddContainer" @click="clearDanma(index)">清空</button>
    </div>
</div>
 
  

</template>

<script setup >
import { onMounted, ref } from 'vue';
import { sendNotice,getNotice } from '../../api/sendNotice';
import { ElMessage } from 'element-plus'
  const buttons = [
    { key:0,type: 'primary', text: '前端' },
    { key:1,type: 'primary', text: '后台' },
    { key:2,type: 'primary', text: '安卓' },
    { key:3,type: 'primary', text: 'UI' },
    { key:4,type: 'primary', text: '深度学习' },
    { key:5,type: 'primary', text: '硬件' },
  ] 
  const textareaAnnouncement= ref('')
  const textareaWork= ref('')
  const textareaDirection= ref('')
  const textareaDanmaku=ref('')
  const isShowAddContainer=ref(false)
  const danmakuInputs=ref([])
  const directionKey=ref(0)
  const getApplyInfo=async(key)=>{
      directionKey.value=key
      console.log(directionKey.value);
      const resDirection=await getNotice(key+2)
      console.log(resDirection);
      if(resDirection.data.length!==0){
        textareaDirection.value=resDirection.data[0].content
      }
      else{
        textareaDirection.value=''
      }
  }
  const handleAdd=()=>{
    if(danmakuInputs.value.length!==9){
      isShowAddContainer.value=true
      danmakuInputs.value.push({ content: '' })
    }else{
        ElMessage({
            message: '最多只能发9条弹幕通知',
            type: 'error',
            plain: true,
         })
      }
  }
  // 发布
  const sendAnnouncement=async(notice,receivers,type)=>{
      const res=await sendNotice(notice,receivers,type)
      console.log(res);
  }
  const sendWorkAnnouncement=async(notice,receivers,type)=>{
      const res=await sendNotice(notice,receivers,type)
      console.log(res);
  }
  const sendDirectionAnnouncement=async(notice,receivers,type)=>{
    console.log(type);
    
      const res=await sendNotice(notice,receivers,type)
      console.log(res);
  }
  const sendDanma=async(notice,receivers,type)=>{
    const res=await sendNotice(notice,receivers,type)
    console.log(res);

  }
  // 默认展示
  onMounted(async()=>{
    const resAnnouncement=await getNotice(0)
    console.log(resAnnouncement);
    
    if(resAnnouncement.data.length!==0){
    textareaAnnouncement.value=resAnnouncement.data[0].content
    }else{
      textareaAnnouncement.value=''
    }
    const resWork=await getNotice(1)
    if(resWork.data.length!==0){
      textareaWork.value=resWork.data[0].content
    }else{
      textareaWork.value=''
    }
    const resHead=await getNotice(2)
    if(resHead.data.length!==0){
      textareaDirection.value=resHead.data[0].content
    }else{
      textareaDirection.value=''
    }
    const resDanma=await getNotice(8)
   if(resDanma.data.length!==0){
    isShowAddContainer.value=true
    resDanma.data.forEach(item => {
        danmakuInputs.value.push({ content: item.content });
    });
   }
    
  })

  // 清空
  const clearAnnouncement=()=>{
    textareaAnnouncement.value=''
  }
  const clearWorkAnnouncement=()=>{
    textareaWork.value=''
  }
  const clearDirectionAnnouncement=()=>{
    textareaDirection.value=''
  }
  const clearDanma=(index)=>{
    danmakuInputs.value[index].content=''
  }
</script>
<style lang="less" scoped>
.announcement {
  // margin-top: 60px;
  font-size: 22px;
}
.workAnnouncement,
.BulletComment,
.direction {
  font-size: 22px;
  margin-top: 20px;
}
.groups {
  margin-top: 20px;
}

.directionContainer,
.announcementContainer,
.workAnnouncementContainer,
.BulletCommentContainer {
  margin-top: 30px;
}
.BulletCommentContainer {
  width: 100%;
}
.saveDirectionInfo,
.deleteDirectionInfo,
.saveAnnouncementInfo,
.deleteAnnouncementInfo,
.saveWorkAnnouncementInfo,
.deleteWorkAnnouncementInfo,
.saveBulletCommentInfo,
.deleteBulletCommentInfo {
  width: 60px;
  height: 35px;
  margin-left: 12px;
  margin-top: 12px;
  border-radius: 30px;
  background-color: rgb(121.3, 187.1, 255);
  border: 0;
}
.saveDirectionInfo,
.saveAnnouncementInfo,
.saveWorkAnnouncementInfo,
.saveBulletCommentInfo {
  margin-left: 468px;
}

.saveBulletCommentInfo {
  margin-left: -3px;
}

.addBulletComment {
  width: 69px !important;
  height: 28px;
  background-color: rgb(121.3, 187.1, 255);
  border-radius: 35px;
  border: 0;
}

.top {
  display: flex;
  gap: 20px;
  align-items: flex-end;
  margin-bottom: 20px;
}

.BulletComment-input {
  width: 100%;
  // margin-bottom: 20px; 
}
.smallDanmakuContainer{
  margin-top: 20px;
}
</style>
