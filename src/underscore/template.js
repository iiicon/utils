/**
 * 模板就是一段字符串
 */

{
  // 首先看一个使用的例子
  // 在html中
  `<ul id="name_list"></ul>

  <script type="text/html" id="user_tmpl">
      <%for ( var i = 0; i < users.length; i++ ) { %>
          <li>
              <a href="<%=users[i].url%>">
                  <%=users[i].name%>
              </a>
          </li>
      <% } %>
  </script>`;

  // 在js中
  var container = document.getElementById("name_list");
  var data = {
    users: [
      { name: "Kevin", url: "http://localhost" },
      { name: "Daisy", url: "http://localhost" },
      { name: "Kelly", url: "http://localhost" },
    ],
  };
  var precompile = template(document.getElementById("user_tmpl").innerHTML);
  var html = precompile(data);

  container.innerHTML = html;
}

// template 函数的思路
// 将 %> 替换成 p.push('
// 将 <% 替换成 ');
// 将 <%=xxx%> 替换成 ');p.push(xxx);p.push('
function tmpl(str, data) {
  var str = document.getElementById(str).innerHTML;

  var string =
    "var p = []; p.push('" +
    str
      .replace(/[\r\t\n]/g, "")
      .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
      .replace(/<%/g, "');")
      .replace(/%>/g, "p.push('") +
    "');";

  eval(string);

  return p.join("");
}

// 第二版 利用 new Function
function tmpl(str, data) {
  var str = document.getElementById(str).innerHTML;
  var fn = new Function(
    "obj",
    "var p = []; p.push('" +
      str
        .replace(/[\r\t\n]/g, "")
        .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
        .replace(/<%/g, "');")
        .replace(/%>/g, "p.push('") +
      "');return p.join('');"
  );

  return fn(data);
}

// 第三版 使用 with
function tmpl(str, data) {
  var str = document.getElementById(str).innerHTML;
  var fn = new Function(
    "obj",
    "var p = []; with(obj){p.push('" +
      str
        .replace(/[\r\t\n]/g, "")
        .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
        .replace(/<%/g, "');")
        .replace(/%>/g, "p.push('") +
      "');}return p.join('');"
  );

  return fn(data);
}

// 第四版
// 为了避免每一次data改变都去 new Function 所以返回一个函数，用这个函数根据不同的data去渲染html
function tmpl(str) {
  var str = document.getElementById(str).innerHTML;

  var fn = new Function(
    "obj",
    "var p = []; with(obj){p.push('" +
      str
        .replace(/[\r\t\n]/g, "")
        .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
        .replace(/<%/g, "');")
        .replace(/%>/g, "p.push('") +
      "');}return p.join('');"
  );

  var template = function (data) {
    return fn.call(this, data);
  };

  return template;
}

// 使用时
// var compiled = tmpl("user_tmpl");
// results.innerHTML = compiled(data);

// 正则
// . 和 \s\S 的区别就是无法匹配行终结符 \u2028 段落终结符 \u2029

/**
 * 模板引擎第五版
 */

var settings = {
  // 求值
  evaluate: /<%([\s\S]+?)%>/g,
  // 插入
  interpolate: /<%=([\s\S]+?)%>/g,
};

var escapes = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029",
};

var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

var template = function (text) {
  var source = "var __p='';\n";
  source = source + "with(obj){\n";
  source = source + "__p+='";

  var main = text
    .replace(escapeRegExp, function (match) {
      return "\\" + escapes[match];
    })
    .replace(settings.interpolate, function (match, interpolate) {
      return "'+\n" + interpolate + "+\n'";
    })
    .replace(settings.evaluate, function (match, evaluate) {
      return "';\n " + evaluate + "\n__p+='";
    });

  source = source + main + "';\n }; \n return __p;";

  console.log(source);

  var render = new Function("obj", source);

  return render;
};

var results = document.getElementById("container");

var data = {
  users: [
    { name: "Byron", url: "http://localhost" },
    { name: "Casper", url: "http://localhost" },
    { name: "Frank", url: "http://localhost" },
  ],
};

var text = document.getElementById("user_tmpl").innerHTML;
var compiled = template(text);
results.innerHTML = compiled(data);
