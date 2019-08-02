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
    <br />

    <div class="tile is-ancestor box" style="flex-wrap: wrap;">
      <div v-for="slot in slots" class="slot tile is-parent is-vertical is-3">
        <div :class="tokenHolderClasses(slot)" @click="activateSlot(slot.id)">
          <span v-for="token in slot.tokens">{{ token.text }} </span>
        </div>

        <div class="slot-label tile is-child">
          <b-input v-model="slot.label" placeholder="Slot label"></b-input>
        </div>
        <div class="container tile is-child">
          <div class="remove-slot-button" v-on:click="removeSlot(slot.id)">
            <b-button
              icon-right="minus"
              type="is-warning"
              size="is-small"
            ></b-button>
          </div>
        </div>
      </div>

      <div class="level">
        <div class="add-slot-button" v-on:click="addSlot()">
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
import AnnotatedText from 'vue-annotated-text';
import util from '../util';

export default {
  name: 'RoleLabellingComponent',
  components: {},
  props: {
    tokens: Array,
    sentence: String,
    slotLabels: {
      type: Array,
      default: () => {
        return null;
      },
    },
  },
  data() {
    return {
      slots: [this.defaultSlot()],
      activeSlotId: 1,
      spanEvents: {
        click: this.handleTokenSpanClicked,
      },
    };
  },
  watch: {
    slotLabels() {
      if (this.slotLabels) {
        this.slots = [];
        this.slotLabels.forEach(slotLabel => {
          this.addSlot(slotLabel);
        });
      }
      this.activateSlot(1);
    },
  },
  methods: {
    defaultSlot() {
      const slot = {
        id: 1,
        label: 'slot1',
        tokens: [],
      };
      return slot;
    },
    newSlotId() {
      let newSlotId;
      if (this.slots.length === 0) {
        newSlotId = 1;
      } else {
        const slotIds = this.slots.map(slot => slot.id);
        const greatestId = Math.max(...slotIds);
        newSlotId = greatestId + 1;
      }
      return newSlotId;
    },
    addSlot(newSlotLabel) {
      const newSlotId = this.newSlotId();
      newSlotLabel =
        newSlotLabel !== undefined ? newSlotLabel : `slot${newSlotId}`;
      const newSlot = {
        ...this.defaultSlot(),
        id: newSlotId,
        label: newSlotLabel,
      };
      this.slots.push(newSlot);
      this.activateSlot(newSlotId);
    },
    removeSlot(slotId) {
      const newSlots = this.slots.filter(slot => {
        return slot.id !== slotId;
      });
      this.slots = newSlots;
    },
    activateSlot(slotId) {
      this.activeSlotId = slotId;
    },
    handleTokenSpanClicked(e, annotations) {
      let tokenId = annotations[0].id;
      tokenId = Number(tokenId);
      const token = util.objById(this.tokens, tokenId);
      this.addOrRemoveTokenFromActiveSlot(token);
    },
    addOrRemoveTokenFromActiveSlot(token) {
      const newSlots = this.slots.map(slot => {
        if (slot.id === this.activeSlotId) {
          if (!slot.tokens.includes(token)) {
            slot.tokens.push(token);
          } else {
            slot.tokens = slot.tokens.filter(tokenAlready => {
              return tokenAlready.id != token.id;
            });
          }
        }
        return slot;
      });
      this.slots = newSlots;
    },
    tokenHolderClasses(slot) {
      const classes = ['slot-token-holder', 'is-child'];
      if (slot.id === this.activeSlotId) {
        classes.push('slot-token-holder-active');
      }
      return classes;
    },
    getAnnotationColor(annotation) {
      return '#42b3f4';
    },
    getSpanClasses(span) {
      if (span.annotationIds.length > 0) {
        return ['token'];
      } else {
        return [];
      }
    },
  },
};
</script>

<style>
.slot-token-holder {
  box-shadow: inset 0px 0px 0px 1px #000;
  min-height: 50px;
  padding: 10px;
  margin-bottom: 26px;
}
.slot-token-holder-active {
  box-shadow: inset 0px 0px 0px 2px #000;
}
.add-slot-button {
}
.remove-slot-button {
}
.token:hover {
  outline: 1px solid black;
  background-color: #fce4ec !important;
}
</style>
