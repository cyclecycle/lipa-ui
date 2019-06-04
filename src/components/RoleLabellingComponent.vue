<template>
  <div class="role-labelling-component">
    <div class="sentence">
      <AnnotatedText
        ref="annotatedText"
        :text="sentence"
        :annotations="tokens"
        :spanEvents="spanEvents"
        :getSpanClasses="getSpanClasses"
      />
    </div>
    <br>
    <div class="slots">
      <div
        v-for="slot in slots"
        class="slot"
      >
        <div
          :class="tokenHolderClasses(slot)"
          v-on:click="activateSlot(slot.id)"
        >
          <span v-for="token in slot.tokens">{{ token.text }} </span>
        </div>
        <div class="slot-label">
          <b-field label="Slot label">
            <b-input v-model="slot.label"></b-input>
          </b-field>
        </div>
        <div
          class="remove-slot-button"
          v-on:click="removeSlot(slot.id)"
        >
          <b-button icon-right="remove">-</b-button>
      </div>
      </div>
      <div
        class="add-slot-button"
        v-on:click="addSlot()"
      >
        <b-button icon-right="add">+</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import AnnotatedText from 'vue-annotated-text'
import util from '../util/util'

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
      const classes = ['slot-token-holder']
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.role-labelling-component {
  display: inline-block;
}
.slots {
  /*display: inline-block;*/
}
.slot-token-holder {
  border: 1px solid black;
  display: inline-block;
  min-height: 30px;
  min-width: 150px;
}
.slot-token-holder-active {
  border: 2px solid;
}
.add-slot-button {
  display: inline-block;
}
.remove-slot-button {
  display: inline-block;
}
.token:hover {
  outline: 1px solid black;
}
</style>
