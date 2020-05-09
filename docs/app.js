board = d3.select('#board')

n_vertices = 6;

adj_matrix = [[1, 1, 0, 0, 0, 0],
              [1, 1, 1, 0, 1, 0],
              [0, 1, 1, 0, 0, 0],
              [0, 0, 0, 1, 1, 0],
              [0, 1, 0, 1, 1, 1],
              [0, 0, 0, 0, 1, 1]];
lights = []
edges = []

build_graph(adj_matrix);

function generate_matrix(vertices){
    matrix = []
    for(i=0;i<vertices;i++){
        row = []

        for(j=0;j<vertices;j++){
            if(i===j){
                row.push(1);
            }
            else if(i<j){
                val = Math.random()
                if(Math.pow(vertices,0.7)*val>1){
                    row.push(0);
                }else{
                    row.push(1);
                }
                
            }
            else if(i>j){
                row.push(matrix[j][i]);
            };
        }
        matrix.push(row);

    }
    return matrix;
    
    
};

function change_color(element){
    if(element.attr('fill')=='yellow'){
        element.attr('fill','black')
    } else if(element.attr('fill')=='black'){
        element.attr('fill','yellow')
    } 

}

function build_graph(matrix){
    lights = [];
    edges = [];
    interior = d3.select('#interior');
    n = matrix.length;
    c = []
    for(i=0;i<n;i++){
        c.push([400+300*Math.cos(2*Math.PI*i/n),400+300*Math.sin(2*Math.PI*i/n)])
    }

    if(n<=4){
        r = 100;
    } else if(n>4){
        r = 100*(4/n)
    }
    
    c.forEach(function(element,idx){
        
        new_light = interior.append('circle')
                .attr('cx',element[0])
                .attr('cy',element[1])
                .attr('r',r)
                .attr('fill','black');

        lights.push(new_light);
                
    })
    

    lights.forEach(function(element,idx){
        element.on("click",function(){
            for(k=0;k<n;k++){
                console.log(`self:${idx}`);
                if(adj_matrix[idx][k]===1){
                    change_color(lights[k]);
                    console.log(k);
                }

                

                
                
            }
        });
    });
                   

    for(i=0;i<n;i++){
        for(j=0;j<n;j++){
            if (i<j && adj_matrix[i][j]===1){
                console.log(`${i}-${j}`);
                new_edge = interior.append('line')
                        .attr('x1',c[i][0])
                        .attr('y1',c[i][1])
                        .attr('x2',c[j][0])
                        .attr('y2',c[j][1])
                        .attr('stroke','black')
                        .lower();
                edges.push(new_edge);
             
            }
        }
    }

}

nvert = d3.select('#n_vert');
nvert.on('change',function(){
    n_vertices = nvert.node().value;
    console.log(n_vertices);
})



newboard = d3.select('#newboard');
newboard.on('click',function(){
    lights.forEach(element => element.remove());
    edges.forEach(element => element.remove());
    adj_matrix = generate_matrix(n_vertices); 
    build_graph(adj_matrix);
});

reset = d3.select('#reset');
reset.on('click',function(){
    lights.forEach(element => element.attr("fill","black"));

});