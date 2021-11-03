<template>
    <div class="animais">
        <PageTitle main="Animais" />
        <animal-list />
    </div>
</template>

<script>
import AnimalList from "../template/AnimalList";
import PageTitle from '../template/PageTitle'

export default {
    name: 'Animais',
    components: { PageTitle, AnimalList }
}
</script>

<style>

</style>