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
  <button
    class="saveAnnouncementInfo"
    @click="sendAnnouncement(textareaAnnouncement, [], 0)"
  >
    保存
  </button>
  <button class="deleteAnnouncementInfo" @click="clearAnnouncement">
    取消
  </button>

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
  <button class="saveWorkAnnouncementInfo">保存</button>
  <button class="deleteWorkAnnouncementInfo">取消</button>

  <div class="direction">方向介绍</div>
  <div class="groups">
    <el-button
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      @click="getApplyInfo(button.key)"
    >
      {{ button.text }}
    </el-button>
  </div>
  <div class="directionContainer">
    <el-input
      v-model="textareaDirection"
      style="width: 600px"
      :autosize="{ minRows: 10, maxRows: 40 }"
      type="textarea"
      placeholder="请输入方向介绍"
    />
  </div>
  <button class="saveDirectionInfo">保存</button>
  <button class="deleteDirectionInfo">取消</button>

  <div class="top">
    <div class="bulletComment">弹幕通知</div>
    <button class="addBulletComment" @click="handleAdd">添加</button>
  </div>
  <div class="bulletCommentContainer" v-if="isShowAddContainer">
    <el-input
      v-for="(input, index) in bulletCommentsInputs"
      :key="index"
      class="addBulletComment-input"
      v-model="input.content"
      style="width: 600px"
      type="textarea"
      placeholder="请输入弹幕通知"
    />
  </div>
  <button class="saveBulletCommentInfo" v-if="isShowAddContainer">保存</button>
  <button class="deleteBulletCommentInfo" v-if="isShowAddContainer">
    取消
  </button>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { sendNotice } from "../../api/sendNotice";
const buttons = [
  { key: 0, type: "primary", text: "前端" },
  { key: 1, type: "primary", text: "后台" },
  { key: 2, type: "primary", text: "安卓" },
  { key: 3, type: "primary", text: "UI" },
  { key: 4, type: "primary", text: "深度学习" },
  { key: 5, type: "primary", text: "硬件" },
];
const textareaAnnouncement = ref("");
const textareaWork = ref("");
const textareaDirection = ref("");
const isShowAddContainer = ref(false);
const bulletCommentsInputs = ref([]);
const handleAdd = () => {
  isShowAddContainer.value = true;
  bulletCommentsInputs.value.push({ content: "" });
};
const sendAnnouncement = async (notice, receivers, type) => {
  localStorage.setItem("announcement", textareaAnnouncement.value);
  const res = await sendNotice(notice, receivers, type);
  console.log(res);
};
onMounted(() => {
  const savedAnnouncement = localStorage.getItem("announcement");
  if (savedAnnouncement) {
    textareaAnnouncement.value = savedAnnouncement;
  }
});

const clearAnnouncement = () => {
  textareaAnnouncement.value = "";
  localStorage.removeItem("announcement");
};
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
  margin-bottom: 20px;
}
</style>
