Component({
  externalClasses: ['input-class'],
  properties: {
    columns: {
      type: Array,
      value: [],
    },
    multiIndex: {
      type: Array,
      value: [],
    },
  },
  lifetimes: {
    attached: function() {
      
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    bindMultiPickerChange: function(e){
      this.setData({
        multiIndex: e.detail.value
      });
      this.triggerEvent('change', {value: e.detail.value});
    },
    bindPickerCancel: function(e){
      this.triggerEvent('cancel');
    },
    bindMultiPickerColumnChange: function(e) {
      const {column, value} = e.detail;
      const columns = this.data.columns;
      const data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex,
      };
      data.multiIndex[column] = value;
      if (column === 0) {
        data.multiArray[1] = columns[1][value];
        data.multiIndex[1] = 0;
      }
      this.setData(data);
    }
  },
  ready: function() {
    const columns = this.data.columns;
    const multiIndex = this.data.multiIndex;
    this.setData({
      multiArray: [columns[0], columns[1][multiIndex[0] || 0]]
    });
  }
});
