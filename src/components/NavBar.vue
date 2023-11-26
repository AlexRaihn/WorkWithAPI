<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle><!--Мб удалить?-->

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item to="/">Crypto</b-nav-item>
            <b-nav-item to="/weather">WeatherAPI</b-nav-item>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    name: "Navbar",
    data () {
        return {

        }
    }
}
</script>

<style scoped>
</style>