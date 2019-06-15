<template>
  <div id="app">
    <header class="hero is-light">
      <div class="hero-head">
        <nav class="nav has-shadow">
          <div class="nav-left">
              <!-- <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo"> -->
            <p class="nav-item">LIPA</p>
            <!-- <a class="nav-item is-tab is-active">Projects</a> -->
          </div>
          <div class="nav-right">
            <div class="nav-item">
              <b-dropdown aria-role="list" position="is-bottom-left">
                <button class="button is-primary" slot="trigger">
                    <span>Actions</span>
                    <b-icon icon="menu-down"></b-icon>
                </button>

                <b-dropdown-item aria-role="listitem">
                  Import documents
                </b-dropdown-item>
                <b-dropdown-item aria-role="listitem" @click="refreshMatches">
                  Refresh matches
                </b-dropdown-item>
                <b-dropdown-item aria-role="listitem">
                  Read the docs
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <div class="section">
      <div class="columns">
        <aside class="column is-2">
          <nav class="menu">
            <p class="menu-label">
              Views
            </p>
            <ul class="menu-list">
              <li v-for="link in viewLinks">
                <router-link
                  :class="linkClasses(link.path)"
                  :to="link.path"
                >
                  {{ link.name }}
                </router-link>
                <ul v-if="link.sublinks">
                  <li v-for="sublink in link.sublinks">
                    <router-link
                      :class="linkClasses(sublink.path)"
                      :to="sublink.path"
                    >
                    {{ sublink.name }}
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>
        <main class="column">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import patternAPI from './pattern_api'

export default {
  data () {
    return {
      viewLinks: [
        {
          path: '/',
          name: 'Overview'
        },
        {
          path: '/patterns',
          name: 'Patterns'
        },
        {
          path: '/matches',
          name: 'Matches'
        },
        {
          path: '/documents',
          name: 'Documents',
          // sublinks: [{
          //   path: '/sentences',
          //   name: 'Sentences',
          // }],
        },
      ],
    }
  },
  methods: {
    linkClasses(linkPath) {
      const classes = ['nav-item']
      const currentPath = this.$route.path
      if (currentPath === linkPath) {
        classes.push('is-active')
      }
      return classes
    },
    refreshMatches() {
      const toast = this.$toast
      patternAPI.socket.emit('refresh_pattern_matches')
      patternAPI.socket.on('message', function (message) {
        toast.open({
          message: message,
          type: 'is-dark',
        })
      })
      patternAPI.socket.on('error', function (message) {
        toast.open({
          message: message,
          type: 'is-warning',
        })
      })
    }
  }
}
</script>

<style lang="scss">
.menu-list a.is-active {
    background-color: #00d1b2;
    color: #fff;
}
</style>