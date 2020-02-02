<template>
  <v-container>
    <v-card-title>
      Skill list
      <v-spacer></v-spacer>
    </v-card-title>

    <v-data-table
     v-if="loaded"
      :headers="headers"
      :items="topSkills"
      :disable-filtering="true"
      :items-per-page="5"
    >
      <template v-slot:item.action="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon small @click="openSkillProfile(item.skillId)">
                mdi-file-star-outline
              </v-icon>
            </v-btn>
          </template>
          <span>Skill profile</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      loaded: false,
      selectedSkill: {},
      headers: [
        {
          text: 'Skill',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Esteem', value: 'esteem', align: 'center' },
        { text: 'Esteem Points', value: 'rating', align: 'center' },
        { text: 'Category', value: 'categoryName', align: 'center' },
        { text: 'Actions', value: 'action', sortable: false, align: 'center' }
      ],
      topSkills: null
    };
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.fetchTopSkills()
      .then((res) => {
        this.initialize();        
        this.topSkills = res.skills;
        this.loaded = true;
      })
      .catch(err => console.log(err));
  },
  methods: {
    ...mapActions(['fetchTopSkills']),
    initialize() {},

    openSkillProfile(skillId) {
      this.$router.push({
        name: 'skillProfile',
        params: { id: skillId }
      });
    }
  }
};
</script>

<style></style>
