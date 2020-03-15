<template>
  <v-container v-if="loaded" fluid>
    <v-row class="fill-height mt-md-12" justify="center" align="center">
      <v-col cols="12" sm="2">
        <v-card outlined height="100%">
          <v-card-text class="text-center">
            <v-avatar v-if="user.image" size="128">
              <v-img :src="user.image" max-height="175" max-width="175">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-avatar>
            <v-avatar v-else size="128">
              <v-icon x-large>mdi-account-circle</v-icon>
            </v-avatar>
          </v-card-text>
          <v-card-text class="text-center">
            <v-tooltip v-if="user.isAdmin" bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="pa-1" left color="primary" v-on="on"
                  >mdi-account-tie</v-icon
                >
              </template>
              <span>OSkills admin.</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon @click="openEmailClient()">
                  <v-icon v-on="on">mdi-mail</v-icon>
                </v-btn>
              </template>
              <span>Email {{ user.name }}</span>
            </v-tooltip>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="10">
        <v-card outlined>
          <v-row align="center">
            <v-col cols="12" sm="12" md="4">
              <v-col cols="12" sm="12">
                <v-card-text class="title">
                  <p class="mb-1">{{ user.name }}</p>
                  <p class="subtitle-2 grey--text">
                    {{ user.role.title }}
                  </p>
                </v-card-text>
              </v-col>

              <v-col cols="12" sm="12" class="text-center text-md-left">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-chip class="ma-2" outlined v-on="on">
                      <v-icon class="pa-1" left>mdi-calendar-range</v-icon>
                      {{ joinedAt }}
                    </v-chip>
                  </template>
                  <span>When {{ user.name }} joined OSkills.</span>
                </v-tooltip>
                <v-tooltip v-if="bestSkill" bottom>
                  <template v-slot:activator="{ on }">
                    <v-chip class="ma-2" outlined v-on="on">
                      <v-icon class="pa-1" left>mdi-star</v-icon>
                      {{ bestSkill.skill.name }}
                    </v-chip>
                  </template>
                  <span>{{ user.name }}'s' best skill.</span>
                </v-tooltip>
              </v-col>
            </v-col>
            <v-col cols="12" sm="12" md="8">
              <v-row v-if="topThreeSkills.length">
                <v-col
                  v-for="skill in topThreeSkills"
                  :key="skill._id"
                  md="3"
                  class="text-center"
                >
                  <v-card-text>
                    <EsteemBadge :esteem="skill.esteem" />
                    <p class="body-2 grey--text mt-2">
                      {{ skill.skill.name }}
                    </p>
                  </v-card-text>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col v-for="i in 3" :key="i" md="3" class="text-center">
                  <v-card-text>
                    <EsteemBadge :placeholder="true" />
                    <p class="body-2 grey--text mt-2">
                      N/A
                    </p>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="fill-height">
      <v-col cols="12" sm="4">
        <v-card outlined>
          <v-card-text v-if="user.skills.length">
            <RadarChart
              v-if="user.skills.length"
              :user-skills="user.skills"
              :size="120"
              :height="325"
              :skill-categories="skillCategories"
              class="pr-2"
            ></RadarChart>
          </v-card-text>
          <v-card-text v-else>
            <p class="text-center grey--text mt-4">
              {{ user.name }} has not added any skills yet
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card outlined>
          <v-card-text v-if="user.skills.length">
            Skills
          </v-card-text>
          <v-list
            v-if="skillsCategorized.length"
            subheader
            class="overflow-y-auto"
            dense
            style="max-height: 320px"
          >
            <div
              v-for="(category, i) in skillsCategorized"
              :key="category.name"
            >
              <v-subheader
                class="subtitle-2 primary--text link"
                inset
                @click="
                  navigateTo({ name: 'category', params: { id: category._id } })
                "
                >{{ category.categoryName }}</v-subheader
              >

              <v-list-item
                v-for="skill in category.skills"
                :key="skill._id"
                link
                @click="openSkillProfile(skill.skill._id)"
              >
                <v-list-item-avatar>
                  <EsteemBadge :esteem="skill.esteem"></EsteemBadge>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-text="skill.skill.name"
                  ></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <Vote :skill="skill" @voted="updateSkills" />
                </v-list-item-action>
              </v-list-item>

              <v-divider v-if="i !== skillsCategorized.length - 1"></v-divider>
            </div>
          </v-list>
          <v-card-text v-else>
            <p class="text-center grey--text mt-4">
              {{ user.name }} has not added any skills yet
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card v-if="userActivity.length" outlined height="375">
          <v-toolbar flat dense>
            <v-toolbar-title class="subtitle-2 grey--text text-uppercase"
              >Activity</v-toolbar-title
            >
          </v-toolbar>
          <ActivityFeed
            :activity-data="userActivity"
            :is-real-time="false"
            :height="325"
          ></ActivityFeed>
        </v-card>
        <v-card v-else outlined>
          <v-card-text>
            <p class="text-center grey--text mt-4">
              {{ user.name }} has no activity yet
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const EsteemBadge = () => import('../components/EsteemBadge');
const RadarChart = () => import('../components/RadarChart');
const ActivityFeed = () => import('../components/ActivityFeed');
const Vote = () => import('../components/Vote');
import { lightFormat } from 'date-fns';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    ActivityFeed,
    EsteemBadge,
    RadarChart,
    Vote
  },
  data() {
    return {
      selected: [0],
      loaded: false,
      user: {},
      similarUsers: [],
      skillCategories: [],
      userActivity: [],
      lightFormat
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    skillsCategorized() {
      const uniqueCategories = this.user.skills
        .filter(
          (v, i, a) =>
            a.findIndex(t => t.skill.category._id === v.skill.category._id) ===
            i
        )
        .map(el => {
          return {
            name: el.skill.category.name,
            _id: el.skill.category._id
          };
        });

      const arr = uniqueCategories.map(el => ({
        _id: el._id,
        categoryName: el.name,
        skills: this.user.skills.filter(
          elm => elm.skill.category.name === el.name
        )
      }));

      return arr;
    },
    joinedAt() {
      return lightFormat(new Date(this.user.joinedAt), 'dd-MM-yyyy');
    },
    bestSkill() {
      return this.user.skills.reduce(
        (prev, current) => (prev.esteem > current.esteem ? prev : current),
        0
      );
    },
    topThreeSkills() {
      return this.user.skills
        .concat()
        .sort((a, b) => b.esteem - a.esteem)
        .slice(0, 3);
    }
  },
  created() {
    if (this.$router.currentRoute.params.id === this.getUser._id) {
      return this.$router.push({ name: 'dashboard' });
    }

    this.fetchUserById(this.$route.params.id).then(response => {
      this.user = response.data;
      this.loaded = true;

      this.fetchParticipantActivity(this.user._id).then(res => {
        this.userActivity = res;
      });
    });

    this.fetchCategoriesArchived('false').then(res => {
      this.skillCategories = res.categories;
    });
  },
  methods: {
    ...mapActions([
      'fetchUserById',
      'fetchCategoriesArchived',
      'fetchParticipantActivity'
    ]),
    openSkillProfile(skillId) {
      this.$router.push({
        name: 'skillProfile',
        params: { id: skillId }
      });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    updateSkills(skill) {
      this.user.skills = this.user.skills.map(el =>
        el._id === skill._id ? skill : el
      );
    },
    openEmailClient() {
      location.href = `mailto:${this.user.email}`;
    }
  }
};
</script>
