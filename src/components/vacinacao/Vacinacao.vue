<template>
    <div class="vacinacao">
        <PageTitle main="Medicação" />
        <Vacinacao-list />
    </div>
</template>

<script>
import VacinacaoList from "../template/list/VacinacaoList";
import PageTitle from '../template/PageTitle'

export default {
    name: 'Vacinacao',
    components: { PageTitle, VacinacaoList }
}
</script>

<style>

</style>