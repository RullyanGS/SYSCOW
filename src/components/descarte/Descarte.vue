<template>
    <div class="descarte">
        <PageTitle main="Descarte" />
        <descarte-list />
    </div>
</template>

<script>
import DescarteList from "../template/list/DescarteList";
import PageTitle from '../template/PageTitle'

export default {
    name: 'Descarte',
    components: { PageTitle, DescarteList }
}
</script>

<style>

</style>