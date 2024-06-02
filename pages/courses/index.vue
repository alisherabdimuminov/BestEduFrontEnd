<template>
    <div class="p-5">
        <div v-if="data.loading" class="loader"></div>
        <p class="text-2xl">Kurslar ro'yxati</p>
        <hr class="my-2 border border-slate-300/10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <NuxtLink
                v-for="(course, index) in data.courses" :key="index"
                :to="{name: 'courses-id', params: {id: course.id}}"
                class="border hover:border-green-500 rounded-md h-72"
            >
                <img class="rounded-md w-full h-1/2 object-cover" :src="course.image" alt="">
                <div class="w-full h-1/2 p-3">
                    <p class="text-2xl">{{ course.name }}</p>
                    <p>Muallif: {{ course.author_.first_name }} {{ course.author_.last_name }}</p>
                    <p>Narxi: {{ new Intl.NumberFormat('uz-Uz').format(course.price) }} so'm</p>
                    <p>Modullar: {{ course.count_modules }} ta</p>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { userProvider } from '~/composables/userProvider';

useHead({
    title: "Kurslar"
})

const config = useRuntimeConfig();
const { getUser } = userProvider();

let data = reactive({
    courses: [],
    loading: false
})

onMounted(async() => {
    data.loading = true
    const response: {status: string, errors: object, data: any} = await $fetch(`${config.public.apiURL}courses/`, {
        timeout: 50000,
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        }
    })
    data.loading = false
    data.courses = response.data.courses
})
</script>