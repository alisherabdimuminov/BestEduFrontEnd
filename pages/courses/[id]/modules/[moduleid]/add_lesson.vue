<template>
    <div class="p-5">
        <p class="text-2xl">Dars qo'shish</p> <br>
        <form @submit.prevent="create">
            <label for="name">Dars nomi</label>
            <input required v-model="data.lesson.name" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>
            
            <label for="name">Dars video linki</label>
            <input required v-model="data.lesson.video" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>
        
            <label for="name">Dars video uzunligi</label>
            <input required v-model="data.lesson.duration" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>
        
            <label for="name">Dars pdf</label>
            <input required id="resource" type="file" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>
            
            <label for="name">Oldingi dars</label>
            <select v-model="data.lesson.previous" name="lesson" id="lesson" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2">
                <option value="">Tanlang</option>
                <option v-for="(lesson, index) in data.lessons" :key="index" :value="lesson.id">{{ lesson.name }}</option>
            </select> <br>
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
    lessons: [],
    lesson: {
        name: "",
        video: "",
        duration: 0,
        type: "lesson",
        previous: null
    }
})

onMounted(async () => {
    let response: {status: string, errors: object, data: any} = await $fetch(`${config.public.apiURL}courses/course/${route.params.id}/modules/module/${route.params.moduleid}/lessons/`, {
        timeout: 50000,
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        }
    });
    data.lessons = response.data.lessons
});

const create = async () => {
    let form = new FormData()
    let resouce = document.getElementById("resource")
    form.append("name", data.lesson.name)
    form.append("video", data.lesson.video)
    form.append("type", data.lesson.type)
    form.append("duration", data.lesson.duration.toString())
    if (resouce.files) {
        form.append("resource", resouce.files[0])
    }
    if (data.lesson.previous) {
        form.append("previous", data.lesson.previous)
    }
    let response: {status: string, errors: object, data: any} = await $fetch(`${config.public.apiURL}courses/course/${route.params.id}/modules/module/${route.params.moduleid}/add_lesson/`, {
        timeout: 50000,
        method: "POST",
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        },
        body: form
    });
    router.push({name: "courses-id-modules-moduleid", params: {id: route.params.id, moduleid: route.params.moduleid}})
}
</script>
