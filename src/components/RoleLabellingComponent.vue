<template>
  <div class="role-labelling-component">
    <div class="sentence">
      <span
        v-for="token in tokens"
        v-bind:key="token.id"
        class="token"
        v-on:click="addOrRemoveTokenFromActiveSlot(token.id)"
      >{{ token.text }}</span>
    </div>
    <br>
    <div class="slots">
      <div
        v-for="slot in slots"
        class="slot"
      >
        <div
          v-bind:class="tokenHolderClasses(slot)"
          v-on:click="activateSlot(slot.id)"
        >
          <span v-for="token in slotTokens(slot.id)">{{ token.text }} </span>
        </div>
        <div class="slot-label">
          <ui-textbox label="Slot label" v-model="slot.label"></ui-textbox>
        </div>
        <div
          class="remove-slot-button"
          v-on:click="removeSlot(slot.id)"
        >
          <ui-fab color="primary" icon="remove" size="normal"></ui-fab>
      </div>
      </div>
      <div
        class="add-slot-button"
        v-on:click="addSlot()"
      >
        <ui-fab color="primary" icon="add" size="normal"></ui-fab>
      </div>
    </div>
  </div>
</template>

<script>

const defaultSlot = {
    id: 1,
    label: '',
    tokenIds: [],
}

export default {
  name: 'RoleLabellingComponent',
  components: {
  },
  props: {
    tokens: Array
  },
  data() {
    return {
      slots: [{...defaultSlot}],
      activeSlotId: 1,
    }
  },
  methods: {
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
      const newSlot = {
        ...defaultSlot,
        id: this.newSlotId(),
      }
      this.slots.push(newSlot)
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
    addOrRemoveTokenFromActiveSlot: function(tokenId) {
      const newSlots = this.slots.map(slot => {
        if (slot.id === this.activeSlotId) {
          if (!slot.tokenIds.includes(tokenId)) {
            slot.tokenIds.push(tokenId)
          } else {
            slot.tokenIds = slot.tokenIds.filter(idAlready => idAlready != tokenId)
          }
        }
        return slot
      })
      this.slots = newSlots
    },
    slotById: function(slotId) {
      const filtered = this.slots.filter(slot => slot.id === slotId)
      const slot = filtered[0]
      return slot
    },
    slotTokens: function(slotId) {
      const slot = this.slotById(slotId)
      const tokens = this.tokens.filter(token => {
        return slot.tokenIds.includes(token.id)
      })
      return tokens
    },
    tokenHolderClasses: function(slot) {
      const classes = ['slot-token-holder']
      if (slot.id === this.activeSlotId) {
        classes.push('slot-token-holder-active')
      }
      return classes
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.role-labelling-component {
  display: inline-block;
}
.slots {
  /*display: inline-block;*/
}
.slot-token-holder {
  border: 1px solid black;
  display: inline-block;
  height: 80px;
  min-width: 150px;
}
.slot-token-holder-active {
  border: 2px solid blue;
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
