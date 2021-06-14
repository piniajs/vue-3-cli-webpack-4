<template>
  <div id="app">
    <h1>Hello Pinia 🍍!</h1>

    <h2>Logged in as {{ user.name }}</h2>

    <form @submit.prevent="addItemToCart">
      <input type="text" v-model="itemName" />
      <button>Add</button>
    </form>

    <form @submit.prevent="buy">
      <ul>
        <li v-for="item in cart.items" :key="item.name">
          {{ item.name }} ({{ item.amount }})
          <button @click="cart.removeItem(item.name)" type="button">X</button>
        </li>
      </ul>

      <button :disabled="!user.name">Buy</button>
      <button :disabled="!cart.items.length" @click="clearCart" type="button">
        Clear the cart
      </button>
    </form>

    <template v-if="isEmbed">
      <hr />

      <p>
        Open
        <a target="_blank" href="https://j4qzw.csb.app/">the CodeSandbox</a>
        in a different tab and play around with the devtools. You have access to
        all the stores via a global variable
        <code>stores</code>
      </p>
    </template>
    <p v-else>
      Try opening the devtools and playing around with the store. All the stores
      via a global variable
      <code>stores</code>. <br />Find the code at
      <a href="https://codesandbox.io/s/pinia-vue-3-demo-j4qzw"
        >https://codesandbox.io/s/pinia-vue-3-demo-j4qzw</a
      >.
    </p>

    <footer>Using Vue v{{ vueVersion }} and Pinia v{{ piniaVersion }}.</footer>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { useUserStore } from './stores/user'
import { useCartStore } from './stores/cart'
import { version as piniaVersion } from 'pinia/package.json'
import { version as vueVersion } from 'vue/package.json'

export default defineComponent({
  name: 'App',
  setup() {
    const user = useUserStore()
    const cart = useCartStore()

    const itemName = ref('')
    const isEmbed = ref(window !== window.top)

    function addItemToCart() {
      if (!itemName.value) return
      cart.addItem(itemName.value)
      itemName.value = ''
    }

    function clearCart() {
      if (window.confirm('Are you sure you want to clear the cart?')) {
        cart.rawItems = []
      }
    }

    async function buy() {
      const n = await cart.purchaseItems()

      console.log(`Bought ${n} items`)

      cart.rawItems = []
    }

    window.stores = { user, cart, addItemToCart }

    return {
      itemName,
      addItemToCart,
      isEmbed,

      cart,

      user,
      buy,
      clearCart,

      vueVersion,
      piniaVersion,
    }
  },
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 1rem 2rem;
}

footer {
  font-size: 0.75rem;
  text-align: right;
  color: darkgray;
}
</style>
