import { parse, compileScript } from '@vue/compiler-sfc'
import MagicString from 'magic-string'

export function supportScriptName(code, id) {
  let s
  const str = () => s || (s = new MagicString(code))
  const { descriptor } = parse(code)
  if (!descriptor.script && descriptor.scriptSetup) {
    const result = compileScript(descriptor, { id })
    const lang = result.attrs.lang
    const origin = ['lang', 'setup', 'name']
    let custom = []
    for (var [key,value] of Object.entries(result.attrs)) {
      if (!origin.includes(key)) {
        custom.push([key, value])
      }
    }
    const dealStr = (arr) => {
      let str = ''
      arr.forEach(item => {
        str += `${item[0]}: '${item[1]}',`
      })
      return str
    }
    if (custom.length) {
      str().appendLeft(
        0,
        `<script ${lang ? `lang="${lang}"` : ''}>
        import { defineComponent } from 'vue'
        export default defineComponent({
        ${dealStr(custom)}
        })
        </script>\n`,
      )
    }

    return {
      map: str().generateMap(),
      code: str().toString(),
    }
  } else {
    return null
  }
}


export default () => {
  return {
    name: 'vite:setup-custom-name-support',
    enforce: 'pre',
    async transform(code, id) {
      if (!/\.vue$/.test(id)) {
        return null
      }
      
      return supportScriptName.call(this, code, id)
    }
  }
}
