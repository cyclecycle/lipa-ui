<template>
  <div id="app">
    <header class="hero is-light">
      <div class="hero-head">
        <nav class="nav has-shadow">
          <div class="nav-left">
            <p class="nav-item pl">LIPA</p>
          </div>
          <div class="nav-right">
            <b-tooltip
              label="Import documents"
              position="is-left"
            >
              <a class="nav-item is-tab">
                <b-icon
                  icon="file-upload"
                >
                </b-icon>
              </a>
            </b-tooltip>
            <b-tooltip
              label="Clear and reload pattern matches"
              position="is-left"
            >
              <a class="nav-item is-tab" @click="refreshMatches()">
                <b-icon
                  icon="reload"
                >
                </b-icon>
              </a>
            </b-tooltip>
            <b-tooltip
              label="Export data"
              position="is-left"
            >
              <a class="nav-item is-tab">
                <b-icon
                  icon="file-download"
                >
                </b-icon>
              </a>
            </b-tooltip>
            <b-tooltip
              label="User guide"
              position="is-left"
            >
              <a class="nav-item is-tab">
                <b-icon
                  icon="book-open-variant"
                >
                </b-icon>
              </a>
            </b-tooltip>
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
                  <div class="columns">
                    <div class="column is-one-quarter">
                      <b-icon
                        :icon="link.icon"
                      ></b-icon>
                    </div>
                    <div class="column">
                      {{ link.name }}
                    </div>
                  </div>
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
          path: '/patterns',
          name: 'Patterns',
          icon: 'lock-pattern',
        },
        {
          path: '/matches',
          name: 'Matches',
          icon: 'group',
        },
        {
          path: '/documents',
          name: 'Documents',
          icon: 'file-document-box-multiple-outline',
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
      this.$notification.open('Refreshing pattern matches')
      // patternAPI.socket.on('message', function (message) {
        // toast.open({
        //   message: message,
        //   type: 'is-dark',
        // })
      // })
      patternAPI.socket.on('error', function (message) {
        toast.open({
          message: message,
          type: 'is-warning',
        })
      })
      patternAPI.socket.on('refresh_pattern_matches_success', function (message) {
        toast.open({
          message: 'Refresh pattern matches done',
          type: 'is-dark',
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
.pl {
  padding-left: 20px;
}

.row-action {
  cursor: pointer;
}
</style>