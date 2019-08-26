<template>
  <div>
    <h1>vuex 测试</h1>
    Clicked: {{ getCount }} times
    <button @click="increment">+</button>
    <button @click="decrement">-</button>


 <h4>垂直标题：</h4>
  <div style="width:600px;overflow: auto;border-collapse:collapse">
    <table border="1" >
      <tr class="dd">
        <th>日期</th>
        <td>2017-1234-5678</td>
        <td>2017-1234-5678</td>
      </tr>
      <tr>
        <th>爱好</th>
        <td>看书是粉色我发违反啊挖肺案发粉色如果发生v</td>
        <td>看书是粉色我发违反啊挖肺案发粉色如果发生v</td>
      </tr>
      <tr>
        <th>天气</th>
        <td>晴朗</td>
        <td>晴朗</td>
      </tr>
    </table>
  </div>
  



  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount'
      // ...
    ])
    },
    methods: {
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
      'decrement'
    ])
      //...mapActions({
      //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
      //})
    }
  }

</script>