<template>
    <div class="border-dashed border-b-2 border-gray-200 ">
        <div class="my-2 flex items-center">
            <div class="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center ">
                <StarIcon class="text-green-400 w-4 cursor-pointer" />
            </div>
            <p class="text-xs text-gray-500 ml-2 ">Parabéns! Você completou um ciclo de x tempo.</p>
        </div>
    </div>

</template>

<script>
import { StarIcon } from "@heroicons/vue/solid";
export default {
    components: {StarIcon},
    props: {
        achivements: {
            description: '',
        }
    }
}
</script>

<style>

</style>