<template>
  <div>
    <ki-drag>
      <div class="drag-a">
        点击拖下我试试 A
      </div>
    </ki-drag>

    <ki-drag>
      <div class="drag-b">
        点击拖下我试试 B
      </div>
    </ki-drag>

    <ki-drag>
      <div class="drag-c">
        点击拖下我试试 C
      </div>
    </ki-drag>
  </div>
</template>

<script>
import { Drag } from 'kidar-vue'
export default {
  components: {
    KiDrag: Drag
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  *[class^="drag"] {
    padding: 12px;
    box-sizing: border-box;
    border-radius: 6px;
    &:hover {
      box-shadow: 0 2px 15px 0 #666;
    }
  }
  .drag-c {
    background-color: lightskyblue;
    width: 100%;
    height: 100%;
    font-size: 14px;
  }
  .drag-b {
    background-color: aquamarine;
    width: 180px;
    height: 180px;
    font-size: 18px;
  }
  .drag-a {
    background-color: lightsalmon;
    width: 380px;
    height: 380px;
    font-size: 24px;
  }
</style>
