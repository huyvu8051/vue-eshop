<template>
  <v-layout>
    <v-flex xs2>
      <panel title="option">
        <v-card
          class="mx-auto"
          tile
        >
          <v-list dense>
            <v-subheader>REPORTS</v-subheader>
            <v-list-item-group
              v-model="selectedItem"
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </panel>

      <ul class="nav">
        <li>
          <router-link to="/admin/category"> Category </router-link>
        </li>
        <li>
          <router-link to="/admin/supplier"> Supplier </router-link>
        </li>
        <li>
          <router-link to="/admin/product"> Product </router-link>
        </li>
        <li>
          <router-link to="/admin/shop"> Shop </router-link>
        </li>
      </ul>
    </v-flex>
    <v-flex xs10>
      <router-view />
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '../../Panel.vue'
export default {
  components: { Panel },
  name: 'admin',
  data () {
    return {
      selectedItem: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' }
      ]
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
