var DEFAULT_PICTURE = "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg";
var MAX_TIMESTAMP_DIFF = 60 * 1000; // 1 min
var NO_USER = { id: ''};
var MENTION_SOUND = '/public/audio/touche.wav';
var lastMessage = {
  user: NO_USER
};

var smyles= [
	{ code: '\[..\]', url:'public/smileys/transformer.gif'},
	{ code: ':BZ', url:'public/smileys/115.gif'},
	{ code: ':bZ', url:'public/smileys/115.gif'},
	{ code: ':Bz', url:'public/smileys/115.gif'},
	{ code: ':bz', url:'public/smileys/115.gif'},
	{ code: '\^#(^', url:'public/smileys/114.gif'},
	{ code: ':-Bd', url:'public/smileys/113.gif'},
	{ code: ':-bD', url:'public/smileys/113.gif'},
	{ code: ':-bd', url:'public/smileys/113.gif'},
	{ code: ':-BD', url:'public/smileys/113.gif'},
	{ code: ':-q', url:'public/smileys/112.gif'},
	{ code: ':-Q', url:'public/smileys/112.gif'},
	{ code: '\\m\/', url:'public/smileys/111.gif'},
	{ code: '\\M\/', url:'public/smileys/111.gif'},
	{ code: ':!!', url:'public/smileys/110.gif'},
	{ code: 'x_x', url:'public/smileys/109.gif'},
	{ code: 'X_x', url:'public/smileys/109.gif'},
	{ code: 'x_x', url:'public/smileys/109.gif'},
	{ code: 'X_X', url:'public/smileys/109.gif'},
	{ code: ':o3', url:'public/smileys/108.gif'},
	{ code: ':O3', url:'public/smileys/108.gif'},
	{ code: '%-(', url:'public/smileys/107.gif'},
	{ code: ':-??', url:'public/smileys/106.gif'},
	{ code: '8->', url:'public/smileys/105.gif'},
	{ code: ':-t', url:'public/smileys/104.gif'},
	{ code: ':-T', url:'public/smileys/104.gif'},
	{ code: ':-h', url:'public/smileys/103.gif'},
	{ code: ':-H', url:'public/smileys/103.gif'},
	{ code: '~x(', url:'public/smileys/102.gif'},
	{ code: '~X(', url:'public/smileys/102.gif'},
	{ code: ':-c', url:'public/smileys/101.gif'},
	{ code: ':-C', url:'public/smileys/101.gif'},
	{ code: ':)\]', url:'public/smileys/100.gif'},
	{ code: '(\*)', url:'public/smileys/79.gif'},
	{ code: ':-j', url:'public/smileys/78.gif'},
	{ code: ':-J', url:'public/smileys/78.gif'},
	{ code: '\^:)^', url:'public/smileys/77.gif'},
	{ code: ':-@', url:'public/smileys/76.gif'},
	{ code: '(%)', url:'public/smileys/75.gif'},
	{ code: ';))', url:'public/smileys/71.gif'},
	{ code: '>:\/', url:'public/smileys/70.gif'},
	{ code: '\\:d\/', url:'public/smileys/69.gif'},
	{ code: '\\:D\/', url:'public/smileys/69.gif'},
	{ code: '\[-x', url:'public/smileys/68.gif'},
	{ code: '\[-X', url:'public/smileys/68.gif'},
	{ code: ':)>-', url:'public/smileys/67.gif'},
	{ code: 'b-(', url:'public/smileys/66.gif'},
	{ code: 'B-(', url:'public/smileys/66.gif'},
	{ code: ':-"', url:'public/smileys/65.gif'},
	{ code: '$-)', url:'public/smileys/64.gif'},
	{ code: '\[-o<', url:'public/smileys/63.gif'},
	{ code: '\[-O<', url:'public/smileys/63.gif'},
	{ code: ':-l', url:'public/smileys/62.gif'},
	{ code: ':-L', url:'public/smileys/62.gif'},
	{ code: '>-)', url:'public/smileys/61.gif'},
	{ code: '=:)', url:'public/smileys/60.gif'},
	{ code: '8-x', url:'public/smileys/59.gif'},
	{ code: '8-X', url:'public/smileys/59.gif'},
	{ code: '\*-:)', url:'public/smileys/58.gif'},
	{ code: '~o)', url:'public/smileys/57.gif'},
	{ code: '~O)', url:'public/smileys/57.gif'},
	{ code: '(~~)', url:'public/smileys/56.gif'},
	{ code: '\*\*==', url:'public/smileys/55.gif'},
	{ code: '%%-', url:'public/smileys/54.gif'},
	{ code: '@};', url:'public/smileys/53.gif'},
	{ code: '~:>', url:'public/smileys/52.gif'},
	{ code: ':(|)', url:'public/smileys/51.gif'},
	{ code: '3:-o', url:'public/smileys/50.gif'},
	{ code: '3:-O', url:'public/smileys/50.gif'},
	{ code: ':@)', url:'public/smileys/49.gif'},
	{ code: '<):)', url:'public/smileys/48.gif'},
	{ code: '>:p', url:'public/smileys/47.gif'},
	{ code: '>:P', url:'public/smileys/47.gif'},
	{ code: ':-<', url:'public/smileys/46.gif'},
	{ code: ':-w', url:'public/smileys/45.gif'},
	{ code: ':-W', url:'public/smileys/45.gif'},
	{ code: ':^o', url:'public/smileys/44.gif'},
	{ code: ':^O', url:'public/smileys/44.gif'},
	{ code: '@-)', url:'public/smileys/43.gif'},
	{ code: ':-sS', url:'public/smileys/42.gif'},
	{ code: ':-Ss', url:'public/smileys/42.gif'},
	{ code: ':-ss', url:'public/smileys/42.gif'},
	{ code: ':-SS', url:'public/smileys/42.gif'},
	{ code: '=d>', url:'public/smileys/41.gif'},
	{ code: '=D>', url:'public/smileys/41.gif'},
	{ code: '#-o', url:'public/smileys/40.gif'},
	{ code: '#-O', url:'public/smileys/40.gif'},
	{ code: ':-?', url:'public/smileys/39.gif'},
	{ code: '=p~', url:'public/smileys/38.gif'},
	{ code: '=P~', url:'public/smileys/38.gif'},
	{ code: '(:|', url:'public/smileys/37.gif'},
	{ code: '<:-p', url:'public/smileys/36.gif'},
	{ code: '<:-P', url:'public/smileys/36.gif'},
	{ code: '8-}', url:'public/smileys/35.gif'},
	{ code: ':o)', url:'public/smileys/34.gif'},
	{ code: ':O)', url:'public/smileys/34.gif'},
	{ code: '\[-(', url:'public/smileys/33.gif'},
	{ code: ':-\$', url:'public/smileys/32.gif'},
	{ code: ':-&', url:'public/smileys/31.gif'},
	{ code: 'l-)', url:'public/smileys/30.gif'},
	{ code: 'L-)', url:'public/smileys/30.gif'},
	{ code: '8-|', url:'public/smileys/29.gif'},
	{ code: 'i-)', url:'public/smileys/28.gif'},
	{ code: 'I-)', url:'public/smileys/28.gif'},
	{ code: '=,', url:'public/smileys/27.gif'},
	{ code: ':-b', url:'public/smileys/26.gif'},
	{ code: ':-B', url:'public/smileys/26.gif'},
	{ code: 'o:)', url:'public/smileys/25.gif'},
	{ code: 'O:)', url:'public/smileys/25.gif'},
	{ code: 'o:-)', url:'public/smileys/25.gif'},
	{ code: 'O:-)', url:'public/smileys/25.gif'},
	{ code: '=))', url:'public/smileys/24.gif'},
	{ code: '\/:)', url:'public/smileys/23.gif'},
	{ code: ':|', url:'public/smileys/22.gif'},
	{ code: ':))', url:'public/smileys/21.gif'},
	{ code: ':((', url:'public/smileys/20.gif'},
	{ code: '>:)', url:'public/smileys/19.gif'},
	{ code: '#:-s', url:'public/smileys/18.gif'},
	{ code: '#:-S', url:'public/smileys/18.gif'},
	{ code: ':-s', url:'public/smileys/17.gif'},
	{ code: ':-S', url:'public/smileys/17.gif'},
	{ code: 'b-)', url:'public/smileys/16.gif'},
	{ code: 'B-)', url:'public/smileys/16.gif'},
	{ code: ':>', url:'public/smileys/15.gif'},
	{ code: ':->', url:'public/smileys/15.gif'},
	{ code: 'x-(', url:'public/smileys/14.gif'},
	{ code: 'X-(', url:'public/smileys/14.gif'},
	{ code: 'x(', url:'public/smileys/14.gif'},
	{ code: 'X(', url:'public/smileys/14.gif'},
	{ code: ':o', url:'public/smileys/13.gif'},
	{ code: ':O', url:'public/smileys/13.gif'},
	{ code: ':-o', url:'public/smileys/13.gif'},
	{ code: ':-O', url:'public/smileys/13.gif'},
	{ code: '=((', url:'public/smileys/12.gif'},
	{ code: ':\*', url:'public/smileys/11.gif'},
	{ code: ':-\*', url:'public/smileys/11.gif'},
	{ code: ':-p', url:'public/smileys/10.gif'},
	{ code: ':-P', url:'public/smileys/10.gif'},
	{ code: ':p', url:'public/smileys/10.gif'},
	{ code: ':P', url:'public/smileys/10.gif'},
	{ code: ':">', url:'public/smileys/9.gif'},
	{ code: ':-x', url:'public/smileys/8.gif'},
	{ code: ':-X', url:'public/smileys/8.gif'},
	{ code: ':x', url:'public/smileys/8.gif'},
	{ code: ':X', url:'public/smileys/8.gif'},
	{ code: ':-\/', url:'public/smileys/7.gif'},
	{ code: '>:d<', url:'public/smileys/6.gif'},
	{ code: '>:D<', url:'public/smileys/6.gif'},
	{ code: ';;)', url:'public/smileys/5.gif'},
	{ code: ':-d', url:'public/smileys/4.gif'},
	{ code: ':-D', url:'public/smileys/4.gif'},
	{ code: ':d', url:'public/smileys/4.gif'},
	{ code: ':D', url:'public/smileys/4.gif'},
	{ code: ';-)', url:'public/smileys/3.gif'},
	{ code: ';)', url:'public/smileys/3.gif'},
	{ code: ':-(', url:'public/smileys/2.gif'},
	{ code: ':(', url:'public/smileys/2.gif'},
	{ code: ':-)', url:'public/smileys/1.gif'},
	{ code: ':)', url:'public/smileys/1.gif'},
    { code: 'loop', url:'public/smileys/loop.gif'},
	{ code: '\n', url:''}
];

