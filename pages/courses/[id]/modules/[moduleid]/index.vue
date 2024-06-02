<template>
    <div class="p-5">
        <div v-if="data.loading" class="loader"></div>
        <p class="text-2xl">{{ data.module.name }}</p>
        <hr class="my-2 border border-slate-300/10">
        <div class="md:flex">
            <form id="form" @submit.prevent="" class="flex-1 p-2 overflow-auto">
                
                <label for="course_name">Module nomi</label>
                <input disabled required v-model="data.module.name" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-blue-800 rounded py-1 px-2"> <br>
                
                <label for="course_name">Module video uzunligi</label>
                <input disabled required v-model="data.module.video_length" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-blue-800 rounded py-1 px-2"> <br>
                
                <label for="course_name">Module o'quvchilar soni</label>
                <input disabled required v-model="data.module.count_students" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-blue-800 rounded py-1 px-2"> <br>
                
                <label for="course_name">Module darslar soni</label>
                <input disabled required v-model="data.module.count_lessons" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-blue-800 rounded py-1 px-2"> <br>

                <label for="course_name">Module darslari</label>
                <NuxtLink v-for="(lesson, index) in data.module.lessons" :key="index" :to="{name: 'courses-id-modules-moduleid-lessons-lessonid', params: {id: route.params.id, moduleid: route.params.moduleid, lessonid: lesson.id}}" class="py-1 px-2 border border-gray-300/10 rounded flex justify-between mb-2">
                    <div>
                        <span class="bg-green-500 rounded-full py-1 px-2">{{ index + 1 }}</span>
                        <span class="px-3">{{ lesson.name }}</span>
                    </div>
                    <div>
                        <span class="inline-flex items-center">
                            <i class="bx bx-time"></i>
                            <span>{{ lesson.duration }} min</span>
                        </span>
                    </div>
                    <!-- {{ lesson }} -->
                </NuxtLink> <br>
                <NuxtLink :to="{name: 'courses-id-modules-moduleid-add_lesson', params: {id: route.params.id, moduleid: route.params.moduleid}}" class="bg-green-500 py-1 px-2 rounded inline-flex items-center">
                    <i class="bx bx-plus"></i>
                    Dars qo'shish
                </NuxtLink>
                <!-- {{ data.module }} -->
            </form>
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
});

let data = reactive({
    module: {},
    loading: false,
    modules: []
})

onMounted(async() => {
    data.loading = true
    let response: {status: string, errors: object, data: any} = await $fetch(`${config.public.apiURL}courses/course/${route.params.id}/modules/module/${route.params.moduleid}/`, {
        timeout: 50000,
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        }
    });
    data.module = response.data.module;
    response = await $fetch(`${config.public.apiURL}courses/course/${route.params.id}/modules/`, {
        timeout: 50000,
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        }
    });
    data.modules = response.data.modules;
    data.loading = false;
});
</script>