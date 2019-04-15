
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
    value: '0',
    label: '未知'
  }, {
    value: '1',
    label: '在用'
  }, {
    value: '2',
    label: '停用'
  }, {
    value: '3',
    label: '检测中'
  }, {
    value: '4',
    label: '整改中'
  }, {
    value: '5',
    label: '停电话'
  }, {
    value: '6',
    label: '停目录停用'
  }, {
    value: '7',
    label: '停检测员'
  }, {
    value: '8',
    label: '停'
  }, {
    value: '9',
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
    value: '0',
    label: '否'
  }, {
    value: '1',
    label: '是'
  }
]
export const taskType = [ // 任务
  {
    value: '日常任务',
    label: '日常任务'
  }, {
    value: '专项任务',
    label: '专项任务'
  }
]
export const inspectionType = [ // 检查类别
  {
    value: '日常监督检查',
    label: '日常监督检查'
  }, {
    value: '专项监督检查',
    label: '专项监督检查'
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
export const townType = [ // 镇街
  {
    value: '西南',
    label: '西南'
  }, {
    value: '乐平',
    label: '乐平'
  }, {
    value: '云东海',
    label: '云东海'
  }, {
    value: '南边',
    label: '南边'
  }, {
    value: '六和',
    label: '六和'
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
          {
            value: '49',
            label: '省南丰劳教所'
          },
          {
            value: '50',
            label: '芦苞'
          },
          {
            value: '51',
            label: '广州军区三水农场'
          },
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
          {
            value: '56',
            label: '省第二戒毒劳教所'
          },
          {
            value: '57',
            label: '省女子劳教所'
          },
          {
            value: '58',
            label: '省三水劳教所'
          },
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
