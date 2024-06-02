<template>
    <div class="p-5">
        <div v-if="data.loading" class="loader"></div>
        <p class="text-2xl">Yangi kusr qo'shish</p>
        <hr class="my-2 border border-slate-300/10">
        <div class="md:flex">
            <form id="form" @submit.prevent="create" class="flex-1 p-2 overflow-auto md:border-r md:border-slate-300/10">
                <input required id="image" type="file" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>
                <label for="course_name">Kurs nomi</label>
                <input required v-model="data.course.name" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>

                <label for="course_name">Kurs fani</label>
                <select required v-model="data.course.subject" name="subject" id="subject" class="w-full block bg-slate-900 text-white border border-gray-300/10 outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2">
                    <option selected>Fanni tanlang</option>
                    <option v-for="(subject, index) in data.subjects" :key="index" :value="subject.id">{{ subject.name }}</option>
                </select> <br>

                <label for="course_name">Kurs narxi</label>
                <input required v-model="data.course.price" type="number" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2"> <br>

                <label for="course_desc">Kurs haqida</label>
                <textarea required v-model="data.course.description" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2 resize-none" id="course_desc"></textarea> <br>

                <button type="submit" class="w-full bg-blue-700 py-1 px-2 rounded outline-none text-xl font-semibold">Saqlash</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { userProvider } from '~/composables/userProvider';

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig();
const { getUser } = userProvider();

useHead({
    title: "Kurslar"
});

let data = reactive({
    course: {},
    subjects: [],
    loading: false
})


const create = async () => {
    let image = document.getElementById("image");
    let form_data = new FormData()
    form_data.append("name", data.course.name);
    form_data.append("description", data.course.name);
    form_data.append("price", data.course.price);
    form_data.append("subject", data.course.subject);
    form_data.append("image", image.files[0])
    data.loading = true;
    let response = await $fetch(`${config.public.apiURL}courses/create/`, {
        method: "POST",
        body: form_data,
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        }
    });
    data.loading = false;
    if (response.status === "success") {
        router.push({name: "courses-id", params: {id: response.data.id}})
    } else {
        router.push("/courses")
    }
}

onMounted(async () => {
    data.loading = true;
    let response = await $fetch(`${config.public.apiURL}courses/subjects/`, {
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        } 
    })
    data.loading = false;
    data.subjects = response.data.subjects;
});
</script>