<template>
    <div class="page-title">
        <h1>{{ main }}</h1>
        <hr>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['main']
}
</script>

<style>
    .page-title h1 {
        margin: 0px;
    }
</style>