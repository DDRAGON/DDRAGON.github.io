

/**
 * １年間の全ての日付を取得するJSONを作成する
 * 月毎にキーを分ける
 * @param {number} year 年
 */
function createJSON(year) {
  const json = {};
  const date = new Date(year, 0, 1);
  for (let i = 0; i <= 365; i++) {
    const month     = date.getMonth() + 1;
    const day       = date.getDate();
    const dayOfWeek = date.getDay();
    const isHoliday = dayOfWeek === 0 || dayOfWeek === 6;
    const dayOfWeekStr = convertDayOfWeek(dayOfWeek);
    if (!json[month]) {
      json[month] = {};
    }

    // もし祝日があれば名前を入れる
    if(closeDaysJSON[year] && closeDaysJSON[year][month] && closeDaysJSON[year][month][day]) {
      json[month][day] = {
        name: closeDaysJSON[year][month][day],
        dayOfWeek: dayOfWeekStr,
        isHoliday: true,
      };
    } else { // そうでなければ
      json[month][day] = {
        name: '',
        dayOfWeek: dayOfWeekStr,
        isHoliday,
      };
    }

    // 次の日に進める
    date.setDate(date.getDate() + 1);
  }
  return json;
}

/**
 * 曜日の数字を１文字の日本語に変換する
 */
function convertDayOfWeek(dayOfWeek) {
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return days[dayOfWeek];
}

const closeDaysJSON = {
  "2024": {
    "1": {
      "1": "元日",
      "2": "休場日",
      "3": "休場日",
      "8": "成人の日"
    },
    "2": {
      "12": "振替休日",
      "23": "天皇誕生日"
    },
    "3": {
      "20": "春分の日"
    },
    "4": {
      "29": "昭和の日"
    },
    "5": {
      "3": "憲法記念日",
      "6": "振替休日"
    },
    "7": {
      "15": "海の日"
    },
    "8": {
      "12": "振替休日"
    },
    "9": {
      "16": "敬老の日",
      "23": "振替休日"
    },
    "10": {
      "14": "スポーツの日"
    },
    "11": {
      "4": "振替休日"
    },
    "12": {
      "31": "休場日"
    }
  } 
};

console.log(JSON.stringify(createJSON(2024)));