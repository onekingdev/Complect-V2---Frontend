<template lang="pug">
page-container(:title="ethicsDetails.name" type="document full-width")
  template(#controls)
    c-button(title="Mark as Reviewed" type="primary" @click="reviewEthicsEntry()")
    c-button(type="icon" iconL="close" size="small" @click="closeEthicsEntry()")
  template(#tabs)
    router-link.link-item(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{tab.title}}
  template(#content)
    router-view(v-model:ethicsDetails="ethicsDetails")
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { ethicsData } from "~/data/data.js";
export default {
  setup () {
    const tabs = [
      {
        "title": "Entries",
        "routeName": "EthicsEntry"
      }, {
        "title": "Setting",
        "routeName": "EthicsSetting"
      }
    ];
    const documents = ethicsData;
    const route = useRoute();
    const router = useRouter();
    const ethicsDetails = computed( () => documents.find( document => document._id === route.params.id ) );
    const reviewEthicsEntry = () => {};
    const closeEthicsEntry = () => router.push({
      "name": "EthicsEntries",
      "query": { "type": ethicsDetails.value.type }
    });
    return {
      reviewEthicsEntry,
      closeEthicsEntry,
      tabs,
      ethicsDetails
    };
  }
};
</script>

<style lang="stylus" scoped>
</style>
