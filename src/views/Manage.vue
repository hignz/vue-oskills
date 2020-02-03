<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12">
        <ManageSkills />
      </v-col>
      <v-col cols="12" sm="12">
        <ManageCategories />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ManageSkills from '../components/ManageSkills';
import ManageCategories from '../components/ManageCategories';

export default {
  components: {
    ManageSkills,
    ManageCategories
  }
};
</script>

<style></style>
