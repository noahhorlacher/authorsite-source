<script setup>
useHead({
  title: 'Noah Horlacher',
  meta: [
    { name: 'description', content: 'Website des Autors Noah Horlacher.' }
  ],
  link: [
    { rel: 'icon', type: "image/svg+xml", href: "/favicon.svg" },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true},
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'}
  ]
})

provideHeadlessUseId(() => useId())
</script>

<template>
  <div>
    <NuxtLayout>
      <NHeader />
      <NuxtPage />
      <NFooter />
    </NuxtLayout>
  </div>
</template>

<style>
html {
  font-family: 'Poppins', sans-serif;
}

* {
  letter-spacing: 0.03rem;
}

.bluelink a {
  text-decoration: underline;
  color: blue;
}
</style>