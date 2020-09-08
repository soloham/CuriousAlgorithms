var keys = [ 'a', 'b', 'a', 'b', 'a' ];

function recursive(cross, s, a) {
    for( var i=s; i < keys.length; i++ ){
        if( !cross ){
            var b = a.slice(0);
            b.push( keys[i] );
            set.push( b );
        }
        else{ 
            a.push(keys[i]); 
            recursive(cross-1, i+1, a); 
            a.splice(-1, 1);
        }
    }
}

var set = [];
recursive(4, 0, []);
console.log( set );