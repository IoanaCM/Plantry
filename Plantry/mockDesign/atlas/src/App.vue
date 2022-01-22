<template lang="pug">
#logo Hello

#nav.flex
    router-link.navLink(to="/") Home 
    router-link.navLink(to="/List") Shopping List
<router-view/>
</template>

<style lang="sass">
body
    background-color: #d0ddd7
.flex
    display: flex
    justify-content: center
</style>
<style scoped lang="sass">
.navLink
    border: solid
    border-width: 0px 1px
    padding: 0 10px
#logo
    height:100%

    
</style>
