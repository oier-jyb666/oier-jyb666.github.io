    function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return '';
    }

    var webSocket = null;

    function onMessage(event) {
        document.getElementById('messages').innerHTML
            +=marked("---");
        var txt=event.data;
        document.getElementById('messages').innerHTML
            += txt;
    }

    function onOpen(event) {
        document.getElementById('messages').innerHTML
            = '链接成功';
    }

    function onError(event) {
        alert("发生错误");
    }

    function onClose(event) {
        alert("连接关闭");
    }

    function connect() {
        var sid,nickname;
        if(document.getElementById("id") && document.getElementById("name"))
        {
          sid=document.getElementById('id').value;
          nickname=document.getElementById('name').value;
        }
        else if(document.getElementById("name"))
        {
          sid="jyb666";
          nickname=document.getElementById('name').value;
        }
        else
        {
          sid = getQueryVariable("id");
          nickname = getQueryVariable("name");
        }
        if (sid == '' || nickname == '') {
            alert("房间号或用户名不能为空");
            return;
        }
        var url = 'ws://www.javashitang.com:8090/groupChat/' + sid + '/' + nickname;
        webSocket = new WebSocket(url);
        webSocket.onerror = function(event) {
            onError(event)
        };

        webSocket.onopen = function(event) {
            onOpen(event)
        };

        webSocket.onmessage = function(event) {
            onMessage(event)
        };

        webSocket.onclose = function(event) {
            onClose(event)
        };
    }

    function start() {
        var text = document.getElementById('content').value;
        text = "<br />" + marked(text);
        webSocket.send(text);
        document.getElementById('content').value = '';
    }

    connect();
