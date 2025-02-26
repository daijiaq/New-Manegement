import { ref } from "vue";
import { defineStore } from "pinia";
import { addPreTime } from "../../api/addPreTime";

export const timeManagementStore = defineStore("timeManagement", () => {
  //选择的方向代表的数字
  const directionNum = ref(0);
  const directionName = ref("");
  //选择的轮次
  const turnNum = ref(0);
  const turnName = ref("");
  //发布时间的 id
  const timeId = ref([]);

  //十分钟一段的时间列表
  const formattedDateRange = ref("");

  const formatDate = (date) => {
    return date
      .toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/\//g, "-")
      .replace(" ", " ")
      .replace(",", "");
  };
  const showTime = (value) => {
    console.log(value[0]);
    console.log(value[1]);
    const startDate = value[0];
    const endDate = value[1];
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    formattedDateRange.value = `${formattedStartDate}——${formattedEndDate}`;
    console.log(formattedDateRange.value);
    return formattedDateRange.value;
  };

  //保存
  // tenMinsSaveClick,
  // sureSaveClick
  let matchTimeStartEndObj = ref([]);
  const tenMinsSaveClickStore = () => {
    sureDivide(formattedDateRange.value);
    timeDivideTen();
    timeSlots.value.forEach((item, index) => {
      sureDivide(item);
      const [whole, startDate, startTime, endDate, endTime] =
        matchTimeStartEnd.value;
      matchTimeStartEndObj.value[matchTimeStartEndObj.value.length] = {
        日期: startDate,
        开始时间: startTime,
        结束时间: endTime,
      };
    });
    console.log(matchTimeStartEndObj.value);
    localStorage.setItem(
      "matchTimeStartEndObj",
      JSON.stringify(matchTimeStartEndObj.value)
    );
    timeSlots.value = [];
    return matchTimeStartEndObj.value;
  };
  const sureSaveClickStore = () => {
    console.log(matchTimeStartEndObj.value);
    sureDivide(formattedDateRange.value);
    const [whole, startDate, startTime, endDate, endTime] =
      matchTimeStartEnd.value;
    matchTimeStartEndObj.value[matchTimeStartEndObj.value.length] = {
      日期: startDate,
      开始时间: startTime,
      结束时间: endTime,
    };
    localStorage.removeItem("matchTimeStartEndObj");
    console.log(matchTimeStartEndObj.value);
    localStorage.setItem(
      "matchTimeStartEndObj",
      JSON.stringify(matchTimeStartEndObj.value)
    );
    return matchTimeStartEndObj.value;
  };

  //十分钟一段
  // 创建一个数组来存储时间段
  const timeSlots = ref([]);
  let matchTimeStartEnd = ref([]);
  const sureDivide = (formattedDateRange) => {
    const regex =
      /(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})——(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})/;
    if (formattedDateRange) {
      const result = formattedDateRange.match(regex);
      if (result) {
        matchTimeStartEnd.value = result;
      } else {
        matchTimeStartEnd.value = [];
      }
      console.log(matchTimeStartEnd.value);
    }
  };

  const timeDivideTen = () => {
    // 解析开始和结束时间
    const [start, end] = formattedDateRange.value
      .split("——")
      .map((date) => new Date(date));
    // 初始化当前时间为开始时间
    let currentTime = new Date(start);
    // 逐步增加十分钟，直到当前时间超过结束时间
    while (currentTime < end) {
      const nextTime = new Date(currentTime.getTime() + 10 * 60 * 1000); // 增加10分钟
      // 使用 toLocaleString 格式化输出为 "YYYY-MM-DD HH:mm - YYYY-MM-DD HH:mm"
      const timeSlot = `${currentTime
        .toLocaleString("sv-SE", { timeZone: "Asia/Shanghai" })
        .slice(0, 16)}——${nextTime
        .toLocaleString("sv-SE", { timeZone: "Asia/Shanghai" })
        .slice(0, 16)}`;
      timeSlots.value.push(timeSlot);
      currentTime = nextTime; // 更新当前时间
    }
    // 打印结果
    console.log(timeSlots.value);
  };

  const tenMinsClick = () => {
    sureDivide(formattedDateRange.value);
    timeDivideTen();
    timeSlots.value.forEach((item) => {
      let timeResTen = item.split("——");
      addPreTime(
        timeResTen[0] + ":00",
        timeResTen[1] + ":00",
        directionNum.value,
        turnNum.value
      );
    });
  };

  const sureClick = () => {
    sureDivide(formattedDateRange.value);
    let timeRes = formattedDateRange.value.split("——");
    addPreTime(
      timeRes[0] + ":00",
      timeRes[1] + ":00",
      directionNum.value,
      turnNum.value
    );
  };

  return {
    formattedDateRange,
    showTime,
    timeSlots,
    matchTimeStartEnd,
    sureDivide,
    timeDivideTen,
    tenMinsClick,
    sureClick,
    directionNum,
    turnNum,
    turnName,
    directionName,
    tenMinsSaveClickStore,
    sureSaveClickStore,
    matchTimeStartEndObj,
    timeId,
  };
});
