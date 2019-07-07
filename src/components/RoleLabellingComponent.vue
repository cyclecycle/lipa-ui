<template>
  <div class="role-labelling-component">
    <div>
      <AnnotatedText
        ref="annotatedText"
        :text="sentence"
        :annotations="tokens"
        :spanEvents="spanEvents"
        :getSpanClasses="getSpanClasses"
      />
    </div>
    <br>

    <div class="tile is-ancestor box" style="flex-wrap: wrap;">
      <div
        v-for="slot in slots"
        class="slot tile is-parent is-vertical is-3"
      >
        <div
          :class="tokenHolderClasses(slot)"
          @click="activateSlot(slot.id)"
        >
          <span v-for="token in slot.tokens">{{ token.text }} </span>
        </div>

        <div class="slot-label tile is-child">
          <b-input v-model="slot.label" placeholder="Slot label"></b-input>
        </div>
        <div class="container tile is-child">
          <div
            class="remove-slot-button"
            v-on:click="removeSlot(slot.id)"
          >
            <b-button
              icon-right="minus"
              type="is-warning"
              size="is-small"
            ></b-button>
          </div>
        </div>
      </div>

      <div class="level">
        <div
          class="add-slot-button"
          v-on:click="addSlot()"
        >
          <b-button
            icon-right="plus"
            type="is-primary"
            style="margin-left: 12px"
          ></b-button>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import AnnotatedText from 'vue-annotated-text'
import util from '../util'

export default {
  name: 'RoleLabellingComponent',
  components: {
  },
  props: {
    tokens: Array,
    sentence: String,
  },
  data() {
    return {
      slots: [this.defaultSlot()],
      activeSlotId: 1,
      spanEvents: {
        'click': this.handleTokenSpanClicked
      },
    }
  },
  methods: {
    defaultSlot: function() {
      const slot = {
        id: 1,
        label: 'slot1',
        tokens: [],
      }
      return slot
    },
    newSlotId: function() {
      let newSlotId
      if (this.slots.length === 0) {
        newSlotId = 1
      } else {
        const slotIds = this.slots.map(slot => slot.id)
        const greatestId = Math.max(...slotIds)
        newSlotId = greatestId + 1
      }
      return newSlotId
    },
    addSlot: function() {
      const newSlotId = this.newSlotId()
      const newSlotLabel = `slot${newSlotId}`
      const newSlot = {
        ...this.defaultSlot(),
        id: newSlotId,
        label: newSlotLabel,
      }
      this.slots.push(newSlot)
      this.activateSlot(newSlotId)
    },
    removeSlot: function(slotId) {
      const newSlots = this.slots.filter(slot => {
        return slot.id !== slotId
      })
      this.slots = newSlots
    },
    activateSlot: function(slotId) {
      this.activeSlotId = slotId
    },
    handleTokenSpanClicked: function(e, annotations) {
      let tokenId = annotations[0].id
      tokenId = Number(tokenId)
      const token = util.objById(this.tokens, tokenId)
      this.addOrRemoveTokenFromActiveSlot(token)
    },
    addOrRemoveTokenFromActiveSlot: function(token) {
      const newSlots = this.slots.map(slot => {
        if (slot.id === this.activeSlotId) {
          if (!slot.tokens.includes(token)) {
            slot.tokens.push(token)
          } else {
            slot.tokens = slot.tokens.filter(tokenAlready => {
              return tokenAlready.id != token.id
            })
          }
        }
        return slot
      })
      this.slots = newSlots
    },
    tokenHolderClasses: function(slot) {
      const classes = ['slot-token-holder', 'is-child']
      if (slot.id === this.activeSlotId) {
        classes.push('slot-token-holder-active')
      }
      return classes
    },
    getAnnotationColor: function (annotation) {
      return '#42b3f4'
    },
    getSpanClasses: function(span) {
      if (span.annotationIds.length > 0) {
        return ['token']
      } else {
        return []
      }
    }
  }
};
</script>

<style>
.slot-token-holder {
  box-shadow:inset 0px 0px 0px 1px #000;
  min-height: 50px;
  padding: 10px;
  margin-bottom: 26px;
}
.slot-token-holder-active {
  box-shadow:inset 0px 0px 0px 2px #000;
}
.add-slot-button {
}
.remove-slot-button {
}
.token:hover {
  outline: 1px solid black;
  background-color: #FCE4EC !important;
}
</style>
