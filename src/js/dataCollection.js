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


        /*页面初始化加载数据*/
        $.ajax({
            url: 'temperature.json',//这是初始化请求数据格式
            type: 'get',
            dataType: 'json',
            async: true,
            data: {},
            success: function(data) {
                // console.log(data.length);
                // 循环获取数据对象
                for(var i=0;i<data.length;i++){
                  var json = data[i];
                  // console.log("dataArea"+(i+1)+"Canvas");
                  initChart("dataArea"+(i+1)+"Canvas",json,(i+1));
                }
            },
            error: function() {
                alert('加载数据失败！');
            }
        });
        //图表初始化函数封装
        function initChart(targetId,json,index){
          // 基于准备好的dom，初始化echarts图表
          var myChart = ec.init(document.getElementById(targetId));
          //获取标识号的DOM节点
          var Dom = $("#dataArea"+index),
              latestDataDom = Dom.find('.latestData');
              maximumDom = Dom.find('.maximum');
              minimumDom = Dom.find('.minimum');
              averageNumDom = Dom.find('.averageNum');

              //将初始化数据加到对应的dom元素中
              latestDataDom.html(json.latestData.latestValue.toFixed(2)+json.unit);
              maximumDom.html(json.maximum.toFixed(2)+json.unit);
              minimumDom.html(json.minimum.toFixed(2)+json.unit);
              averageNumDom.html(json.averageNum.toFixed(2)+json.unit);

          // 配置参数
          var option = {
              title: {
                  text: json.title,
                  subtext: '单位：'+json.unit,
                  x: 'center'
              },
              tooltip: {
                  trigger: 'axis',
                  formatter: "采集时间:{b}<br/>{a}:{c} "+json.unit
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
                  data: json.receive_time, //采集时间的数据
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
                  name: json.unit,
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
                              formatter: '{c}'+json.unit
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
                  data: json.datas
              }]
          };
          // 为echarts对象加载数据
          myChart.setOption(option);

          //初始化新获取的数据变量
          var lastData = 25.5;
          var axisData;
          // 定时器
          clearInterval(timeTicket);
          var timeTicket = setInterval(function() {
            // 定时更新数据
              $.ajax({
                url: 'temperature2.json',//这是定时请求数据格式
                type: 'get',
                dataType: 'json',
                async: false,
                data: {},
                success: function(data) {
                    // 循环获取数据对象
                    // for(var i=0;i<data.length;i++){
                    //获取对应的数据
                      var json = data[index-1];
                      // console.log("dataArea"+(i+1)+"Canvas");
                      //获取到最新数据，值，时间，采集频率
                      lastData=json.latestData.latestValue;
                      axisData=json.latestData.lastReceiveTime;
                      json.collectionFrequency=json.collectionFrequency;

                      // Dom = $("#dataArea"+(index+1)),
                      // Dom = $(".dataArea"),
                      //重新获取dom？日了狗
                          latestDataDom = Dom.find('.latestData');
                          maximumDom = Dom.find('.maximum');
                          minimumDom = Dom.find('.minimum');
                          averageNumDom = Dom.find('.averageNum');
                          // myChart = ec.init(document.getElementById("dataArea"+(index+1)+"Canvas"));
                          // console.log(myChart+"********"+index);
                      // console.log(Dom.id+'---------');
                      // console.log(lastData+'123');

                      latestDataDom.html(lastData.toFixed(2)+json.unit);
                      maximumDom.html(json.maximum.toFixed(2)+json.unit);
                      minimumDom.html(json.minimum.toFixed(2)+json.unit);
                      averageNumDom.html(json.averageNum.toFixed(2)+json.unit);
                      // console.log(myChart[0]+"********");

                    // }
                },
                error: function() {
                    alert('动态加载数据失败！');//这里可以改为警告框提示失败，提升用户体验
                }
              });
              // 动态数据接口 addData
              myChart.addData([
                  [
                      0, // 系列索引
                      lastData.toFixed(2), // 新增数据
                      false, // 新增数据是否从队列头部插入
                      false, // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                      axisData // 坐标轴标签
                  ]
              ]);

          },json.collectionFrequency*1000);//获取指标对应的采集频率
          // 定时器结束
        }//initChart end


    }//function(ec) end
);

// 各部分表格
$(function(){
  //jquery分页
  var paginationLength=4;
  for(var i=1;i<=paginationLength;i++){
    $('.light-pagination'+i).pagination({
      pages: 20,
      cssStyle: 'light-theme'
    });
  }
    //点击分页ajax请求分页数据
});
