<template>
  <p>Category Page</p>
</template>

<script>
export default {
  data() {
    return {
      skills: []
    };
  },
  created() {
    const categoryId = this.$route.params.id;
  }
};
</script>

<style></style>`