function displayMessage(message, autoscroll, displayInline) {
  var wasScrolledToBottom = isScrolledToBottom();
  if (message.text.indexOf('/#') == 0) { // colored alert
    var color = message.text.substring(1, message.text.indexOf(' '));
    if (!color.match(/[a-fA-F0-9]{6}|[a-fA-F0-9]{3}/g)) {
        color = '#3B5';
    }
    html = '';
    html += '<div id="alert" style="background: ' + color + '"><b>' + message.user.name + ':<b/> ';
    html += htmlEncode(message.text.substring(message.text.indexOf(' ') + 1))  + ' </div>';
    $('#messagebox .scrollr').append(html);
    if (autoscroll && wasScrolledToBottom) scrollToBottom();
    lastMessage = { user: NO_USER };        
    } else if (message.text.indexOf('/clear') == 0) {
    $('#messagebox .scrollr').html('');
    lastMessage = { user: NO_USER };
  } else {
    var userMention = '@' + $('#loggedUser').html();
    var processedMessage = processMessage(message, userMention, autoscroll && wasScrolledToBottom, displayInline);
    if (message.user.id == lastMessage.user.id && message.ts < lastMessage.ts + MAX_TIMESTAMP_DIFF ) {
      $('.author').last().append(processedMessage);
    } else {
      var html = '';
      if (lastMessage.user.id != NO_USER.id) {
        html += '<hr/>'; 
      }
      var picture = message.user.picture ? message.user.picture : DEFAULT_PICTURE;
      html += '<img class="profilepic" src="' + picture + '"/>';
      html += '<div class="author"><strong>' + $('<div/>').text(message.user.name).html() + '</strong><span class="timestamp">' + formatTimestamp(message.ts) + '</span>';
      html += processedMessage;
      html += '</div>';
      $('#messagebox .scrollr').append(html);
    }

    $('code').syntaxHighlight();
    lastMessage = message;
    if (autoscroll && wasScrolledToBottom) {
      scrollToBottom();
    }
  }
}

