
export const baseUrl = 'http://192.168.0.142:8607' // 'http://47.112.211.171/sanshui_app-api' //
export const refiyUrl = 'https://www.xiangua.net/customer_app-api' // 'http://192.168.0.142:8507' //
export const systemKey = 'dgrl44212haoakkewicenwwhnsja443'
export const systemSign = 'sanshuiSafetyServer'
export const instrucBaseType = [
  {
    value: '1',
    label: '指令书-主要问题'
  }, {
    value: '2',
    label: '指令书-整改措施'
  }, {
    value: '3',
    label: '指令书-违反条例'
  }, {
    value: '4',
    label: '指令书-处罚依据条例'
  }
]
export const userRole = [ // 角色
  {
    value: '2',
    label: '镇街领导'
  },
  {
    value: '3',
    label: '镇街职员'
  },
  {
    value: '4',
    label: '区局职员'
  },
  {
    value: '5',
    label: '区局科长'
  },
  {
    value: '6',
    label: '区局局长'
  },
  {
    value: '7',
    label: '稽查职员'
  },
  {
    value: '8',
    label: '稽查队长'
  }
]

export const equipmentType = [ // 设备种类 一级分类
  {
    value: 1,
    label: '锅炉'
  }, {
    value: 2,
    label: '压力容器'
  }, {
    value: 3,
    label: '电梯'
  }, {
    value: 4,
    label: '起重机械'
  }, {
    value: 5,
    label: '场（厂）内专用机动车辆'
  }, {
    value: 6,
    label: '压力管道'
  }
]

export const IrregularitiesType = [ // 违规
  {
    value: '1',
    label: '超期未检'
  },
  {
    value: '2',
    label: '未登记'
  },
  {
    value: '3',
    label: '电梯不安全'
  },
  {
    value: '4',
    label: '缺少提示语'
  }
]

