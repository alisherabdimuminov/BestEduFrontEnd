<template>
    <div class="p-5">
        <div v-if="data.loading" class="loader"></div>
        <p class="text-2xl">Foydalanuvchini tahrirlash</p> <br> <br>

        <ul class="list-disc">
            <li class="text-red-600" v-for="(error, index) in data.errors" :key="index">{{ error }}</li>
        </ul>
        <label for="username">Telefon raqam</label>
        <input disabled v-maska data-maska="+998#########" v-model="data.user.username" type="text" id="username" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>

        <label for="first_name">Ism</label>
        <input v-model="data.user.first_name" type="text" id="first_name" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>
    
        <label for="last_name">Familiya</label>
        <input v-model="data.user.last_name" type="text" id="last_name" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>
    
        <label for="middle_name">O'tasini ismi</label>
        <input v-model="data.user.middle_name" type="text" id="middle_name" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>
    
        <label for="bio">Qisqacha ma'lumot</label>
        <textarea v-model="data.user.bio" type="text" id="bio" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2 resize-none">{{ data.user.bio }}</textarea> <br>
    
        <label for="bio">Talaba</label>
        <input :checked="data.user.is_student" v-model="data.user.is_student" type="checkbox" id="bio" class="w-4 h-4 text-blue-600 accent-green-500 block outline-none rounded py-1 px-2" /> <br>
    
        <button @click="save" class="w-full bg-blue-700 py-1 px-2 rounded outline-none text-xl font-semibold">Saqlash</button>
    </div>
</template>

<script setup lang="ts">
import { userProvider } from '~/composables/userProvider';

useHead({
    title: "Foydalanuvchini tahrirlash"
});

const config = useRuntimeConfig();
const { getUser } = userProvider();

const router = useRouter();
const route = useRoute();

const data = reactive({
    user: {
        username: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        bio: "",
        is_student: false
    },
    errors: {},
    loading: false
})

onMounted(async () => {
    data.loading = true;
    let response: {status: string, errors: object, data: any} = await $fetch(`${config.public.apiURL}users/user/${route.params.id}/`, {
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        }
    })
    if (response.data === undefined) {
        router.push("/users")
    }
    data.loading = false;
    data.user = response.data.user
})

const save = async () => {
    data.loading = true;
    let response: {status: string, errors: object, data: any} = await $fetch(`${config.public.apiURL}users/user/${route.params.id}/edit/`, {
        method: "POST",
        body: JSON.stringify({
            username: data.user.username,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            middle_name: data.user.middle_name,
            bio: data.user.bio,
            is_student: data.user.is_student
        }),
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        }
    })
    data.loading = false;
    if (response.status === "error") {
        data.errors = response.errors
        console.log(data.errors)
    } else {
        router.push("/users")
    }
}

</script>
