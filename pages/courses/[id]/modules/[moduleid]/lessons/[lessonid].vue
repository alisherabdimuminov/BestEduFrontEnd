<template>
    <div class="p-5">
        <p class="text-2xl">Dars </p> <br>
        <form @submit.prevent="create">
            <label for="name">Dars nomi</label>
            <input required v-model="lesson.name" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>
            
            <label for="name">Dars video linki</label>
            <input required v-model="lesson.video" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>
        
            <label for="name">Dars video uzunligi</label>
            <input required v-model="lesson.duration" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>
        
            <label for="name">Dars pdf ({{ lesson.resource }})</label>
            <input id="resource" type="file" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>
            
            <label for="name">Oldingi dars</label>
            <p v-if="lesson.previous" id="old_lesson" type="text" disabled class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2">{{ lesson.previous.name }}</p> <br>

            <label for="name">Keyingi dars</label>
            <p v-if="lesson.next" id="old_lesson" type="text" disabled class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2">{{ lesson.next.name }}</p> <br>
            
            <button class="bg-green-500 py-1 px-2 rounded outline-none text-lg font-semibold">Saqlash</button>
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
    title: "Darsni tahrirlash"
});

interface Lesson {
    name: string
    video: string
    resource: string
    duration: number
    type: "lesson" | "quiz"
    previous: Lesson | null
    next: Lesson | null
}

let lesson = ref<Lesson>({
    name: "",
    video: "",
    resource: "",
    duration: 0,
    type: "lesson",
    previous: null,
    next: null
});


onMounted(async () => {
    let response: {status: string, errors: object, data: { lesson: Lesson}} = await $fetch(`${config.public.apiURL}courses/course/${route.params.id}/modules/module/${route.params.moduleid}/lessons/lesson/${route.params.lessonid}/`, {
        timeout: 50000,
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        }
    });
    lesson.value = response.data.lesson;
});

const create = async () => {
    let form = new FormData()
    let resouce = document.getElementById("resource") as HTMLInputElement
    form.append("name", lesson.value.name)
    form.append("video", lesson.value.video)
    form.append("type", lesson.value.type)
    form.append("duration", lesson.value.duration.toString())
    if (resouce.files) {
        if (resouce.files.length > 0) {
            form.append("resource", resouce.files[0])
        }
    } else {
        form.append("resource", "");
    }
    let response: {status: string, errors: object, data: any} = await $fetch(`${config.public.apiURL}courses/course/${route.params.id}/modules/module/${route.params.moduleid}/lessons/lesson/${route.params.lessonid}/edit/`, {
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
