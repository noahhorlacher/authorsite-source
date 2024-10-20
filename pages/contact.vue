<template>
    <n-section class="bg-gray-100">
        <h2 class="text-4xl font-bold mb-32 text-center mt-16">Kontakt aufnehmen</h2>
        <p class="max-w-[450px] text-xl mb-24 block mx-auto">Hast du Fragen, Anregungen oder möchtest du mir einfach schreiben? Ich freue mich, von dir zu hören! Klicke auf den Button unten, um mir direkt eine E-Mail zu senden.</p>
        <div class="flex flex-col items-center gap-8">
            <p class="text-center">E-Mail Adresse:<br>pecuro.noah@gmail.com</p>
            <div class="flex flex-nowrap w-full items-center justify-center gap-8">
                <div class="h-[1px] bg-black w-1/4 max-w-[100px]"></div>
                <p>oder</p>
                <div class="h-[1px] bg-black w-1/4 max-w-[100px]"></div>
            </div>
            <n-button variant="black" link="mailto:pecuro.noah@gmail.com">
                <Icon name="tabler:mail" class="mr-4 w-5 h-5"></Icon>
                <p>Hier klicken</p>
            </n-button>
        </div>
    </n-section>
</template>