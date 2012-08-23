var utma;

function convertUnixtimeStampToDTM(unix_timestamp) {

    var date = new Date(unix_timestamp*1000);
    
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    
    var hours = date.getHours();
    
    
    var minutes = date.getMinutes();
    if(minutes < 10) { minutes = '0' + minutes; }
    
    var seconds = date.getSeconds();
    if(seconds < 10) { seconds = '0' + seconds; }
    
    var formattedTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    
    return formattedTime;

}

function getCookies(domain) 
{
    var utma = '';
    var utma_array;
    
    chrome.cookies.get({"url": domain, "name": "__utma"}, function(cookie) {
      
  
    if( (cookie.value != '') || (cookie.value != null) || (cookie.value != undefined) ) {          
      $("#no_cookie").toggle();
      $("#yes_cookies").toggle();
  
    }
      
      utma = cookie.value;
          
        utma_array= utma.split(".");
        $("#utma_website_id").html(utma_array[0]);
        $("#utma_visitor_id").html(utma_array[1]);
        $("#utma_ftime").html(convertUnixtimeStampToDTM(utma_array[2]));
        $("#utma_ltime").html(convertUnixtimeStampToDTM(utma_array[3]));
        $("#utma_ctime").html(convertUnixtimeStampToDTM(utma_array[4]));
        $("#utma_sessioncount").html(utma_array[5]);
        $("#utma").html(cookie.value);
    });
    
    var utmb = '';
    var utmb_array;
    
    chrome.cookies.get({"url": domain, "name": "__utmb"}, function(cookie) {
      utmb = cookie.value;
      utmb_array= utmb.split(".");
      
      $("#utmb_pageviews").html(utmb_array[1]);
      $("#utmb").html(cookie.value);
    });
    
    var utmz = '';
    var utmz_array;
    var utmz_to_display;
    
    chrome.cookies.get({"url": domain, "name": "__utmz"}, function(cookie) {
      utmz = cookie.value;
      utmz_array= utmz.split(".");
      
      utmz_to_display = utmz_array[4]; 
      for(i=0;i<=4;i++) {
        utmz_to_display = utmz_to_display.replace('|', ', ');
      }
      
      
      utmz_to_display = utmz_to_display.replace('utmcsr=', 'Source: ');
      utmz_to_display = utmz_to_display.replace('utmccn=', 'Campaign: ');
      utmz_to_display = utmz_to_display.replace('utmctr=', 'Keyword: ');
      utmz_to_display = utmz_to_display.replace('utmcmd=', 'Medium: ');
      utmz_to_display = utmz_to_display.replace('utmcmd=', 'Ad Content: ');
      
      
      //$("#utmz").html('hodnota utmz4 je ' + utmz_array[4]);
      $("#utmz4").html(utmz_to_display);
      
    });
    
    
    var utmv = '';
    var utmv_array;
    
    chrome.cookies.get({"url": domain, "name": "__utmv"}, function(cookie) {
      utmv = cookie.value;

      utmv_array= utmv.split(".");
      
      $("#utmv").html(cookie.value);
    });

    

}



document.addEventListener("DOMContentLoaded", function () {
    
  chrome.tabs.getSelected(null, function(tab) {
        getCookies(tab.url);
        
  });
    
  
  
});
