<template>
  <v-dialog v-model="editDialog" max-width="500" @input="v => v || close()">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon small>
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="mb-4">Edit Skill</v-card-title>
      <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
        <v-row>
          <v-col cols="12">
            <v-select
              label="Category"
              :items="categories"
              item-text="text"
              item-value="value"
              prepend-inner-icon="mdi-playlist-star"
              required
              @change="populateSkills"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
                v-model="name"
                label="Name"
                :rules="requiredRules"
                clearable
              ></v-text-field>
          </v-col>
        </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="close()">Close</v-btn>
            <v-btn color="primary" :disabled="!valid" type="submit">Edit Skill</v-btn>
          </v-card-actions>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {};
</script>

<style>
</style>