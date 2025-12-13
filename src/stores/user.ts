import { defineStore } from "pinia";
import { ref } from "vue";
import instance from "@/utils/request";

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('');
    const username = ref('');
    const loadState = ref(false);

    if (loadState.value){
      return;
    }

    // 加载后端数据
    function getUserData(){

    }

    return {token, username, getUserData};
  }// 重新请求，不需要持久化
)
