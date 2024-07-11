<template>
    <div class="p-5">
        <div v-if="data.loading" class="loader"></div>
        <p class="text-2xl">{{ data.course.name }} &centerdot; Tahrirlash</p>
        <hr class="my-2 border border-slate-300/10">
        <div class="md:flex">
            <form id="form" @submit.prevent="update" class="flex-1 p-2 overflow-auto md:border-r md:border-slate-300/10">
                <p>Kurs rasmi</p>
                <img class="w-full h-64 p-2 border-2 border-slate-300/10 rounded-md object-cover" :src="data.course.image" alt=""> <br>
                <input id="image" type="file" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-blue-800 rounded py-1 px-2"> <br>
                
                <label for="course_name">Kurs nomi</label>
                <input required v-model="data.course.name" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-blue-800 rounded py-1 px-2"> <br>

                <label for="course_name">Kurs narxi</label>
                <input required v-model="data.course.price" type="number" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-blue-800 rounded py-1 px-2"> <br>

                <label for="course_desc">Kurs haqida</label>
                <textarea required v-model="data.course.description" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-blue-800 rounded py-1 px-2 resize-none" id="course_desc"></textarea> <br>

                <button type="submit" class="w-full bg-green-500 py-1 px-2 rounded outline-none text-xl font-semibold">Saqlash</button>
            </form>
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
});

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
    data.loading = false,
    data.course = response.data.course
});

const update = async () => {
    let form = new FormData()
    let image = document.getElementById("image")
    form.append("name", data.course.name);
    form.append("description", data.course.name);
    form.append("price", data.course.price);
    if (image?.files.length >= 1) {
        console.log("yes")
        form.append("image", image?.files[0])
    }
    let response = await $fetch(`${config.public.apiURL}courses/course/${route.params.id}/update/`, {
        method: "POST",
        body: form,
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        }
    });
    window.location.reload();
}
</script>