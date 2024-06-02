<template>
    <div class="p-5">
        <div v-if="data.loading" class="loader"></div>
        <p class="text-2xl">Foydalanuvchilar ro'yxati</p>
        <hr class="my-2 border border-slate-300/10">
        <div class="flex overflow-auto">
            <table class="w-full">
                <thead>
                    <th v-for="(header, index) in headers" :key="index" class="whitespace-nowrap p-2 text-left border w-fit">{{ header }}</th>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in data.users" :key="index" class="hover:bg-slate-300/10">
                        <td class="whitespace-nowrap p-2 border w-fit">{{ index + 1 }}</td>
                        <td class="whitespace-nowrap p-2 border w-fit">
                                <NuxtLink :to="{name: 'users-id', params: {id: user.id}}" class="hover:text-green-500">
                                    {{ user.username }}
                                </NuxtLink>
                            </td>
                            <td class="whitespace-nowrap p-2 border w-fit">{{ user.first_name }}</td>
                            <td class="whitespace-nowrap p-2 border w-fit">{{ user.last_name }}</td>
                            <td class="whitespace-nowrap p-2 border w-fit">{{ user.middle_name }}</td>
                            <td class="whitespace-nowrap p-2 border w-fit text-center text-xl font-bold">
                                <i v-if="user.is_student" class='bx bx-check text-green-600'></i>
                                <i v-else class='bx bx-x text-red-600'></i>
                            </td>
                        </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { userProvider } from '~/composables/userProvider';

useHead({
    title: "Foydalanuvchilar"
})

const config = useRuntimeConfig();
const { getUser } = userProvider();

let data = reactive({
    users: [],
    loading: false
})

let headers = reactive(["ID", "Telefon raqam", "Ism", "Familiya", "Otasini ismi", "Talaba"])

onMounted(async () => {
    data.loading = true;
    const response: {status: string, errors: object, data: any} = await $fetch(`${config.public.apiURL}/users/`, {
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        }
    })
    data.loading = false;
    data.users = response.data.users
})
</script>
