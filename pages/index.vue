<script setup>
import { books } from '~/data/books'

const sortedBooks = books.sort((a, b) => new Date(b.published) - new Date(a.published));
</script>

<template>
    <div class="min-h-screen relative bg-black bg-cover bg-center bg-fixed"
        style="background-image: linear-gradient(transparent, rgba(0,0,0,0.7)), url('/img/lyranthia_map.jpg')">
        <n-section class="text-white absolute left-0 bottom-0">
            <h2 class="text-4xl font-bold mb-4">Willkommen in meiner Welt</h2>
            <p class="mb-8 max-w-[400px]">Tauche ein in fesselnde Geschichten, die dich in neue Welten transportieren und deine
                Fantasie
                entfachen.</p>
            <div class="flex gap-x-4">
                <n-button variant="white" link="/books">
                    <Icon name="tabler:book" class="mr-4 w-5 h-5"></Icon>
                    <p>Bücher ansehen</p>
                </n-button>
                <n-button variant="white-outline" link="/contact">
                    <Icon name="tabler:mail" class="mr-4 w-5 h-5"></Icon>
                    <p>Kontakt</p>
                </n-button>
            </div>
        </n-section>
    </div>

    <n-section class="bg-gray-100">
        <h2 class="text-4xl font-bold mb-4 text-center">Spotlight</h2>
        <div class="flex justify-center py-16 gap-16 flex-wrap">
            <n-book v-for="book in sortedBooks.slice(0, 3)" :book="book" />
        </div>
        <div class="w-auto flex justify-center" v-if="sortedBooks.length > 3">
            <n-button link="/books"
                class="b-4 block border-black bg-transparent text-black hover:bg-black hover:text-white">
                <p>Alle Bücher anzeigen</p>
                <Icon name="tabler:arrow-narrow-right" class="ml-4 w-5 h-5"></Icon>
            </n-button>
        </div>
    </n-section>

    <n-section>
        <h2 class="text-4xl font-bold mb-12 text-center">Über den Autor</h2>

        <div class="flex flex-col items-center gap-8 mb-12">
            <img class="h-64 rounded-xl shadow-md" src="/img/portrait.jpg"></img>
            <div class="text-center">
                <h4 class="font-bold text-2xl mb-2">Noah Horlacher</h4>
                <h5 class="text-xl opacity-70">Schweizer Autor</h5>
            </div>
        </div>
        
        <p>Noah Horlacher ist Fantasy-Autor und Schöpfer der „Leonhard Mondsturm“-Serie. Schon seit seiner Kindheit erforscht er in seinen Geschichten die fantastischen Welten, die in seinem Kopf entstehen. Mit einem einzigartigen Stil verbindet Noah Horlacher phantasievolle Abenteuer mit tiefgründigen, philosophischen Elementen. Seine größten literarischen Einflüsse sind Hermann Hesse und Walter Moers, deren Werke ihn inspiriert haben, die Leser auf Reisen in außergewöhnliche Welten mitzunehmen.<br><br>
            Durch seine Texte möchte er Menschen dazu ermutigen, ihre eigene Fantasie zu entfalten und neue Dimensionen der Vorstellungskraft zu entdecken. Als passionierter Gitarrenspieler und Naturfreund schöpft er seine Kreativität oft aus der Ruhe am Lagerfeuer oder beim Vögelbeobachten. Seine Geschichten richten sich an all jene, die das Abenteuer und die Flucht in fantastische Welten suchen.</p>

        <div class="flex flex-col mt-8 gap-2">
            <div class="flex gap-x-4 items-center">
                <Icon name="tabler:globe" class="w-6 h-6" />
                <p class="mr-4">Immersive Welten</p>
            </div>
            <div class="flex gap-x-4">
                <Icon name="tabler:alien" class="w-6 h-6" />
                <p class="mr-4">Exzentrikergarantie</p>
            </div>
            <div class="flex gap-x-4">
                <Icon name="tabler:book" class="w-6 h-6" />
                <p class="mr-4">Philosophische Hinterfragungen</p>
            </div>
        </div>

        <n-button variant="black" class="mt-12" link="https://www.goodreads.com/author/show/52548579.Noah_Horlacher">
            <Icon name="tabler:link" class="mr-4 w-5 h-5"></Icon>
            <p>Noah Horlacher auf goodreads.com</p>
        </n-button>
    </n-section>
</template>