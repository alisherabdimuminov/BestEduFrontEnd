<template>
    <div class="p-5">
        <div v-if="data.loading" class="loader"></div>
        <p class="text-2xl">{{ data.course.name }} &centerdot; Talabalar</p>
        <hr class="my-2 border border-slate-300/10">
        <div class="md:flex">
            <div class="flex-1 overflow-auto md:border-r md:border-slate-300/10 p-1">
                <table class="w-full">
                    <thead>
                        <th class="whitespace-nowrap p-2 text-left border w-fit">#</th>
                        <th class="whitespace-nowrap p-2 text-left border w-fit">Telefon raqami</th>
                        <th class="whitespace-nowrap p-2 text-left border w-fit">Ism</th>
                        <th class="whitespace-nowrap p-2 text-left border w-fit">Familiya</th>
                        <th class="whitespace-nowrap p-2 text-left border w-fit">Otasini ismi</th>
                    </thead>
                    <tbody>
                        <tr class="hover:bg-slate-300/10" v-for="(student, index) in data.course.students" :key="index">
                            <td class="whitespace-nowrap p-2 border w-fit">{{ index + 1 }}</td>
                            <td class="whitespace-nowrap p-2 border w-fit">{{ student.username }}</td>
                            <td class="whitespace-nowrap p-2 border w-fit">{{ student.first_name }}</td>
                            <td class="whitespace-nowrap p-2 border w-fit">{{ student.last_name }}</td>
                            <td class="whitespace-nowrap p-2 border w-fit">{{ student.middle_name }}</td>
                        </tr>
                    </tbody>
                </table>
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
import { userProvider } from "~/composables/userProvider";

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