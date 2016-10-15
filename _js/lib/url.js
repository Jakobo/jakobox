// query options can override
const params = (function(){
  var query = window.ENV || {};
  var a = location.search.substr(1).split('&');
  for (var i = 0; i < a.length; i++) {
      var b = a[i].split('=');
      query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || true);
  }
  return query;
}());

export default params;
