window.common = {
    ajax:ajax
}

/**
 * 网络请求
 * param* url {string}
 * param* params {object}
 * param* success {func}
 * param error {func}
 * param method {string}
 * param contentType {string}
 */
function ajax(option) {
  var url = option.url;
  var params = option.params || {};
  var success = option.success;
  var error = option.error || null;
  var method = option.method || 'get';
  var headers = option.headers || null;
  var contentType = option.contentType || "application/json";
  $.ajax({
    url: url,
    method: method,
    data: method ==='post' ? JSON.stringify(params) : params,
    headers: {
      'x-client-token': sessionStorage.token,
    },
    contentType: contentType,
    type: 'json',
    success: function (res) {
      if (res.code === 200) {
        success(res.data);
      }else {
          console.log(res.msg);
      }
    },
    error: function (err) {
      if (error) {
        error(err);
      }
    }
  })
}
