import type { UserStats } from "@/utils/interface";
import { http as instance } from "@/utils/request";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('');
    const username = ref('');
    const permission = ref('');
    const userData = ref<UserStats>();

    const getApiData = async (): Promise<boolean> => {
      const u = new URL(window.location.href);
      const params = new URLSearchParams(u.search);
      // 移动给前端传参用uid
      console.log(params.get("uid"));
      const token = params.get("uid");
      if (!token) return false;
      // debuging
      try{
        const apiResponse = await instance.get(import.meta.env.VITE_BASE_URL, {
          params: {
            userId: token
          }
        }) as UserStats;
        // console.log(apiResponse);
        userData.value = apiResponse;
        // console.log(userData.value);
        return true;
      }
      catch{
        return false;
      }
    }
    return { token, username, permission, userData, getApiData };
  }
)
