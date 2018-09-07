# 20180907-mvc-messageBoard


MVC是什么？

    View(视图)，看得见的东西。
告诉程序，我的代码是什么样子，在页面的哪一块。
    Model(数据)数据，所有与数据相关的操作，都放在里面。 
告诉程序，我的数据有哪些操作？如初始化(init)，获取数据(fetch)，保存数据(save)
    Controller(控制器)，控制其他的所有的代码。 
负责其他的所有事情，稍微复杂一点。

总的来说，MVC是一种代码组织形式，是组织代码的思想，不是任何一种框架，技术。
我们要做的事情是，把V和M传给C，C负责初始化M，对V进行操作

单向通信过程：Controller监听View在用户操作下的事件，View通知Controller，Controller调用Model的数据，
Model向Sever请求；Sever响应Model，Model返回数据给Controller，Controller更新View。