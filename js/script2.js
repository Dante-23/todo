const select = document.getElementsByTagName('select')[0];
select.addEventListener('change', function(){
    const div = document.getElementById("division");
    if(div.hasChildNodes){
        div.removeChild(div.childNodes[0]);
    }
    if(this.value !== -1){
        make_chart(this.value);
    }
});

const first_button = document.getElementById('first_button');
const second_button = document.getElementById('second_button');
const third_button = document.getElementById('third_button');
const fourth_button = document.getElementById('fourth_button');

first_button.addEventListener('click', clear_cache);
third_button.addEventListener('click', clear_cache);
second_button.addEventListener('click', function(){
    document.getElementById('first').classList.add('hidden');
    document.getElementById('second').classList.remove('hidden');
});
fourth_button.addEventListener('click', function(){
    document.getElementById('second').classList.add('hidden');
    document.getElementById('first').classList.remove('hidden');
});

const months = {
    "1": "January", "2": "Febuary", "3": "March", "4": "April", "5": "May", "6": "June", "7": "July", "8": "August", "9": "September", "10": "October", "11": "November", "12": "December"
};

function get_last12_months(){
    let date = new Date();
    let mon = date.getMonth();
    let t = 0;
    let last12 = [];
    while(mon >= 0){
        const key = String(date.getFullYear())+String(mon);
        t++;
        mon--;
        last12.push(key);
    }
    if(t < 12){
        mon = 11;
        while(t < 12){
            const key = String(date.getFullYear()-1)+String(mon);
            t++;
            mon--;
            last12.push(key);
        }
    }
    return last12;
}

function clear_cache(){
    let last12 = get_last12_months();
    for(let i = 0; i < last12.length; i++){
        for(let j = 1; j <= 31; j++){
            let key = last12[i]+String(j)+"todo";
            localStorage.removeItem(key);
            key = last12[i]+String(j)+"completed";
            localStorage.removeItem(key);
        }
    }
    localStorage.removeItem("todo");
    localStorage.removeItem("completed");
    location.reload();
}

function print_last12_months(){
    let last12 = get_last12_months();
    let arr = [];
    let mons = [];
    let years = [];
    for(let i = 0; i < last12.length; i++){
        let year, month;
        if(last12[i].length == 6){
            year = last12[i].substr(0,4);
            month = last12[i].substr(4,2);
        }
        else{
            year = last12[i].substr(0,4);
            month = last12[i].substr(4,1);
        }
        month = parseInt(month);
        mons.push(month);
        years.push(year);
        const str = months[month+1]+" "+year;
        arr.push(str);
    }
    let select = document.getElementById('main').childNodes[1].childNodes[1];
    for(let i = 0; i < arr.length; i++){
        let option = document.createElement('option');
        option.setAttribute('value', mons[i]+" "+years[i]);
        option.innerHTML = arr[i];
        select.appendChild(option);
    }
}

function get__y(mon_year, task){
    let key = "";
    let y = [];
    if(mon_year.length === 7){
        key+=mon_year.substr(3,4)+mon_year.substr(0,2);
    }
    else{
        key+=mon_year.substr(2,4)+mon_year.substr(0,1);
    }
    for(let i = 1; i <= 31; i++){
        const cache_key = key+String(i)+task;
        if(localStorage.getItem(cache_key)){
            y.push(JSON.parse(localStorage.getItem(cache_key)));
        }
        else y.push(0);
    }
    return y;
}

print_last12_months();
// code for chart starts here

