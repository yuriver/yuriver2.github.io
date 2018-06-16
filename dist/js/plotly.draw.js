$(document).ready(function() {  
    function draw() {
        var f_domain = [ parseFloat($('#f-domain-min').val()), parseFloat($('#f-domain-max').val()) ];
        var g_domain = [ parseFloat($('#g-domain-min').val()), parseFloat($('#g-domain-max').val()) ];

        var f_full_define = $('#function-f-define').val();
        var g_full_define = $('#function-g-define').val();

        var f_define = f_full_define.split('=')[1];
        var g_define = g_full_define.split('=')[1];

        var expr;
        var gap = 0.5;
        
        var data = [];

        // evaluate the expression repeatedly for different values of x
        if( f_define != undefined ) {
            // f function
            expr = math.compile(f_define);            
            var f_xValues = math.range( f_domain[0], f_domain[1] + gap, gap).toArray();
            var f_yValues = f_xValues.map(function (x) {
                return expr.eval({x: x});
            });

            // trace f
            // render the plot using plotly
            var trace = {
                x: f_xValues,
                y: f_yValues,
                type: 'scatter',
                name: f_full_define
            };

            data.push( trace );
            
            $('#f-domain-container').css('display', 'inline-block');
        } else {
            $('#f-domain-container').css('display', 'none');
        }

        if( g_define != undefined ) {
            // g function
            expr = math.compile(g_define);
            var g_xValues = math.range( g_domain[0], g_domain[1] + gap, gap).toArray();
            var g_yValues = g_xValues.map(function(x) {
                return expr.eval({x: x});
            });

            // trace g
            var trace = {
                x: g_xValues,
                y: g_yValues,
                type: 'scatter',
                name: g_full_define
                
            };

            data.push( trace );

            $('#g-domain-container').css('display', 'inline-block');
        } else {            
            $('#g-domain-container').css('display', 'none');
        }
    
        var layout = {
            //hovermode:'closest', // hover시, 좌표 모드( 단일 그래프에서만 적용 )
            dragmode: 'pan',       // 드래깅 모드
            autosize: false,
            width: 350,
            height: 350,
            margin: {
                l: 30,
                r: 30,
                b: 20,
                t: 10,
                pad: 4
            },                        
            paper_bgcolor: '#ffffff',
            plot_bgcolor: '#ffffff',
            showlegend: true,               // 범례 표시 
            legend: {"orientation": "h"}    // 범례 위치
        };

        Plotly.newPlot('graph-container', data, layout, {displayModeBar: false});
    }

    draw();

    // 정의역 구간 변경 시 이벤트 발생
    $('.domain-input').each(function( index, element ) {     
    }).on('change', function() {        
        draw();
    });

    // 그래프 버튼 클릭 이벤트 발생
    $('.key.show-graph').click(function(e) {   
        draw();
    });
});