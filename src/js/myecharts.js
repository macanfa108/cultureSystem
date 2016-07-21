/**
*作者：macanfa
*时间：2016-6-14
*描述：图表自定义模块
**/
//  ==========
//  = 图表自定义模块 =
//初始化echarts实例
			var myChart=echarts.init(document.getElementById('main'));
			//指定配置项和配置数据
			var option = {
				title: {
					text: '动态数据 + 时间坐标轴'
				},
				tooltip: {
					trigger: 'axis',
					formatter: function(params) {
						params = params[0];
						var date = new Date(params.name);
						return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + ' : ' + params.value[1];
					},
					axisPointer: {
						animation: false
					}
				},
				
				xAxis: {
					type: 'time',
					splitLine: {
						show: true
					}
				},
				yAxis: {
					type: 'value',
					boundaryGap: [0, '100%'],
					splitLine: {
						show: true
					}
				},
				series: [{
					name: '模拟数据',
					type: 'line',
					showSymbol: false,
					hoverAnimation: false,
					data: data
				}]
			};
			//使用配置项和数据显示图表
			myChart.setOption(option);

			function randomData() {
				now = new Date(+now + oneDay);
				value = value + Math.random() * 21 - 10;
				return {
					name: now.toString(),
					value: [
						[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
						Math.round(value)
					]
				}
			}

			var data = [];
			var now = +new Date(2016, 5, 17);
			var oneDay = 24 * 3600 * 1000;
			var value = Math.random() * 1000;
			for (var i = 0; i < 1000; i++) {
				data.push(randomData());
			}
			var timeTicket = setInterval(function() {

				for (var i = 0; i < 5; i++) {
					data.shift();
					data.push(randomData());
					
				}

				myChart.setOption({
					series: [{
						data: data
					}]
				});
			}, 1000);
//  ========== 