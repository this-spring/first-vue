<!--
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-11-17 11:12:20
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-11-17 11:27:32
-->
# vue  

vue核心是要解决mvvm中数据变视图跟着一起变的问题，这里就涉及两个变，一个是数据变，一个是视图变。数据变很好理解，就是我们业务中数据改变。那么如何解决数据变时视图跟着一起改变呢，这是一个问题。抱着需求这个问题去看vue实现源码，就轻松很多了。  

假想一起如果如果让你去做这样的一个事你会怎么做？其实我想你能get到，那就是当数据变的时候拦截到，然后根据document.getElementById或者document.querySelectorAll选择到和数据相关联的数据，然后去改变里面的值。例如：  

```
<p>{{ msg }}</p>
转变
<p SelfTag="msg"><p>

经过这样转变我们就把数据和视图绑定了，同时通过数据也能选择上dom元素，当msg改变时我们可以这样操作：  

this.msg = 'xxq';
document.querySelectorAll("[SelfTag=msg]").forEach((el) => {
    el.textContent = newVal;
});
这里有一个关键点当我们thismsg = 'xxq'时候我们怎么能捕获到xxq这个值呢？所以这个时候就需要Object.defineProperty这个Api。我们就可以这样：  

Object.defineProperty(data, variable, {
    set: function (newVal) {
        document.querySelectorAll("[SelfTag=msg]").forEach((el) => {
            el.textContent = newVal;
        });
    },
    get: function () {
        return value;
    }
});

这样就实现了值改变的同时视图也改变了。
```  

通过以上例子，不知道你发现没有，vue核心在解决的就是数据变如何让视图也变，要实现这个就要知道，数据变了怎么选中相应的视图。如果让你抱着这个问题去看源码，或者让你自己实现一套解决这个问题的方式，不知道你是否更有思路。  


