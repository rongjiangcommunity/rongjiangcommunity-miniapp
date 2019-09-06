// components/modal/modal.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    modalTitle:{
      type: String,
      value: '',
    },
    modalMsg:{
      type: String,
      value: '',
    },
    modalBtnConfirm:{
      type: String,
      value: '',
    },
    modalBtnCancel:{
      type: String,
      value: '',
    },
    // 修改content部分的样式
    extClass:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancelHandle:function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('cancel', myEventDetail, myEventOption)
    },
    onConfirmHandle:function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('confirm', myEventDetail, myEventOption)
    }
  }
})
