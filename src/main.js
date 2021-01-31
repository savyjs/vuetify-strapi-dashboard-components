import * as components from "./components/index";
import JsonExcel from "vue-json-excel";
import Helper from './assets/helper'

// const moduleOptions = <%= JSON.stringify(options) %>;
// const mixins = require(`${moduleOptions.scheme}`).default || [];

const ComponentLibrary = {
  install(Vue, options = {}) {
    if (install.installed) return;
    // console.log(2, {options})
    try {
      Vue.component("downloadExcel", JsonExcel);
      Vue.set(Vue.prototype, 'Helper', Helper);
      Vue.set(Vue.prototype, '$Helper', Helper);
      // Vue.set(Vue.prototype, '$Helper', Helper);
      for (const componentName in components.default) {
        let component = components.default[componentName]
        // console.log({component, componentName})
        try {
          Vue.component(componentName, component);
        } catch (e) {
          console.error({componentName, e})
        }
      }
      install.installed = true;
    } catch (e) {
      console.error({e})
    }
  }
}


// Create module definition for Vue.use()
const plugin = {
  install: ComponentLibrary.install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ComponentLibrary)
}

export default ComponentLibrary;
