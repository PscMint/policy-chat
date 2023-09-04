<script setup lang='ts'>
import {NScrollbar, NDataTable, NButton, NInput, NIcon, useMessage, useDialog} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { usePromptStore } from '@/store'
import { t } from '@/locales'
import { h, ref, reactive } from 'vue'
import { getOpts, addNewPrompt, deletePrompts} from '@/api/chat'
const store = usePromptStore()
const dialog = useDialog()
let data = ref<RowData[]>(store.getPromptList().promptList)
type RowData = {
  key: string
  value: string
}
const columns:DataTableColumns<RowData> = [
  {
    type: 'selection',
    fixed: 'left'
  },
  {
    title: '提示词-Prompt',
    key: 'value',
    render (row, index) {
      return h('span', [ data.value[index].value])
    }
  },
]
const newPrompt = ref<string>("")
const queryKw = ref<string>("")
const ms =useMessage()
let checkedRows = ref<string[]>([])
const freshPrompt = async ()=>{
    const res = await getOpts()
    const promptLst = res.data.politicOpts.map((item:string)=>{
        return{
            key:item,
            value:item
        }
    })
    store.updatePromptList(promptLst)
		data.value = store.getPromptList().promptList
}
const handleAddNewPrompt = async ()=>{
		const res = await addNewPrompt({prompt:newPrompt.value})
		if(res.data.code==200){
				ms.success(res.data.message)
        //更新一次关键词store
        await freshPrompt()
		}else if(res.data.code==500){
        ms.warning(res.data.message)
		}

}
const handleQuery = ()=>{
		data.value = store.getPromptList().promptList.filter((item: { key: string })=>item.key.includes(queryKw.value))
}
const handleReset = ()=>{
    queryKw.value=''
    data.value = store.getPromptList().promptList
}
const handleCheck = (param:any)=>{
    checkedRows.value = param
}
const handleDetele = async ()=>{
    dialog.warning({
      // title: t('prompt.t'),
      // content: t('prompt.deletePromptComfirm'),
      // positiveText: t('common.yes'),
      // negativeText: t('common.no'),
      title: '标题',
      content: '确认删除选中提示词？',
      positiveText:'是',
      negativeText: '否',
      onPositiveClick: async () => {
        if(checkedRows.value.length===0){
          ms.warning('还未选中任何提示词')
          return
        }
        let res = await deletePrompts(checkedRows.value)
        if(res.data.code==200){
          ms.success(res.data.message)
        }
        await freshPrompt()
      }
    })

}
</script>
<template>
  <div class="flex mt-2 mb-2 justify-between">
		<n-button type="primary" @click="handleAddNewPrompt">
			<NIcon size="20">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M400 256H112"></path></svg>
			</NIcon>
		</n-button>
    <n-input :style="{ width: '75%' }" placeholder="输入新增提示词" v-model:value="newPrompt"/>
  </div>

  <div class="flex justify-between mb-2">
		<NButton  type="primary" @click="handleQuery" >
			<NIcon size="20" >
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 2a1.5 1.5 0 0 0-1.415 1H5.5A1.5 1.5 0 0 0 4 4.5v3.756c.318-.112.653-.19 1-.229V4.5a.5.5 0 0 1 .5-.5h1.585A1.5 1.5 0 0 0 8.5 5h3a1.5 1.5 0 0 0 1.415-1H14.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-2.585c.114.323.114.677 0 1H14.5a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 14.5 3h-1.585A1.5 1.5 0 0 0 11.5 2h-3zm3 1a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h3zM8.303 14.596a3.5 3.5 0 1 0-.707.707l2.55 2.55a.5.5 0 0 0 .708-.707l-2.55-2.55zM5.5 15a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5z" fill="currentColor"></path></g></svg>
			</NIcon>
		</NButton>
    <NInput :style="{ width: '60%' }" placeholder="输入搜索关键词" v-model:value="queryKw"/>
    <NButton circle tertiary type="primary" @click="handleReset">
      <NIcon size="20" >
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M5.854 2.646a.5.5 0 0 1 0 .708L4.207 5H11a6 6 0 1 1-6 6a.5.5 0 0 1 1 0a5 5 0 1 0 5-5H4.207l1.647 1.646a.5.5 0 1 1-.708.708l-2.5-2.5a.5.5 0 0 1 0-.708l2.5-2.5a.5.5 0 0 1 .708 0z" fill="currentColor"></path></g></svg>
			</NIcon>
		</NButton>

  </div>
  <NScrollbar>
    <NDataTable
			size="small"
      :columns="columns"
      :data="data"
      :bordered="true"
      :max-height="350"
      :scroll-x="500"
      virtual-scroll
      @update:checked-row-keys="handleCheck"
    />
  </NScrollbar>
  <div class="flex justify-end mt-2">
  <n-button  type="warning" @click="handleDetele">
    删除
  </n-button>
  </div>
</template>
