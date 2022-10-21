<template>
  <div>
    <h1>params参数---{{ $route.params.keyword }}=======直接使用{{keyword}}</h1>
    <h1>query参数---{{ $route.query.k }}</h1>
  </div>
</template>

<script>
export default {
    props:['keyword']
};
</script>

<style>
</style>