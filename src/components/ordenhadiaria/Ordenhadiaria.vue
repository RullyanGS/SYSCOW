<template>
    <div class="ordenhadiaria">
        <PageTitle main="Ordenha Diária" />
        <ordenhaDiaria-list />
    </div>
</template>

<script>
import OrdenhaDiariaList from "../template/OrdenhaDiariaList";
import PageTitle from '../template/PageTitle'

export default {
    name: 'Ordenhadiaria',
    components: { PageTitle, OrdenhaDiariaList }
}
</script>

<style>

</style>