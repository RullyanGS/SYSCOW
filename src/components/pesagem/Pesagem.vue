<template>
    <div class="pesagem">
        <PageTitle main="Pesagem" />
        <pesagem-list />
    </div>
</template>

<script>
import PesagemList from "../template/list/PesagemList";
import PageTitle from '../template/PageTitle'

export default {
    name: 'Pesagem',
    components: { PageTitle, PesagemList}
}
</script>

<style>

</style>