$(document).ready(function(){       
    var countAddFunc = 0;
    
    /* Modal의 버튼 처리*/
    $('.button').click(function() {
        var space_height = $(".space").height();
        var circle_height = $("#addfunc").height();
        var circle_width = $("#addfunc").width();
    
        if( countAddFunc < 4 ) { // 최대 추가할 수 있는 5개의 기능중 4개째를 추가 하려할 때
            $(".space").height(space_height-70);
            $("#addfunc").height(circle_height-40);
            $("#addfunc").width(circle_width-40);        
        } else {                 // 5개째를 추가하려 할 때
            $(".space").hide();
        }

        countAddFunc++;
    
        $( '#' + $(this).attr('add-func-name') ).css("display", "-webkit-box");
    });

    /* 각 삭제 버튼 클릭 이벤트 */
    $('.btn.remove').click(function() {        
        $(this).parent().css("display", "none");

        if(countAddFunc > 4) {            
            $(".space").show();
        } else {
            var space_height = $(".space").height();
            var circle_height = $("#addfunc").height();
            var circle_width = $("#addfunc").width();

            $(".space").height(space_height+70);
            $("#addfunc").height(circle_height+40);
            $("#addfunc").width(circle_width+40);
        }        

        countAddFunc--;
    });

    /* 수식 입력 처리 */
    var parser = math.parser();

    var displayValue = '0';
    $('#result').text(displayValue);

    $('.key').each(function(index, key){   
        $(this).click(function(e){                
            if( $(this).text().indexOf('Graph') != -1 ) return;
            /* >, <, >=, <=
             * A operator B 꼴 일때,
             * A가 0일때 0이 지워짐으로 해당 처리가 필요
             */   
            if(displayValue == '0' && (
                $(this).text() != "==" &&
                $(this).text() != ">" &&
                $(this).text() != "<" &&
                $(this).text() != ">=" &&
                $(this).text() != "<=" )) {

                displayValue = '';
            }

            if($(this).text() == 'EV') {
                try {
                    displayValue = parser.eval(displayValue).toString();
                    var tokens = displayValue.split(' ');
                    if(tokens[0] == 'function')
                    {   
                        text =  $('#result').text();
                        if(  text.indexOf('f(') != -1 ) {
                            $('#function-f-define').val( text );
                        } else if (  text.indexOf('g(') != -1 ) {
                            $('#function-g-define').val( text );
                        }

                        displayValue = tokens[0];
                    }                      
                    $('#result').text(displayValue);   
                    displayValue = '0';                    
                } catch (e) {
                    displayValue = '0';
                    if(displayValue != 'function')
                    {
                        $('#result').text(e);
                    } 
                    alert( e );
                    $('#result').text('please click the "Clear" button');                    
                }               
            } else {
                /* 전체 지우기 */
                if($(this).text() == 'CL') {
                    displayValue = '0';
                    $('#result').text(displayValue);
                /* 하나 지우기 */
                } else if ($(this).text() == 'C') {
                    if ( displayValue.length > 1 ) {
                        var length = displayValue.length;
                        var deleteOne = displayValue.substr(0, length -1);
                        $('#result').text( deleteOne );
                        displayValue = deleteOne;
                    } else {
                        $('#result').text('0');
                        displayValue = 0;
                    }
                } else if ($(this).text() == '') {
                    return;
                /* 
                 * 사용자 편의를 위한 괄호 자동 입력
                 */
                } else if ($(this).text() == 'exp') {
                    displayValue += 'exp(';
                    $('#result').text(displayValue);
                } else if ($(this).text() == 'log') {
                    displayValue += 'log(';
                    $('#result').text(displayValue);
                } else if ($(this).text() == 'sqrt') {
                    displayValue += 'sqrt(';
                    $('#result').text(displayValue);
                } else if ($(this).text() == '√2') {
                    displayValue += 'sqrt(2)';
                    $('#result').text(displayValue);
                } else if ($(this).text() == '√3') {
                    displayValue += 'sqrt(3)';
                    $('#result').text(displayValue);
                } else if ($(this).text() == '√5') {
                    displayValue += 'sqrt(5)';
                    $('#result').text(displayValue);
                } else if ($(this).text() == "inv") {
                    displayValue += 'inv([';
                    $('#result').text(displayValue);
                } else if ($(this).text() == "det") {
                    displayValue += 'det([';
                    $('#result').text(displayValue);
                } else if ($(this).text() == "f") {
                    displayValue += 'f(';
                    $('#result').text(displayValue);
                } else if ($(this).text() == "g") {
                    displayValue += 'g(';
                    $('#result').text(displayValue);
                } else if ($(this).text() == "sin") {
            		displayValue += 'sin';
                    $('#result').text(displayValue);
				} else if ($(this).text() == "cos") {
					displayValue += 'cos';
                    $('#result').text(displayValue);
				} else if ($(this).text() == "tan") {
					displayValue += 'tan';
                    $('#result').text(displayValue);
				} else if ($(this).text() == "exp") {
					displayValue += 'exp';
                    $('#result').text(displayValue);
				} else if ($(this).text() == "log") { 
					displayValue += 'log';
                    $('#result').text(displayValue);               
                } else if ($(this).text() == "sqrt") { 	
					displayValue += 'sqrt';
                    $('#result').text(displayValue);               
                } else {                        
                    displayValue += $(this).text();
                    $('#result').text(displayValue);
                }
            }

            e.preventDefault()
        })
    })
});


$(document).on('opening', '.remodal', function () {
    // 해당 버튼이 추가 되었음에 따라 보여지고 안보여지고
    $('#logical').toggle( $('#funcLogical').css('display') == 'none' )
    $('#detvec').toggle( $('#funcDetvec').css('display') == 'none' )
    $('#trietc').toggle( $('#funcTrietc').css('display') == 'none' )
    $('#consts').toggle( $('#funcConsts').css('display') == 'none' )
    $('#varfun').toggle( $('#funcVarfun').css('display') == 'none' )
});

$(document).on('opened', '.remodal', function () {
    //console.log('opened');
});

$(document).on('closing', '.remodal', function (e) {
    //console.log('closing' + (e.reason ? ', reason: ' + e.reason : ''));
});

$(document).on('closed', '.remodal', function (e) {
    //console.log('closed' + (e.reason ? ', reason: ' + e.reason : ''));
});

$(document).on('confirmation', '.remodal', function () {
    //console.log('confirmation');
});

$(document).on('cancellation', '.remodal', function () {
    //console.log('cancellation');
});



//  Usage:
//  $(function() {
//
//    // In this case the initialization function returns the already created instance
//    var inst = $('[data-remodal-id=modal]').remodal();
//
//    inst.open();
//    inst.close();
//    inst.getState();
//    inst.destroy();
//  });

/*
//  The second way to initialize:
$('[data-remodal-id=modal2]').remodal({
    modifier: 'with-red-theme'
});
*/