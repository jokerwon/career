<template>
    <div class="container">
        <div class="hello">{{ msg }}</div>
        <img src="@/assets/hamburger.png" alt />
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'Hello Vue'
        }
    }
}
</script>

<style scoped>
.hello {
    color: red;
}
</style>