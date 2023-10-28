/*
 jQuery URL
 URL: https://github.com/ucoderdev/jquery-url
 Version: 1.0.0
 */

(function ($) {
  $.addPathname = function (pathname, queryParams) {
    var new_url = '';

    if (pathname != undefined && pathname != null && pathname != '') {
      var check_query_params = pathname.split('?');

      if (check_query_params.length == 2) {
        pathname = check_query_params[0];
      }

      if (pathname.charAt(0) == '/') {
        new_url += pathname;
      } else {
        new_url += '/' + pathname;
      }

      if (queryParams != undefined) {
        var queryParamsString = $.param(queryParams);

        if (queryParamsString != undefined && queryParamsString != '') {
          new_url = new_url + '?' + queryParamsString;
        }
      }
    }

    if (new_url != '') {
      history.pushState(null, null, new_url);
    }
  }

  $.addUrlParam = function (key, value) {
    if (key != undefined && key != '' && value != undefined && value != '') {
      var obj = {};
      var params = $.getUrlParams();

      if (params.obj !== null) {
        obj = Object.assign({}, params.obj);
      }

      obj[key] = value;

      $.setUrlParams(obj);
    }
  }

  $.getUrlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);

    if (results == null) {
      return null;
    }

    return decodeURI(results[1]) || 0;
  }

  $.getUrlParams = function (url) {
    var params = null;
    var searchParams = window.location.search.substring(1);

    if (url != undefined && url != null && url != '') {
      var urlArray = url.split('?');

      if (urlArray.length == 2) {
        searchParams = urlArray[1];
      } else {
        searchParams = url;
      }
    }

    if (searchParams !== undefined & searchParams != '') {
      var array = searchParams.split('&');

      if (array !== undefined) {
        params = {};

        $.each(array, function (i, value) {
          var data = value.split('=');

          if (data.length == 1) {
            params[data[0]] = '';
          } else if (data.length == 2) {
            params[data[0]] = data[1];
          }
        })
      }
    }

    return {
      obj: params,
      string: $.param(params)
    };
  }

  $.removeUrlParam = function (key) {
    if (key != undefined && key != '') {
      var obj = {};
      var params = $.getUrlParams();

      if (params.obj !== null) {
        obj = Object.assign({}, params.obj);
      }

      if (obj[key] != undefined) {
        delete obj[key];
      }

      $.setUrlParams(obj);
    }
  }

  $.setUrlParams = function (object) {
    var queryParams = $.param(object);

    if (queryParams != undefined && queryParams != '') {
      history.pushState(null, null, "?" + queryParams);
    } else {
      var url = window.location.href.split('?')[0];

      if (window.location.href != url) {
        history.pushState(null, null, url);
      }
    }
  }

  $.urlChange = function (url) {
    if (url != undefined && url != '') {
      history.pushState(null, null, url);
    }
  }

  $('[data-url]').click(function () {
    var action = $(this).data('url');

    if (action !== undefined && action != '') {
      var key = $(this).data('key');
      var value = $(this).data('value');
      var callback = $(this).data('callback');

      switch (action) {
        case 'add-param':
          $.addUrlParam(key, value);
          break;
        case 'remove-param':
          $.removeUrlParam(key);
          break;
        case 'remove-all-params':
          $.setUrlParams({});
          break;
      }

      // Callback
      if (callback != undefined && callback != '') {
        Function(callback)();
      }
    }
  });

  $('[data-url-change]').click(function () {
    var url = $(this).data('url-change');
    var callback = $(this).data('callback');

    // URL
    if (url != undefined) {
      $.urlChange(url);
    }

    // Callback
    if (callback != undefined && callback != '') {
      Function(callback)();
    }
  });

  $('[data-url-pathname]').click(function () {
    var pathname = $(this).data('url-pathname');
    var searchParamsString = $(this).data('params');
    var callback = $(this).data('callback');

    // Search params
    var searchParams = null;

    if (searchParamsString != undefined && searchParamsString != '') {
      var urlParams = $.getUrlParams(searchParamsString);

      if (urlParams.obj !== null) {
        searchParams = urlParams.obj;
      }

      console.log(searchParamsString, urlParams, searchParams);
    }

    // Add pathname
    $.addPathname(pathname, searchParams);

    // Callback
    if (callback != undefined && callback != '') {
      Function(callback)();
    }
  });
})(jQuery);