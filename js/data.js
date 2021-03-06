var links=[
  {source: "海洋", target: "海洋生物", type: "contain", id: 1, relationship: "包含", revrel: "屬於"},
  {source: "海洋生物", target: "脊椎動物", type: "contain", id: 2, relationship: "包含", revrel: "屬於"},
  {source: "脊椎動物", target: "魚綱", type: "contain", id: 3, relationship: "包含", revrel: "屬於"},
  {source: "脊椎動物", target: "哺乳綱", type: "contain", id: 4, relationship: "包含", revrel: "屬於"},
  {source: "魚綱", target: "無頷魚", type: "contain", id: 5, relationship: "包含", revrel: "屬於"},
  {source: "魚綱", target: "軟骨魚", type: "contain", id: 6, relationship: "包含", revrel: "屬於"},
  {source: "魚綱", target: "條鰭魚", type: "contain", id: 7, relationship: "包含", revrel: "屬於"},
  {source: "爬蟲綱", target: "海龜科", type: "contain", id: 8, relationship: "包含", revrel: "屬於"},
  {source: "哺乳綱", target: "鯨豚目", type: "contain", id: 9, relationship: "包含", revrel: "屬於"},
  {source: "哺乳綱", target: "食肉目", type: "contain", id: 10, relationship: "包含", revrel: "屬於"},
  {source: "無頷魚", target: "八目鰻", type: "contain", id: 11, relationship: "包含", revrel: "屬於"},
  {source: "無頷魚", target: "盲鰻", type: "contain", id: 12, relationship: "包含", revrel: "屬於"},
  {source: "軟骨魚", target: "魟魚", type: "contain", id: 13, relationship: "包含", revrel: "屬於"},
  {source: "軟骨魚", target: "白眼鯊", type: "contain", id: 14, relationship: "包含", revrel: "屬於"},
  {source: "軟骨魚", target: "鯨鯊", type: "contain", id: 15, relationship: "包含", revrel: "屬於"},
  {source: "條鰭魚", target: "飛魚", type: "contain", id: 16, relationship: "包含", revrel: "屬於"},
  {source: "條鰭魚", target: "翻車魨", type: "contain", id: 17, relationship: "包含", revrel: "屬於"},
  {source: "條鰭魚", target: "鮭魚", type: "contain", id: 18, relationship: "包含", revrel: "屬於"},
  {source: "條鰭魚", target: "比目魚", type: "contain", id: 19, relationship: "包含", revrel: "屬於"},
  {source: "海龜科", target: "綠蠵龜", type: "contain", id: 20, relationship: "包含", revrel: "屬於"},
  {source: "海龜科", target: "赤蠵龜", type: "contain", id: 21, relationship: "包含", revrel: "屬於"},
  {source: "海龜科", target: "欖蠵龜", type: "contain", id: 22, relationship: "包含", revrel: "屬於"},
  {source: "海龜科", target: "革龜", type: "contain", id: 23, relationship: "包含", revrel: "屬於"},
  {source: "海龜科", target: "玳瑁", type: "contain", id: 24, relationship: "包含", revrel: "屬於"},
  {source: "食肉目", target: "海豹科", type: "contain", id: 25, relationship: "包含", revrel: "屬於"},
  {source: "食肉目", target: "海獅科", type: "contain", id: 26, relationship: "包含", revrel: "屬於"},
  {source: "食肉目", target: "海象科", type: "contain", id: 27, relationship: "包含", revrel: "屬於"},
  {source: "鯨豚目", target: "海豚科", type: "contain", id: 28, relationship: "包含", revrel: "屬於"},
  {source: "鯨豚目", target: "鬚鯨", type: "contain", id: 29, relationship: "包含", revrel: "屬於"},
  {source: "鬚鯨", target: "藍鯨", type: "contain", id: 30, relationship: "包含", revrel: "屬於"},
  {source: "海洋", target: "海洋地質", type: "contain", id: 31, relationship: "包含", revrel: "屬於"},
  {source: "海洋地質", target: "海洋儀器與觀測", type: "contain", id: 32, relationship: "探測", revrel: "屬於"},
  {source: "海洋地質", target: "海底地形", type: "contain", id: 33, relationship: "分成", revrel: "屬於"},
  {source: "海洋儀器與觀測", target: "聲納", type: "contain", id: 34, relationship: "分成", revrel: "屬於"},
  {source: "海洋儀器與觀測", target: "深海鑽探", type: "contain", id: 35, relationship: "分成", revrel: "屬於"},
  {source: "海洋儀器與觀測", target: "溫鹽深儀", type: "contain", id: 36, relationship: "分成", revrel: "屬於"},
  {source: "海洋儀器與觀測", target: "海地地震儀", type: "contain", id: 37, relationship: "分成", revrel: "屬於"},
  {source: "深海鑽探", target: "古氣候", type: "contain", id: 38, relationship: "重建", revrel: "屬於"},
  {source: "深海鑽探", target: "古海洋", type: "contain", id: 39, relationship: "重建", revrel: "屬於"},
  {source: "溫鹽深儀", target: "鹽度", type: "contain", id: 40, relationship: "探測", revrel: "屬於"},
  {source: "溫鹽深儀", target: "溫度", type: "contain", id: 41, relationship: "探測", revrel: "屬於"},
  {source: "溫鹽深儀", target: "深度", type: "contain", id: 42, relationship: "探測", revrel: "屬於"},
  {source: "海地地震儀", target: "地震", type: "contain", id: 43, relationship: "了解", revrel: "屬於"},
  {source: "海底地形", target: "洋底盆地", type: "contain", id: 44, relationship: "分成", revrel: "屬於"},
  {source: "海底地形", target: "中洋脊", type: "contain", id: 45, relationship: "分成", revrel: "屬於"},
  {source: "海底地形", target: "大陸邊緣", type: "contain", id: 46, relationship: "分成", revrel: "屬於"},
  {source: "海底地形", target: "海溝", type: "contain", id: 47, relationship: "分成", revrel: "屬於"},
  {source: "溫鹽深儀", target: "水團", type: "contain", id: 48, relationship: "知道", revrel: "屬於"},
  {source: "洋底盆地", target: "海底山", type: "contain", id: 49, relationship: "細分", revrel: "屬於"},
  {source: "洋底盆地", target: "深海平原", type: "contain", id: 50, relationship: "細分", revrel: "屬於"},
  {source: "深海鑽探", target: "玄武岩", type: "contain", id: 51, relationship: "產生", revrel: "屬於"},
  {source: "溫鹽深儀", target: "大陸坡", type: "contain", id: 52, relationship: "細分", revrel: "屬於"},
  {source: "溫鹽深儀", target: "大陸棚", type: "contain", id: 53, relationship: "細分", revrel: "屬於"},
  {source: "大陸棚", target: "生產力高", type: "contain", id: 54, relationship: "特性", revrel: "屬於"},
  {source: "大陸棚", target: "多樣性高", type: "contain", id: 55, relationship: "特性", revrel: "屬於"},
  {source: "海獅科", target: "飛魚", type: "resolved", id: 56, relationship: "吃食", revrel: "屬於"},
  {source: "海豚科", target: "藍鯨", type: "resolved", id: 57, relationship: "追逐", revrel: "屬於"},
  {source: "聲納", target: "深度", type: "resolved", id: 58, relationship: "測得", revrel: "屬於"},
  {source: "海溝", target: "地震", type: "resolved", id: 59, relationship: "常發生", revrel: "屬於"},
  {source: "中洋脊", target: "地震", type: "resolved", id: 60, relationship: "常發生", revrel: "屬於"},
  {source: "脊椎動物", target: "爬蟲綱", type: "contain", id: 61, relationship: "包含", revrel: "屬於"},
];
