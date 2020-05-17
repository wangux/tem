<template>
	<div class="wrapper">
		<el-row>
			<el-tag
				v-for="tag in tags"
				:key="tag.name"
				@click="clickTag(tag.name)"
			>
				<i :class="tag.icon"></i>
				{{tag.name}}
			</el-tag>
		</el-row>
		<el-row>
			<el-card class="box-card">
				<div class="title">事件统计</div>
				<el-breadcrumb separator="">
					<el-breadcrumb-item >事件数目：</el-breadcrumb-item>
					<el-breadcrumb-item >事件数目：</el-breadcrumb-item>
					<el-breadcrumb-item >事件数目：</el-breadcrumb-item>
					<el-breadcrumb-item >事件数目：</el-breadcrumb-item>
					<el-breadcrumb-item >事件数目：</el-breadcrumb-item>
					<el-breadcrumb-item >事件数目：</el-breadcrumb-item>
					<el-breadcrumb-item >事件数目：</el-breadcrumb-item>
					<el-breadcrumb-item >事件数目：</el-breadcrumb-item>
					<el-breadcrumb-item >事件数目：</el-breadcrumb-item>
					<el-breadcrumb-item >事件数目：</el-breadcrumb-item>
				</el-breadcrumb>
			</el-card>
		</el-row>
		<el-form>
			<el-form-item label="事件类型：">
        <el-select v-model="value" size='small' clearable placeholder="请选择" style="width:300px">
			<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
        </el-select>
			</el-form-item>
		</el-form>
		<el-row>
			<div class="title">最新事件列表</div>
			<el-table
				:data="tableData"
				style="width: 100%"
				:border="true"
			>
				<el-table-column
					prop="date"
					label="时间"
					width="180">
				</el-table-column>
				<el-table-column
					prop="name"
					label="区域"
					width="180">
				</el-table-column>
				<el-table-column
					prop="name"
					label="报警描述"
					width="180">
				</el-table-column>
				<el-table-column
					prop="name"
					label="报警确认人"
					width="180">
				</el-table-column>
				<el-table-column
					prop="address"
					label="报警确认事件">
				</el-table-column>
			</el-table>
		</el-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue , Watch } from 'vue-property-decorator'

interface Node{
	id: string|null|number,
	label: string|null|number,
	[propname:string]: any
}

@Component({
		name: 'newEventData',
		components: {
		}
})
export default class extends Vue {
	private tags: any = [
		{ name: '查询', icon: 'el-icon-search' },
		{ name: '报警确认', icon: 'el-icon-message-solid' },
		{ name: '全部确认', icon: 'el-icon-finished' },
		{ name: '报警清除', icon: 'el-icon-bell' },
		{ name: '打印', icon: 'el-icon-printer' },
		{ name: '导出', icon: 'el-icon-s-order' },
		{ name: '退出', icon: 'el-icon-close' },
	];
	private  options: any = [
		{
			value: '选项1',
			label: '黄金糕'
		}, {
			value: '选项2',
			label: '双皮奶'
		},
	];
	private tableData: any = [
			{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1517 弄'
			},
	];
	private value: any = null;
	private clickTag(name:string){
		console.log(name);
	}
}
</script>


<style lang="scss" scoped>
	.wrapper{
		width: 100%;
		// overflow-x: scroll;
		padding: 0 20px 20px;
	}
	.title{
		font-size: 16px;
		color: #333;
		margin-bottom: 10px;

	}
</style>