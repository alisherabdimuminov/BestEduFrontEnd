<template>
    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm text-white">
        <form class="space-y-6" @submit.prevent>
            <p class="text-center text-2xl font-bold">Kirish</p>
            <p v-for="(error, index) in data.errors" :key="index" class="text-center text-red-700 font-bold">{{ error }}</p>

            <label for="username" class="block text-sm font-medium leading-6">Telefon raqam</label>
            <div class="">
                <input v-maska data-maska="+998#########" v-model="data.username" type="text" id="username" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2">
            </div>

            <label for="password" class="block text-sm font-medium leading-6">Parol</label>
            <div class="">
                <input v-model="data.password" type="password" id="password" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2">
            </div>

            <div class="mt-2">
                <button @click="login" type="submit" class="w-full bg-blue-700 py-1 px-2 rounded outline-none text-xl font-semibold">Kirish</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">

import { userProvider } from '~/composables/userProvider';

const { setUser, getUser } = userProvider();
const router = useRouter();

useHead({
    title: "Kirish"
})

const config = useRuntimeConfig();

if (getUser.value.user !== undefined) {
    router.push("/")
}

definePageMeta({
    layout: "auth"
})

const data = reactive({
    username: "",
    password: "",
    errors: {}
})

const login = async () => {
    console.log(data)
    data.errors = {}
    const response: {status: string, errors: object, data: any} = await $fetch(`${config.public.apiURL}users/login/`, {
        method: "POST",
        body: JSON.stringify({
            username: data.username,
            password: data.password
        })
    })
    if (response.status === "success") {
        setUser({username: data.username, token: response.data.token, first_name: response.data.first_name, last_name: response.data.last_name})
        router.push("/")
    } else {
        data.errors = response.errors
    }
    console.log(response)
}

</script>
