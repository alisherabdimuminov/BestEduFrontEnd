<template>
    <div class="p-5">
        <div v-if="data.loading" class="loader"></div>
        <p class="text-2xl">O'qituvchilar ro'yxati</p>
        <hr class="my-2 border border-slate-300/10">
        <div class="flex overflow-auto">
            <table class="w-full">
                <thead>
                    <th v-for="(header, index) in headers" :key="index" class="whitespace-nowrap p-2 text-left border w-fit">{{ header }}</th>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in data.teachers" :key="index" class="hover:bg-slate-300/10">
                        <td class="whitespace-nowrap p-2 border w-fit">{{ index + 1 }}</td>
                        <td class="whitespace-nowrap p-2 border w-fit">
                                <NuxtLink :to="{name: 'users-id', params: {id: user.id}}">
                                    {{ user.username }}
                                </NuxtLink>
                            </td>
                            <td class="whitespace-nowrap p-2 border w-fit">{{ user.first_name }}</td>
                            <td class="whitespace-nowrap p-2 border w-fit">{{ user.last_name }}</td>
                            <td class="whitespace-nowrap p-2 border w-fit">{{ user.middle_name }}</td>
                        </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { userProvider } from '~/composables/userProvider';

useHead({
    title: "O'qituvchilar"
})

let data = reactive({
    teachers: [],
    loading: false,
})

const config = useRuntimeConfig();
const { getUser } = userProvider();

let headers = reactive(["ID", "Telefon raqam", "Ism", "Familiya", "Otasini ismi"])

onBeforeMount(async () => {
    data.loading = true;
    const response: {status: string, errors: object, data: any} = await $fetch(`${config.public.apiURL}users/?role=teacher`, {
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        }
    })
    data.loading = false;
    data.teachers = response.data.users
    console.log(data.teachers)
})
</script>
