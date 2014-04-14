var myRecords = [
    {"起點": "海洋", "終點": "海洋生物", "類型": "contain","id": 0,  "關係": "包含", "反向關係": "隨便"},
    {"起點": "海洋生物", "終點": "脊椎動物", "類型": "contain", "id": 1, "關係": "包含", "反向關係": "隨便"},
    {"起點": "脊椎動物", "終點": "魚綱", "類型": "contain", "id": 2, "關係": "包含", "反向關係": "隨便"},
    {"起點": "脊椎動物", "終點": "爬蟲綱", "類型": "contain", "id": 3, "關係": "包含", "反向關係": "隨便"},
    {"起點": "脊椎動物", "終點": "哺乳綱", "類型": "contain", "id": 4, "關係": "包含", "反向關係": "隨便"},
    {"起點": "魚綱", "終點": "無頷魚", "類型": "contain", "id": 5, "關係": "包含", "反向關係": "隨便"},
    {"起點": "魚綱", "終點": "軟骨魚", "類型": "contain", "id": 6, "關係": "包含", "反向關係": "隨便"},
    {"起點": "魚綱", "終點": "條鰭魚", "類型": "contain", "id": 7, "關係": "包含", "反向關係": "隨便"},
    {"起點": "爬蟲綱", "終點": "海龜科", "類型": "contain", "id": 8, "關係": "包含", "反向關係": "隨便"},
    {"起點": "哺乳綱", "終點": "鯨豚目", "類型": "contain", "id": 9, "關係": "包含", "反向關係": "隨便"},
    {"起點": "哺乳綱", "終點": "食肉目", "類型": "contain", "id": 10, "關係": "包含", "反向關係": "隨便"},
    {"起點": "無頷魚", "終點": "八目鰻", "類型": "contain", "id": 11, "關係": "包含", "反向關係": "隨便"},
    {"起點": "無頷魚", "終點": "盲鰻", "類型": "contain", "id": 12, "關係": "包含", "反向關係": "隨便"},
    {"起點": "軟骨魚", "終點": "魟魚", "類型": "contain", "id": 13, "關係": "包含", "反向關係": "隨便"},
    {"起點": "軟骨魚", "終點": "白眼鯊", "類型": "contain", "id": 14, "關係": "包含", "反向關係": "隨便"},
    {"起點": "軟骨魚", "終點": "鯨鯊", "類型": "contain", "id": 15, "關係": "包含", "反向關係": "隨便"},
    {"起點": "條鰭魚", "終點": "飛魚", "類型": "contain", "id": 16, "關係": "包含", "反向關係": "隨便"},
    {"起點": "條鰭魚", "終點": "翻車魨", "類型": "contain", "id": 17, "關係": "包含", "反向關係": "隨便"},
    {"起點": "條鰭魚", "終點": "鮭魚", "類型": "contain", "id": 18, "關係": "包含", "反向關係": "隨便"},
    {"起點": "條鰭魚", "終點": "比目魚", "類型": "contain", "id": 19, "關係": "包含", "反向關係": "隨便"},
    {"起點": "海龜科", "終點": "綠蠵龜", "類型": "contain", "id": 20, "關係": "包含", "反向關係": "隨便"},
    {"起點": "海龜科", "終點": "赤蠵龜", "類型": "contain", "id": 21, "關係": "包含", "反向關係": "隨便"},
    {"起點": "海龜科", "終點": "欖蠵龜", "類型": "contain", "id": 22, "關係": "包含", "反向關係": "隨便"},
    {"起點": "海龜科", "終點": "革龜", "類型": "contain", "id": 23, "關係": "包含", "反向關係": "隨便"},
    {"起點": "海龜科", "終點": "玳瑁", "類型": "contain", "id": 24, "關係": "包含", "反向關係": "隨便"},
    {"起點": "食肉目", "終點": "海豹科", "類型": "contain", "id": 25, "關係": "包含", "反向關係": "隨便"},
    {"起點": "食肉目", "終點": "海獅科", "類型": "contain", "id": 26, "關係": "包含", "反向關係": "隨便"},
    {"起點": "食肉目", "終點": "海象科", "類型": "contain", "id": 27, "關係": "包含", "反向關係": "隨便"},
    {"起點": "鯨豚目", "終點": "海豚科", "類型": "contain", "id": 28, "關係": "包含", "反向關係": "隨便"},
    {"起點": "鯨豚目", "終點": "鬚鯨", "類型": "contain", "id": 29, "關係": "包含", "反向關係": "隨便"},
    {"起點": "鬚鯨", "終點": "藍鯨", "類型": "contain", "id": 30, "關係": "包含", "反向關係": "隨便"},
    {"起點": "海洋", "終點": "海洋地質", "類型": "contain", "id": 31, "關係": "x", "反向關係": "隨便"},
    {"起點": "海洋地質", "終點": "海洋儀器與觀測", "類型": "contain", "id": 32, "關係": "探測", "反向關係": "隨便"},
    {"起點": "海洋地質", "終點": "海底地形", "類型": "contain", "id": 33, "關係": "分成", "反向關係": "隨便"},
    {"起點": "海洋儀器與觀測", "終點": "聲納", "類型": "contain", "id": 34, "關係": "分成", "反向關係": "隨便"},
    {"起點": "海洋儀器與觀測", "終點": "深海鑽探", "類型": "contain", "id": 35, "關係": "分成", "反向關係": "隨便"},
    {"起點": "海洋儀器與觀測", "終點": "溫鹽深儀", "類型": "contain", "id": 36, "關係": "分成", "反向關係": "隨便"},
    {"起點": "海洋儀器與觀測", "終點": "海地地震儀", "類型": "contain", "id": 37, "關係": "分成", "反向關係": "隨便"},
    {"起點": "深海鑽探", "終點": "古氣候", "類型": "contain", "id": 38, "關係": "重建", "反向關係": "隨便"},
    {"起點": "深海鑽探", "終點": "古海洋", "類型": "contain", "id": 39, "關係": "重建", "反向關係": "隨便"},
    {"起點": "溫鹽深儀", "終點": "鹽度", "類型": "contain", "id": 40, "關係": "探測", "反向關係": "隨便"},
    {"起點": "溫鹽深儀", "終點": "溫度", "類型": "contain", "id": 41, "關係": "探測", "反向關係": "隨便"},
    {"起點": "溫鹽深儀", "終點": "深度", "類型": "contain", "id": 42, "關係": "探測", "反向關係": "隨便"},
    {"起點": "海地地震儀", "終點": "地震", "類型": "contain", "id": 43, "關係": "了解", "反向關係": "隨便"},
    {"起點": "海底地形", "終點": "洋底盆地", "類型": "contain", "id": 44, "關係": "分成", "反向關係": "隨便"},
    {"起點": "海底地形", "終點": "中洋脊", "類型": "contain", "id": 45, "關係": "分成", "反向關係": "隨便"},
    {"起點": "海底地形", "終點": "大陸邊緣", "類型": "contain", "id": 46, "關係": "分成", "反向關係": "隨便"},
    {"起點": "海底地形", "終點": "海溝", "類型": "contain", "id": 47, "關係": "分成", "反向關係": "隨便"},
    {"起點": "溫鹽深儀", "終點": "水團", "類型": "contain", "id": 48, "關係": "知道", "反向關係": "隨便"},
    {"起點": "洋底盆地", "終點": "海底山", "類型": "contain", "id": 49, "關係": "細分", "反向關係": "隨便"},
    {"起點": "洋底盆地", "終點": "深海平原", "類型": "contain", "id": 50, "關係": "細分", "反向關係": "隨便"},
    {"起點": "深海鑽探", "終點": "玄武岩", "類型": "contain", "id": 51, "關係": "產生", "反向關係": "隨便"},
    {"起點": "溫鹽深儀", "終點": "大陸坡", "類型": "contain", "id": 52, "關係": "細分", "反向關係": "隨便"},
    {"起點": "溫鹽深儀", "終點": "大陸棚", "類型": "contain", "id": 53, "關係": "細分", "反向關係": "隨便"},
    {"起點": "大陸棚", "終點": "生產力高", "類型": "contain", "id": 54, "關係": "特性", "反向關係": "隨便"},
    {"起點": "大陸棚", "終點": "多樣性高", "類型": "contain", "id": 55, "關係": "特性", "反向關係": "隨便"},
    {"起點": "海獅科", "終點": "飛魚", "類型": "resolve", "id": 56, "關係": "吃食", "反向關係": "隨便"},
    {"起點": "海豚科", "終點": "藍鯨", "類型": "resolve", "id": 57, "關係": "追逐", "反向關係": "隨便"},
    {"起點": "聲納", "終點": "深度", "類型": "resolve", "id": 58, "關係": "測得", "反向關係": "隨便"},
    {"起點": "海溝", "終點": "地震", "類型": "resolve", "id": 59, "關係": "常發生", "反向關係": "隨便"},
    {"起點": "中洋脊", "終點": "地震", "類型": "resolve", "id": 60, "關係": "常發生", "反向關係": "隨便"}
];