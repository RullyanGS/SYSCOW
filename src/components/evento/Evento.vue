<template>
    <div class="evento">
        <PageTitle main="Evento" />
        <evento-list />
    </div>
</template>

<script>
import EventoList from "../template/list/EventoList";
import PageTitle from '../template/PageTitle'

export default {
    name: 'Evento',
    components: { PageTitle, EventoList }
}
</script>

<style>

</style>