export const equipmentAllType = [
  {
    value: 1,
    label: '锅炉',
    children: [
      {
        value: 7,
        label: '承压蒸汽锅炉',
        children: [
          {
            value: 34,
            label: '电站锅炉'
          }, {
            value: 35,
            label: '工业锅炉'
          }, {
            value: 36,
            label: '生活锅炉'
          }
        ]
      }, {
        value: 8,
        label: '承压热水锅炉'
      }, {
        value: 9,
        label: '有机热载体锅炉',
        children: [
          {
            value: 37,
            label: '有机热载体气相炉'
          }, {
            value: 38,
            label: '有机热载体液相炉'
          }
        ]
      }, {
        value: 10,
        label: '小型锅炉',
        children: [
          {
            value: 39,
            label: '小型蒸汽锅炉'
          }, {
            value: 40,
            label: '汽水两用'
          }
        ]
      }
    ]
  },
  {
    value: 2,
    label: '压力容器',
    children: [
      {
        value: 11,
        label: '固定式压力容器',
        children: [
          {
            value: 41,
            label: '第一类压力容器'
          }, {
            value: 42,
            label: '第二类压力容器'
          }, {
            value: 43,
            label: '第三类压力容器'
          }
        ]
      }, {
        value: 12,
        label: '移动式压力容器'
      }
    ]
  },
  {
    value: 3,
    label: '电梯',
    children: [
      {
        value: 13,
        label: '乘客电梯',
        children: [
          {
            value: 44,
            label: '曳引式客梯'
          }, {
            value: 45,
            label: '无机房客梯'
          }, {
            value: 46,
            label: '观光电梯'
          }, {
            value: 47,
            label: '病床电梯'
          }
        ]
      }, {
        value: 14,
        label: '载货电梯',
        children: [
          {
            value: 48,
            label: '曳引式货梯'
          }, {
            value: 49,
            label: '无机房货梯'
          }, {
            value: 50,
            label: '汽车电梯'
          }, {
            value: 51,
            label: '防爆货梯'
          }
        ]
      }, {
        value: 15,
        label: '液压电梯',
        children: [
          {
            value: 52,
            label: '液压客梯'
          }, {
            value: 53,
            label: '液压货梯'
          }
        ]
      }, {
        value: 16,
        label: '杂物电梯'
      }, {
        value: 17,
        label: '自动扶梯'
      }, {
        value: 18,
        label: '自动人行道'
      }
    ]
  },
  {
    value: 4,
    label: '起重机械',
    children: [
      {
        value: 19,
        label: '桥式起重机',
        children: [
          {
            value: 54,
            label: '通用桥式起重机'
          }, {
            value: 55,
            label: '电站桥式起重机'
          }, {
            value: 56,
            label: '治金桥式起重机'
          }, {
            value: 57,
            label: '架桥机'
          }, {
            value: 58,
            label: '电动单梁起重机'
          }, {
            value: 59,
            label: '电动单梁悬挂起重机'
          }, {
            value: 60,
            label: '电动葫芦桥式起重机'
          }, {
            value: 61,
            label: '防爆梁式起重机'
          }
        ]
      }, {
        value: 20,
        label: '门式起重机',
        children: [
          {
            value: 62,
            label: '通用门式起重机'
          }, {
            value: 63,
            label: '轨道式集装箱门式起重机'
          }, {
            value: 64,
            label: '万能杠件拼装式龙门起重机'
          }, {
            value: 65,
            label: '电动葫芦门式起重机'
          }, {
            value: 66,
            label: '装卸桥'
          }
        ]
      }, {
        value: 21,
        label: '塔式起重机',
        children: [
          {
            value: 67,
            label: '普通塔式起重机'
          }
        ]
      }, {
        value: 22,
        label: '流动式起重机',
        children: [
          {
            value: 68,
            label: '轮胎起重机'
          }, {
            value: 69,
            label: '履带起重机'
          }, {
            value: 70,
            label: '集装箱正面吊运起重机'
          }, {
            value: 71,
            label: '轮胎式集装箱门式起重机'
          }, {
            value: 72,
            label: '汽车起重机'
          }, {
            value: 73,
            label: '随车起重机'
          }
        ]
      }, {
        value: 23,
        label: '门座起重机',
        children: [
          {
            value: 74,
            label: '港口门座起重机'
          }, {
            value: 75,
            label: '固定式起重机'
          }
        ]
      }, {
        value: 24,
        label: '升降机',
        children: [
          {
            value: 76,
            label: '施工升降机'
          }, {
            value: 77,
            label: '升降作业平台'
          }, {
            value: 78,
            label: '高空作业车'
          }
        ]
      }, {
        value: 25,
        label: '桅杆起重机',
        children: [
          {
            value: 79,
            label: '固定式桅杆起重机'
          }
        ]
      }, {
        value: 26,
        label: '旋臂式起重机',
        children: [
          {
            value: 80,
            label: '柱式旋臂式起重机'
          }, {
            value: 81,
            label: '壁式旋式起重机'
          }
        ]
      }, {
        value: 27,
        label: '轻小型起重设备',
        children: [
          {
            value: 82,
            label: '钢丝绳电动葫芦'
          }, {
            value: 83,
            label: '防爆钢丝绳电动葫芦'
          }, {
            value: 84,
            label: '环链电动葫芦'
          }, {
            value: 85,
            label: '气动葫芦'
          }
        ]
      }, {
        value: 28,
        label: '机械式停车设备',
        children: [
          {
            value: 86,
            label: '升降横移类机械式停车设备'
          }, {
            value: 87,
            label: '平面移动类机械式停车设备'
          }, {
            value: 88,
            label: '垂直升降类机械式停车设备'
          }, {
            value: 89,
            label: '简易升降类机械式停车设备'
          }, {
            value: 90,
            label: '汽车专用升降机类停车设备'
          }
        ]
      }
    ]
  },
  {
    value: 5,
    label: '场（厂）内专用机动车辆',
    children: [
      {
        value: 29,
        label: '场（厂）内专用机动工业车辆',
        children: [
          {
            value: 91,
            label: '叉车'
          }, {
            value: 92,
            label: '搬运车'
          }, {
            value: 93,
            label: '牵引车'
          }, {
            value: 94,
            label: '推顶车'
          }
        ]
      }, {
        value: 30,
        label: '场（厂）内专用旅游观光车辆',
        children: [
          {
            value: 95,
            label: '内燃观光车'
          }, {
            value: 96,
            label: '蓄电池观光车'
          }
        ]
      }
    ]
  },
  {
    value: 6,
    label: '压力管道',
    children: [
      {
        value: 31,
        label: '长输(油气)管道',
        children: [
          {
            value: 97,
            label: '输油管道'
          }
        ]
      }, {
        value: 32,
        label: '公用管道',
        children: [
          {
            value: 98,
            label: '燃气管道'
          }
        ]
      }, {
        value: 33,
        label: '工业管道',
        children: [
          {
            value: 99,
            label: '工艺管道'
          },
          {
            value: 100,
            label: '制冷管道'
          }
        ]
      }
    ]
  }
]

