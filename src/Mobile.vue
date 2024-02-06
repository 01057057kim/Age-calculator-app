<script setup>
import { ref, watch } from 'vue'

const now = new Date()
const db = ref('')
const mb = ref('')
const yb = ref('')
const dt = now.getDate();
const mt = now.getMonth() + 1;
const yt = now.getFullYear();
const age = ref({ years: 0, months: 0, days: 0 })
const error = ref({ db: false, mb: false, yb: false })
const notValid = ref({ db: false, mb: false, yb: false })

watch(db, () => {
    notValid.value.db = db.value > 31 || db.value < 1
})

watch(mb, () => {
    notValid.value.mb = mb.value > 12 || mb.value < 1
})

watch(yb, () => {
    notValid.value.yb = yb.value < 1 || yb.value > yt
})

function calculateDate() {
    error.value = { db: !db.value, mb: !mb.value, yb: !yb.value }
    if (error.value.db || error.value.mb || error.value.yb) {
        return
    }
    if (notValid.value.db || notValid.value.mb || notValid.value.yb) {
        return
    }
    let years = yt - yb.value
    let months = mt - mb.value
    let days = dt - db.value

    if (days < 0) {
        days += 30
        months--
    }
    if (months < 0) {
        months += 12
        years--
    }

    age.value = { years, months, days }
}
</script>

<template>
    <main
        class="flex flex-col items-start border border-solid border-transparent bg-white rounded-t-2xl rounded-bl-2xl rounded-br-[100px] w-[400px] h-[450px] py-10 px-7 font-poppins shadow-lg">
        <div class="flex flex-co gap-6 whitespace-nowrap">
            <div>
                <h1 class="uppercase font-semibold opacity-60 mb-2"
                    :class="{ 'text-red-500': error.db || notValid.db, 'uppercase font-semibold opacity-60 mb-2': true }">Day
                </h1>
                <input
                    class="border-2 border-solid border-l-grey text-[26px] w-24 font-bold rounded-lg px-2 py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none hover:border-black"
                    type="number" v-model="db" placeholder="DD">
                <p v-if="error.db" class="text-red-500 text-[8px] text-opacity-[80%] italic mt-1">This field is required
                </p>
                <p v-if="notValid.db" class="text-red-500 text-[8px] text-opacity-[80%] italic mt-1">Must be valid day</p>
            </div>
            <div>
                <h2 class="uppercase font-semibold opacity-60 mb-2"
                    :class="{ 'text-red-500': error.mb || notValid.mb, 'uppercase font-semibold opacity-60 mb-2': true }">
                    Month</h2>
                <input
                    class="border-2 border-solid border-l-grey text-[26px] w-24 font-bold rounded-lg px-2 py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none hover:border-black"
                    type="number" v-model="mb" placeholder="MM">
                <p v-if="error.mb" class="text-red-500 text-[8px] text-opacity-[80%] italic mt-1">This field is required
                </p>
                <p v-if="notValid.mb" class="text-red-500 text-[8px] text-opacity-[80%] italic mt-1">Must be a valid month
                </p>
            </div>
            <div>
                <h3 class="uppercase font-semibold opacity-60 mb-2"
                    :class="{ 'text-red-500': error.yb || notValid.yb, 'uppercase font-semibold opacity-60 mb-2': true }">Year
                </h3>
                <input
                    class="border-2 border-solid border-l-grey text-[26px] w-24 font-bold rounded-lg px-2 py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none hover:border-black"
                    type="number" v-model="yb" placeholder="YYYY">
                <p v-if="error.yb" class="text-red-500 text-[8px] text-opacity-[80%] italic mt-1">This field is required
                </p>
                <p v-if="notValid.yb" class="text-red-500 text-[8px] text-opacity-[80%] italic mt-1">Must be in the past
                </p>
            </div>
        </div>
        <div class="border-t-2 border-solid border-l-grey w-[335px] absolute mt-[135px]"></div>
        <div class="absolute ml-[135px] mt-[105px] transform transition duration-200 ease-out hover:scale-125">
            <button
                class="border border-solid border-transparent rounded-full bg-purple w-[60px] h-[60px] flex items-center justify-center "
                @click="calculateDate"><img class="w-7 h-7" src="./assets/images/icon-arrow.svg" alt="arrow"></button>
        </div>
        <div class="fixed mt-[175px]">
            <div
                class="flex flex-col items-start w-[350px] h-[200px]  font-bold italic text-6xl leading-none justify-center ">
                <div class="flex">
                    <span class="text-purple font-bold" v-if="age.years">{{ age.years }}</span>
                    <span class="font-bold" v-if="age.years"> years</span>
                    <span v-else><span class="text-purple font-bold">- -</span><span class="font-bold"> years</span></span>
                </div>
                <div class="flex">
                    <span class="text-purple font-bold" v-if="age.months">{{ age.months }}</span>
                    <span class="font-bold" v-if="age.months"> months</span>
                    <span v-else><span class="text-purple font-bold">- -</span><span class="font-bold"> months</span></span>
                </div>
            <div class="flex">
                <span class="text-purple font-bold" v-if="age.days">{{ age.days }}</span>
                <span class="font-bold" v-if="age.days"> days</span>
                <span v-else><span class="text-purple font-bold">- -</span><span class="font-bold"> days</span></span>
            </div>
        </div>
    </div>
</main></template>
