<!-- Tab1.vue -->
<template>
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
</template>

<script setup>
    import {defineEmits, defineProps, ref, watch, inject } from "vue";
    import {useRoute, useRouter} from "vue-router";
    import Breadcrumb from 'primevue/breadcrumb';

    const props = defineProps(['breadcrumbHome', 'breadcrumbItems']);

    /*const breadcrumbHome = ref(props.breadcrumbHome ?? []);
    const breadcrumbItems = ref(props.breadcrumbItems ?? []);

    watch(() => props, (newDetail) => {

        breadcrumbHome.value = props.breadcrumbHome;
        breadcrumbItems.value = props.breadcrumbItems;

    });*/

    //const _breadcrumbHome = inject('breadcrumbHome');
    //const _breadcrumbItems = inject('breadcrumbItems');

</script>

<style scoped>
    /* Styles specific to Tab 1 */
</style>
