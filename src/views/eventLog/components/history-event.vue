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
				<div class="title">查询条件</div>
        <el-form size='small'>
        <el-row :gutter="10">
			<el-col :span="7">
				<el-checkbox> 
				<el-form-item label="时间：">
					<el-select size='small' v-model="value">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				</el-checkbox>
			</el-col>
			<el-col :span="11">
				<el-form-item label="查询时间">
				<el-date-picker
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
				</el-form-item>    
			</el-col>
			<el-col :span="4">
				<el-checkbox> 
				<el-form-item label="确认人：">
					<el-select size='small' v-model="value">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				</el-checkbox>
			</el-col>                  
        </el-row>
        <el-row :gutter="10">
			<el-col :span="8">
				<el-checkbox> 
					<el-form-item label="时间：">
						<el-select size='small' v-model="value">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</el-checkbox>
			</el-col>
			<el-col :span="8">
				<el-checkbox> 
					<el-form-item label="设备：">
						<el-select size='small' v-model="value">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</el-checkbox>
			</el-col>
			
			<el-col :span="8">
				<el-checkbox> 
				<el-form-item label="确认人：">
					<el-select size='small' v-model="value">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				</el-checkbox>
			</el-col>                   
        </el-row>
        </el-form>   
			</el-card>
		</el-row>
		<el-row>
			<div class="title">最新事件列表</div>
			<el-table
				:data="tableData"
				style="width: 100%"
				:border="true"
			>
				<el-table-column
					prop="date"
					label="类型"
					width="100">
				</el-table-column>
				<el-table-column
					prop="name"
					label="时间"
					width="100">
				</el-table-column>
				<el-table-column
					prop="name"
					label="区域"
					width="100">
				</el-table-column>
				<el-table-column
					prop="name"
					label="关联点"
					width="100">
				</el-table-column>
        <el-table-column
					prop="name"
					label="事件"
				>
				</el-table-column>
        <el-table-column
					prop="name"
					label="确认人"
					width="100">
				</el-table-column>
        <el-table-column
					prop="name"
					label="确认时间"
					width="100">
				</el-table-column>
        <el-table-column
					prop="name"
					label="操作人"
					width="100">
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
			name: 'historyEventData',
			components: {
			}
	})
	export default class extends Vue {
		private tags: any = [
			{ name: '查询', icon: 'el-icon-search' },
      		{ name: '保存', icon: 'el-icon-suitcase-1' },
			{ name: '打印', icon: 'el-icon-printer' },
			{ name: '确认', icon: 'el-icon-finished' },
			{ name: '退出', icon: 'el-icon-close' },
		];
		private value: any = null;
		private tableData: any = [
			{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, 
			{
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1517 弄'
			},
		];
		private clickTag(name:string){
			console.log(name);
		}
	}
</script>


<style lang="scss" scoped>
	.wrapper{
		width: 100%;
		overflow-x: scroll;
		padding: 0 20px 20px;
	}
	.title{
		font-size: 16px;
		color: #333;
		margin-bottom: 10px;

	}

</style>