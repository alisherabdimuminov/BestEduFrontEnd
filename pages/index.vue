<template>
    <div class="p-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <NuxtLink to="/users/" class="border rounded-md p-3 border-green-500 text-green-500 hover:bg-green-500/10 flex items-center justify-between">
                <i class='bx bx-group text-2xl border rounded-full py-1 px-2 border-green-500 text-green-500'></i>
                <span class="font-bold">Foydalanuvchilar</span>
            </NuxtLink>
            <NuxtLink to="/users/students/" class="border rounded-md p-3 border-green-500 text-green-500 hover:bg-green-500/10 flex items-center justify-between">
                <i class='bx bxs-graduation text-2xl border rounded-full py-1 px-2 border-green-500 text-green-500'></i>
                <span class="font-bold">Talabalar</span>
            </NuxtLink>
            <NuxtLink to="/users/teachers/" class="border rounded-md p-3 border-green-500 text-green-500 hover:bg-green-500/10 flex items-center justify-between">
                <i class='bx bxs-user text-2xl border rounded-full py-1 px-2 border-green-500 text-green-500'></i>
                <span class="font-bold">O'qituvchilar</span>
            </NuxtLink>
            <NuxtLink to="/courses/" class="border rounded-md p-3 border-green-500 text-green-500 hover:bg-green-500/10 flex items-center justify-between">
                <i class='bx bx-list-ol text-2xl border rounded-full py-1 px-2 border-green-500 text-green-500'></i>
                <span class="font-bold">Kurslar</span>
            </NuxtLink>
            <NuxtLink to="/checks/" class="border rounded-md p-3 border-green-500 text-green-500 hover:bg-green-500/10 flex items-center justify-between">
                <i class='bx bx-wallet text-2xl border rounded-full py-1 px-2 border-green-500 text-green-500'></i>
                <span class="font-bold">Moliyaviy hisobotlar</span>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { userProvider } from '~/composables/userProvider';

const { getUser } = userProvider();
const router = useRouter();

useHead({
    title: "Bosh sahifa"
})

if (getUser.value.user === undefined) {
    router.push("/login")
}

</script>
