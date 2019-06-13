//how do javascript
//p5 + paper + fabric libraries

//paper.js
<script type="text/javascript" src="js/paper.js"></script>
//api.noopschallenge.com/hexbot

print(httpGet());
function httpGet()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET",'api.noopschallenge.com/hexbot', false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


