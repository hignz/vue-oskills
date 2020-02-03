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

    console.log(categoryId);
  }
};
</script>

<style></style>`
