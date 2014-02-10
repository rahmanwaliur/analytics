var max_crimes = function(){
    var community_1 = $('#community-1').text();
    var community_2 = $('#community-2').text();

    var max = 0;

    if(community_1){
        max = Math.max(max, window.crimes_data[community_1].year_2012, window.crimes_data[community_1].year_2013)
    }

    if(community_2){
        max = Math.max(max, window.crimes_data[community_2].year_2012, window.crimes_data[community_2].year_2013)
    }

    return max + 100;
};

var current_max_crimes = 0;

var show_crimes = function(community, community_id){
    var crimes = window.crimes_data[community];

    if(!crimes){
        return;
    }

    var data =  [
        {year: 2012, crimes: crimes.year_2012},
        {year: 2013, crimes: crimes.year_2013}
    ];

    var formatCount = d3.format(",d");

    var margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom,
        barHeight = height - 40;

    var computeX = d3.scale.ordinal()
        .domain([2012, 2013])
        .range([0, 200]);

    var max_crimes_selected = max_crimes();
    if (current_max_crimes != max_crimes_selected){
        current_max_crimes = max_crimes();
        var other_community_id = (community_id == 1) ? 2 : 1;
        show_crimes($('#community-' + other_community_id).text(), other_community_id);
    }

    var computeY = d3.scale.linear()
        .domain([0, max_crimes()])
        .range([barHeight, 0]);

    $("#community-crimes-" + community_id).empty();
    var svg = d3.select("#community-crimes-" + community_id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var bar = svg.selectAll(".bar")
        .data(data)
        .enter().append("g")
        .attr("class", function(d, index){
            var css_class = "bar";
            if(index == 1){
                if(data[1].crimes > data[0].crimes){
                    css_class += " red";
                }
            }
            return css_class;
        })
        .attr("transform", function(d) { return "translate(" + computeX(d.year) + "," + computeY(d.crimes) + ")"; });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", 180)
        .attr("height", function(d) { return barHeight - computeY(d.crimes); });

    bar.append("text")
        .attr("dy", ".75em")
        .attr("y", 6)
        .attr("x", 50)
        .attr("text-anchor", "middle")
        .text(function(d) { return formatCount(d.crimes); });

    svg.selectAll(".year")
        .data(data)
        .enter().append("g")
        .attr('class', 'year')
        .attr("transform", function(d) { return "translate(" + computeX(d.year) + "," + height + ")"; })
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", 50)
        .attr("width", 180)
        .text(function(d){return d.year;});

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

};