<template>
    <div class="vacinacao">
        <PageTitle main="Vacinação" />
        <Vacinacao-list />
    </div>
</template>

<script>
import VacinacaoList from "../template/VacinacaoList";
import PageTitle from '../template/PageTitle'

export default {
    name: 'Vacinacao',
    components: { PageTitle, VacinacaoList }
}
</script>

<style>

</style>