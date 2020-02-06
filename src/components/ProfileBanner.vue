<template>
  <div>
    <v-row justify="center" align="center" class="ma-4">
      <v-avatar size="128">
        <v-img :src="randomUserImg"></v-img>
      </v-avatar>
    </v-row>
    <v-row class="subheading-1" justify="center" align="center">{{
      user.name
    }}</v-row>
    <v-row class="subtitle-2 grey--text" justify="center" align="center">{{
      user.role
    }}</v-row>
    <v-row class="subtitle-2 grey--text" justify="center" align="center">
      <v-col cols="12" sm="12" class="text-center">
        <!-- <v-tooltip v-if="getLowestSkill" bottom>
          <template v-slot:activator="{ on }">
            <v-chip class="ma-2" color="primary" v-on="on">
              <v-icon class="pa-1" left>mdi-flag</v-icon>
              {{ getLowestSkill.name }}
            </v-chip>
          </template>
          <span>{{ user.name }} wants to improve this skill.</span>
        </v-tooltip> -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-chip class="ma-2" color="primary" v-on="on">
              <v-icon class="pa-1" left>mdi-calendar-range</v-icon>
              {{ lightFormat(parseISO(user.dateJoined), 'dd-mm-yyyy') }}
            </v-chip>
          </template>
          <span>When {{ user.name }} joined OSkills.</span>
        </v-tooltip>
        <v-tooltip v-if="bestSkill" bottom>
          <template v-slot:activator="{ on }">
            <v-chip class="ma-2" color="primary" v-on="on">
              <v-icon class="pa-1" left>mdi-star</v-icon>
              {{ bestSkill.skill.name }}
            </v-chip>
          </template>
          <span>{{ user.name }}'s' best skill.</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-btn small color="primary" @click="promoteToAdmin(user)">
        <v-icon small class="pr-2">mdi-plus</v-icon>
        {{ promoteBtnText }}
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { lightFormat, parseISO } from 'date-fns';
import { mapActions } from 'vuex';

export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      lightFormat,
      parseISO,
      vWeight: Number
    };
  },
  computed: {
    bestSkill() {
      return this.user.skills.reduce(
        (prev, current) => (prev.esteem > current.esteem ? prev : current),
        0
      );
    },
    promoteBtnText() {
      return this.user.isAdmin ? 'Demote' : 'Promote';
    },
    randomUserImg() {
      return `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * (Math.floor(65) - Math.ceil(1) + 1)
      ) + 1}.jpg`;
    }
  },
  methods: {
    ...mapActions(['addAdmin', 'toggleSnackbar']),
    promoteToAdmin(user) {
      if (user.isAdmin === false) {
        this.vWeight = 5;
      } else {
        this.vWeight = 1;
      }
      this.addAdmin({
        uId: user._id,
        isAdmin: !user.isAdmin,
        voteWeight: this.vWeight,
        email: user.email
      })
        .then(() => {
          this.user.isAdmin = !this.user.isAdmin;
          this.toggleSnackbar({
            show: true,
            text: this.user.isAdmin
              ? `${this.user.name} has been promoted to admin`
              : `${this.user.name} has been demoted from admin`,
            color: this.user.isAdmin ? 'success' : 'orange darken-3'
          });
        })
        .catch(() => {
          this.toggleSnackbar({
            show: true,
            text: 'Something went wrong',
            color: 'error'
          });
        });
    }
  }
};
</script>

<style></style>
