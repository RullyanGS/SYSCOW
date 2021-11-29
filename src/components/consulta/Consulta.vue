<template>
    <div class="consulta">
        <PageTitle main="Consulta Veterinária" />
        <consulta-list />
    </div>
</template>

<script>
import ConsultaList from "../template/list/ConsultaList";
import PageTitle from '../template/PageTitle'

export default {
    name: 'Consulta',
    components: { PageTitle, ConsultaList }
}
</script>

<style>

</style>