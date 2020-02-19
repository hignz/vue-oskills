<template>
  <v-data-table
    v-if="loaded"
    :headers="headers"
    :items="topSkills"
    :disable-filtering="true"
    sort-by="total"
    sort-desc
    dense
    :items-per-page="5"
    multi-sort
  >
    <template v-slot:item.avg="{ item }">
      {{ round(item.avg, 1) }}
    </template>

    <template v-slot:item.action="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon small @click="openSkillProfile(item._id)">
              mdi-file-star-outline
            </v-icon>
          </v-btn>
        </template>
        <span>Skill profile</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      loaded: false,
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'People with', value: 'count', align: 'center' },
        { text: 'Average points', value: 'avg', align: 'center' },
        { text: 'Total points', value: 'total', align: 'center' },
        { text: 'Actions', value: 'action', align: 'center' }
      ],
      topSkills: []
    };
  },
  created() {
    this.fetchTopSkills().then(res => {
      this.initialize();
      this.topSkills = res.skills;
      this.loaded = true;
    });
  },
  methods: {
    ...mapActions(['fetchTopSkills']),
    initialize() {},
    round(number, places) {
      return number.toFixed(places);
    },
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