function processMessage(message, userMention, scroll, displayInline){
    var result = handleLinksAndEscape(message.text);
    result.html = result.html.replace(/boian/g, 'ಠ_ಠ');
    result.html = handleMentions(result.html, userMention);
    var classes = 'messageContent';
    if (hasMention(result.html, userMention)) {
      classes += ' mention';
    }
    var html = '<div class="' + classes + '">' + result.html + '</div>';
    if (displayInline) {
      html += addYoutubeLinks(result.youtube);
      html += addMixcloudLinks(result.mixcloud);
      html += addSoundcloudLinks(result.soundcloud);
      html += addImagery(result.imagery, scroll);
    }
    return html;
}

function hasMention(text, mention) {
  return text.indexOf(mention) != -1;
}

function handleMentions(text, mention) {
    var r = new RegExp(mention, 'g');
    /*
    if (!focused && text.match(r)) {
      $('#noise').html('<embed src="' + MENTION_SOUND + '" hidden=true autostart=true loop=false>');
    }
    */
    return text.replace(r, '<strong>' + mention + '</strong>');
}

function formatTimestamp(ts) {
  var timestamp = new Date(ts);
  var now = new Date();
  var dayOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var date;
  if (timestamp.getDate() == now.getDate() && timestamp.getMonth() === now.getMonth() && timestamp.getFullYear() == timestamp.getFullYear()) {
    date = 'Today';  
  } else {
    date = dayOfWeek[timestamp.getDay()] + ', ' + timestamp.getDate() + ' ' + month[timestamp.getMonth()] + ' ' + timestamp.getFullYear();
  }
  var time = padTime(timestamp.getHours()) + ':' + padTime(timestamp.getMinutes()); 
  return date + ' at ' + time;
}

