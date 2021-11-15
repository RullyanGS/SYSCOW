<template>
    <div class="consulta">
        <PageTitle main="Consulta" />
        <consulta-list />
    </div>
</template>

<script>
import ConsultaList from "../template/ConsultaList";
import PageTitle from '../template/PageTitle'

export default {
    name: 'Consulta',
    components: { PageTitle, ConsultaList }
}
</script>

<style>

</style>