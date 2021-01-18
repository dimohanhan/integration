function getCookie (cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
}
function formatTime (myDate = new Date()) {
  const data = myDate
    .toLocaleDateString()
    .split('/')
    .map((item) => {
      if (item.length < 2) {
        return 0 + item;
      }
      return item;
    });
  const curData = data.join('-'); // 当前日期 yyyy-MM-dd
  const curTime = myDate
    .toTimeString()
    .split(':')
    .join(' ')
    .split(' ')
    .slice(0, 3)
    .join(':');
  let milliSeconds = new Date().getMilliseconds().toString();
  if (milliSeconds.length === 1) {
    milliSeconds = `00${milliSeconds}`;
  } else if (milliSeconds.length === 2) {
    milliSeconds = `0${milliSeconds}`;
  }
  return `${curData} ${curTime}:${milliSeconds}`;
}
function getQueryString (name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return null;
}
function useridUc (url) {
  // eslint-disable-next-line no-undef
  const token = login(url);
  console.log(token);
}
export { useridUc, getQueryString, getCookie, formatTime, }