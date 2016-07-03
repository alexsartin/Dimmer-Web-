function checaEndereco(){var e=getCookie("endereco");""===e?$("#endereco").slideDown(1e3):(endereco=e,$("#end1").text(endereco),$("#txt1").val(endereco),startRequest())}function startRequest(){refresh=!0,start||(start=!0,erro=!0,$.getJSON(endereco+"/slide",function(e){atualizaDados(e)}),setInterval(function(){contador()},1e3),setInterval(function(){getRequest()},1700))}function contador(e){e?0>=count&&(count=e):$("#count h5").html(count>0?"Atualizando em "+count--+"s":'<i class="fa fa-refresh fa-spin"></i>')}function adicionaInterface(){var e="";offline&&(e="no endereço:"),$("<div>",{id:"alerta","class":"caixa",html:"<h3> Sem Conexao com o Arduino "+e+'</h3><div id="end1"></div><div id="count"><h5></h5></div>'}).insertAfter("a"),offline&&($('<input type="button" value="Trocar endereço" id="btr" class="button btn btn-default">').appendTo("#alerta"),$("<div>",{id:"endereco","class":"caixa",html:'<h4>Digite o endereço mostrado no terminal do Arduino:</h2><input type="text" value="http://192.168.1.150" id="txt1"><input type="button" value="Conectar" id="btc" class="button btn btn-default">'}).insertAfter("#alerta"),$("#txt1").keyup(function(e){13==e.keyCode&&$("#btc").focus().click()}),$("#btc").click(function(){var e=$("#txt1").val();validaIP(e)&&(endereco=e,setCookie("endereco",endereco),$("#end1").text(endereco),$("#endereco").slideUp(700),startRequest())}),$("#btr").click(function(){clearTimeout(timeOutError),$("#endereco").slideDown(1e3),$("#alerta").slideUp(1e3)}))}function adicionaLampadas(){inicio=!0,$("<h5>Dimmer Web+ v4.0</h5>").insertAfter("a:first"),$("<div>",{id:"lampada","class":"caixa",html:'<div id="hide"><h3>Alteração das portas do Ardunino</h3><h4>Digite o pino atribuído para cada triac, <br>entre espaços:</h2><input type="text" value="Ex: 3 5 6 9" id="txt2"></div><input type="button" value="Cenário automático" id="btca" class="button btn btn-default"><input type="button" value="Alterar portas" id="bta" class="button btn btn-default">'}).insertAfter("a:first"),$("#txt2").keyup(function(e){13==e.keyCode&&$("#bta").focus().click()}),$("#bta").click(function(){if($("#hide").is(":hidden"))$.get(endereco+"/lampada",function(e){$("#txt2").val(""!=e&&null!=e?e:"Ex: 3 5 6 9")}),$("#btca").fadeOut(),$("#hide").slideDown(700);else{var e=$("#txt2").val();""!=e&&null!=e&&(e=e.split(" ").map(function(e){return parseInt(e,10)}),e=e.filter(function(e){return!isNaN(e)}),postLampada(e)),$("#hide").slideUp(700),$("#btca").fadeIn()}}),$("#btca").click(function(){$.ajax({type:"HEAD",url:endereco+"/lampada"})});for(var e=0;lampadas>e;e++)$("<div>",{id:"lampada","class":"caixa",html:'<div id="legenda"><a>Lâmpada '+(lampadas-e)+'</a></div><button id="botao" class="btn btn-default btn-lg"><i class="fa fa-lightbulb-o"></i> <i id="onOff" class="fa fa-toggle-on"></i></button><div id="result">0</div><div id="slide"></div>'}).insertAfter("a:first");$("[id=botao]").each(function(e,t){$(t).click(function(){postBotao(e),$("[id=onOff]").eq(e).hasClass("fa-toggle-on")?$("[id=onOff]").eq(e).switchClass("fa-toggle-on","fa-toggle-off"):$("[id=onOff]").eq(e).switchClass("fa-toggle-off","fa-toggle-on")})}),$("[id=slide]").each(function(e,t){$(t).slider({animate:!0,range:"min",start:function(){refresh=!1},stop:function(t,a){postSlide(e,a.value),$("[id=result]").eq(e).text(a.value)}})}),getLegenda(),$("[id=legenda] a").each(function(e,t){var a;$(t).click(function(){a=prompt("Digite outro nome para esta legenda:",$(t).text()),""!==a&&null!==a&&a!=$(t).text()&&($(t).text(a),postLegenda(e,a))})})}function postSlide(e,t){$.post(endereco+"/slide",{n:e,slide:t},function(){refresh=!0})}function postBotao(e){$.post(endereco+"/botao",{n:e})}function postLampada(e){$.post(endereco+"/lampada",{lamp:e})}function postLegenda(e,t){$.post(endereco+"/nome",{n:e,leg:t})}function getLegenda(){$.getJSON(endereco+"/nome",function(e){$("[id=legenda] a").each(function(t,a){$(a).text(String(e.l[t].lg))})})}function getRequest(){refresh&&$.getJSON(endereco+"/slide").fail(function(){erro=!erro,erro&&($("[id=lampada]").slideUp(900),$("#alerta").delay(900).slideDown(700),contador(5),refresh=!1,timeOutError=setTimeout(function(){refresh=!0},5100))}).done(function(e){atualizaDados(e)})}function atualizaDados(e){if(inicio||(lampadas=e.s.length,adicionaLampadas()),lampadas!=e.s.length)location.reload();else{for(var t=0;lampadas>t;t++)$("[id=result]").eq(t).text(e.s[t].sl),$("[id=slide]").eq(t).slider("option","value",e.s[t].sl),e.b[t].bt?$("[id=onOff]").eq(t).switchClass("fa-toggle-off","fa-toggle-on"):$("[id=onOff]").eq(t).switchClass("fa-toggle-on","fa-toggle-off");$("#alerta").slideUp(700),$("[id=lampada]").slideDown(700)}}function validaIP(e){e=e.replace("http://","");var t=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;return t=/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,e.match(t)?!0:(alert("O IP digitado é inválido!"),!1)}function getCookie(e){for(var t=e+"=",a=document.cookie.split(";"),n=0;n<a.length;n++){for(var o=a[n];" "===o.charAt(0);)o=o.substring(1);if(0===o.indexOf(t))return o.substring(t.length,o.length)}return""}function setCookie(e,t){var a=new Date;a.setTime(a.getTime()+2592e5);var n="expires="+a.toUTCString();document.cookie=e+"="+t+"; "+n}var endereco,timeOutError,erro,refresh,inicio=!1,start=!1,lampadas,count=0,offline=!1;$.ajaxSetup({timeout:3e3}),window.onload=function(){1==$("#offline").length?(offline=!0,adicionaInterface(),checaEndereco()):(endereco="",adicionaInterface(),startRequest())};