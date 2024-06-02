<template>
    <div class="p-5">
        <div v-if="data.loading" class="loader"></div>
        <p class="text-2xl">{{ data.course.name }} &centerdot; Modullar</p>
        <hr class="my-2 border border-slate-300/10">
        <div class="md:flex">
            <div class="flex-1 overflow-auto md:border-r md:border-slate-300/10 p-2">
                <table class="table w-full">
                    <thead>
                        <th class="whitespace-nowrap p-2 text-left border w-fit">#ID</th>
                        <th class="whitespace-nowrap p-2 text-left border w-fit">Nomi</th>
                        <th class="whitespace-nowrap p-2 text-left border w-fit">Talab qilinadi</th>
                        <th class="whitespace-nowrap p-2 text-left border w-fit">Davomiyligi</th>
                        <th class="whitespace-nowrap p-2 text-left border w-fit">Darslar soni</th>
                        <th class="whitespace-nowrap p-2 text-left border w-fit">O'quvchilar soni</th>
                    </thead>
                    <tbody>
                        <tr v-for="(module, index) in data.course.modules" :key="index">
                            <td class="whitespace-nowrap text-center p-2 border w-fit">
                                <NuxtLink :to="{name: 'courses-id-modules-moduleid', params: {moduleid: module.id}}">
                                    {{ module.id }}
                                </NuxtLink>
                            </td>
                            <td class="whitespace-nowrap text-center p-2 border w-fit">
                                <NuxtLink :to="{name: 'courses-id-modules-moduleid', params: {moduleid: module.id}}">
                                    {{ module.name }}
                                </NuxtLink>
                            </td>
                            <td class="whitespace-nowrap text-center p-2 border w-fit">
                                <span v-if="module.required === null || module.required === undefined"></span>
                                <span v-else>{{ module.required.name }}</span>
                            </td>
                            <td class="whitespace-nowrap text-center p-2 border w-fit">{{ module.video_length }} min</td>
                            <td class="whitespace-nowrap text-center p-2 border w-fit">{{ module.count_lessons }}</td>
                            <td class="whitespace-nowrap text-center p-2 border w-fit">{{ module.count_students }}</td>
                        </tr>
                    </tbody>
                </table> <br>
                <NuxtLink class="bg-green-500 py-1 px-2 rounded outline-none text-lg font-semibold" to="modules/create">
                    Module qo'shish
                </NuxtLink>
            </div>
            <div class="mx-2 p-2">
                <ul>
                    <li class="w-full hover:bg-slate-300/10 py-1 px-2 rounded-md">
                        <NuxtLink :to="{name: 'courses-id', params: {id: route.params.id}}">Kurs</NuxtLink>
                    </li>
                    <li class="w-full hover:bg-slate-300/10 py-1 px-2 rounded-md">
                        <NuxtLink :to="{name: 'courses-id-modules', params: {id: route.params.id}}">Modullar</NuxtLink>
                    </li>
                    <li class="w-full hover:bg-slate-300/10 py-1 px-2 rounded-md">
                        <NuxtLink :to="{name: 'courses-id-students', params: {id: route.params.id}}">Talabalar</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { userProvider } from '~/composables/userProvider';

const route = useRoute()
const config = useRuntimeConfig();
const { getUser } = userProvider();

useHead({
    title: "Kurslar"
})

let data = reactive({
    course: {},
    loading: false
})

onMounted(async() => {
    data.loading = true
    const response: {status: string, errors: object, data: any} = await $fetch(`${config.public.apiURL}courses/course/${route.params.id}/`, {
        timeout: 50000,
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        }
    })
    data.loading = false
    data.course = response.data.course
})
</script>