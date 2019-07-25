//app.js
const serverUrl = 'https://www.rongjiangcommunity.cn';
const appid = 'yiz';
const miniAppId = 'wx6ceb2515d7e20fa3';
const productName = '榕水长';

App({
  credentials: '',
  appid,
  serverUrl,
  productName,
  collegeObj: {
    "广东省": [
      "中山大学",
      "中山医科大学",
      "中山医学院",
      "暨南大学",
      "汕头大学",
      "汕头医学院",
      "华南理工大学",
      "华南农业大学",
      "广东海洋大学",
      "湛江海洋大学",
      "湛江水产学院",
      "广州医科大学",
      "广东医科大学",
      "湛江医学院",
      "广州中医药大学",
      "广东药科大学",
      "广东药学院",
      "华南师范大学",
      "韶关学院",
      "韶关师范学院",
      "惠州学院",
      "韩山师范学院",
      "岭南师范学院",
      "湛江师范学院",
      "肇庆学院",
      "嘉应学院",
      "广州体育学院",
      "广州美术学院",
      "星海音乐学院",
      "广东技术师范学院",
      "广东民族学院",
      "广东省财贸管理干部学院",
      "深圳大学",
      "广东财经大学",
      "广东商学院",
      "广东白云学院",
      "广东白云职业技术学院",
      "广州大学",
      "华南建设学院（西院）",
      "广州师范学院",
      "广州航海学院",
      "广州航海高等专科学校",
      "广州海运学校",
      "广州水运工业学校",
      "广东警官学院",
      "广东省公安司法管理干部学院 ",
      "广东公安高等专科学校 ",
      "广东省人民警察学校 ",
      "仲恺农业工程学院",
      "仲恺农业技术学院",
      "五邑大学",
      "广东金融学院",
      "广州金融专科学校",
      "广东银行学校",
      "电子科技大学中山学院",
      "广东石油化工学院",
      "茂名学院",
      "东莞理工学院",
      "广东工业大学",
      "广东工学院",
      "广东机械学院",
      "华南建设学院（东院）",
      "广东外语外贸大学",
      "广州外国语学院",
      "广州对外贸易学院",
      "广东财经职业学院",
      "佛山科学技术学院",
      "佛山大学",
      "佛山兽医专科学校",
      "广东培正学院",
      "南方医科大学",
      "第一军医大学",
      "广东东软学院",
      "华南理工大学广州学院",
      "广州大学华软软件学院",
      "中山大学南方学院",
      "广东外语外贸大学南国商学院",
      "广东财经大学华商学院",
      "广东海洋大学寸金学院",
      "华南农业大学珠江学院",
      "广东技术师范学院天河学院",
      "北京师范大学珠海分校",
      "广东工业大学华立学院",
      "广州大学松田学院",
      "广州商学院",
      "华师增城学院",
      "北京理工大学珠海学院",
      "吉林大学珠海学院",
      "广州工商学院",
      "广东科技学院",
      "广东理工学院",
      "东莞理工学院城市学院",
      "中山大学新华学院",
      "广东第二师范学院",
      "广东教育学院",
      "南方科技大学",
      "北京师范大学-香港浸会大学联合国际学院",
      "香港中文大学（深圳）",
      "深圳北理莫斯科大学",
      "广东以色列理工学院",
      "顺德职业技术学院",
      "广东轻工职业技术学院",
      "广东交通职业技术学院",
      "广东交通学校",
      "广东省航运学校",
      "广东水利电力职业技术学院",
      "潮汕职业技术学院",
      "深圳职业技术学院",
      "广东南华工商职业学院",
      "私立华联学院",
      "广州民航职业技术学院",
      "广州番禺职业技术学院",
      "广东松山职业技术学院",
      "广东农工商职业技术学院",
      "广东新安职业技术学院",
      "佛山职业技术学院",
      "广东科学技术职业学院",
      "广东省科技干部学院",
      "广东食品药品职业学院",
      "广州康大职业技术学院",
      "珠海艺术职业学院",
      "广东行政职业学院",
      "广东体育职业技术学院",
      "广东职业技术学院",
      "广东建设职业技术学院",
      "广东女子职业技术学院",
      "广东机电职业技术学院",
      "广东岭南职业技术学院",
      "汕尾职业技术学院",
      "罗定职业技术学院",
      "阳江职业技术学院",
      "河源职业技术学院",
      "广东邮电职业技术学院",
      "汕头职业技术学院",
      "揭阳职业技术学院",
      "深圳信息职业技术学院",
      "清远职业技术学院",
      "广东工贸职业技术学院",
      "广东司法警官职业学院",
      "广东亚视演艺职业学院",
      "广东省外语艺术职业学院",
      "广东文艺职业学院",
      "广州体育职业技术学院",
      "广州工程技术职业学院",
      "中山火炬职业技术学院",
      "江门职业技术学院",
      "茂名职业技术学院",
      "珠海城市职业技术学院",
      "广州涉外经济职业技术学院",
      "广州南洋理工职业学院",
      "广州科技职业技术学院",
      "惠州经济职业技术学院",
      "广东工商职业学院",
      "肇庆医学高等专科学校",
      "广州现代信息工程职业技术学院",
      "广东理工职业学院",
      "广州华南商贸职业学院",
      "广州华立科技职业学院",
      "广州城市职业学院",
      "广东工程职业技术学院",
      "广州铁路职业技术学院",
      "广东科贸职业学院",
      "广州科技贸易职业学院",
      "中山职业技术学院",
      "广州珠江职业技术学院",
      "广州松田职业学院",
      "广东文理职业学院",
      "广州城建职业学院",
      "东莞职业技术学院",
      "广东南方职业学院",
      "广州华商职业学院",
      "广州华夏职业学院",
      "广东环境保护工程职业学院",
      "广东青年职业学院",
      "广州东华职业学院",
      "广东创新科技职业学院",
      "广东舞蹈戏剧职业学院",
      "惠州卫生职业技术学院",
      "广东信息工程职业学院",
      "广东生态工程职业学院",
      "惠州城市职业学院",
      "广东碧桂园职业学院",
      "公安边防部队高等专科学校",
      "广东茂名健康职业学院",
      "广东酒店管理职业技术学院",
      "广东茂名幼儿师范专科学校",
      "广州卫生职业技术学院",
      "惠州工程职业学院",
      "广东江门中医药职业学院",
      "湛江幼儿师范专科学校"
    ],
    "北京市": [
      "北京大学",
      "北京医科大学",
      "中国人民大学",
      "清华大学",
      "北京交通大学",
      "北方交通大学",
      "北京工业大学",
      "北京航空航天大学",
      "北京理工大学",
      "北京科技大学",
      "北京钢铁学院",
      "北方工业大学",
      "北京化工大学",
      "北京工商大学",
      "北京轻工业学院",
      "北京商学院",
      "北京服装学院",
      "北京邮电大学",
      "北京印刷学院",
      "北京建筑大学",
      "北京石油化工学院",
      "北京电子科技学院",
      "中国农业大学",
      "北京农业大学",
      "北京农业工程大学",
      "北京农学院",
      "北京林业大学",
      "北京协和医学院",
      "首都医科大学",
      "北京中医药大学",
      "北京师范大学",
      "首都师范大学",
      "首都体育学院",
      "北京外国语大学",
      "北京第二外国语学院",
      "北京语言大学",
      "中国传媒大学",
      "北京广播学院",
      "中央财经大学",
      "对外经济贸易大学",
      "北京物资学院",
      "首都经济贸易大学",
      "外交学院",
      "中国人民公安大学",
      "国际关系学院",
      "北京体育大学",
      "北京体育学院",
      "中央音乐学院",
      "中国音乐学院",
      "中央美术学院",
      "中央戏剧学院",
      "中国戏曲学院",
      "北京电影学院",
      "北京舞蹈学院",
      "中央民族大学",
      "中央民族学院",
      "中国政法大学",
      "华北电力大学",
      "中华女子学院",
      "北京信息科技大学",
      "中国矿业大学（北京）",
      "北京矿业学院",
      "北京煤炭学院",
      "中国石油大学（北京）",
      "北京石油大学",
      "中国地质大学（北京）",
      "北京联合大学",
      "中国青年政治学院",
      "首钢工学院",
      "中国劳动关系学院",
      "中国科学院大学",
      "中国社会科学院大学",
      "北京青年政治学院"
    ],
    "天津市": [
      "南开大学",
      "天津大学",
      "天津科技大学",
      "天津轻工业学院",
      "天津工业大学",
      "中国民航大学",
      "天津理工大学",
      "天津医科大学",
      "天津中医药大学",
      "天津师范大学",
      "天津职业技术师范大学",
      "天津外国语大学",
      "天津商业大学",
      "天津商学院",
      "天津财经大学",
      "天津城建大学",
      "天津中德应用技术大学"
    ],
    "河北省": [
      "河北大学",
      "河北工程大学",
      "河北地质大学",
      "河北工业大学",
      "河北医科大学",
      "石家庄铁道大学",
      "燕山大学",
      "华北科技学院",
      "防灾科技学院",
      "中央司法警官学院"
    ],
    "山西省": [
      "山西大学",
      "太原科技大学",
      "中北大学",
      "太原理工大学",
      "山西财经大学"
    ],
    "内蒙古自治区": [
      "内蒙古大学",
      "内蒙古科技大学",
      "内蒙古工业大学"
    ],
    "辽宁省": [
      "辽宁大学",
      "大连理工大学",
      "沈阳工业大学",
      "沈阳航空航天大学",
      "沈阳理工大学",
      "东北大学",
      "辽宁科技大学",
      "辽宁工程技术大学",
      "辽宁石油化工大学",
      "抚顺石油学院",
      "沈阳化工大学",
      "大连交通大学",
      "大连铁道学院",
      "大连海事大学",
      "大连海运学院",
      "大连工业大学",
      "沈阳建筑大学",
      "辽宁工业大学",
      "大连海洋大学",
      "大连水产学院",
      "中国医科大学",
      "大连医科大学",
      "辽宁中医药大学",
      "沈阳药科大学",
      "大连外国语大学",
      "东北财经大学",
      "中国刑事警察学院",
      "沈阳体育学院",
      "沈阳音乐学院",
      "鲁迅美术学院",
      "沈阳大学",
      "沈阳工业高等专科学校",
      "大连大学"
    ],
    "吉林省": [
      "吉林大学",
      "吉林工业大学",
      "白求恩医科大学",
      "长春科技大学",
      "长春地质学院",
      "长春邮电学院",
      "延边大学",
      "长春理工大学",
      "长春光学精密机械学院",
      "东北电力大学",
      "长春工业大学",
      "吉林建筑大学",
      "长春中医药大学",
      "东北师范大学",
      "北华大学",
      "吉林电气化高等专科学校",
      "吉林财经大学",
      "长春大学"
    ],
    "黑龙江省": [
      "黑龙江大学",
      "哈尔滨工业大学",
      "哈尔滨理工大学",
      "哈尔滨工程大学",
      "黑龙江科技大学",
      "东北石油大学",
      "东北农业大学",
      "东北林业大学",
      "哈尔滨医科大学",
      "哈尔滨商业大学",
      "黑龙江商学院"
    ],
    "上海市": [
      "复旦大学",
      "上海第一医科大学",
      "同济大学",
      "上海铁道大学",
      "上海建材学院",
      "上海交通大学",
      "上海第二医科大学",
      "华东理工大学",
      "华东化工学院",
      "上海理工大学",
      "上海机械学院",
      "上海海事大学",
      "上海海运学院",
      "东华大学",
      "中国纺织大学",
      "华东纺织工学院",
      "上海电力学院",
      "上海海洋大学",
      "上海水产大学",
      "上海水产学院",
      "上海中医药大学",
      "华东师范大学",
      "上海外国语大学",
      "上海财经大学",
      "上海对外经贸大学",
      "上海海关学院",
      "上海海关专科学校",
      "华东政法大学",
      "上海大学",
      "上海工程技术大学",
      "上海政法学院",
      "上海纽约大学",
      "上海旅游高等专科学校"
    ],
    "江苏省": [
      "南京大学",
      "苏州大学",
      "东南大学",
      "南京工学院",
      "南京铁道医学院",
      "南京航空航天大学",
      "南京理工大学",
      "江苏科技大学",
      "镇江船舶学院",
      "中国矿业大学",
      "南京工业大学",
      "南京建筑工程学院",
      "南京化工学院",
      "常州大学",
      "江苏石油化工学院",
      "南京邮电大学",
      "河海大学",
      "江南大学",
      "无锡轻工大学",
      "无锡轻工业学院",
      "南京林业大学",
      "江苏大学",
      "镇江农业机械学院",
      "南京信息工程大学",
      "南京气象学院",
      "南通大学",
      "南通医学院",
      "南京农业大学",
      "南京医科大学",
      "徐州医科大学",
      "南京中医药大学",
      "中国药科大学",
      "南京师范大学",
      "江苏师范大学",
      "南京财经大学",
      "南京经济学院",
      "南京审计大学",
      "南京审计学院",
      "南京财贸学院",
      "南京大学金陵学院"
    ],
    "浙江省": [
      "浙江大学",
      "杭州大学",
      "浙江农业大学",
      "浙江医科大学",
      "杭州电子科技大学",
      "浙江工业大学",
      "浙江理工大学",
      "浙江工程学院",
      "浙江丝绸工学院",
      "浙江海洋大学",
      "浙江农林大学",
      "温州医科大学",
      "浙江中医药大学",
      "浙江师范大学",
      "杭州师范大学",
      "温州大学",
      "浙江工商大学",
      "杭州商学院",
      "中国美术学院",
      "中国计量大学",
      "公安海警学院",
      "浙江财经大学",
      "宁波大学",
      "浙江传媒学院",
      "浙江音乐学院",
      "宁波诺丁汉大学",
      "温州肯恩大学"
    ],
    "安徽省": [
      "安徽大学",
      "中国科学技术大学",
      "合肥工业大学",
      "安徽工业大学",
      "安徽农业大学",
      "安徽师范大学",
      "安徽财经大学",
      "安徽建筑大学"
    ],
    "福建省": [
      "厦门大学",
      "华侨大学",
      "福州大学",
      "福建工程学院",
      "福建农林大学",
      "福建农学院",
      "集美大学",
      "厦门水产学院",
      "福建医科大学",
      "福建中医药大学",
      "福建师范大学",
      "闽南师范大学",
      "厦门理工学院",
      "仰恩大学",
      "厦门医学院",
      "厦门工学院",
      "厦门大学嘉庚学院",
      "福州墨尔本理工职业学院"
    ],
    "江西省": [
      "南昌大学",
      "华东交通大学",
      "东华理工大学",
      "华东地质学院",
      "南昌航空大学",
      "江西理工大学",
      "南方冶金学院",
      "江西冶金学院",
      "景德镇陶瓷大学",
      "景德镇陶瓷学院",
      "江西农业大学",
      "江西中医药大学",
      "赣南医学院",
      "江西师范大学",
      "赣南师范大学",
      "江西财经大学"
    ],
    "山东省": [
      "山东大学",
      "中国海洋大学",
      "青岛海洋大学",
      "山东海洋学院",
      "山东科技大学",
      "山东矿业学院",
      "中国石油大学（华东）",
      "山东石油大学",
      "青岛科技大学",
      "山东化工学院",
      "济南大学",
      "青岛理工大学",
      "山东建筑大学",
      "齐鲁工业大学",
      "山东轻工业学院",
      "山东理工大学",
      "山东工程学院",
      "山东农业大学",
      "青岛农业大学",
      "山东中医药大学",
      "山东师范大学",
      "曲阜师范大学",
      "山东财经大学",
      "青岛大学",
      "山东交通学院"
    ],
    "河南省": [
      "华北水利水电大学",
      "郑州大学",
      "河南理工大学",
      "焦作矿业学院",
      "郑州轻工业学院",
      "河南工业大学",
      "郑州粮食学院",
      "河南科技大学",
      "洛阳工学院",
      "河南农业大学",
      "河南中医药大学",
      "河南大学",
      "河南财经政法大学",
      "郑州航空工业管理学院",
      "洛阳理工学院",
      "洛阳建筑材料工业专科学校"
    ],
    "湖北省": [
      "武汉大学",
      "武汉水利电力大学",
      "武汉测绘科技大学",
      "湖北医科大学",
      "华中科技大学",
      "华中理工大学",
      "华中工学院",
      "武汉城市建设学院",
      "同济医科大学",
      "武汉科技大学",
      "武汉钢铁学院",
      "长江大学",
      "江汉石油学院",
      "武汉工程大学",
      "武汉化工学院",
      "中国地质大学（武汉）",
      "武汉地质学院",
      "武汉纺织大学",
      "武汉科技学院",
      "武汉纺织工学院",
      "武汉轻工大学",
      "武汉粮食工业学院",
      "武汉理工大学",
      "武汉工业大学",
      "武汉建筑材料工业学院",
      "武汉交通科技大学",
      "武汉水运工程学院",
      "武汉汽车工业大学",
      "武汉工学院",
      "湖北工业大学",
      "华中农业大学",
      "湖北中医药大学",
      "华中师范大学",
      "湖北大学",
      "中南财经政法大学",
      "中南财经大学",
      "中南政法学院",
      "武汉体育学院",
      "湖北美术学院",
      "中南民族大学",
      "江汉大学",
      "三峡大学",
      "葛洲坝水电工程学院",
      "武汉音乐学院"
    ],
    "湖南省": [
      "湘潭大学",
      "湖南大学",
      "湖南财经学院",
      "中南大学",
      "中南工业大学",
      "中南矿冶学院",
      "长沙铁道学院、",
      "湖南医科大学",
      "湖南科技大学",
      "湘潭工学院",
      "长沙理工大学",
      "长沙电力学院",
      "长沙交通学院",
      "湖南农业大学",
      "中南林业科技大学",
      "中南林学院",
      "湖南中医药大学",
      "湖南师范大学",
      "湖南商学院",
      "南华大学",
      "中南工学院",
      "衡阳工学院",
      "衡阳医学院",
      "长沙医学院",
      "长沙学院",
      "湖南工程学院",
      "湖南财政经济学院",
      "湖南工业大学",
      "株洲工学院",
      "湖南冶金职业技术学院",
      "湖南城建职业技术学院",
      "湖南高速铁路职业技术学院",
      "湖南铁路科技职业技术学院"
    ],
    "广西壮族自治区": [
      "广西大学",
      "广西科技大学",
      "广西工学院",
      "桂林电子科技大学",
      "桂林电子工业学院",
      "桂林理工大学",
      "桂林工学院",
      "桂林冶金地质学院",
      "广西医科大学",
      "广西中医药大学",
      "桂林医学院",
      "广西师范大学",
      "桂林航天工业学院",
      "桂林旅游学院",
      "柳州铁道职业技术学院"
    ],
    "海南省": [
      "海南大学",
      "华南热带作物学院",
      "海南热带海洋学院",
      "海南师范大学",
      "海南医学院"
    ],
    "重庆市": [
      "重庆大学",
      "重庆建筑大学",
      "重庆建筑工程学院",
      "重庆邮电大学",
      "重庆邮电学院",
      "重庆交通大学",
      "重庆交通学院",
      "重庆医科大学",
      "西南大学",
      "西南农业大学",
      "西南师范大学",
      "四川外国语大学",
      "西南政法大学",
      "四川美术学院",
      "重庆科技学院",
      "重庆理工大学",
      "重庆工商大学",
      "重庆电力高等专科学校"
    ],
    "四川省": [
      "四川大学",
      "成都科学技术大学",
      "华西医科大学",
      "西南交通大学",
      "电子科技大学",
      "成都电讯工程学院",
      "西南石油大学",
      "成都理工大学",
      "成都理工学院",
      "成都地质学院",
      "西南科技大学",
      "西南工学院",
      "四川建筑材料工业学院",
      "中国民用航空飞行学院",
      "成都中医药大学",
      "西南财经大学",
      "西南民族大学"
    ],
    "贵州省": [
      "贵州大学",
      "贵州医科大学"
    ],
    "云南省": [
      "云南大学",
      "昆明理工大学",
      "昆明工学院",
      "云南农业大学",
      "西南林业大学",
      "昆明医科大学",
      "云南财经大学"
    ],
    "陕西省": [
      "西北大学",
      "西安交通大学",
      "西北工业大学",
      "西安理工大学",
      "陕西机械学院",
      "西安电子科技大学",
      "西安工业大学",
      "西安建筑科技大学",
      "陕西科技大学",
      "西北轻工业学院",
      "长安大学",
      "西安公路交通大学",
      "西安公路学院",
      "西安工程学院",
      "西北建设工程学院",
      "西北农林科技大学",
      "陕西中医药大学",
      "陕西师范大学",
      "西北政法大学",
      "西安邮电大学"
    ],
    "甘肃省": [
      "兰州大学",
      "兰州理工大学",
      "甘肃工业大学",
      "兰州交通大学",
      "甘肃中医药大学",
      "西北师范大学"
    ],
    "军队武警院校": [
      "解放军国防大学",
      "解放军国防科技大学",
      "解放军陆军指挥学院",
      "解放军陆军工程大学",
      "解放军陆军步兵学院",
      "解放军陆军装甲兵学院",
      "解放军陆军炮兵防空兵学院",
      "解放军陆军航空兵学院",
      "解放军陆军特种作战学院",
      "解放军陆军边海防学院",
      "解放军陆军防化学院",
      "解放军陆军军医大学 (第三军医大学）",
      "解放军陆军军事交通学院",
      "解放军陆军勤务学院",
      "解放军海军指挥学院",
      "解放军海军工程大学",
      "解放军海军大连舰艇学院",
      "解放军海军潜艇学院",
      "解放军海军航空大学",
      "解放军海军军医大学 (第二军医大学）",
      "解放军海军勤务学院",
      "解放军海军士官学校",
      "解放军空军指挥学院",
      "解放军空军工程大学",
      "解放军空军航空大学",
      "解放军空军预警学院",
      "解放军空军哈尔滨飞行学院",
      "解放军空军石家庄飞行学院",
      "解放军空军西安飞行学院",
      "解放军空军军医大学 (第四军医大学）",
      "解放军空军勤务学院",
      "解放军空军通信士官学校",
      "解放军火箭军指挥学院",
      "解放军火箭军工程大学",
      "解放军火箭军士官学校",
      "解放军战略支援部队航天工程大学",
      "解放军战略支援部队信息工程大学",
      "武装警察部队指挥学院",
      "武装警察部队工程大学",
      "武装警察部队警官学院",
      "武装警察部队特种警察学院",
      "武装警察部队后勤学院",
      "武装警察部队士官学校"
    ],
    "境外院校": [
      "香港大学",
      "香港城市大学",
      "香港理工大学",
      "英国牛津大学",
      "英国华威大学",
      "英国兰卡斯特大学",
      "英国纽卡斯尔大学",
      "英国萨里大国际商管学院   ",
      "英国威尔士大学",
      "英国中央兰开夏大学",
      "美国纽约大学",
      "美国佛罗里达大学",
      "加拿大皇家大学",
      "西班牙巴塞罗那自治大学",
      "芬兰 拉彭兰达理工大学",
      "新加坡大学",
      "新加坡南洋理工大学"
    ],
    "其他院校（省内）": [
      "广东省委党校",
      "广东行政学院",
      "佛山市委党校",
      "广东广播电视大学",
      "广州广播电视大学",
      "揭阳广播电视大学",
      "广东社会科学大学",
      "广东政法学院",
      "广东建华职业技术学院",
      "广东省经济管理干部学院",
      "广州市公安管理干部学院",
      "广州石油大学",
      "广州科技干部学院",
      " 广州建设专修学院",
      "广州市财贸管理干部学院",
      "广东省电力高等专科学校",
      "广东建筑工程专科学校",
      "广东环境保护工程职业学校",
      "广东电力工业学校",
      "广东省机械学校",
      "广东省冶金工业学校",
      "广东省农机学校",
      "广东石油学校",
      "广东省邮电学校",
      "广东省财政职业技术学校",
      "广东财税学校",
      "广东财政学校",
      "广东物资学校",
      "广东省粮食学校",
      "广东省旅游学校",
      "广东省商业学校",
      "广东省团校",
      "广东省广播电视学校",
      "广东建设银行学校",
      "广东卫生学校",
      "中山医卫生学校",
      "广州警察学校",
      "广州市化工学校",
      "广州市司法学校",
      "揭阳师范学校",
      "汕头工艺美术学校",
      "汕头商业学校",
      "汕头卫生学校",
      "惠州商业学校",
      "肇庆银行学校"
    ]
  },
  provinceArr: ["广东省","北京市","天津市","河北省","山西省","内蒙古自治区","辽宁省","吉林省","黑龙江省","上海市","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广西壮族自治区","海南省","重庆市","四川省","贵州省","云南省","陕西省","甘肃省","军队武警院校","境外院校","其他院校（省内）"],
  firstINdustry: [
    '计算机软件',
    '销售管理',
    '市场/营销',
    '财务/审计/税务',
    '工程/机械/能源',
    '人力资源',
    '高级管理',
    '物流/仓储',
    '艺术/设计',
    '科研人员',
    '律师/法务',
    '教师/培训',
    '医院/医疗/护理',
    '咨询/顾问',
    '公务员',
    '在校学生',
    '储备干部/培训生/实习生',
    '交通运输服务',
    '其他',
    '翻译',
    '建筑工程',
    '银行',
    '行政/后勤',
    '计算机硬件',
    '互联网开发及应用',
    'IT-管理',
    'IT-品管、技术支持及其它',
    '通信技术',
    '电子/电器/半导体/仪器仪表',
    '销售人员',
    '销售行政及商务',
    '客服及技术支持',
    '证券/金融/投资',
    '保险',
    '生产/营运',
    '质量/安全管理',
    '技工',
    '服装/纺织/皮革',
    '采购',
    '贸易',
    '生物/制药/医疗器械',
    '广告',
    '公关/媒介',
    '影视/媒体',
    '写作/出版/印刷',
    '房地产',
    '物业管理',
    '餐饮/娱乐',
    '酒店/旅游',
    '美容/健身/体育',
    '百货/连锁/零售服务',
    '保安/家政/其他服务',
    '兼职',
    '汽车',
    '化工',
    '环保',
  ],
  secondIndustry: {
    0: ['高级软件工程师', '软件工程师', '软件UI设计师/工程师', '仿真应用工程师', 'ERP实施顾问(ORACLE/SAP)', 'ERP技术开发(ORACLE/SAP)', '需求工程师', '系统集成工程师', '系统分析员', '系统工程师', '数据库工程师/管理员', '系统架构设计师', '计算机辅助设计工程师', '其他'],
    1: ['销售总监', '销售经理', '销售主管', '业务拓展主管/经理', '渠道/分销总监', '渠道/分销经理', '渠道/分销主管', '客户经理/主管', '区域销售总监', '区域销售经理', '团购经理/主管', '其他'],
    2: ['市场/营销/拓展总监', '市场/营销/拓展经理', '市场/营销/拓展主管', '市场/营销/拓展专员', '市场助理', '市场分析/调研人员', '产品/品牌经理', '产品/品牌主管', '产品/品牌专员', '市场通路经理/主管', '市场通路专员', '市场企划经理/主管', '市场企划专员', '促销经理', '促销主管/督导', '促销员/导购', '选址拓展/新店开发', '其他'],
    3: ['首席财务官 CFO', '财务总监', '财务经理', '财务顾问', '财务主管/总帐主管', '会计经理/会计主管', '会计', '出纳员', '财务/会计助理', '会计文员', '固定资产会计', '财务分析经理/主管', '财务分析员', '成本经理/成本主管', '成本管理员', '审计经理/主管', '审计专员/助理', '税务经理/税务主管', '税务专员/助理', '统计员', '其他'],
    4: ['技术研发经理/主管', '技术研发工程师', '产品工艺/制程工程师', '产品规划工程师', '实验室负责人/工程师', '工程/设备经理', '工程/设备主管', '工程/设备工程师', '工程/机械绘图员', '工业工程师', '机械工程师', '结构工程师', '模具工程师', '机电工程师', '维修工程师', '铸造/锻造工程师/技师', '注塑工程师/技师', '焊接工程师/技师', '夹具工程师/技师', 'CNC工程师', '冲压工程师/技师', '锅炉工程师/技师', '电力工程师/技术员', '光源与照明工程', '汽车/摩托车工程师', '船舶工程师', '轨道工程师/技术员', '飞机维修机械师', '飞行器设计与制造', '水利/水电工程师', '石油天然气技术人员', '地质／地质勘测工程师', '其他'],
    5: ['人事总监', '人事经理', '人事主管', '人事专员', '人事助理', '招聘经理/主管', '招聘专员/助理', '薪资福利经理/主管', '薪资福利专员/助理', '绩效考核经理/主管', '绩效考核专员/助理', '培训经理/主管', '培训专员/助理/培训师', '企业文化/员工关系/工会管理', '人力资源信息系统专员', '其他'],
    6: ['首席执行官CEO/总裁/总经理', '首席运营官COO', '副总经理/副总裁', '合伙人', '总监', '办事处首席代表', '办事处/分公司/分支机构经理', '总裁助理/总经理助理', '其他'],
    7: ['物流总监', '物流经理', '物流主管', '物流专员/助理', '供应链总监', '供应链经理', '供应链主管/专员', '物料经理', '物料主管/专员', '仓库经理/主管', '仓库管理员', '运输经理/主管', '货运代理', '集装箱业务', '海关事务管理', '报关员', '单证员', '船务/空运陆运操作', '快递员', '调度员', '理货员', '其他'],
    8: ['平面设计', '动画/3D设计', '店面/陈列/展览设计', '多媒体设计', '包装设计', '工业/产品设计', '工艺品/珠宝设计鉴定', '家具/家居用品设计', '玩具设计', '其他'],
    9: ['科研管理人员', '科研人员'],
    10: ['律师/法律顾问', '律师助理', '法务经理', '法务主管/专员', '法务助理', '知识产权/专利顾问/专员', '其他'],
    11: ['大学教授', '讲师/助教', '中学教师', '小学教师', '幼教', '院校教务管理人员', '兼职教师', '家教', '职业技术教师', '培训师', '其他'],
    12: ['医院管理人员', '内科医生', '外科医生', '专科医生', '牙科医生', '麻醉医生', '美容整形师', '理疗师', '中医科医生', '针灸、推拿', '儿科医生', '心理医生', '营养师', '药库主任/药剂师', '医药学检验', '公共卫生/疾病控制', '护理主任/护士长', '护士/护理人员', '兽医', '验光师', '其他'],
    13: ['专业顾问', '咨询总监', '咨询经理', '专业培训师', '咨询员', '调研员', '猎头/人才中介', '情报信息分析人员', '其他'],
    14: ['公务员'],
    15: ['研究生', '大学/大专应届毕业生', '中专/职校生', '其他'],
    16: ['储备干部', '培训生', '实习生'],
    17: ['飞机机长/副机长', '空乘人员', '地勤人员', '列车车长', '列车司机', '乘务员', '船长/副船长', '船员', '司机', '其他'],
    18: ['驯兽师/助理驯兽师', '养殖部主管', '其他'],
    19: ['英语翻译', '日语翻译', '德语翻译', '法语翻译', '俄语翻译', '意大利语翻译', '西班牙语翻译', '葡萄牙语翻译', '阿拉伯语翻译', '韩语/朝鲜语翻译', '泰语翻译', '中国方言翻译', '其他语种翻译'],
    20: ['高级建筑工程师/总工', '建筑工程师', '结构/土木/土建工程师', '公路/桥梁/港口/隧道工程', '岩土工程', '电气工程', '给排水/暖通工程', '幕墙工程师', '城市规划与设计', '室内外装潢设计', '园艺/园林/景观设计', '测绘/测量', '建筑制图', '工程造价师/预结算经理', '预结算员', '建筑工程管理/项目经理', '建筑工程验收', '工程监理', '施工员', '其他'],
    21: ['行长/副行长', '资产评估/分析', '风险控制', '信贷管理/信用调查/分析人员', '进出口/信用证结算', '外汇交易', '清算人员', '高级客户经理/客户经理', '客户主管/专员', '银行柜员', '银行卡、电子银行业务推广', '其他'],
    22: ['行政总监', '行政经理/主管/办公室主任', '行政专员/助理', '经理助理/秘书', '前台接待/总机/接待生', '后勤', '图书管理员/资料管理员', '电脑操作员/打字员', '其他'],
    23: ['高级硬件工程师', '硬件工程师', '其他'],
    24: ['互联网软件开发工程师', '语音/视频开发工程师', '多媒体/游戏开发工程师', '网站营运经理/主管', '网站营运专员', '网络工程师', '系统管理员/网络管理员', '网站维护工程师', '网站架构设计师', 'UI设计师/顾问', '智能大厦/综合布线', '网络信息安全工程师', '网页设计/制作/美工', '网站编辑', '网站策划', '其他'],
    25: ['首席技术执行官CTO/首席信息官CIO', '技术总监/经理', '信息技术经理/主管', '信息技术专员', '项目总监', '项目经理', '项目主管', '项目执行/协调人员', '其他'],
    26: ['技术支持/维护经理', '技术支持/维护工程师', 'Helpdesk 技术支持', '计量工程师', '标准化工程师', '品质经理', '系统测试', '软件测试', '硬件测试', '测试员', '文档工程师', '技术文员/助理', '其他'],
    27: ['通信技术工程师', '有线传输工程师', '无线通信工程师', '电信交换工程师', '数据通信工程师', '移动通信工程师', '电信网络工程师', '通信电源工程师', '增值产品开发工程师', '其他'],
    28: ['集成电路IC设计/应用工程师', 'IC验证工程师', '电子工程师/技术员', '电子技术研发工程师', '电子/电器维修工程师/技师', '变压器与磁电工程师', '版图设计工程师', '电气工程师/技术员', '电路工程师/技术员(模拟/数字)', '电声/音响工程师/技术员', '激光/光电子技术', '半导体技术', '自动控制工程师/技术员', '电子软件开发(ARM/MCU...)', '嵌入式软件开发(Linux/单片机/DLC/DSP…)', '嵌入式硬件开发(主板机…)', '电池/电源开发', 'FAE 现场应用工程师', '工艺工程师', '家用电器/数码产品研发', '仪器/仪表/计量', '测试工程师', '其他'],
    29: ['销售代表', '渠道/分销专员', '客户代表', '销售工程师', '电话销售', '团购业务员', '经销商', '其他'],
    30: ['销售行政经理/主管', '销售行政专员/助理', '业务分析经理/主管', '业务分析专员/助理', '商务经理', '商务主管/专员', '商务助理', '销售助理', '其他'],
    31: ['客服总监(非技术)', '客服经理(非技术)', '客服主管(非技术)', '客服专员/助理(非技术)', '客户关系经理/主管', , '投诉专员', '售前/售后技术支持经理', '售前/售后技术支持主管', '售前/售后技术支持工程师', '咨询热线/呼叫中心服务人员', 'VIP专员', '其他'],
    32: ['证券/期货/外汇经纪人', '证券分析师', '股票/期货操盘手', '金融/经济研究员', '投资/基金项目经理', '投资/理财顾问', '投资银行业务', '融资经理/融资主管', '融资专员', '拍卖师', '其他'],
    33: ['保险精算师', '保险产品开发/项目策划', '保险业务经理/主管', '保险代理/经纪人/客户经理', '理财顾问/财务规划师', '储备经理人', '保险核保', '保险理赔', '保险客户服务/续期管理', '保险培训师', '保险内勤', '契约管理', '其他'],
    34: ['工厂经理/厂长', '总工程师/副总工程师', '项目经理/主管', '项目工程师', '营运经理', '营运主管', '生产经理/车间主任', '生产计划/物料管理(PMC)', '生产主管/督导/领班/组长', '生产文员', '化验员', '其他'],
    35: ['质量管理/测试经理(QA/QC经理)', '质量管理/测试主管(QA/QC主管)', '质量管理/测试工程师(QA/QC工程师)', '质量检验员/测试员', '可靠度工程师', '故障分析工程师', '认证工程师/审核员', '体系工程师/审核员', '安全/健康/环境经理/主管', '安全/健康/环境工程师', '供应商管理', '采购材料、设备质量管理', '其他'],
    36: ['技工', '钳工/机修工/钣金工', '电焊工/铆焊工', '车工/磨工/铣工/冲压工/锣工', '切割技工', '模具工', '电工', '叉车工', '空调工/电梯工/锅炉工', '水工/木工/漆工', '普工', '裁剪车缝熨烫', '汽车修理工', '其他'],
    37: ['服装/纺织设计总监', '服装/纺织设计', '面料辅料开发', '面料辅料采购', '服装/纺织/皮革跟单', '质量管理/验货员(QA/QC)', '板房/楦头/底格出格师', '服装打样/制版', '电脑放码员', '纸样师/车板工', '裁床', '其他'],
    38: ['买手', '采购总监', '采购经理', '采购主管', '采购员', '采购助理', '其他'],
    39: ['外贸/贸易经理/主管', '外贸/贸易专员/助理', '国内贸易人员', '业务跟单经理', '高级业务跟单', '业务跟单', '助理业务跟单', '其他'],
    40: ['生物工程/生物制药', '化学分析测试员', '医药技术研发管理人员', '医药技术研发人员', '临床研究员', '临床协调员', '药品注册', '药品生产/质量管理', '药品市场推广经理', '药品市场推广主管/专员', '医药招商', '医药销售经理/主管', '医药销售代表', '医疗设备注册', '医疗设备生产/质量管理', '医疗器械市场推广', '医疗器械销售', '医疗器械维修人员', '其他'],
    41: ['广告客户总监/副总监', '广告客户经理', '广告客户主管/专员', '广告创意/设计经理', '广告创意总监', '广告创意/设计主管/专员', '美术指导', '文案/策划', '企业/业务发展经理', '企业策划人员', '其他'],
    42: ['公关经理', '公关主管', '公关专员', '会务经理', '会务主管', '会务专员', '媒介经理', '媒介主管', '媒介专员', '公关/媒介助理', '媒介销售', '其他'],
    43: ['影视策划/制作人员', '导演/编导', '艺术/设计总监', '经纪人/星探', '演员/模特/主持人', '摄影师', '音效师', '配音员', '化妆师/造型师', '其他'],
    44: ['总编/副总编', '编辑/作家/撰稿人', '记者', '电话采编', '美术编辑', '排版设计', '校对/录入', '出版/发行', '电分操作员', '印刷排版/制版', '数码直印/菲林输出', '打稿机操作员', '调墨技师', '印刷机械机长', '晒版/拼版/装订/烫金技工', '其他'],
    45: ['房地产开发/策划经理', '房地产开发/策划主管/专员', '房产项目配套工程师', '房地产项目招标专员', '房地产评估', '房地产中介/交易', '房地产销售人员', '其他'],
    46: ['高级物业顾问/物业顾问', '物业管理经理/主管', '物业管理专员/助理', '物业招商/租赁/租售', '物业设施管理人员', '物业维修人员', '其他'],
    47: ['餐饮/娱乐管理', '餐饮/娱乐领班/部长', '餐饮/娱乐服务员', '传菜主管/传菜员', '礼仪/迎宾', '司仪', '行政主厨/厨师长', '厨师/面点师', '调酒师/吧台员', '茶艺师', '其他'],
    48: ['酒店/宾馆经理', '酒店/宾馆营销', '宴会管理', '大堂经理', '楼面经理', '前厅接待', '客房服务员/楼面服务员', '机场代表', '行李员', '管家部经理/主管', '清洁服务人员', '导游/旅行顾问', '订票/订房服务', '其他'],
    49: ['美容顾问/化妆', '美容助理/见席美容师', '瘦身顾问', '发型师', '发型助理/学徒', '美甲师', '按摩/足疗', '健身顾问/教练', '体育运动教练', '瑜伽/舞蹈老师', '宠物护理/美容', '其他'],
    50: ['店长/卖场经理/楼面管理', '店员/营业员', '防损员/内保', '收银主管/收银员', '理货员/陈列员/收货员', '导购员', '西点师/面包糕点加工', '生鲜食品加工/处理', '熟食加工', '兼职店员', '其他'],
    51: ['保安经理', '保安人员', '保镖', '寻呼员/话务员', '搬运工', '清洁工', '家政服务/保姆', '其他'],
    52: ['兼职'],
    53: ['汽车机构工程师', '汽车设计工程师', '汽车电子工程师', '汽车质量管理', '汽车安全性能工程师', '汽车装配工艺工程师', '汽车修理人员', '4S店经理/维修站经理', '汽车销售/经纪人', '二手车评估师', '其他'],
    54: ['化工技术应用/化工工程师', '化工实验室研究员/技术员', '涂料研发工程师', '配色技术员', '塑料工程师', '化妆品研发', '食品/饮料研发', '其他'],
    55: ['环保工程师', '污水处理工程师', '其他']
  },
  onLaunch: function() {
    return this.appReady();
  },
  appReady: function() {
    const app = this;
    const credentials = this.getCredentials();
    this.appReadyPromise = this.appReadyPromise || new Promise((resolve,reject) => {
      if (!credentials) {
        app.login().then(() => {
          resolve();
        }).catch(err=> {
          reject(err);
        });
      } else {
        wx.checkSession({
          success: function () {
            resolve();
          },
          fail: function () {
            app.expireCredentials();
            app.login().then(()=>{
              resolve();
            }).catch(err=> {
              reject(err);
            });
          }
        });
      }
    });
    return this.appReadyPromise;
  },
  /**
   * 微信登录，返回自定义session
   */
  login: function (){
    const app = this;
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res && res.code) {
            wx.request({
              url: `${serverUrl}/api/wechat/redeem`,
              header: {
                'Content-Type': 'application/json'
              },
              method: 'POST',
              data: {
                appid: appid,
                code: res.code
              },
              success: function (res) {
                if (res && res.statusCode === 200 && res.data) {
                  app.setCredentials(res.data.data);
                  return resolve();
                }
                reject(new Error('redeem credentials error!'));
              },
              fail: reject
            });
          } else {
            reject(new Error('wx.login error!'));
          }
        },
        fail: reject
      });
    });
  },
  /**
   * 清除 session
   */
  expireCredentials: function() {
    this.credentials = '';
  },
  /**
   * 缓存 session 到本地
   */
  setCredentials: function(credentials) {
    this.credentials = credentials;
  },
  /**
   * 从本地取出 session
   */
  getCredentials: function(){
    return this.credentials;
  },
  /**
   * 获取用户微信信息
   */
  getWxUserInfo: function() {
    return new Promise((resolve,reject) => {
      wx.getUserInfo({
        success: function(res) {
          resolve(res.userInfo);
        }
      });
    });
  },
  /**
   * 同步用户微信信息
   */
  synWxInfo: function(userInfo) {
    const app = this;
    if (!userInfo) {
      return Promise.resolve();
    }
    return this.appReady().then(() => {
      const onError = () => {
        throw new Error('redeem credentials error!');
      }
      const credentials = app.getCredentials();
      wx.request({
        url: `${serverUrl}/api/user/${credentials}`,
        header: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        data: {
          wxinfo: userInfo
        },
        success: function (res) {
          if (!res || res.statusCode !== 200) {
            onError();
          }
        },
        fail: onError,
      });
    });
  },
  /**
   * 获取用户认证状态
   */
  getApplyInfo: function () {
    const credentials = this.getCredentials();
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.serverUrl}/api/user/apply/${credentials}`,
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success(res) {
          const data = res && res.data && res.data.success ? res.data.data : null;
          resolve(data);
        },
        fail(err) {
          reject(err);
        }
      });
    });
  },
  wxDecrypt: function(encryptedData, iv) {
    const credentials = this.getCredentials();
    return new Promise((resolve,reject) => {
      wx.request({
        url: `${serverUrl}/api/wechat/${credentials}/decrypt`,
        header: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        data: {
          encryptedData,
          iv,
          appId: miniAppId,
        },
        success: function (res) {
          if (res && res.statusCode === 200 && res.data) {
            return resolve(res.data.data);
          }
          reject(new Error('decrypt data error!'));
        },
        fail: reject
      });
    });
  },
  /**
   * 获取用户信息
   */
  getUserInfo: function(){
    const credentials = this.getCredentials();
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.serverUrl}/api/user/${credentials}`,
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success(res) {
          const data = res && res.data && res.data.success ? res.data.data : null;
          resolve(data);
        },
        fail(err) {
          console.error(err)
          reject(err);
        }
      })
    });
  },
  /**
   * 修改用户信息
   */
  saveUserInfo(data) {
    const ctx = this;
    const credentials = this.getCredentials();
    return new Promise((resolve,reject) => {
      wx.request({
        url: `${this.serverUrl}/api/user/${credentials}`,
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data,
        success(res) {
          const {success,msg} = res.data;
          if (!success) {
            ctx.failAlert("请求失败！错误：" + msg);
            reject();
          } else {
            resolve();
          }
        },
        fail() {
          ctx.failAlert("请求失败！");
          reject();
        }
      });
    });
  },
  /**
   * 错误提示框
   */
  failAlert: function (str) {
    wx.showToast({
      title: str,
      icon: 'none',
      duration: 3000
    })
  },
});
