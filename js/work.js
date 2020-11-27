var countDownSeconds = 60; 
var cuntTime = 8; //每轮计时间，分
var endTime = 30; //结束提醒时间，秒
var handle = null; 
var workStat =0; //0停止 1 运行
var isTimeEndCountion = true; //计时到时后，是否继续计时，用于统计超时时间
var isHadRestTime = true;//点击停止计时后，是否需要重置时间操作


//window load 
function onLoadWindow() {     
    initShowTime();    
    workStat = 0;
} 

function updateCanvasText(theContext,isEnding){
    timeDisplayCanvas = document.getElementById("countdownCanvas"); 
    timeDisplayContext2D = timeDisplayCanvas.getContext("2d"); 
    timeDisplayContext2D.clearRect(0,0,timeDisplayCanvas.width,timeDisplayCanvas.height);
    timeDisplayContext2D.font = "78pt Century Gothic"; 
    timeDisplayContext2D.textAlign = "center";
    timeDisplayContext2D.textBaseline = "middle";
    if(isEnding){
        timeDisplayContext2D.fillStyle = "red";
    }
    else{
        timeDisplayContext2D.fillStyle = "#551a8b";
    }    
    timeDisplayContext2D.fillText(theContext, timeDisplayCanvas.width / 2, timeDisplayCanvas.height / 2); 
}

function updateCanvas() { 
    if (countDownSeconds < 0) { 
        if(!isTimeEndCountion) {
            clearInterval(handle); 
            handle = null; 
            alert("计时时间到!"); 
            return 0; 
        }
    } 
    minStr = Math.floor(Math.abs(countDownSeconds) / 60); 
    secStr = Math.abs(countDownSeconds) % 60; 
    if (minStr < 10) { 
        minStr = "0" + minStr; 
    } 
    if (secStr < 10) { 
        secStr = "0" + secStr; 
    } 

    if(countDownSeconds < 0){
        minStr = "- " + minStr;
    }

    var isEndTime = false;
    if(countDownSeconds <= endTime)
        isEndTime = true;
    //context.clearRect(0, 0, width, height); 
    //context.font = "24pt Century Gothic"; 
    updateCanvasText(minStr + " : " + secStr,isEndTime);
    countDownSeconds--; 
}


function startWorkCountDown() { 

    if(workStat ===0)
    {
        workStat =1;//开台运行
        if (handle != null) { 
            clearInterval(handle); 
        } 
        countDownSeconds = document.getElementById("workIntervalInput").value * 60; 
        timeDisplayCanvas = document.getElementById("countdownCanvas"); 
        btStart = document.getElementById("bt_start"); 
        btStart.value = "停止计时";
        timeDisplayContext2D = timeDisplayCanvas.getContext("2d"); 
        updateCanvas(timeDisplayContext2D, timeDisplayCanvas.width, timeDisplayCanvas.height); 
        handle = setInterval(function() { 
            updateCanvas(timeDisplayContext2D, timeDisplayCanvas.width, timeDisplayCanvas.height); 
        }, 1000); 
        
    }
    else if(workStat === 1)
    {
        workStat =0;
        if (handle != null) { 
            clearInterval(handle); 
        } 

        countDownSeconds = document.getElementById("workIntervalInput").value * 60; 
        timeDisplayCanvas = document.getElementById("countdownCanvas"); 
        btStart = document.getElementById("bt_start"); 
        btStart.value = "开始计时";
        timeDisplayContext2D = timeDisplayCanvas.getContext("2d"); 
        updateCanvas(timeDisplayContext2D, timeDisplayCanvas.width, timeDisplayCanvas.height); 
    }
} 


function startRestCountDown() { 
    if (handle != null) { 
        clearInterval(handle); 
    } 

    btStart = document.getElementById('btstart'); 

    if(workStat === 0){
        workStat = 1;   
        btStart.value = "停止计时";
        updateCanvas();
        handle = setInterval(function() { 
            updateCanvas(); 
        }, 1000); 
    }
    else if(workStat === 1){
        if(isHadRestTime){
            workStat = 2;    
            btStart.value = "重置计时";
        }
        else{
            workStat = 0;
            countDownSeconds = cuntTime * 60;//后台把时间重置，界面不重置，便于查看当前使用时间，并开始时直接用重置后的时间
            btStart.value = "开始计时";
        }
    }
    else if(workStat === 2){
        workStat = 0;
        initShowTime();
        btStart.value = "开始计时";
    }

}

function initShowTime(){
    countDownSeconds = cuntTime * 60;// document.getElementById("restIntervalInput").value * 60;         
    updateCanvas(); 
}