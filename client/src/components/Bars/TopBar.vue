<template lang="pug">
.bar.topbar
  .logo
    icon(name="logo" @click="goToRoute('Dashboard')")
    icon(name="brandname")
  .navigation(v-if="!simpleTopBar")
    .menu
      a(v-for="(tab, index) in tabs" :key="index" :class="{ active: activedTopbar === tab.title }" @click="goToRoute(tab.routeName)") {{ $locale(tab.title) }}
    .buttons
      c-button(title="Find an Expert" type="accent" @click="goToRoute('ExpertList')" v-if="profile.type == 'business'")
      c-button(title="Browse Jobs" type="accent" @click="goToRoute('JobBoard')" v-else)
      c-button.notification-icon(iconL="bell" type="transparent" @click="gotoNotification()" :class="{active: isNewNotification}")
  .user-block(v-if="profile" @click="toggleUserDropDown()" ref="userDropDown" :class="{expanded: userDropDownExpanded}")
    c-avatar(:avatar="profile.avatar" :firstName="profile.first_name" :lastName="profile.last_name" size="small")
    .name {{profile.firstName}} {{profile.lastName}}
    icon(name="chevron-down")
    .dropdown-menu(v-if="userDropDownExpanded")
      router-link(v-if="!simpleTopBar" :to="{name: 'ProfileAbout'}") {{$locale("Profile")}}
      a(@click="signOut()") {{$locale("Sign Out")}}
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import useAuth from "~/core/auth.js";
import useProfile from "~/store/Profile.js";
import cAvatar from "~/components/Misc/cAvatar.vue";

const tabs = [
  {
    "title": "Home",
    "routeName": "Dashboard"
  }, {
    "title": "Documents",
    "routeName": "RecordsOverview"
  }, {
    "title": "Reports",
    "routeName": "ReportOrganizations"
  }
];

export default {
  "components": { cAvatar },
  setup () {
    const route = useRoute();
    const router = useRouter();
    const { signOut } = useAuth();
    const { profile } = useProfile();
    const userDropDown = ref( null );
    const userDropDownExpanded = ref( false );
    const isNewNotification = ref( false );
    let websocket;
    const toggleUserDropDown = () => userDropDownExpanded.value = !userDropDownExpanded.value;
    onClickOutside( userDropDown, () => userDropDownExpanded.value = false );

    const goToRoute = routeName => router.push({ "name": routeName });

    // render topbar style, depend on route meta
    const simpleTopBar = computed(() => {
      if ('topbar' in route.meta && route.meta.topbar === 'simple') return true
      return false
    })

    const activedTopbar = computed(() => {
      if ('tab' in route.meta) return route.meta.tab
      return 'Home'
    })

    const gotoNotification = () => {
      router.push({ "name": "NotificationCenter" });
      isNewNotification.value = false;
    };
    const reportLink = profile.value.type === "specialist" ? "/reports/financials" : "/reports/organizations";

    const connect = () => {
      websocket = new WebSocket( import.meta.env.VITE_WS );
      websocket.onclose = ({ wasClean, code, reason }) => {
        console.error( `onclose:   ${JSON.stringify({ wasClean, code, reason })}` );
      };
      websocket.onerror = error => {
        console.error( error );
      };
      websocket.onmessage = ({ data }) => {
        if ( JSON.parse( data ).type !== "ping" ) isNewNotification.value = true;
      };
      websocket.onopen = () => {
        websocket.send( JSON.stringify({
          "command": "subscribe",
          "identifier": "{\"channel\": \"NotificationChannel\"}"
        }) );
      };
    };

    onMounted( () => connect() );
    onUnmounted( () => websocket.close() );

    return {
      reportLink,
      signOut,
      tabs,
      goToRoute,
      profile,
      userDropDown,
      userDropDownExpanded,
      toggleUserDropDown,
      activedTopbar,
      simpleTopBar,
      gotoNotification,
      isNewNotification
    };
  }
};
</script>

<style lang="stylus" scoped>
.bar.topbar
  width: 100%
  background: var(--c-bg-z2, #fff)
  display: flex
  align-items: center
  height: 5em
  .logo
    margin: 0 1.25em
    svg.icon-logo
      width: 2em
      height: 2em
      cursor: pointer
    svg.icon-brandname
      width: 8em
      height: 1.8em
      margin-left: 0.5em
      fill: #000
      @media (max-width: 575px)
        display: none
  .navigation
    display: flex
    align-items: center
    justify-content: flex-end
    flex: 1 0 auto
    .menu
      flex: 1 0 auto
      font-size: 1em
      padding: 0 2em
      @media (max-width: 800px)
        display: none
      a
        cursor: pointer
        color: var(--c-text)
        + a
          margin-left: 2em
        &.active
          color: #000
          font-weight: bold
    .buttons
      display: flex
      flex: 0 1 auto
      button
        margin-right: 0.5em
      .notification-icon
        position: relative;
        &.active::before
          content: ' ';
          position: absolute
          top: 0.375em
          left: 1.5em
          z-index: 2
          width: 0.5em
          height: 0.5em
          background: var(--c-yellow-500)
          background-clip: padding-box
          border-radius: 50%
  .user-block
    position: relative
    display: flex
    height: 100%
    padding: 1em
    margin-left: auto
    align-items: center
    box-shadow: inset 1px 0 0 0 var(--c-border, #ddd)
    transition: background var(--fx-duration-regular, .25s)
    cursor: pointer
    user-select: none
    &.expanded
      svg.icon-chevron-down
        transform: rotate(180deg)
    .c-avatar
      margin-right: 0.7em
      flex-shrink: 0
    .name
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
    svg.icon-chevron-down
      width: 0.7em
      height: 0.7em
      margin-left: 1em
      fill: var(--c-text)
      transition: transform var(--fx-duration-short, .15s)
    .dropdown-menu
      font-size: 0.9em
      position: absolute
      top: 100%
      left: 0
      width: calc(100% - 0.5em)
      background: var(--c-bg-z2, #fff)
      border: 1px solid var(--c-border, #ddd)
      border-radius: 0 0 var(--v-border-radius) var(--v-border-radius)
      overflow: hidden
      a
        display: block
        color: var(--c-text)
        padding: 0.5em 1em
        box-shadow: none
        transition: background var(--fx-duration-regular, .25s)
        &:hover
          background: var(--c-bg-light-hover, #f3f6f9)
        &.router-link-exact-active
          color: var(--c-link)
          background: var(--c-bg-light-active, #ecf4ff)
</style>
