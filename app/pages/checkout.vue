<script setup lang="ts">
const designer = useDesignerStore()
const checkout = useCheckoutStore()
const isSubmitting = ref(false)

async function submitOrder() {
  // TODO
}
</script>

<template>
  <div>
    <AppHeader title="Checkout">
      <NuxtLink
        to="/"
      >
        Back
      </NuxtLink>
    </AppHeader>

    <main class="flex-1 p-4 md:p-8">
      <div class="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        <div class="lg:w-1/3">
          <div>
            <TShirt />
          </div>
          <div>
            <p>Motive: {{ designer.selectedMotive?.name }}</p>
            <p>Shirt: {{ designer.selectedColor?.name }}</p>
          </div>
        </div>
        <div class="lg:w-1/3">
          <h2 class="text-2xl font-light tracking-wide mb-6">
            Order Data
          </h2>

          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="font-semibold">Motive:</span>
              <span class="font-semibold tabular-nums">{{
                formatCurrency(designer.selectedMotive?.price ?? 0)
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Shirt:</span>
              <span class="font-semibold tabular-nums">{{
                formatCurrency(designer.selectedColor?.price ?? 0)
              }}</span>
            </div>
          </div>

          <hr class="my-6">

          <div class="flex justify-between">
            <span class="text-xl font-semibold">Total:</span>
            <span class="text-xl font-semibold tabular-nums">{{
              formatCurrency(designer.totalPrice)
            }}</span>
          </div>
        </div>
        <div class="lg:w-1/3">
          <h2 class="text-2xl font-light tracking-wide mb-6">
            Personal Data
          </h2>

          <p
            v-if="checkout.generalError"
            class="text-red-500 text-sm mb-4"
            aria-live="polite"
          >
            {{ checkout.generalError }}
          </p>

          <form
            class="space-y-4"
            @submit.prevent="submitOrder"
          >
            <div>
              <label
                for="order-name"
                class="block text-sm font-semibold mb-1"
              >Name</label>
              <input
                id="order-name"
                v-model="checkout.name"
                type="text"
                name="name"
                autocomplete="name"
                placeholder="Enter your name..."
                class="w-full border rounded-lg px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors"
                :class="
                  checkout.errors.name
                    ? 'border-red-500'
                    : 'border-gray-300'
                "
              >
              <div
                v-if="checkout.errors.name"
                aria-live="polite"
              >
                <p
                  v-for="err in checkout.errors.name"
                  :key="err"
                  class="text-red-500 text-xs mt-1"
                >
                  {{ err }}
                </p>
              </div>
            </div>

            <div>
              <label
                for="order-address"
                class="block text-sm font-semibold mb-1"
              >Address</label>
              <input
                id="order-address"
                v-model="checkout.address"
                type="text"
                name="address"
                autocomplete="street-address"
                placeholder="Enter your address..."
                class="w-full border rounded-lg px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors"
                :class="
                  checkout.errors.address
                    ? 'border-red-500'
                    : 'border-gray-300'
                "
              >
              <div
                v-if="checkout.errors.address"
                aria-live="polite"
              >
                <p
                  v-for="err in checkout.errors.address"
                  :key="err"
                  class="text-red-500 text-xs mt-1"
                >
                  {{ err }}
                </p>
              </div>
            </div>

            <div class="pt-4 flex justify-end">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="bg-green-400 hover:bg-green-500 text-white font-semibold px-12 py-2 rounded-full transition-colors disabled:opacity-50"
              >
                Buy
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>
