<template>
  <div>
    <v-list v-if="users.length" dense two-line flat nav>
      <v-list-item-group>
        <v-list-item v-for="user in users" :key="user._id" class="ml-0 pl-0">
          <v-list-item-avatar>
            <v-icon>mdi-circle-medium</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="user.email"></v-list-item-title>
            <v-list-item-subtitle class="grey--text mb-2">
              {{ user.role.title }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="grey--text">
              invited
              {{
                formatDistanceToNow(new Date(user.invitedAt), {
                  addSuffix: true
                })
              }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <ResendInviteDialog :invited-user="user"></ResendInviteDialog>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <template v-else>
      <v-card-text class="mt-8">
        <p class="grey--text text-center">
          We can't find any pending invitations.
        </p>
      </v-card-text>
    </template>
  </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns';
import ResendInviteDialog from '../components/ResendInviteDialog';

export default {
  components: {
    ResendInviteDialog
  },
  props: {
    users: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formatDistanceToNow
    };
  }
};
</script>

<style></style>
