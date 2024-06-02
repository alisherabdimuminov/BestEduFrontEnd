<template>
    <div class="h-screen flex bg-slate-900 text-white">
        <div class="w-14 md:w-64 h-full border-r border-gray-700 p-2 relative">
            <p class="hidden md:block text-xl font-bold flex items-center justify-center">
                <span class="">Best</span><span class="">Education</span>
            </p>
            <p class="md:hidden text-xl font-bold flex items-center justify-center">BE</p>
            <ul class="mt-5 text-lg">
                <p class="hidden md:block pt-3 font-bold text-gray-400">Asosiy</p>
                <hr class="md:hidden border border-slate-300/10 my-2">
                <li :class="{'bg-gray-300/10': isActiveMenu('/')}" class="w-fit md:w-full py-1 px-2 hover:bg-gray-300/10 rounded cursor-pointer">
                    <NuxtLink to="/">
                        <span class="hidden md:flex items-center gap-2">
                            <i class='bx bx-home-alt'></i>
                            Bosh sahifa
                        </span>
                    </NuxtLink>
                    <NuxtLink to="/">
                        <i class='bx bx-home-alt md:hidden'></i>
                    </NuxtLink>
                </li>
                <p class="hidden md:block pt-3 font-bold text-gray-400">Foydalanuvchilar</p>
                <hr class="md:hidden border border-slate-300/10 my-2">
                <li :class="{'bg-gray-300/10': isActiveMenu('/users')}" class="w-fit md:w-full py-1 px-2 hover:bg-gray-300/10 rounded cursor-pointer">
                    <NuxtLink to="/users">
                        <span class="hidden md:flex items-center gap-2">
                            <i class='bx bx-group'></i>
                            Foydalanuvchilar
                        </span>
                    </NuxtLink>
                    <NuxtLink to="/users">
                        <i class='bx bx-group md:hidden'></i>
                    </NuxtLink>
                </li>
                <li :class="{'bg-gray-300/10': isActiveMenu('/users/students')}" class="w-fit md:w-full py-1 px-2 hover:bg-gray-300/10 rounded cursor-pointer">
                    <NuxtLink to="/users/students">
                        <span class="hidden md:flex items-center gap-2">
                            <i class='bx bxs-graduation'></i>
                            Talabalar
                        </span>
                    </NuxtLink>
                    <NuxtLink to="/users/students">
                        <i class='bx bxs-graduation md:hidden'></i>
                    </NuxtLink>
                </li>
                <li :class="{'bg-gray-300/10': isActiveMenu('/users/teachers')}" class="w-fit md:w-full py-1 px-2 hover:bg-gray-300/10 rounded cursor-pointer">
                    <NuxtLink to="/users/teachers">
                        <span class="hidden md:flex items-center gap-2">
                            <i class='bx bxs-user'></i>
                            O'qituvchilar
                        </span>
                    </NuxtLink>
                    <NuxtLink to="/users/teachers">
                        <i class='bx bxs-user md:hidden'></i>
                    </NuxtLink>
                </li>
                <p class="hidden md:block pt-3 font-bold text-gray-400">Kurslar</p>
                <hr class="md:hidden border border-slate-300/10 my-2">
                <li :class="{'bg-gray-300/10': isActiveMenu('/courses')}" class="w-fit md:w-full py-1 px-2 hover:bg-gray-300/10 rounded cursor-pointer">
                    <NuxtLink to="/courses">
                        <span class="hidden md:flex items-center gap-2">
                            <i class='bx bx-list-ol'></i>
                            Kurslar
                        </span>
                    </NuxtLink>
                    <NuxtLink to="/courses">
                        <i class='bx bx-list-ol md:hidden'></i>
                    </NuxtLink>
                </li>
                <li :class="{'bg-gray-300/10': isActiveMenu('/courses/create')}" class="w-fit md:w-full py-1 px-2 hover:bg-gray-300/10 rounded cursor-pointer">
                    <NuxtLink to="/courses/create">
                        <span class="hidden md:flex items-center gap-2">
                            <i class='bx bx-add-to-queue'></i>
                            Kurs qo'shish
                        </span>
                    </NuxtLink>
                    <NuxtLink to="/courses/create">
                        <i class='bx bx-add-to-queue md:hidden'></i>
                    </NuxtLink>
                </li>
                <li :title="getUser.user?.first_name + getUser.user?.last_name" class="absolute bottom-14 w-fit md:w-full py-1 px-2 hover:bg-gray-300/10 rounded cursor-pointer">
                    <span class="hidden md:flex items-center gap-2">
                        <i class='bx bx-user'></i>
                        {{ getUser.user?.first_name }} {{ getUser.user?.last_name }}
                    </span>
                    <i class='bx bx-user md:hidden'></i>
                </li>
                <li @click="delUser" class="absolute bottom-5 w-fit md:w-full py-1 px-2 hover:bg-gray-300/10 rounded cursor-pointer">
                    <span class="hidden md:flex items-center gap-2">
                        <i class='bx bx-log-out'></i>
                        Chiqish
                    </span>
                    <i class='bx bx-log-out md:hidden'></i>
                </li>
            </ul>
        </div>
        <div class="h-full w-[calc(100%-14rem)] md:w-[calc(100%-64rem)] flex-1 overflow-auto">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">

import { userProvider } from '~/composables/userProvider';

const { getUser, delUser } = userProvider();
const router = useRouter();
const route = useRoute();

if (getUser.value.user === undefined) {
    router.push("/login")
}

const isActiveMenu = (path: string) => {
    if (route.path === path || route.path === path + "/") {
        return true
    } else {
        return false
    }
}
</script>
