<template>
    <div class="p-5">
        <p class="text-2xl">Test qo'shish</p> <br>
        <form @submit.prevent="create" class="grid gap-3">
            <label for="name">Test nomi</label>
            <input required v-model="data.quiz.name" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2">
            <p>Savollar</p>
            <div class="border border-slate-300/10 rounded p-2" v-for="(question, index) in data.quiz.questions" :key="index">
                <label for="name">Savol {{ index+1 }}</label>
                <textarea required v-model="question.question" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2 resize-none"> </textarea> <br>
                
                <!-- one select -->
                <div class="flex gap-3" v-if="question.type === 'one_select'">
                    <div class="w-full">
                        <label :for="'question' + index + 'answer1'">
                            a)
                            <input type="radio" v-model="question.answer_1.is_correct" :value="true" :name="'question_' + index + 'correct'" class="w-4 h-4 accent-green-500">
                        </label> <br>
                        <input required v-model="question.answer_1.value_1" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer1'"> <br>
                    </div>
                    <div class="w-full">
                        <label :for="'question' + index + 'answer2'">
                            b)
                            <input type="radio" v-model="question.answer_2.is_correct" :value="true" :name="'question_' + index + 'correct'" class="w-4 h-4 accent-green-500">
                        </label> <br>
                        <input required v-model="question.answer_2.value_1" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer2'"> <br>
                    </div>
                    <div class="w-full">
                        <label :for="'question' + index + 'answer3'">
                            c)
                            <input type="radio" v-model="question.answer_3.is_correct" :value="true" :name="'question_' + index + 'correct'" class="w-4 h-4 accent-green-500">
                        </label> <br>
                        <input required v-model="question.answer_3.value_1" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer3'"> <br>
                    </div>
                    <div class="w-full">
                        <label :for="'question' + index + 'answer4'">
                            d)
                            <input type="radio" v-model="question.answer_4.is_correct" :value="true" :name="'question_' + index + 'correct'" class="w-4 h-4 accent-green-500">
                        </label> <br>
                        <input required v-model="question.answer_4.value_1" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer4'"> <br>
                    </div>
                </div>
                <!-- many select -->
                <div class="flex gap-3" v-if="question.type === 'many_select'">
                    <div class="w-full">
                        <label :for="'question' + index + 'answer1'">
                            a)
                            <input type="checkbox" v-model="question.answer_1.is_correct" :value="true" class="w-4 h-4 accent-green-500">
                        </label> <br>
                        <input required v-model="question.answer_1.value_1" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer1'"> <br>
                    </div>
                    <div class="w-full">
                        <label :for="'question' + index + 'answer2'">
                            b)
                            <input type="checkbox" v-model="question.answer_2.is_correct" :value="true" class="w-4 h-4 accent-green-500">
                        </label> <br>
                        <input required v-model="question.answer_2.value_1" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer2'"> <br>
                    </div>
                    <div class="w-full">
                        <label :for="'question' + index + 'answer3'">
                            c)
                            <input type="checkbox" v-model="question.answer_3.is_correct" :value="true" class="w-4 h-4 accent-green-500">
                        </label> <br>
                        <input required v-model="question.answer_3.value_1" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer3'"> <br>
                    </div>
                    <div class="w-full">
                        <label :for="'question' + index + 'answer4'">
                            d)
                            <input type="checkbox" v-model="question.answer_4.is_correct" :value="true" class="w-4 h-4 accent-green-500">
                        </label> <br>
                        <input required v-model="question.answer_4.value_1" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer4'"> <br>
                    </div>
                </div>
                <!-- matchable -->
                <div class="grid gap-3" v-if="question.type === 'matchable'">
                    <div class="flex items-center justify-center gap-3 w-full">
                        <input required v-model="question.answer_1.value_1" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer1'">
                        <i class='bx bx-right-arrow-alt'></i>
                        <input required v-model="question.answer_1.value_2" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer1'">
                    </div>
                    <div class="flex items-center justify-center gap-3 w-full">
                        <input required v-model="question.answer_2.value_1" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer2'">
                        <i class='bx bx-right-arrow-alt'></i>
                        <input required v-model="question.answer_2.value_2" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer2'">
                    </div>
                    <div class="flex items-center justify-center gap-3 w-full">
                        <input required v-model="question.answer_3.value_1" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer3'">
                        <i class='bx bx-right-arrow-alt'></i>
                        <input required v-model="question.answer_3.value_2" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer3'">
                    </div>
                    <div class="flex items-center justify-center gap-3 w-full">
                        <input required v-model="question.answer_4.value_1" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer4'">
                        <i class='bx bx-right-arrow-alt'></i>
                        <input required v-model="question.answer_4.value_2" type="text" class="w-full border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2" :id="'question' + index.toString() + 'answer4'">
                    </div>
                </div>
                <!-- writable -->
                <div v-if="question.type === 'writable'">
                    <label for="">Javob</label>
                    <textarea required v-model="question.answer_1.value_1" type="text" class="w-full block border border-gray-300/10 bg-transparent outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2 resize-none"> </textarea> <br>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <select name="question_type" id="question_type" class="text-white w-full h-fit block border border-gray-300/10 bg-slate-900 outline-none focus:ring-1 focus:ring-green-500 rounded py-1 px-2">
                    <option value="one_select">Bitta varyant tanlash</option>
                    <option value="many_select">Bir nechta tanlanadigan</option>
                    <option value="matchable">Mos keladiga</option>
                    <option value="writable">Yoziladigan</option>
                </select>
                <button type="button" @click="addQuestion" class="bg-green-500 w-full h-fit px-1 rounded outline-none text-lg font-semibold">Savol qo'shish</button> <br> <br>
            </div>
            
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
    title: "Test qo'shish"
});

let data = reactive({
    quiz: {
        name: "",
        questions: [
            {
                question: "",
                type: "one_select",
                answer_1: {
                    value_1: "",
                    value_2: "",
                    is_correct: false
                },
                answer_2: {
                    value_1: "",
                    value_2: "",
                    is_correct: false
                },
                answer_3: {
                    value_1: "",
                    value_2: "",
                    is_correct: false
                },
                answer_4: {
                    value_1: "",
                    value_2: "",
                    is_correct: false
                },
            }
        ]
    }
})

const addQuestion = () => {
    let type_ = document.getElementById("question_type");
    data.quiz.questions.push({
        question: "", 
        type: type_.value, 
        answer_1: {
            value_1: "",
            value_2: "",
            is_correct: false
        }, 
        answer_2: {
            value_1: "",
            value_2: "",
            is_correct: false
        }, 
        answer_3: {
            value_1: "",
            value_2: "",
            is_correct: false
        }, 
        answer_4: {
            value_1: "",
            value_2: "",
            is_correct: false
        }})
}

const create = async () => {
    let response: {status: string, errors: object, data: any} = await $fetch(`${config.public.apiURL}courses/course/${route.params.id}/modules/module/${route.params.moduleid}/add_test/`, {
        timeout: 50000,
        method: "POST",
        headers: {
            'Authorization': `Token ${getUser.value.user?.token}`
        },
        body: JSON.stringify(data)
    });
    router.push({name: "courses-id-modules-moduleid", params: {id: route.params.id, moduleid: route.params.moduleid}})
}
</script>
