<template>
  <div>
    <v-card-title
      >Archived
      <span class="caption ml-2 grey--text">({{ categories.length }})</span>
      <v-spacer></v-spacer>
      <v-form>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search archived..."
          single-line
          clearable
          hide-details
        ></v-text-field>
      </v-form>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="categories"
      :search="search"
      no-data-text="No archived categories loaded"
      no-results-text="No archived categories found"
    >
      <template v-slot:item.dateArchived="{ item }">
        {{ formatRelative(new Date(item.dateArchived), Date.now()) }}
      </template>

      <template v-slot:item.action="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon small @click="showUnarchiveDialog(item)">
                mdi-archive-arrow-up
              </v-icon>
            </v-btn>
          </template>
          <span>Unarchive</span>
        </v-tooltip>
        <EditCategoryDialog
          :category="item"
          @update="updateArchivedCategory"
        ></EditCategoryDialog>
        <v-btn icon>
          <v-icon small @click="openCategoryProfile(item._id)">
            mdi-open-in-new
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="unarchiveDialog" width="650" @input="v => v || close()">
      <v-card>
        <v-card-title class="headline">
          Are you sure?
        </v-card-title>

        <v-card-text>
          <v-data-table
            class="mb-4"
            disable-sort
            :headers="[
              {
                text: 'Name',
                align: 'left',
                value: 'name'
              },
              { text: 'Added', value: 'dateAdded' },
              { text: 'Archived', value: 'dateArchived' }
            ]"
            :items="[selectedCategory]"
            hide-default-footer
          >
            <template v-slot:item.dateAdded="{ item }">
              {{ formatRelative(new Date(item.dateAdded), Date.now()) }}
            </template>
            <template v-slot:item.dateArchived="{ item }">
              {{ formatRelative(new Date(item.dateArchived), Date.now()) }}
            </template>
          </v-data-table>

          Are you sure you want to unarchive
          <span class="font-weight-bold error--text">{{
            selectedCategory.name
          }}</span>
          ? This action will also unarchive all skills under this category,
          making them available for users.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog()">
            Close
          </v-btn>
          <v-btn color="error" @click="doUnarchiveCategory()">
            Unarchive
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatRelative } from 'date-fns';
import EditCategoryDialog from '../components/EditCategoryDialog';

export default {
  components: {
    EditCategoryDialog
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Archived', value: 'dateArchived' },
        {
          text: 'Actions',
          value: 'action',
          sortable: false,
          align: 'center'
        }
      ],
      unarchiveDialog: false,
      selectedCategory: {},
      formatRelative
    };
  },
  methods: {
    ...mapActions(['unarchiveCategory', 'toggleSnackbar']),
    showUnarchiveDialog(item) {
      this.selectedCategory = item;
      this.unarchiveDialog = true;
    },
    doUnarchiveCategory() {
      this.unarchiveCategory(this.selectedCategory._id).then(res => {
        this.toggleSnackbar({
          show: true,
          color: 'success',
          text: res.message
        });

        this.$emit('unarchive', this.selectedCategory);
        this.closeDialog();
      });
    },
    closeDialog() {
      this.unarchiveDialog = !this.unarchiveDialog;
    },
    updateArchivedCategory(i) {
      this.categories.forEach(e => {
        if (e._id === i.categoryId) {
          e.name = i.name;
        }
      });
    },
    openCategoryProfile(categoryId) {
      this.$router.push({
        name: 'category',
        params: { id: categoryId }
      });
    }
  }
};
</script>

<style></style>
