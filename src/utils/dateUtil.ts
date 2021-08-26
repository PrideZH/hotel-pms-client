export const dateFormat = (dateStr: any) => {
  const date: Date = new Date(dateStr);
  var year = date.getFullYear();
  var month =('0' + date.getMonth()).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  var hour = ('0' + date.getHours()).slice(-2);
  var minute = ('0' + date.getMinutes()).slice(-2);
  var second = ('0' + date.getSeconds()).slice(-2);
  return year + "-" + month  + "-" + day + " " + hour + ":" + minute + ":" + second;
}
