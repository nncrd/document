print() {
  // 隐藏不需要打印的元素
  this.showOp = false
  this.$nextTick(() => {
    this.winPrint()
  })
},
winPrint() {
  var that = this
  let timer,timer2,newStr,wind,cssUrl,nodeEnv,new_element;
  newStr = document.getElementById("subsidyTable").innerHTML;
  wind = window.open(
    "",
    "newwindow",
    "height=660, width=1000, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no"
  );
  wind.document.body.innerHTML = newStr;

  // 页内style样式
  let style = document.createElement("style");
  try {
    style.appendChild(document.createTextNode("*{text-align: center;}"));
  } catch(ex) {
    style.styleSheet.cssText = "*{text-align: center;}";//针对IE
  }
  wind.document.body.appendChild(style);

  new_element = document.createElement("link");
  new_element.setAttribute("rel", "stylesheet");
  new_element.setAttribute("style", "text/css");
 //针对开发环境和生产环境分别设置css
  cssUrl = "";
  nodeEnv = process.env.VUE_APP_MODE;
  if (nodeEnv === "development" || nodeEnv === "test") {
    cssUrl = process.env.VUE_APP_MAP_URL + "/css.css";
  } else if (nodeEnv === "production") {
    cssUrl = "https://xxx/css.css";
  }
  new_element.setAttribute(
    "href",
    cssUrl
  );
  wind.document.body.appendChild(new_element);

  clearTimeout(timer);
  clearTimeout(timer2);
  timer = setTimeout(() => {
    wind.window.print();
    timer2 = setTimeout(() => {
      wind.window.close();
      // 恢复隐藏元素
      that.showOp = true
    }, 0);
  }, 1000);
  return false;
}