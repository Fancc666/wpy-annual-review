import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('');
    const username = ref('');
    const permission = ref('');

    const getApiData = async (): Promise<boolean> => {
      const u = new URL(window.location.href);
      const params = new URLSearchParams(u.search);
      console.log(params.get("token"));
      if (!params.get("token")) return false;
      await new Promise((resolve) => setTimeout(resolve, 500));
      return true;
    }

    return { token, username, permission, getApiData };
  }
)