export const status = [
  {
    value: '00',
    label: '未知'
  }, {
    value: '01',
    label: '在用'
  }, {
    value: '02',
    label: '停用'
  }, {
    value: '03',
    label: '检测中'
  }, {
    value: '04',
    label: '整改中'
  }, {
    value: '05',
    label: '停电话'
  }, {
    value: '06',
    label: '停目录停用'
  }, {
    value: '07',
    label: '停检测员'
  }, {
    value: '08',
    label: '停'
  }, {
    value: '09',
    label: '拆除'
  }, {
    value: '10',
    label: '注销'
  }, {
    value: '11',
    label: '已移装改造'
  }, {
    value: '12',
    label: '简单容器'
  }, {
    value: '13',
    label: '待核实'
  }
]

export const checkStatus = [ // 设备检查状态
  {
    value: '检查任务中',
    label: '检查任务中'
  }, {
    value: '暂无任务',
    label: '暂无任务'
  }
]

export const overdue = [ // 超期
  {
    value: '2',
    label: '否'
  }, {
    value: '1',
    label: '是'
  }
]
export const taskType = [ // 任务状态
  {
    value: '0',
    label: '日常任务'
  }, {
    value: '1',
    label: '专项任务'
  }, {
    value: '2',
    label: '日常任务+专项任务'
  }
]
export const inspectionType = [ // 专项任务
  {
    value: '1',
    label: '节后复查'
  }, {
    value: '2',
    label: '检验所任务'
  }, {
    value: '3',
    label: '节后复查+检验所任务'
  }
]
export const unitType = [
  {
    value: '设计',
    label: '设计'
  }, {
    value: '制造',
    label: '制造'
  }, {
    value: '安装',
    label: '安装'
  }, {
    value: '改造',
    label: '改造'
  }, {
    value: '维修',
    label: '维修'
  }, {
    value: '使用',
    label: '使用'
  }, {
    value: '气瓶充装',
    label: '气瓶充装'
  }
]
export const townSearchType = [
  {
    value: '52,42,47,48',
    label: '西南',
    name: '河口,金本,青岐,西南'
  },
  {
    value: '44,43,53,45',
    label: '乐平',
    name: '范湖,南边,云东海,乐平'
  },
  {
    value: '46,59,60',
    label: '南山',
    name: '六和,迳口,南山'
  },
  {
    value: '54',
    label: '大塘',
    name: '大塘'
  },
  {
    value: '55',
    label: '白坭',
    name: '白坭'
  },
  {
    value: '50',
    label: '芦苞',
    name: '芦苞'
  },
  {
    value: '53',
    label: '云东海',
    name: '云东海'
  }
]
export const townType = [ // 镇街
  {
    value: '42',
    label: '金本'
  },
  {
    value: '43',
    label: '南边'
  },
  {
    value: '44',
    label: '范湖'
  },
  {
    value: '45',
    label: '乐平'
  },
  {
    value: '46',
    label: '六和'
  },
  {
    value: '47',
    label: '青岐'
  },
  {
    value: '48',
    label: '西南'
  },
  // {
  //   value: '49',
  //   label: '省南丰劳教所'
  // },
  {
    value: '50',
    label: '芦苞'
  },
  // {
  //   value: '51',
  //   label: '广州军区三水农场'
  // },
  {
    value: '52',
    label: '河口'
  },
  // {
  //   value: '53',
  //   label: '云东海'
  // },
  {
    value: '54',
    label: '大塘'
  },
  {
    value: '55',
    label: '白坭'
  },
  // {
  //   value: '56',
  //   label: '省第二戒毒劳教所'
  // },
  // {
  //   value: '57',
  //   label: '省女子劳教所'
  // },
  // {
  //   value: '58',
  //   label: '省三水劳教所'
  // },
  {
    value: '59',
    label: '迳口'
  },
  {
    value: '60',
    label: '南山'
  },
  {
    value: '53',
    label: '云东海',
    name: '云东海'
  }
]

