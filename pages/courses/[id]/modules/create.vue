<template>
    <div class="p-5">
        <p class="text-2xl">Module qo'shish</p> <br>
        <form @submit.prevent="create">
            <label for="name">Module nomi</label>
            <input required v-model="data.module.name" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>

            <label for="name">Talab qilinadigan module</label>
            <select v-model="data.module.required" name="lesson" id="lesson" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2">
                <option value="">Tanlang</option>
                <option v-for="(module, index) in data.modules" :key="index" :value="module.id">{{ module.name }}</option>
            </select> <br>
            {{ data.module }}
            <button class="bg-green-500 py-1 px-2 rounded outline-none text-lg font-semibold">Yaratish</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { userProvider } from '~/composables/userProvider';

const route = useRoute()
const router = useRouter();
const config = useRuntimeConfig();
const { getUser } = userProvider();

useHead({
    title: "Dars qo'shish"
});

let data = reactive({
    modules: [],
    module: {
        name: "",
        required: ""
    }
})

onMounted(async () => {
    let response: {status: string, errors: object, data: any} = await $fetch(`${config.public.apiURL}courses/course/${route.params.id}/modules/`, {
        timeout: 50000,
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        }
    });
    data.modules = response.data.modules
});

const create = async () => {
    let form = new FormData()
    form.append("name", data.module.name)
    if (data.module.required !== undefined) {
        form.append("required", data.module.required.toString())
    }
    let response: {status: string, errors: object, data: any} = await $fetch(`${config.public.apiURL}courses/course/${route.params.id}/modules/add_module/`, {
        timeout: 50000,
        method: "POST",
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        },
        body: form
    });
    router.push({name: "courses-id-modules", params: {id: route.params.id}})
}
</script>
