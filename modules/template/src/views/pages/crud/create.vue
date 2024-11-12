<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import { useToast } from 'primevue/usetoast';


    const toast = useToast();
    const router = useRouter();

    const domain = ref(null);
    const goi = ref(null);
    const fullname = ref(null);
    const username = ref(null);
    const email = ref(null);

    const dropdownItems = ref([
        { name: 'Demo', code: 'Demo' }
    ]);

    const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/' });
    const breadcrumbItems = ref([{ label: 'Trang chủ' }, {
        label: 'Quản lý Tenant',
        route: '/pages/tenant'
    }, { label: 'Create Tenant' }]);

    const add = async () => {
        if (!domain.value) return toast.add({ severity: 'error', summary: 'Thông báo', detail: 'Chưa nhập Domain', life: 3000 });
        if (!goi.value) return toast.add({ severity: 'error', summary: 'Thông báo', detail: 'Chưa chọn gói', life: 3000 });
        if (!fullname.value) return toast.add({ severity: 'error', summary: 'Thông báo', detail: 'Chưa nhập họ tên', life: 3000 });
        if (!username.value) return toast.add({ severity: 'error', summary: 'Thông báo', detail: 'Chưa nhập username', life: 3000 });

        try {
            const response = await axios.post('/tenant', {
                //"id": "128",
                //"href": "https://serverRoot/tmf-api/party/v4/tenant/128",
                "@type": "tenant",
                "tenantUUID": goi.value, // "Gói sử dụng"
                "domainName": domain.value,
                "email": email.value,
                "isActive": true,
                //"createdDate": "2015-10-22T08:31:52.026Z",
                "userConfig": {
                    "name": fullname.value,
                    "sub": username.value
                },
                "orgUUID":""
            });

            console.log(response);

            //this.data = response.data;

            toast.add({ severity: 'success', summary: 'Thông báo', detail: 'Thêm Thành Công', life: 3000 });
            router.push('/pages/tenant');

        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

</script>

<template>
    <Fluid>
        <div class="card p-0" style="background: none !important">
            <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems">
                <template #item="{ item, props }">
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                        <a :href="href" v-bind="props.action" @click="navigate">
                            <span :class="[item.icon, 'text-color']"/>
                            <span class="text-primary font-semibold">{{ item.label }}</span>
                        </a>
                    </router-link>
                    <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                        <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
                    </a>
                </template>
            </Breadcrumb>
        </div>

        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/2">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Thông tin Domain</div>
                    <div class="grid grid-cols-12 gap-2">
                        <label for="name3" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Domain <span
                            class="text-red"> *</span></label>
                        <div class="col-span-12 md:col-span-9">
                            <InputText id="name3" type="text" v-model="domain"/>
                        </div>
                    </div>
                    <br>
                    <div class="font-semibold text-xl">Thông tin gói sử dụng</div>
                    <div class="grid grid-cols-12 gap-2">
                        <label for="name3" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Chọn gói sử
                            dụng dành cho Tenant<span class="text-red"> *</span></label>
                        <div class="col-span-12 md:col-span-9">
                            <Select id="state" v-model="goi" :options="dropdownItems" optionLabel="name"
                                    placeholder="Select One" class="w-full"></Select>
                        </div>
                    </div>

                    <br>
                    <div class="font-semibold text-xl">Tenant Admin</div>
                    <div class="grid grid-cols-12 gap-2">
                        <label for="name3" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Họ và tên
                            <span class="text-red"> *</span></label>
                        <div class="col-span-12 md:col-span-9">
                            <InputText id="fullname" type="text" v-model="fullname"/>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-2">
                        <label for="name3" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Username
                            <span class="text-red"> *</span></label>
                        <div class="col-span-12 md:col-span-9">
                            <InputText id="username" type="text" v-model="username"/>
                        </div>
                    </div>

                    <br>
                    <div class="font-semibold text-xl">Thông tin liên hệ</div>
                    <div class="grid grid-cols-12 gap-2">
                        <label for="name3" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Email <span
                            class="text-red"> *</span></label>
                        <div class="col-span-12 md:col-span-9">
                            <InputText type="email" placeholder="Nhập email" v-model="email"/>
                        </div>
                    </div>

                    <div class=" float-right">
                        <Button severity="info" label="Lưu" :fluid="false" style="padding: 5px 50px; float: right"
                                @click="add()"></Button>
                    </div>

                </div>
            </div>
        </div>
    </Fluid>
</template>
