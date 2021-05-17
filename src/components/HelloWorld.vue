<template>
	<div>
		<div>
			<span>Master</span>
			<el-divider></el-divider>
		</div>
		<el-row :gutter="70">
			<el-col :span="3">
				<div class="grid-content"></div>
			</el-col>
			<el-col :span="6" v-for="item in fixedDivList" :key="item.masterTerm">
				<div class="grid-content" @click="MasterActive(item.masterTermId)">
					<el-card :style="{background: item.color}">
						<div class="text item">
							Master
						</div>
						<div class="text item">
							{{'Term:' + item.masterTerm }}
						</div>
						<div class="text item">
							{{'isLeader:' + item.isMasterLeader }}
						</div>
						<div class="text item">
							{{'isConnected:' + item.isMasterConnected }}
						</div>
					</el-card>
				</div>
			</el-col>
			<el-col :span="3">
				<div class="grid-content"></div>
			</el-col>
		</el-row>
		<div>
			<span>Slaver</span>
			<el-divider></el-divider>
		</div>
		<div>
			<el-dialog title="详细信息" :visible.sync="dialogTableVisible">
				<el-table :data="detailList">
					<el-table-column property="title" label="title" width="150"></el-table-column>
					<el-table-column property="message" label="message" width="800"></el-table-column>
				</el-table>
			</el-dialog>
		</div>
		
		<el-row :gutter="70" v-for="slaverItem in slaverList" :key="slaverItem.length">
			<el-col :span="3">
				<div class="grid-content"></div>
			</el-col>
			<el-col :span="6" v-for="item in slaverItem" :key="item.term">
				<div class="grid-content" :style="{background: item.term}"
					@click="slaverActive(item.slaverTermId,item.slaverTermGroupId)">
					<el-card :style="{background: item.color}">
						<div class="text item">
							Slaver
						</div>
						<div class="text item">
							{{'Term:' + item.term }}
						</div>
						<div class="text item">
							{{'isLeader:' + item.isLeader }}
						</div>
						<div class="text item">
							{{'isConnected:' + item.isConnected }}
						</div>
					</el-card>
				</div>
			</el-col>
			<el-col :span="3">
				<div class="grid-content"></div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		components: {

		},
		data() {
			return {
				masterTitleList: ["Num", "Shards"],
				dialogTableVisible: false,
				detailList: [],
				slaverList: [],
				timer: '',
				disconnected: '#80868B',
				connected: '#efefef',
				fixedDivList: [],
			}
		},
		// created: function() {
		// 	setInterval(this.timer, 1000);
		// },
		mounted: function() {
			// this.timer = setInterval(this.onLoad, 2000);
			this.onLoad();
		},
		methods: {
			active() {

			},
			MasterActive(masterTermId) {
				this.dialogTableVisible = true;
				console.log(masterTermId)
				let self = this
				this.detail = [];
				let data = {
					"n": masterTermId
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/GetMasterInfo", data, {
					headers: headers


				}).then((response) => {
					var masterTempInfo = []
					masterTempInfo.push({
						title: "Num",
						message: response.data.Config.Num
					})
					var shardStr = []
					for (var i in response.data.Config.Shards) {
						shardStr.push(response.data.Config.Shards[i] + ",")
					}
					masterTempInfo.push({
						title: "Shards",
						message: shardStr
					})
					for (var v in response.data.Config.Groups) {
						var shardStrTemp = []

						console.log(response.data.Config.Groups[v])
						for (var i2 in response.data.Config.Groups[v]) {
							shardStrTemp.push(response.data.Config.Groups[v][i2] + ",")
						}
						masterTempInfo.push({
							title: v,
							message: shardStrTemp
						})
					}
					self.detailList = masterTempInfo
					console.log(self.detailList)

				})
			},
			slaverActive(slaverTermId, slaverTermGroupId) {
				this.dialogTableVisible = true;
				let data = {
					"n": slaverTermId,
					"g": slaverTermGroupId
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				var self = this
				axios.post("/GetEntityInfo", data, {
					headers: headers


				}).then((response) => {
					console.log("sjksdksh")
					var masterTempInfo = []
					masterTempInfo.push({
						title: "ShardNum",
						message: response.data.ShardNum
					})
					masterTempInfo.push({
						title: "KeyNum",
						message: response.data.KeyNum
					})
					masterTempInfo.push({
						title: "LogLen",
						message: response.data.IndexLen
					})
					console.log(self.detailList)
					self.detailList = masterTempInfo
					console.log(self.detailList)
				})
			},
			onLoad() {
				let self = this
				// self.slaverList = []
				// self.fixedDivList = []
				axios.get('/GetBasicInfo')
					.then(function(response) {
						var TempMaster = []
						for (let i = 0; i < response.data.MasterNum; i++) {
							var masterInfo = {
								"masterTermId": i,
								"color": self.disconnected,
								"masterTerm": '',
								"isMasterLeader": false,
								"isMasterConnected": false,
							}
							masterInfo.masterTerm = response.data.MasterTerm[i];
							masterInfo.isMasterLeader = response.data.IsMasterLeader[i];
							masterInfo.isMasterConnected = response.data.IsMasterConnect[i]
							if (masterInfo.isMasterConnected) {
								masterInfo.color = self.connected;
							} else {
								masterInfo.color = self.disconnected;
							}
							TempMaster.push(masterInfo);
						}
						self.fixedDivList = TempMaster
						self.slaverListLength = response.data.GroupNum;
						var slaverList = []
						for (let i = 0; i < response.data.GroupNum; i++) {
							var TempGroupList = []
							for (let j = 0; j < response.data.Num; j++) {
								var Info = {
									"slaverTermGroupId": i,
									"slaverTermId": j,
									"color": self.disconnected,
									"term": '',
									"isLeader": false,
									"isConnected": false,
								}
								Info.term = response.data.Term[i][j];
								Info.isLeader = response.data.IsLeader[i][j];
								Info.isConnected = response.data.IsConnect[i][j];
								if (Info.isConnected) {
									Info.color = self.connected;
								} else {
									Info.color = self.disconnected;
								}
								TempGroupList.push(Info);
							}
							slaverList.push(TempGroupList)
						}
						self.slaverList = slaverList
						console.log(response);

					})

			}
		}

	}
</script>

<style>
	.text {
		font-size: 14px;
	}

	.item {
		padding: 5px 0;
	}

	.box-card {
		width: 480px;
	}

	.el-row {
		margin-bottom: 20px;


		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
		height: 200px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
		height: 150px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
</style>
