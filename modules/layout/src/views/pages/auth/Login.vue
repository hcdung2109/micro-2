<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { ref } from 'vue';
import axios from 'axios'
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import {Button, InputText, Password, Checkbox} from 'primevue'

const toast = useToast();
const router = useRouter();

const email = ref('');
const username = ref('');
const password = ref('');
const checked = ref(false);

const login = async () => {
    try {

        const response = await axios.post('/api/auth/login', {
            username: username.value,
            password: password.value
        });

        console.log(response);

        // Store the token in localStorage
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);

        router.push('/dashboard');
    } catch (error) {
        console.error('Login failed', error);
    }
};

const checkLogin = () => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("accessToken");
    if (token) {
        this.isLoggedIn = true; // User is already logged in
        //window.location.href = "/#/dashboard";
        const redirect = this.$route.query.redirect || "/dashboard"; // Default to home if no redirect query
        router.push(redirect);
    }
};

const logout = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/login');
};


</script>

<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <img class="mb-8 w-16 shrink-0 mx-auto" src="@/assets/logo-vnpt.png" alt="Description of image"
                             style="color: #1F7ED0; width: 200px" />

                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-5">Hệ Thống Quản Lý Dự Án Tập Trung</div>
                    </div>

                    <div class="mt-4">
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Tài khoản</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="username" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Mật khẩu</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Ghi nhớ đăng nhập</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Quên mật khẩu?</span>
                        </div>
                        <Button label="Đăng nhập" class="w-full" @click="login()"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
