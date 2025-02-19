import { defineStore } from "pinia";
import { ref,reactive } from "vue";

export const useGroupStore=defineStore('group',()=>{
    const tableData = reactive([])
    return{
        tableData
    }
})