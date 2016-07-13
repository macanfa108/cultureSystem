// 图表测试用的js，模块完成可以删除

// 路径配置
require.config({
    paths: {
        echarts: 'js'
    }
});

// 使用
require(
    [
        'echarts',
        'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
        'echarts/chart/line'

    ],
    function(ec) {
        // 基于准备好的dom，初始化echarts图表
        var myChart = ec.init(document.getElementById('temperatureCanvas'));

        var temperatureJson;
        var Dom = $("#dataArea");
        var latestDataDom = Dom.find('.latestData');
        var maximumDom = Dom.find('.maximum');
        var minimumDom = Dom.find('.minimum');
        var averageNumDom = Dom.find('.averageNum');
        console.log(latestDataDom);
        /*页面初始化加载数据*/
        $.ajax({
            url: 'temperature.json',
            type: 'get',
            dataType: 'json',
            async: false,
            data: {},
            success: function(data) {
                console.log(data.length);
                temperatureJson = data[0];
                latestDataDom.html(temperatureJson.latestData.latestData.toFixed(2));
                maximumDom.html(temperatureJson.maximum.toFixed(2));
                minimumDom.html(temperatureJson.minimum.toFixed(2));
                averageNumDom.html(temperatureJson.averageNum.toFixed(2));

            },
            error: function() {
                alert('加载数据失败！');
            }
        });
        // 配置参数
        var option = {
            title: {
                text: temperatureJson.title,
                subtext: '单位：℃',
                x: 'center'
            },
            tooltip: {
                trigger: 'axis',
                formatter: "采集时间:{b}<br/>{a}:{c} ℃"
            },

            toolbox: {
                show: true,
                x: 'right',
                feature: {
                    mark: {
                        show: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            dataZoom: {
                show: false,
                //start与end设置导致了数据项显示不齐全，默认设置为0、100
                start: 0,
                end: 100
            },
            xAxis: [{
                type: 'category',
                boundaryGap: true,
                data: temperatureJson.receive_time, //采集时间的数据
                axisLabel: {
                    interval: 0,
                    rotate: 0,
                    margin: 10,
                    textStyle: {
                        color: "#666"
                    },
                    formatter: function(val) {
                        return val.split(" ").join("\n");
                    }
                }
            }],
            grid: { // 控制图的大小，调整下面这些值就可以，
                x: 40,
                y: 50,
                x2: 40,
                y2: 80 // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    // ,width:600
            },
            yAxis: [{
                type: 'value',
                scale: true, //脱离0值比例，放大聚焦到最终_min，_max区间
                name: '摄氏度(℃)',
                //坐标轴两端空白策略，数组内数值代表百分比，[原始数据最小值与最终最小值之间的差额，原始数据最大值与最终最大值之间的差额]
                boundaryGap: [0.5, 0.5]
            }],
            series: [{
                name: '当前指标',
                type: 'bar',
                smooth: 'true', //平滑曲线显示
                // barWidth:10, //柱图宽度
                // barGap:'80%',
                // barCategoryGap:'80%',
                barMaxWidth: 10,
                barCategoryGap: 10,
                lineStyle: {
                    normal: {
                        color: "#000",
                        width: 1.5
                    }
                },
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}℃'
                        }
                    }
                },
                //系列中的数据标注内容
                markPoint: {
                    data: [{
                        type: 'max',
                        name: '最大值'
                    }, {
                        type: 'min',
                        name: '最小值'
                    }]
                },
                //系列中的数据标线内容
                markLine: {
                    data: [{
                        type: 'average',
                        name: '平均值'
                    }]
                },
                data: temperatureJson.datas
            }]
        };
        // 为echarts对象加载数据
        myChart.setOption(option);

        var lastData = 25.5;
        var axisData;
        clearInterval(timeTicket);
        var timeTicket = setInterval(function() {
            lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
            lastData = lastData.toFixed(2) - 0;
            axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
            // var testData=temperatureJson.latestData.latestData;
            // var testTime=temperatureJson.latestData.lastReceiveTime;
            // console.log(testData.toFixed(2)+"---"+testTime);


            // 动态数据接口 addData
            myChart.addData([
                [
                    0, // 系列索引
                    lastData, // 新增数据
                    false, // 新增数据是否从队列头部插入
                    false, // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                    axisData // 坐标轴标签
                ]
            ]);
        }, 3000);


    }
);
