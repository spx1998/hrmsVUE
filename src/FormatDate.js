let DateUtils = {

    /**
     * @return {string}
     */
    FormatDate: function FormatDate(dateStr) {
        let data = dateStr.split('-');
        dateStr = data[0]+'年'+data[1]+'月'+data[2]+'日';
        // dateStr = dateStr + "年";
        // dateStr = dateStr.replace(',', '日');
        // let date = dateStr.split(" ");
        // date[0] = this.ChineseToNumber(date[0].replace("月", "")) + "月";
        // dateStr = date[2] + date[0] + date[1];
        return dateStr;
    },

    /**
     * @return {number}
     */
    ChineseToNumber: function ChineseToNumber(chnStr) {
        let rtn = 0;
        let section = 0;
        let number = 0;
        let secUnit = false;
        let str = chnStr.split('');

        for (let i = 0; i < str.length; i++) {
            let num = chnNumChar[str[i]];
            if (typeof num !== 'undefined') {
                number = num;
                if (i === str.length - 1) {
                    section += number;
                }
            } else {
                let unit = chnNameValue[str[i]].value;
                secUnit = chnNameValue[str[i]].secUnit;
                if (secUnit) {
                    section = (section + number) * unit;
                    rtn += section;
                    section = 0;
                } else {
                    section += (number * unit);
                }
                number = 0;
            }
        }
        return rtn + section;
    }
};
let chnNumChar = {
    零: 0,
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9
};
let chnNameValue = {
    十: {value: 10, secUnit: false},
    百: {value: 100, secUnit: false},
    千: {value: 1000, secUnit: false},
    万: {value: 10000, secUnit: true},
    亿: {value: 100000000, secUnit: true}
};
export default DateUtils