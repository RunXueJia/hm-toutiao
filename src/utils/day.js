// console.log('dayjs');
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

// console.log(dayjs().to(dayjs('1990-01-01')));
// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'));
export const getrelativeTime = (time) => dayjs().to(dayjs(time))
export const TimeToString = (time) => dayjs(time).format('YYYY-MM-DD')