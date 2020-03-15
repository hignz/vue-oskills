<template>
  <v-bottom-navigation
    class="d-md-none"
    grow
    app
    active-class="active-nav"
    shift
  >
    <v-btn v-for="(item, i) in links" :key="i" :to="{ path: item.route }">
      <span>{{ item.text }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import navigationItems from '../mixins/navigationItems';

export default {
  mixins: [navigationItems]
};
</script>

<style>
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
}

.active-nav {
  border-top: 1px solid var(--v-primary-base);
}
</style>
