import { defineStore } from "pinia";
import { ref } from "vue";
import http from "@/utils/request";
import type { LoginApi, LoginParams, RegistParams } from "@/utils/interface";
import type { PersistenceOptions } from "pinia-plugin-persistedstate";

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('');
    const username = ref('');
    const permission = ref('');

    const login = async ({uname, upwd}: LoginParams) => {
      const apiData = await http.post<LoginApi>('/auth/login', null, {
        params: {
          username: uname,
          password: upwd
        }
      });
      if (apiData.data === null){
        return Promise.reject(apiData.msg);
      }
      permission.value = apiData.data.permission;
      token.value = apiData.data.token;
      username.value = apiData.data.username;
    }
    const logout = () => {
      token.value = '';
      username.value = '';
      permission.value = '';
    }

    const regist = async ({uname, upwd, uemail}: RegistParams) => {
      const data = await http.post('/auth/register', null, {
        params: {
          username: uname,
          password: upwd,
          email: uemail
        }
      });
      // console.log(data);
      if (data.code === 400){
        return Promise.reject(data.msg);
      }
      return data.data;
    }

    return {token, username, permission, login, logout, regist};
  },
  {
    persist: {
      key: 'user-store',
      storage: localStorage,
      paths: ['token', 'username', 'permission']
    } as PersistenceOptions
  }
)
