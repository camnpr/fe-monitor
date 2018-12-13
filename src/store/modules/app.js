//像这种没有路径和文件夹名字的模块，从哪里查找？
//从node_modules文件夹中查找'js-cookie'的文件夹，然后文件夹中查找package.json文件，
//然后从json文件中查找'main'属性值:'src/js.cookie.js'
import Cookies from 'js-cookie';  

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    theme: 'default',
    livenewsChannels: Cookies.get('livenewsChannels') || '[]',
    visitedViews: [],
    adTypeList: [
      { key: "0", name: "默认" },
      { key: "1", name: "元旦" },
      { key: "2", name: "情人节"},
      { key: "3", name: "妇女节"},
      { key: "4", name: "清明节"},
      { key: "5", name: "母亲节"},
      { key: "6", name: "端午节"},
      { key: "7", name: "建党日"},
      { key: "8", name: "七夕节"},
      { key: "9", name: "中秋节"},
      { key: "10", name: "国庆节"},
      { key: "11", name: "感恩节"},
      { key: "12", name: "平安夜"},
    ]
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.includes(view)) return
      state.visitedViews.push(view)
    },
    DEL_VISITED_VIEWS: (state, view) => {
      const index = state.visitedViews.indexOf(view)
      state.visitedViews.splice(index, 1)
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews: ({ commit }, view) => {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews: ({ commit }, view) => {
      commit('DEL_VISITED_VIEWS', view)
    }
  }
};

export default app;
