<template>
    <div class="p-5">
        <div v-if="data.loading" class="loader"></div>
        <p class="text-2xl">Cheklar</p>
        <hr class="my-2 border border-slate-300/10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div 
                class="rounded-md h-72rounded-md h-48 border p-2"
                v-for="(check, index) in data.checks" :key="index"
            >
                <p class="flex justify-between">
                    <p>Company</p>
                    <p>BestEducation</p>
                </p>
                <p class="flex justify-between">
                    <p>Foydalanuvchi</p>
                    <p>
                        <p class="flex justify-between">
                            <p>Ism: </p>
                            <p>{{ check.author.first_name }}</p>
                        </p>
                        <p class="flex justify-between">
                            <p>Familiya: </p>
                            <p>{{ check.author.last_name }}</p>
                        </p>
                    </p>
                </p>
                <p class="flex justify-between">
                    <p>Kurs</p>
                    <p>{{ check.course }}</p>
                </p>
                <p class="flex justify-between">
                    <p>Summa</p>
                    <p>{{ check.order.amount / 100 }} so'm</p>
                </p>
                <p class="flex justify-between">
                    <p>Holati</p>
                    <p class="bg-green-500 rounded px-1" v-if="check.status === 1 || check.status === '1'">To'langan</p>
                    <p class="bg-orange-500 rounded px-1" v-if="check.status === 0 || check.status === '0'">Kutilmoqda</p>
                    <p class="bg-red-500 rounded px-1" v-if="check.status === -1 || check.status === '-1'">Bekor qilingan</p>
                </p>
                <p class="flex justify-between">
                    <p>Sana</p>
                    <p>{{ check.created }}</p>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { userProvider } from '~/composables/userProvider';

useHead({
    title: "Cheklar"
})

const config = useRuntimeConfig();
const { getUser } = userProvider();

let data = reactive({
    checks: [],
    loading: false
})

onMounted(async() => {
    data.loading = true
    const response: {status: string, errors: object, data: any} = await $fetch(`${config.public.apiURL}courses/checks/`, {
        timeout: 50000,
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        }
    })
    data.loading = false
    data.checks = response.data.checks
})
</script>