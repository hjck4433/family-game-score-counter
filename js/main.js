$(function(){

  var start = 0;

  $('#btnOk').click(function(){

    $('#btnOk').remove();
    $('.pAmount').attr('disabled',true);

    var pNum = $('.pAmount').val(); //인원 수 

    console.log(pNum);

    $('.player').not('.player:first').remove();
    $('.player input').val("");
    

    for( var i = 1; i < pNum; i++) {
      $('.player:first').clone().appendTo('.pList');
    }

  });//#btnOk.click

  $('#calS').click(function(){

    $('.pName').attr('disabled',true);

    var pNum = $('.pAmount').val(); //인원 수 
    var scoreList = new Array; //등수를 위한 점수 배열

    for( var i =0; i < pNum; i++){
      //현재 점수 구하기
      var cPlayer = $('.player').eq(i);
      var newScore =Number(cPlayer.find('.pScore').val());
      var prevScore = Number(cPlayer.find('.score').text());
      var nowScore = Number(prevScore+newScore);

      cPlayer.find('.score').text(nowScore);
      
      //현재 점수에 따른 color 변경
      if(nowScore==0){ //0 = 검정
        cPlayer.find('.score').css({
          color: '#000'
        })

      }else if(nowScore>0){ //양수 = 파랑
        cPlayer.find('.score').css({
          color: 'blue'
        })

      }else if (nowScore<0){ //음수 = 빨강
        cPlayer.find('.score').css({
          color: 'red'
        })
      }
      
      //등수 배열에 순차적으로 점수값 추가
      scoreList.push(nowScore);
      
      //점수 기록 남기기
      if(start == 0) {

        var pName = cPlayer.find('.pName').val();

        if(i==0) {
          $('.pRecord').html('<li><span class="hName">'+pName+'</span> <span>'+nowScore+'</span></li>');
        }else if(i>0){
          $('.pRecord').append('<li><span class="hName">'+pName+'</span> <span>'+nowScore+'</span></li>');
        }
        
      }if(start > 0) {
        var scoHistory = $('.pRecord li').eq(i);
        scoHistory.append('<span>'+nowScore+'</span>');
      }



    } //점수구하기 for문

    $('.pScore').val(0); // 점수입력란 0으로 변경


    //현재 점수에 따른 순위 구하기
    function newRank (scoreList) {
      const len = scoreList.length;
      const answer = Array.from({length : len}, () => 1);

      for(let j=0; j < len; j++){
        for(let k = 0; k < len; k++){
          if (scoreList[k]>scoreList[j]) answer[j]++;
        }
      }
      return answer;

    }

    //순위 출력

    let nowRank = newRank(scoreList); //랭크 정보 배열
    
    for(let l = 0; l < pNum; l++){
      let giveRank = nowRank[l];
      let nowPlayer = $('.player').eq(l);
      nowPlayer.find('.rank').html(giveRank);
    }

    start++;

    
    

  });//#calS.click

  $('#reset').click(function(){ //리셋

    var confirmR = window.confirm("정말 리셋하시겠습니까?");

    if(confirmR == true){
      $('.pRecord li').remove();
      start = 0;
      $('.current span').text("");
      $('.pScore').val("");
    }else {
      return false;
    }


    

  }); //#reset.click

  

  

}); //jQuery()

