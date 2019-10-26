<template>
  <v-container v-if="loaded" fluid>
    <v-card>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="12" md="12">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="12" md="4">
              <v-row justify="center" align="center" class="mb-6">
                <v-badge @click="">
                  <template v-slot:badge>
                    <v-icon small dark>
                      mdi-plus
                    </v-icon>
                  </template>
                  <v-avatar color="primary" size="62">
                    <span class="white--text headline">{{
                      skill.name[0]
                    }}</span>
                  </v-avatar>
                </v-badge>
              </v-row>
              <v-row class="subheading-1" justify="center" align="center">
                {{ skill.name }}
              </v-row>
              <v-row
                class="subtitle-2 grey--text"
                justify="center"
                align="center"
              >
                {{ skill.categoryName }}
              </v-row>

              <v-row class="mt-5" justify="center" align="center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-chip class="ma-2" color="primary" v-on="on">
                      <v-icon class="pa-1 mb-1" left>mdi-account-group</v-icon>
                      {{ skill.usersWith }}
                    </v-chip>
                  </template>
                  <span>Users with this skill</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-chip class="ma-2" color="primary" v-on="on">
                      <v-icon class="pa-1" left>mdi-division</v-icon>
                      {{ skill.averageEsteem.toFixed(1) }}
                    </v-chip>
                  </template>
                  <span>Average Esteem level</span>
                </v-tooltip>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-row> </v-row>
    <v-snackbar v-model="showSnackbar" color="primary">
      {{ snackbarText }}
      <v-btn color="white" text @click="showSnackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      skill: {},
      showSnackbar: false,
      loaded: false,
      snackbarText: ''
    };
  },
  created() {
    const skillId = this.$route.params.id;

    this.$store
      .dispatch('fetchSkillInfo', skillId)
      .then(res => {
        this.skill = res;
        this.loaded = true;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
