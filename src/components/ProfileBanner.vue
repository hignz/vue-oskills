<template>
  <v-card>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="12" sm="12">
          <v-col cols="12" sm="2" offset-sm="5" class="pb-0 text-center">
            <v-avatar v-if="user.image" size="128">
              <v-img :src="user.image"></v-img>
            </v-avatar>
            <v-icon v-else x-large="">mdi-account-circle</v-icon>
          </v-col>
          <v-col cols="12" sm="2" offset-sm="5" class="pb-0 text-center">
            <v-card-subtitle class="title pb-0">{{
              user.name
            }}</v-card-subtitle>
            <v-card-subtitle class="pt-0 grey--text">{{
              user.role.title
            }}</v-card-subtitle>
          </v-col>
          <v-col cols="12" sm="6" offset-sm="3" class="py-0 text-center">
            <v-tooltip v-if="user.admin" bottom>
              <template v-slot:activator="{ on }">
                <v-chip class="ma-2" v-on="on">
                  <v-icon class="pa-1" left>mdi-shield-account</v-icon>
                  Admin
                </v-chip>
              </template>
              <span>When {{ user.name }} joined OSkills.</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-chip class="ma-2" v-on="on">
                  <v-icon class="pa-1" left>mdi-calendar-range</v-icon>
                  {{ joinedAt }}
                </v-chip>
              </template>
              <span>When {{ user.name }} joined OSkills.</span>
            </v-tooltip>
            <v-tooltip v-if="bestSkill" bottom>
              <template v-slot:activator="{ on }">
                <v-chip class="ma-2" v-on="on">
                  <v-icon class="pa-1" left>mdi-star</v-icon>
                  {{ bestSkill.skill.name }}
                </v-chip>
              </template>
              <span>{{ user.name }}'s' best skill.</span>
            </v-tooltip>
          </v-col>
          <v-col
            v-if="loggedInUser.isAdmin"
            cols="12"
            sm="6"
            offset-sm="3"
            class="text-center mt-2"
          >
            <v-btn
              small
              outlined=""
              :color="promoteBtnColor"
              @click="promoteToAdmin(user)"
            >
              <v-icon small class="pr-2">{{ promoteBtnIcon }}</v-icon>
              {{ promoteBtnText }}
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { lightFormat } from 'date-fns';
import { mapActions, mapState } from 'vuex';

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
      vWeight: Number
    };
  },
  computed: {
    ...mapState({ loggedInUser: 'user' }),
    bestSkill() {
      return this.user.skills.reduce(
        (prev, current) => (prev.esteem > current.esteem ? prev : current),
        0
      );
    },
    promoteBtnText() {
      return this.user.isAdmin ? 'Demote' : 'Promote';
    },
    promoteBtnColor() {
      return this.user.isAdmin ? 'warning' : 'success';
    },
    promoteBtnIcon() {
      return this.user.isAdmin ? 'mdi-minus' : 'mdi-plus';
    },
    randomUserImg() {
      return `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * (Math.floor(65) - Math.ceil(1) + 1)
      ) + 1}.jpg`;
    },
    joinedAt() {
      return lightFormat(new Date(this.user.joinedAt), 'dd-MM-yyyy');
    }
  },
  methods: {
    ...mapActions(['addAdmin', 'toggleSnackbar']),
    promoteToAdmin(user) {
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