export const addrCasc = [
  {
    value: '2',
    label: '佛山市',
    children: [
      {
        value: '7',
        label: '三水区',
        children: [
          {
            value: '42',
            label: '金本'
          },
          {
            value: '43',
            label: '南边'
          },
          {
            value: '44',
            label: '范湖'
          },
          {
            value: '45',
            label: '乐平'
          },
          {
            value: '46',
            label: '六和'
          },
          {
            value: '47',
            label: '青岐'
          },
          {
            value: '48',
            label: '西南'
          },
          // {
          //   value: '49',
          //   label: '省南丰劳教所'
          // },
          {
            value: '50',
            label: '芦苞'
          },
          // {
          //   value: '51',
          //   label: '广州军区三水农场'
          // },
          {
            value: '52',
            label: '河口'
          },
          {
            value: '53',
            label: '云东海'
          },
          {
            value: '54',
            label: '大塘'
          },
          {
            value: '55',
            label: '白坭'
          },
          // {
          //   value: '56',
          //   label: '省第二戒毒劳教所'
          // },
          // {
          //   value: '57',
          //   label: '省女子劳教所'
          // },
          // {
          //   value: '58',
          //   label: '省三水劳教所'
          // },
          {
            value: '59',
            label: '迳口'
          },
          {
            value: '60',
            label: '南山'
          }
        ]
      }
    ]
  }
]

export const taskStatus = [// 1:待派发 2:已下发 3:待反馈 4:处理中 5:待跟踪 6:已完成
  {
    value: '1',
    label: '待派发'
  }, {
    value: '2',
    label: '已下发'
  }, {
    value: '3',
    label: '待反馈'
  }, {
    value: '4',
    label: '处理中'
  }, {
    value: '5',
    label: '待跟踪'
  }, {
    value: '6',
    label: '已完成'
  }
]

export const handleType = [ // 处理方式
  {
    value: '1',
    label: '无需处理'
  },
  {
    value: '3',
    label: '下达指令书'
  }
]
export const danWeiType = [ // 单位类型
  {
    value: '1',
    label: '设计'
  },
  {
    value: '2',
    label: '制造'
  },
  {
    value: '3',
    label: '安装'
  },
  {
    value: '4',
    label: '改造'
  },
  {
    value: '5',
    label: '维修'
  },
  {
    value: '6',
    label: '使用'
  },
  {
    value: '7',
    label: '气瓶充装'
  },
  {
    value: '8',
    label: '经营'
  },
  {
    value: '9',
    label: '其他'
  }
]
