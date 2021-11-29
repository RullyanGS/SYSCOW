<template>
    <div class="relatorios">
        <PageTitle main="Relatórios" />
        <relatorio-list />
    </div>
</template>

<script>
import RelatorioList from "../template/list/RelatorioList";
import PageTitle from '../template/PageTitle'

export default {
    name: 'Relatorios',
    components: { PageTitle, RelatorioList }
}
</script>

<style>

</style>