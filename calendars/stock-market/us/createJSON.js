

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
 * 曜日の数字を３文字の英語に変換する
 */
function convertDayOfWeek(dayOfWeek) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[dayOfWeek];
}

const closeDaysJSON = {
  "2024": {
    "1": {
      "1": "New Year's Day",
      "15": "Martin Luther King Jr. Day"
    },
    "2": {
      "19": "Washington's Birthday"
    },
    "3": {
      "29": "Good Friday"
    },
    "5": {
      "27": "Memorial Day"
    },
    "6": {
      "19": "Juneteenth National Independence Day"
    },
    "7": {
      "4": "Independence Day"
    },
    "9": {
      "2": "Labor Day"
    },
    "11": {
      "28": "Thanksgiving Day"
    },
    "12": {
      "25": "Christmas Day"
    }
  } 
};

console.log(JSON.stringify(createJSON(2024)));