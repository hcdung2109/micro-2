<script setup>
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import { useRouter, useRoute } from 'vue-router';
    import { useToast } from 'primevue/usetoast';

    const toast = useToast();
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id || '';

    const domain = ref(null);
    const goi = ref(null);
    const fullname = ref(null);
    const username = ref(null);
    const email = ref(null);
    const isActive = ref(true);

    const dropdownItems = ref([
        { name: 'Demo', code: 'Demo' }
    ]);

    const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/' });
    const breadcrumbItems = ref([{ label: 'Trang chủ' }, {
        label: 'Quản lý Tenant',
        route: '/pages/tenant'
    }, { label: 'Cập nhật' }]);

    const getDetail = async () => {
        try {
            const response = await axios.get('/tenant/'+ id, {});

            domain.value = response.data.domainName ?? '';
            email.value = response.data.email ?? '';
            goi.value = {
                name: response.data.tenantUUID,
                code: response.data.tenantUUID
            };
            fullname.value = response.data.domainName;
            username.value = response.data.userConfig.sub ?? '';
            isActive.value = response.data.isActive ?? false;

        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    const update = async () => {
        try {
            const response = await axios.patch('/tenant/'+ id, {
                "id": id,
                //"href": "https://serverRoot/tmf-api/party/v4/tenant/128",
                "@type": "Tenant_Update",
                "tenantUUID": goi.value, // "Gói sử dụng"
                "domainName": domain.value,
                "email": email.value,
                "isActive": isActive.value,
                //"createdDate": "2015-10-22T08:31:52.026Z",
                "userConfig": {
                    "name": fullname.value,
                    "sub": username.value
                },
                "orgUUID":""
            });

            toast.add({ severity: 'success', summary: 'Thông báo', detail: 'Cập Nhật Thành Công', life: 3000 });
            router.push('/pages/tenant');

        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    const tenantDialog = ref(false);
    const tenantDialogTitle = ref(null);

    const changeActive = (data) => {

        if (isActive.value) {
            tenantDialogTitle.value = 'Bạn có chắc muốn Kích hoạt Tenant' //+ domain.value + 'không';
        } else {
            tenantDialogTitle.value = 'Bạn có chắc muốn Hủy kích hoạt Tenant' // + domain.value + 'không';
        }

        tenantDialog.value = true;
    };

    const handleActive = async () => {
        tenantDialog.value = false;
    };

    onMounted(() => {
        getDetail();
    });

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
                            <small>Sử dụng tên miền của tổ chức, định dạng “example.com”, tên miền phải là duy nhất.</small>
                        </div>
                    </div>

                    <div class="grid grid-cols-12 gap-2">
                        <label for="name3" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Tenant ID  <span
                            class="text-red"> *</span></label>
                        <div class="col-span-12 md:col-span-9">
                            <InputText id="name3" type="text" v-model="id" disabled/>
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
                            <small>Dựa vào gói đã chọn, tài nguyên sẽ được phân bổ. Bạn có thể nâng cấp hoặc hạ gói nếu có nhu cầu. </small>
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

                    <br>
                    <div class="font-semibold text-xl">Trạng thái kích hoạt</div>
                    <div class="grid grid-cols-12 gap-2">
                        <label for="name3" class="flex items-center col-span-12 mb-2 md:col-span-3 md:mb-0">Trạng thái kích hoạt <span
                            class="text-red"> *</span></label>
                        <div class="col-span-12 md:col-span-9">
                            <ToggleSwitch @change="changeActive" v-model="isActive" />
                        </div>
                    </div>

                    <div class=" float-right">
                        <Button severity="info" label="Lưu" :fluid="false" style="padding: 5px 50px; float: right"
                                @click="update()"></Button>
                    </div>

                </div>
            </div>
        </div>
    </Fluid>

    <Dialog v-model:visible="tenantDialog" :style="{ width: '450px' }" header="Thông báo" :modal="true">
        <div class="flex items-center gap-4">
            <i class="pi pi-exclamation-triangle !text-3xl" />
            {{ tenantDialogTitle }}
        </div>
        <template #footer>
            <Button label="Hủy" icon="pi pi-times" text @click="tenantDialog = false" />
            <Button label="Đồng ý" icon="pi pi-check" @click="handleActive" />
        </template>
    </Dialog>
</template>
