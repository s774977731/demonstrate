var HOST = '';
new Vue({
    el:'.home-container',
    data:{
        leftTopData:[
            { name:'',percentage:0,weight:'0kg',color:'#FFCD5E' },
            { name:'',percentage:0,weight:'0kg',color:'#FFFD07' },
            { name:'',percentage:0,weight:'0kg',color:'#7BBCFF' },
            { name:'',percentage:0,weight:'0kg',color:'#0A00D9' },
            { name:'',percentage:0,weight:'0kg',color:'#00CAA2' },
            { name:'',percentage:0,weight:'0kg',color:'#CC5EFF' },
        ],
        machineList:[{
                name:'故障设备',
                number:0,
                list:[
                    {active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},
                    {active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0}
                ]
            },{
                name:'掉线设备',
                number:0,
                list:[
                    {active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},
                    {active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0}
                ]
            },{
                name:'满载设备',
                number:0,
                list:[
                    {active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},
                    {active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0}
                ]
            },{
                name:'未清运设备',
                number:0,
                list:[
                    {active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},
                    {active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0},{active:0}
                ]
        }],
        productsWeight:{user_data:{rang:[]},products_percentage:{},natural:{}},
        recycleStatisData:{},
        todayWeight:{},
        sevenPerCapita:{},
        sevenWeight:{}
    },
    mounted:function () {
        this.getRecycleProductsWeight();
        this.getRecycleStatisData();
        this.getTodayWeight();
        this.getSevenWeight();
        this.getSevenPerCapita();
        this.handleWindowResize();
    },
    methods:{
        //监听屏幕改变
        handleWindowResize() {
            window.onresize = function () {  //监听屏幕的改变
                setTimeout(function () {
                    window.location.reload();
                })
            };
        },
        //获取数据
        handleGetData:function () {

        },
        //垃圾桶回收比例和总回收量 用户量
        getRecycleProductsWeight:function () {
            // 1饮料瓶  2金属 3纸类 4布料  5塑料  6玻璃  7纸类2
            var _this = this;
            common.ajax({
                url:'/bigData/getRecycleProductsWeight',
                success:function (res) {
                    _this.productsWeight = res;
                    // _this.productsWeight = productsWeight;
                    var products_percentage = _this.productsWeight.products_percentage;
                    var lists = Object.keys(products_percentage);
                    var tempList = [];
                    lists.forEach(function (item) {
                        var tempObj = products_percentage[item];
                        if(item == 1) {tempObj.name = '饮料瓶';tempObj.color = '#FFCD5E';}
                        if(item == 2) {tempObj.name = '金属';tempObj.color = '#FFFD07';}
                        if(item == 3) {tempObj.name = '纸类';tempObj.color = '#7BBCFF';}
                        if(item == 4) {tempObj.name = '布料';tempObj.color = '#0A00D9';}
                        if(item == 5) {tempObj.name = '塑料';tempObj.color = '#00CAA2';}
                        if(item == 6) {tempObj.name = '玻璃';tempObj.color = '#CC5EFF';}
                        if(item == 7) {tempObj.name = '纸类2';tempObj.color = '#FFFFFF';}
                        tempObj.weight = tempObj.weight.toFixed(2);
                        tempList.push(tempObj);
                    });
                    _this.leftTopData = tempList;
                    _this.$nextTick(function () {
                        _this.leftTopData.forEach(function(item,index) {
                            _this.initMiddleLeftPie('inner-circle-' + (index + 1),item.percentage,item.color);
                        });
                        _this.initMiddleCenterPie('middle-center-pie',_this.productsWeight.user_data.percentage*0.75,'#0099FF');
                    })
                }
            })
        },
        //设备统计数据
        getRecycleStatisData:function () {
            var _this = this;
            common.ajax({
                url:'/bigData/getRecycleStatisData',
                success:function (res) {
                    _this.recycleStatisData = res;
                    // _this.recycleStatisData = recycleStatisData;
                    _this.machineList[0].list.forEach(function (item,index) {
                        if(index < _this.recycleStatisData.fault_num) {
                            _this.$set(_this.machineList[0].list[index],'active',1);
                            _this.machineList[0].number += 1;
                        }
                    })
                    _this.machineList[1].list.forEach(function (item,index) {
                        if(index < _this.recycleStatisData.donline_num) {
                            _this.$set(_this.machineList[1].list[index],'active',1);
                            _this.machineList[1].number += 1;
                        }
                    })
                    _this.machineList[2].list.forEach(function (item,index) {
                        if(index < _this.recycleStatisData.full_num) {
                            _this.$set(_this.machineList[2].list[index],'active',1);
                            _this.machineList[2].number += 1;
                        }
                    })
                    _this.machineList[3].list.forEach(function (item,index) {
                        if(index < _this.recycleStatisData.no_clean_num) {
                            _this.$set(_this.machineList[3].list[index],'active',1);
                            _this.machineList[3].number += 1;
                        }
                    })
                }
            })
        },
        //今日回收量
        getTodayWeight:function () {
            var _this = this;
            common.ajax({
                url:'/bigData/getTodayWeight',
                success:function (res) {
                    _this.todayWeight = res;
                    // _this.todayWeight = todayWeight;
                    var labels = [];
                    var lists = [];
                    var keys = Object.keys(_this.todayWeight.products);
                    keys.forEach(function (item) {
                        var tempObj = {value:_this.todayWeight.products[item]};
                        if(item == 1) {
                            tempObj.name = '饮料瓶';
                            tempObj.itemStyle = {color:'#047BEB'};
                        }
                        if(item == 2) {
                            tempObj.name = '金属';
                            tempObj.itemStyle = {color:'#FFC958'};
                        }
                        if(item == 3) {
                            tempObj.name = '纸类';
                            tempObj.itemStyle = {color:'#0DCCF7'};
                        }
                        if(item == 4) {
                            tempObj.name = '布料';
                            tempObj.itemStyle = {color:'#57C48D'};
                        }
                        if(item == 5) {
                            tempObj.name = '塑料';
                            tempObj.itemStyle = {color:'#F5F489'};
                        }
                        if(item == 6) {
                            tempObj.name = '玻璃';
                            tempObj.itemStyle = {color:'#B94CED'};
                        }
                        if(item == 7) {
                            tempObj.name = '纸类2';
                            tempObj.itemStyle = {color:'#0DCCAA'};
                        }
                        labels.push(tempObj.name);
                        lists.push(tempObj);
                    });
                    _this.initPie('middle-right-top-pie',labels,lists);
                }
            })
        },
        //7日人均投递次数和重量
        getSevenPerCapita:function () {
            var _this = this;
            common.ajax({
                url:'/bigData/getSevenPerCapita',
                success:function (res) {
                    _this.sevenPerCapita = res;
                    // _this.sevenPerCapita = sevenPerCapita;
                    var xAxisData = [];
                    var yAxisData1 = [];
                    var yAxisData2 = [];
                    _this.sevenPerCapita.number.forEach(function (item) {
                        xAxisData.unshift(item.time_str);
                        yAxisData1.unshift(item.result);
                    });
                    _this.sevenPerCapita.weight.forEach(function (item) {
                        yAxisData2.unshift(item.result);
                    });
                    _this.initLine('middle-right-bottom-line',xAxisData,yAxisData1,yAxisData2);
                }
            })
        },
        //7天回收总量
        getSevenWeight:function () {
            var _this = this;
            common.ajax({
                url:'/bigData/getSevenWeight',
                success:function (res) {
                    _this.sevenWeight = res;
                    // _this.sevenWeight = sevenWeight;
                    var xAxisData = [];
                    var yAxisData = [];
                    _this.sevenWeight.forEach(function (item) {
                        xAxisData.unshift(item.time_str);
                        yAxisData.unshift(item.result);
                    });
                    _this.initBar('middle-right-middle-bar',xAxisData,yAxisData);
                }
            })
        },
        //初始化中间的饼状图
        initMiddleCenterPie:function (id,val,color) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(id));

            var option = {
                series: [
                    {
                        type:'pie',
                        radius: ['54%', '59%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        data:[
                            {
                                value:val,
                                name:'直接访问',
                                itemStyle:{
                                    color:color || '#ffffff'
                                }
                            },
                            {
                                value:100-val,
                                name:'',
                                itemStyle:{
                                    color:'rgba(0,0,0,0)'
                                }
                            }
                        ]
                    }
                ]
            };
            myChart.setOption(option);
        },
        //初始化6个饼状图
        initMiddleLeftPie:function (id,val,color) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(id));

            var option = {
                series: [
                    {
                        type:'pie',
                        radius: ['55%', '65%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        data:[
                            {
                                value:val,
                                name:'直接访问',
                                itemStyle:{
                                    color:color || '#ffffff'
                                }
                            },
                            {
                                value:100-val,
                                name:'',
                                itemStyle:{
                                    color:'rgba(0,0,0,0)'
                                }
                            }
                        ]
                    }
                ]
            };
            myChart.setOption(option);
        },
        //初始化饼状图
        initPie:function(id,labels,lists) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(id));

            // 指定图表的配置项和数据
            var option = option = {
                title : {
                    // text: '某站点用户访问来源',
                    // subtext: '纯属虚构',
                    // x:'right'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                // legend: {
                //     orient: 'vertical',
                //     left: 'left',
                //     data: labels
                // },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        label:{
                            formatter:'{d}%'
                        },
                        data:lists,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
        },
        //初始化饼状图
        initBar:function(id,xAxisData,yAxisData) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(id));

            // 指定图表的配置项和数据
            var option = {
                color:'#23C9CC',
                tooltip: {},
                legend: {
                    data:[{name:'重量/kg',textStyle:{color:'#65C6E7'}}]
                },
                xAxis: {
                    data: xAxisData,
                    axisLine:{
                        lineStyle:{
                            color:'#65C6E7'
                        },
                    }
                },
                yAxis: {
                    name: '重量（kg）',
                    axisLine:{
                        lineStyle:{
                            color:'#65C6E7',
                        },
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:'#65C6E7',
                            opacity:0.5
                        }
                    }
                },
                axisLine:{
                    show:true
                },
                series: [{
                    name: '重量/kg',
                    type: 'bar',
                    data: yAxisData
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        //初始化饼状图
        initLine:function (id,xAxisData,yAxisData1,yAxisData2) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(id));

            // 指定图表的配置项和数据
            var option = {
                tooltip: {},
                legend: {
                    data:[{name:'人均投递次数(次)',textStyle:{color:'#2B80FF'}},{name:'人均投递重量(kg)',textStyle:{color:'#04CDF4'}}]
                },
                xAxis: {
                    data: xAxisData,
                    axisLine:{
                        lineStyle:{
                            color:'#65C6E7'
                        },
                    }
                },
                yAxis: [{
                        name:'人均投递次数(次)',
                        axisLine:{
                            lineStyle:{
                                color:'#65C6E7',
                            },
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                color:'#65C6E7',
                                opacity:0.5
                            }
                        }
                    },{
                        name:'人均投递重量(kg)',
                        axisLine:{
                            lineStyle:{
                                color:'#65C6E7',
                            },
                        },
                        splitLine:{
                            show:false
                        }
                }],
                series: [{
                    name: '人均投递次数(次)',
                    type: 'line',
                    color:'#2B80FF',
                    data: yAxisData1
                },{
                    name: '人均投递重量(kg)',
                    type: 'line',
                    yAxisIndex:1,
                    color:'#04CDF4',
                    data: yAxisData2
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    }
});
