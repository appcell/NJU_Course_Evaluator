//=============================
//
//    copyright(c)Appcell
//
//=============================
host = window.location.host;

function send(ClassID)   //发送请求
{
	var url = "http://"+host+"/jiaowu/student/evalcourse/courseEval.do";
	var postStr    = "method=currentEvalItem&id="+ClassID+"&_=";
	var ajax = false;
	if(window.XMLHttpRequest)
	{ 
		ajax = new XMLHttpRequest();
		if (ajax.overrideMimeType) 
		{
			ajax.overrideMimeType("text/xml");
        }
	}
	else if (window.ActiveXObject) 
	{
		try 
		{
			ajax = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) 
		{
			try 
			{
				ajax = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e)
			{
			}
		}
	}

	if (!ajax) 
	{ 
		window.alert("卧槽~~有问题也");
		return false;
	}
    
	//======第一波=======
	ajax.open("POST", url, true);	
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	ajax.send(postStr);
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) 
		{
		}
		else
		{
			send(ClassID);
		}
	}


	//======第二波=======
	ajax.open("POST", "http://"+host+"/jiaowu/student/evalcourse/courseEval.do?method=submitEval", true);
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	postStr="question1=5&question2=5&question3=5&question4=5&question5=5&question6=5&question7=5&question8=5&question9=5&question10=5&question=+10&mulItem1=0&mulItem=+1&ta1=&sub=%E6%8F%90+++%E4%BA%A4";
	ajax.send(postStr);

	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) 
		{
			return 1;
		}
		else
		{
			send(ClassID);
		}

	}



}




function getById(sId) //获取元素
{   
	var aTemp = [], 
	aEle = document.getElementsByTagName('tr');  
	var pattern = new RegExp(sId);
	var j=0;
	for (var i=0; i<aEle.length; i++ )
	{  
		if (pattern.test(aEle[i].getAttribute("id")))
		{  
			aTemp.push(aEle[i]);
					
		}  
	}  
			
	return aTemp;  
}


function sleep(numberMillis)	//延迟
{
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true)
	{
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

function check()	//遍历评分
{
	var flag=0;
	var h=getById("tr");
	for(var i=0; i<h.length; i++)
	{
		sleep(1000);
		var aid=h[i].getAttribute("id");
		aid=aid.substring(2);

	}
	alert("评完啦！");
}


var s=getById("tr");
if(s.length!=0)
{
	var a=confirm("你确定要将所有课程自动评优吗？");
	if(a)
	{
		alert("由于教服平台的服务器太捉急，可能稍花一点时间，在提示评完之前请勿刷新哦~");
		check();
	}

}
