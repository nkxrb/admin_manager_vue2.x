<template>
  <div>
    <div>表单组件</div>

    <nk-form :fields="fields" :visible.sync="visible"></nk-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { Dialog, Input, Upload, Select, Switch, Option, Radio, Form, FormItem, Button, Col, InputNumber, Cascader, DatePicker, TimePicker } from 'element-ui'
import { NkForm } from 'nkxrb-vue'
Vue.use(Dialog).use(Input).use(Upload).use(Select).use(Switch).use(Option).use(Radio).use(Form).use(FormItem).use(Button).use(Col).use(InputNumber).use(Cascader).use(DatePicker).use(TimePicker)
export default {
  components: {
    NkForm
  },
  data () {
    return {
      visible: true,
      fields: [
        { prop: 'switch', label: '开关', type: 'switch' },
        { prop: 'password', label: '密码', type: 'password' },
        { prop: 'inputNumber', label: '数字输入', type: 'inputNumber' },
        { prop: 'password', label: '密码', type: 'password' },
        { prop: 'name', label: '普通输入框+校验', type: 'input', rules: ['required', 'email', 'telephone'] },
        {
          prop: 'radio',
          label: '单选框',
          type: 'radio',
          options: [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 }
          ]
        },
        {
          prop: 'select',
          label: '普通下拉选',
          type: 'select',
          options: [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 }
          ]
        },
        {
          prop: 'seltree',
          label: '多层级下拉选',
          type: 'seltree',
          options: [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 }
          ]
        },
        { prop: 'address', label: '输入地址(地图会自动响应并返回经纬度)', type: 'input', span: 24 },
        { prop: 'latitude', label: '纬度(禁止编辑，数据由下面的地图中获取)', type: 'input', disabled: true },
        { prop: 'longitude', label: '经度(禁止编辑，数据由下面的地图中获取)', type: 'input', disabled: true },
        { prop: 'map', label: '地图', span: 24, type: 'map', lat: 'latitude', lng: 'longitude', address: 'address' },
        {
          prop: 'date',
          label: '日期',
          type: 'date',
          span: 12,
          rules: [
            'required',
            function (rule, value, callback) { /** 自定义校验规则**/ }
          ]
        },
        { prop: 'time', label: '时间（可指定范围）', range: '00:00:00 - 23:59:59', type: 'time', span: 12 },
        { prop: 'image', label: '上传图片', type: 'image', span: 12, limit: 1, httpRequest: function () { /** 自定义上传图片请求 */ }, maxsize: 500 },
        { prop: 'editor', label: '富文本编辑器', type: 'editor', span: 24 }
      ]
    }
  }
}
</script>
