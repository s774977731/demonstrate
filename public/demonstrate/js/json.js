// 1饮料瓶  2金属 3纸类 4布料  5塑料  6玻璃  7纸类2
var productsWeight = {
    "total_weight": 103968.56, //总投递量
    "bottle_num": "143098.00", //瓶子数量
    "user_data": {
        "rang": [
            0,
            10000,
            20000,
            30000,
            40000,
            50000,
            60000
        ],
        "user_count": 14788,
        "percentage": 25
    },
    "products_percentage": { //垃圾桶百分比
        "1": {
            "percentage": 2.5, //占比
            "weight": "143098.00"  //个数
        },
        "2": {
            "percentage": 3.4,
            "weight": 3545.98 //重量
        },
        "3": {
            "percentage": 48.4,
            "weight": 50305.76
        },
        "4": {
            "percentage": 21.9,
            "weight": 22754.5
        },
        "5": {
            "percentage": 10.3,
            "weight": 10719.94
        },
        "6": {
            "percentage": 0,
            "weight": 0
        },
        "7": {
            "percentage": 13.5,
            "weight": 14066.62
        }
    },
    "natural": { //自然资源
        "natural": 421072.68,//自然资源
        "landfill": 67579.57, //填埋量
        "coal": 145555.99,//煤
        "fire": 36389 //焚烧量
    }
};
var recycleStatisData = {
    "total": 59, //总数
    "no_clean_num": 14, //未清运
    "full_num": 3,//满载
    "donline_num": 0,//掉线
    "fault_num": 3,//故障
    "apk_num": 0//apk掉线
};
var todayWeight = {
    "total": 460, //今日回收量 (kg)
    "products": {
        "1": 1.5, //饮料瓶 (kg)
        "2": 0.9,  //金属
        "3": 37.8,//纸类
        "4": 30, //衣物
        "5": 7.4, //塑料
        "6": 0, //玻璃
        "7": 22.5 //纸类2
    }
};
var sevenPerCapita = {
    "number": [ //投递次数
        {
            "time_str": "10月10日",
            "result": 1.9
        },
        {
            "time_str": "10月09日",
            "result": 2.4
        },
        {
            "time_str": "10月08日",
            "result": 2.1
        },
        {
            "time_str": "10月07日",
            "result": 2.1
        },
        {
            "time_str": "10月06日",
            "result": 2.1
        },
        {
            "time_str": "10月05日",
            "result": 2.2
        },
        {
            "time_str": "10月04日",
            "result": 2.1
        }
    ],
    "weight": [ //重量 （kg）
        {
            "time_str": "10月10日",
            "result": 2.8
        },
        {
            "time_str": "10月09日",
            "result": 3
        },
        {
            "time_str": "10月08日",
            "result": 2.8
        },
        {
            "time_str": "10月07日",
            "result": 2.3
        },
        {
            "time_str": "10月06日",
            "result": 2.4
        },
        {
            "time_str": "10月05日",
            "result": 2.7
        },
        {
            "time_str": "10月04日",
            "result": 2.5
        }
    ]
};
var sevenWeight = [
    {
        "time_str": "10月10日",
        "result": 460.01 //重量  kg
    },
    {
        "time_str": "10月09日",
        "result": 1684.8
    },
    {
        "time_str": "10月08日",
        "result": 1361.96
    },
    {
        "time_str": "10月07日",
        "result": 1458.14
    },
    {
        "time_str": "10月06日",
        "result": 1338.87
    },
    {
        "time_str": "10月05日",
        "result": 1272.8
    },
    {
        "time_str": "10月04日",
        "result": 1284.96
    }
];