function make_chart(value){
    var data = [ { label: "Data Set 1", 
               x: [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31], 
               y: get__y(value, "todo") }, 
             { label: "Data Set 2", 
               x: [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31], 
               y: get__y(value, "completed") } ] ;
    var xy_chart = d3_xy_chart()
        .width(960)
        .height(500)
        .xlabel("X Axis")
        .ylabel("Y Axis") ;
    var svg = d3.select("#division").append("svg")
        .datum(data)
        .call(xy_chart);

    function d3_xy_chart() {
        var width = 640,  
            height = 480, 
            xlabel = "X Axis Label",
            ylabel = "Y Axis Label" ;
    
        function chart(selection) {
            selection.each(function(datasets) {
                //
                // Create the plot. 
                //
                var margin = {top: 20, right: 80, bottom: 30, left: 50}, 
                    innerwidth = width - margin.left - margin.right,
                    innerheight = height - margin.top - margin.bottom ;
                
                var x_scale = d3.scale.linear()
                    .range([0, innerwidth])
                    .domain([ d3.min(datasets, function(d) { return d3.min(d.x); }), 
                            d3.max(datasets, function(d) { return d3.max(d.x); }) ]) ;
                
                var y_scale = d3.scale.linear()
                    .range([innerheight, 0])
                    .domain([ d3.min(datasets, function(d) { return d3.min(d.y); }),
                            d3.max(datasets, function(d) { return d3.max(d.y); }) ]) ;

                var color_scale = d3.scale.category10()
                    .domain(d3.range(datasets.length)) ;

                var x_axis = d3.svg.axis()
                    .scale(x_scale)
                    .orient("bottom") ;

                var y_axis = d3.svg.axis()
                    .scale(y_scale)
                    .orient("left") ;

                var x_grid = d3.svg.axis()
                    .scale(x_scale)
                    .orient("bottom")
                    .tickSize(-innerheight)
                    .tickFormat("") ;

                var y_grid = d3.svg.axis()
                    .scale(y_scale)
                    .orient("left") 
                    .tickSize(-innerwidth)
                    .tickFormat("") ;

                var draw_line = d3.svg.line()
                    .interpolate("basis")
                    .x(function(d) { return x_scale(d[0]); })
                    .y(function(d) { return y_scale(d[1]); }) ;

                var svg = d3.select(this)
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")") ;
                
                svg.append("g")
                    .attr("class", "x grid")
                    .attr("transform", "translate(0," + innerheight + ")")
                    .call(x_grid) ;

                svg.append("g")
                    .attr("class", "y grid")
                    .call(y_grid) ;

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + innerheight + ")") 
                    .call(x_axis)
                    .append("text")
                    .attr("dy", "-.71em")
                    .attr("x", innerwidth)
                    .style("text-anchor", "end")
                    .text(xlabel) ;
                
                svg.append("g")
                    .attr("class", "y axis")
                    .call(y_axis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", "0.71em")
                    .style("text-anchor", "end")
                    .text(ylabel) ;

                var data_lines = svg.selectAll(".d3_xy_chart_line")
                    .data(datasets.map(function(d) {return d3.zip(d.x, d.y);}))
                    .enter().append("g")
                    .attr("class", "d3_xy_chart_line") ;
                
                data_lines.append("path")
                    .attr("class", "line")
                    .attr("d", function(d) {return draw_line(d); })
                    .attr("stroke", function(_, i) {return color_scale(i);}) ;
                
                data_lines.append("text")
                    .datum(function(d, i) { return {name: datasets[i].label, final: d[d.length-1]}; }) 
                    .attr("transform", function(d) { 
                        return ( "translate(" + x_scale(d.final[0]) + "," + 
                                y_scale(d.final[1]) + ")" ) ; })
                    .attr("x", 3)
                    .attr("dy", ".35em")
                    .attr("fill", function(_, i) { return color_scale(i); })
                    .text(function(d) { return d.name; }) ;

            }) ;
        }

        chart.width = function(value) {
            if (!arguments.length) return width;
            width = value;
            return chart;
        };

        chart.height = function(value) {
            if (!arguments.length) return height;
            height = value;
            return chart;
        };

        chart.xlabel = function(value) {
            if(!arguments.length) return xlabel ;
            xlabel = value ;
            return chart ;
        } ;

        chart.ylabel = function(value) {
            if(!arguments.length) return ylabel ;
            ylabel = value ;
            return chart ;
        } ;

        return chart;
    }
}

// code for chart ends here