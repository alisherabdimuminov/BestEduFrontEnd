<template>
    <div class="p-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, doloribus. Placeat perferendis asperiores sint iure possimus voluptatum rerum, corrupti eius? Repellendus nisi, libero officiis alias reprehenderit magnam quaerat cum aliquam? Explicabo dolorum dolorem vitae odio mollitia quibusdam excepturi voluptatum impedit error laborum nemo, debitis, illum praesentium voluptas ipsam asperiores, corrupti porro modi maiores enim eos quidem amet? Soluta mollitia, cum facilis eius iusto numquam, fuga aut, quis ad minus perferendis! Accusantium illo iste aspernatur sequi dolorum distinctio repellat hic harum a perspiciatis molestiae assumenda inventore minima sint temporibus eligendi, est modi dolores sunt doloribus at? Velit sequi quidem numquam tempore?
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
