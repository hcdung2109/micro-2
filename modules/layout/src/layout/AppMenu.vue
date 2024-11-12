<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Đăng nhập', icon: 'pi pi-fw pi-home', to: '/auth/login' },
            { label: 'Quản lý Tenant', icon: 'pi pi-fw pi-id-card', to: '/pages/tenant' },
            { label: 'Quản Lý Phân Hệ Ứng Dụng', icon: 'pi pi-fw pi-id-card', to: '/pages/application' },
            { label: 'Quản Lý Chức Năng Ứng Dụng', icon: 'pi pi-fw pi-id-card', to: '/pages/api-resource' },
            { label: 'Quản Lý Tổ Chức', icon: 'pi pi-fw pi-id-card', to: '/pages/organization' },
            {
                label: 'Quản Lý Người Dùng',
                icon: 'pi pi-fw pi-share-alt layout-menuitem-icon',
                items: [
                    {
                        label: 'Người dùng',
                        icon: 'pi pi-fw pi-bookmark layout-menuitem-icon',
                        to: '/pages/user'
                    },
                    {
                        label: 'Nhóm người dùng',
                        icon: 'pi pi-fw pi-bookmark layout-menuitem-icon',
                        to: '/pages/user-group'
                    },
                    {
                        label: 'Vai trò',
                        icon: 'pi pi-fw pi-bookmark layout-menuitem-icon',
                        to: '/pages/role'
                    },
                ]
            },
        ],
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
