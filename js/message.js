! function() {

    var view = document.querySelector('section.message')
    var model = {
        init: function() {
            console.log(2)
                // 初始化，该部分内容去leanCloud官网，帮助粘贴就好
            var APP_ID = '3ow4boWIRw6QKzJoGf2HePAa-gzGzoHsz'
            var APP_KEY = 'GX9fU6UBlLaM3SaMuFVUk0uG'
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        // 获取数据
        fetch: function() {
            console.log(5)
                // 读取数据并且表现在页面中
                // 从官网找到的批量查询，更改为自己的数据，利用map函数，找到对象中的attributes
            var query = new AV.Query('Message');
            console.log(query.find())
            return query.find() //promise对象

        },
        // 创建数据
        save: function(name, contain) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({ //promise对象
                name: name,
                contain: contain,
            })
        }
    }
    var controller = {
        view: null,
        messageList: null,
        form: null,
        model: null,
        init: function(view, model) {
            console.log(1)
            this.view = view
            this.model = model
            this.messageList = this.view.querySelector('#messageList')
            this.form = this.view.querySelector('#postMessageForm')
            this.model.init()
            this.loadMessages()
            this.bindEvents()

        },

        loadMessages: function() {
            console.log(3)
                // 读取数据并且表现在页面中
                // 从官网找到的批量查询，更改为自己的数据，利用map函数，找到对象中的attributes
            this.model.fetch().then((messages) => {
                console.log(6)
                    // 使用map映射，拿到message的attributes数据，并且以数组的形式存储
                    // 为什么会有attributes？打印一下message，便可以找到回调函数传入的值的内容
                let array = messages.map((item) => item.attributes)
                array.forEach(item => {
                    // foreach遍历数组，创建li标签，并且增加其内容
                    // 此时的item指代这个array数组中的每一项
                    let li = document.createElement('li')
                    li.innerText = item.name + ":" + item.contain
                    this.messageList.appendChild(li)
                });
            })
        },
        bindEvents: function() {
            console.log(4)

            let myForm = this.form
                // 给form表单增加监听，监听submit事件，这样无论点击submit还是回车都可以提交表单
            myForm.addEventListener('submit', function(e) {
                // 此处e表示表单对象
                // 阻止默认表单时间，即不跳转页面
                e.preventDefault()
                this.saveMessage()

            })

        },
        saveMessage: function() {
            let myForm = this.form
            let contain = myForm.querySelector('input[name=contain]').value
            let name = myForm.querySelector('input[name=name]').value
                // 在Message中存储提交的新的数据
            this.model.save(name, contain).then(function(object) {
                // promise，如果新数据已经添加到数据库，则执行
                // object表示增加那一项的对象
                console.log(object)
                    // 如果添加成功，可以window.location.reload()刷新页面
                    // window.location.reload()

                // 但是我们可以直接在页面添加一个li标签，更新数据，不需要刷新再把数据读取出来
                let addLi = document.createElement('li')
                addLi.innerText = object.attributes.name + ":" + object.attributes.contain
                messageList.appendChild(addLi)
                    // 讲input清空
                myForm.querySelector('input[name=contain]').value = ''
                myForm.querySelector('input[name=name]').value = ''
            })
        }
    }



    controller.init(view, model)

}.call()