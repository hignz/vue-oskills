<template>
  <v-container v-if="loaded" fluid>
    <v-card>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="12" md="12">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="12" md="4">
              <v-row justify="center" align="center" class="mb-6">
                <v-avatar size="128">
                  <!-- <v-img :src="randomUserImg"></v-img> -->
                </v-avatar>
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
              <v-row
                class="subtitle-2 grey--text"
                justify="center"
                align="center"
              >
                <!--  <v-col sm="4">
                  <v-chip class="ma-2" color="primary" outlined pill>
                    Joined: {{ moment(user.dateJoined).fromNow() }}
                    <v-icon right>mdi-calendar-range</v-icon>
                  </v-chip>
                </v-col>
                <v-col sm="4">
                  <v-chip class="ma-2" color="primary" outlined pill>
                    Joined: {{ moment(user.dateJoined).format('DD-MM-YYYY') }}
                    <v-icon right>mdi-calendar-range</v-icon>
                  </v-chip>
                </v-col>
                <v-col sm="4">
                  <v-chip class="ma-2" color="primary" outlined pill>
                    Top skill: {{ getBestSkill.name }}
                    <v-icon right>mdi-star</v-icon>
                  </v-chip>
                </v-col> -->
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
