# vite-plugin-setup-custom-name

Make the vue script setup syntax support the custom name attribute

## Install (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
yarn add vite-plugin-setup-custom-name -D
```

or

```bash
npm i vite-plugin-setup-custom-name -D
```

## Usage

- Config plugin in vite.config.ts. In this way, the required functions can be introduced as needed

```ts
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupCustomName from 'vite-plugin-setup-custom-name'

export default defineConfig({
  plugins: [vue(), vueSetupCustomName()],
})
```

- SFC

```html
<template>
  <div>hello world</div>
</template>

<script lang="ts" setup name="App" componentName="custom-name">

</script>
```

## License

MIT