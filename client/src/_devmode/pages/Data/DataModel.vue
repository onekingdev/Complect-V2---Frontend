<template lang="pug">
card-container
  template(#controls)
    c-field(label="First name" v-model="form.firstName" fullwidth required)
    c-field(label="Last name" v-model="form.lastName" fullwidth required)
    c-button(title="Reset" type="link" @click="reset()" :disabled="!form.firstName || !form.lastName")
    c-button(v-if="!form._id" title="Create" type="primary" @click="create()" :disabled="!form.firstName || !form.lastName")
    c-button(v-else title="Update" type="primary" @click="update()")
      
  template(#content)
    .data-constructor-documents(v-if="Object.keys(documents).length")
      .user(v-for="user in documents" :title="user._id" :key="user._id")
        .name(@click="select(user._id)") {{user.firstName}} {{user.lastName}}
        icon(name="close" @click="remove(user._id)")
      
  template(#footer)
    .total Total: {{Object.keys(documents).length}}
    c-button(title="CRUD Test" @click="crudTest(100)")
    c-button(title="Generate" @click="generate(10)")
    //- c-button(title="Patch" @click="randomPatch()")
    c-button(v-if="Object.keys(documents).length" title="Delete All" type="danger" @click="remove(), reset()")
</template>


<script>
import { ref, onMounted, onUnmounted } from "vue";
import _clonedeep from "lodash.clonedeep";
import UseData from "~/store/Data.js";
import { randomFirstNames, randomLastNames } from "~/_devmode/generator/components/molecules/randomName.js";
import { randomGenders } from "~/_devmode/generator/components/molecules/randomGenders.js";
export default {
  setup() {
    const devmode = new UseData('_devmode')

    const form = ref({})

    const reset = () => form.value = {};
    const create = () => { devmode.createDocuments([form.value]), reset() };
    const update = () => { devmode.updateDocument(form.value._id, form.value), reset() };
    const select = _id => {
      let original = devmode.getDocuments().value.find(document => document._id === _id);
      let copy = _clonedeep( original );
      form.value = copy
    };
    const remove = _id => devmode.deleteDocuments(_id);
    
    
    const generate = async q => {
      let randomUsers = [];
      for ( let i = 0; i < q; i++ ) {
        let gender = randomGenders({ q: 1 })[0];
        let firstName = randomFirstNames({q:1, gender})[0]
        let lastName = randomLastNames({q:1})[0]
        randomUsers.push({firstName, lastName});
      }
      return await devmode.createDocuments(randomUsers);
    }

    // CRUD Test. Generate n-records, save them, update and delete
    const crudTest = async q => {
      try {
        await generate(q);
        await devmode.updateDocument(devmode.getDocuments().value[0]._id, {firstName: "John"});
        await devmode.updateDocument(devmode.getDocuments().value[1]._id, {lastName: "Smith"});
        await devmode.deleteDocuments(devmode.getDocuments().value[2]._id);
        await devmode.updateDocument(devmode.getDocuments().value[3]._id, {lastName: "Alice"});
        await devmode.deleteDocuments(devmode.getDocuments().value[4]._id);
        await devmode.deleteDocuments(devmode.getDocuments().value[5]._id);
        await devmode.deleteDocuments();
      } catch(error) {
        console.error(error)
      }
    }

    const randomPatch = () => {
      let gender = randomGenders({ q: 1 })[0];
      devmode.updateDocument(devmode.getDocuments().value[0]._id, {firstName: randomFirstNames({q:1, gender})[0]});
    }

    onMounted(() => devmode.readDocuments())
    onUnmounted(() => devmode.clearStore())
    
    return { form, documents : devmode.getDocuments(), reset, create, update, select, remove, generate, crudTest, randomPatch }
  }
};
</script>


<style lang="stylus" scoped>
.card-container
  :deep(.card-header)
    align-items: flex-end
    .c-field + .c-field
      margin-left: 1em

.data-constructor-documents
  font-size: 0.8em
  max-height: 25em
  overflow: scroll
  user-select: none
  .user
    display: flex
    align-items: center
    width: 100%
    cursor: pointer
    transition: background 0.2s
    padding: 0.2em 1em
    + .document
      border-top: 1px solid #eee
    .name
      flex: 1 0 auto
      padding: 0.5em 0
    svg.icon
      flex-shrink: 0
      width: 0.8em
      height: 0.8em
      fill: #999
      transition: fill 0.2s
      cursor: pointer
      &:hover
        fill: #000
    &:hover
      background: var(--c-bg-light-active)

:deep(.card-footer)
  .total
    margin-right: auto
</style>