function padTime(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

function handleLinksAndEscape(text) {
  var html = '';
  var youtube = [];
  var mixcloud = [];
  var soundcloud = [];
  var imagery = [];
  var linkMatch = /http[s]?:///g
  var index = text.search(linkMatch);
  while (index != -1) {
    textBeforeLink = text.substr(0, index);
    //html += $('<div/>').text(textBeforeLink).html();
    html += getHtmlWithSmilyes(textBeforeLink);
  var finish = index;
    while (finish < text.length && !isWhitespace(text[finish])) finish++;
    var link = text.substr(index, finish-index+1);
    html += '<a target="_blank" href="' + link + '">' + $('<div/>').text(link).html() + '</a>';
    // check for youtube links
    if (link.indexOf('http://www.youtube.com') == 0) {
      youtube.push(link); 
    };
    if (link.indexOf('http://www.mixcloud.com') == 0) {
      mixcloud.push(link); 
    };
    if (link.indexOf('http://soundcloud.com') == 0) {
      soundcloud.push(link); 
    };
    if (link.indexOf('http://youtu.be') == 0) {
      youtube.push(link.replace(/\?/g, '&').replace(/youtu\.be\//g, 'youtube.com/watch?v='));
    }
    // check for imagery content
    $.get(link, function(data) { alert(data) });
    var lowerLink = link.toLowerCase();
    var ext = 0;
    var formats = ['.gif', '.jpg', '.jpeg', '.png' ];
    for (ext in formats) {
      if (lowerLink.indexOf(formats[ext]) != -1) {
        imagery.push(link);
        break;
      }
    }
    
    if (finish == text.length) {
      text = '';
    } else {
      text = text.substr(finish);
    }
    index = text.search(linkMatch);
  }
  //html += $('<div/>').text(text).html();
  html += getHtmlWithSmilyes(text);
  // handle [code]snippets[/code]
  html = html.replace("[code]", "<code class='highlight'>");
  html = html.replace("[/code]", "</code>");

  return {
    html : html,
    youtube : youtube,
    mixcloud: mixcloud,
    soundcloud: soundcloud,
    imagery : imagery
  }
}

function paramize(text) {
  if (!text.match(/\d\d?m\d\d?s/g)) {
      return '';
  };
  var time = parseInt(text.substring(0, text.indexOf('m')));
  time = time * 60 + parseInt(text.substring(text.indexOf('m') + 1, text.indexOf('s')));
  return '&start=' + time;
}

function addYoutubeLinks(links) {
  var html = '';
  $.each(links, function(index, link) {
    var params = getUrlVars(link);
    var timestamp = params.t ? paramize(params.t) : '';
    if (params.v) {
      html += '<div><iframe width="420" height="315" src="http://www.youtube.com/v/' + params.v + timestamp + '" frameborder="0" allowfullscreen></iframe></div>';
    }
  });
  return html;
}

function addSoundcloudLinks(links) {
  var html = '';
  $.each(links, function(index, link) {
    html += '<div class="soundcloud">';
    html += '<object height="81" width="100%">'; 
    html += '  <param name="movie" value="https://player.soundcloud.com/player.swf?url=' + encodeURIComponent(link) + '&amp;show_comments=true&amp;auto_play=false&amp;color=ff7700"></param>';
    html += '  <param name="allowscriptaccess" value="always"></param>';
    html += '  <embed allowscriptaccess="always" height="81" src="https://player.soundcloud.com/player.swf?url=' + encodeURIComponent(link) + '&amp;show_comments=true&amp;auto_play=false&amp;color=ff7700" type="application/x-shockwave-flash" width="100%"></embed>';
    html += '</object>';   
    html += '</div>';
  });
  return html;
}

function addMixcloudLinks(links) {
  var html = '';
  $.each(links, function(index, link) {
    html += '<div class="mixcloud">';
    html += '<object width="480" height="480">';
    html += '  <param name="movie" value="http://www.mixcloud.com/media/swf/player/mixcloudLoader.swf?feed=' + encodeURIComponent(link) + '&embed_uuid=cf33541f-9302-42e5-91bb-597a70dc852d&stylecolor=&embed_type=widget_standard"></param>';
    html += '  <param name="allowFullScreen" value="true"></param>';
    html += '  <param name="wmode" value="opaque"></param>';
    html += '  <param name="allowscriptaccess" value="always"></param>';
    html += '  <embed src="http://www.mixcloud.com/media/swf/player/mixcloudLoader.swf?feed=' + encodeURIComponent(link) + '&embed_uuid=cf33541f-9302-42e5-91bb-597a70dc852d&stylecolor=&embed_type=widget_standard" type="application/x-shockwave-flash" wmode="opaque" allowscriptaccess="always" allowfullscreen="true" width="480" height="480"></embed>';
    html += '</object>';
    html += '</div>';
  });
  return html;
}

function addImagery(links, scroll) {
  var onload = scroll ? 'onload="scrollToBottom()"' : '';
  var html = '';
  $.each(links, function(index, link) {
    html += '<a target="_blank" href="' + link + '"><img id="imageLink" ' + onload + ' src="' + link + '"/></a>';
  });
  if (html !== '') {
    html = '<div id="imageDock">' + html + '</div>';
  }
  return html;
}

function displayNotification(notification, attention, autoscroll) {
  var wasScrolledToBottom = isScrolledToBottom();
  var classes = 'notification';
  if (attention) classes += ' attention';
  var html = '<div class="' + classes + '">' + notification + '</div>';
  $('#messagebox .scrollr').append(html);
  lastMessage = { user: NO_USER };
  if (autoscroll && wasScrolledToBottom) scrollToBottom();
}

function scrollToBottom() {
  var messagebox = $('#messagebox .scrollr');
  $(messagebox).animate({ scrollTop: $(messagebox).prop("scrollHeight") + 20 }, 0);
}

function isScrolledToBottom() {
  var elem = $('#messagebox .scrollr');
  if (elem[0].scrollHeight - elem.scrollTop() < elem.outerHeight() + 5) {
    return true;
  }
  return false;
}

function isWhitespace(ch) { 
  return " \t\n\r\v".indexOf(ch) != -1;
} 

function getUrlVars(link) {
  var vars = [], hash;
  var hashes = link.slice(link.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function escapeText(text) {
  return $('<div/>').text(text).html();
}


function htmlEncode(value){
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}

function getHtmlWithSmilyes(text)
{
	for (var i = 0; i < smyles.length; i ++)
	{
		var pos = text.indexOf(smyles[i].code);
		if ( pos >= 0)
		{
			return getHtmlWithSmilyes(text.substring(0, pos)) + 
				getSmyleHtml(smyles[i]) + 
				getHtmlWithSmilyes(text.substring(pos+smyles[i].code.length, text.length));	
		}	
	}
	return htmlEncode(text);
}

function getSmyleHtml(smyle)
{
    // sneaky newline check
    if (smyle.code == '\n') {
        return '<br/>';
    }
	return '<img class="emoticon" src="' + smyle.url + '" title=\'' + smyle.code + '\' alt=\'' + smyle.code + '\'/>';
}