<template>
  <v-container>
    <v-row>
      <v-col sm="12">
        <v-card>
          <v-card-text>
            <v-row justify="end">
              <v-col>
                Row 1 Col 1
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon :to="{ path: 'dashboard' }" v-on="on">
                      <v-icon large>
                        mdi-swap-horizontal
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Dashboard</span>
                </v-tooltip>
              </v-col>
              <v-col> Row 1 Col 2 </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="8">
        <v-card>
          <v-card-text>
            Row 2 Col 1
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-text>
            Row 2 Col 2
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-text>
            Row 3 Col 1
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-text>
            Row 3 Col 2
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-text>
            Row 3 Col 3
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TopSkills from '../components/TopSkills';
export default {
  components: {
    TopSkills
  }
};
</script>

<style></style>
