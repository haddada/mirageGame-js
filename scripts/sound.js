soundManager.useFlashBlock = false;
soundManager.bgColor = '#ffffff';
soundManager.debugMode = false;
soundManager.url = 'swf/';
soundManager.wmode = 'transparent'; // hide initial flash of white on everything except firefox/win32
soundManager.allowScriptAccess = 'always';
soundManager.useFastPolling = true;
soundManager.flashVersion = 9;
soundManager.flashLoadTimeout = 3000;
soundManager.useHTML5Audio = true;
 
// -- when ready, preload sounds
soundManager.onready(function() {
 
    // -- Click
    soundManager.createSound({
      id: 'click',
      url: 'audio/Explosion2.mp3',
      autoLoad: true,
      autoPlay: false,
      multiShot: true,
      volume: 50,
      loop: true,
    });
    soundManager.createSound({
      id: 'bullet',
      url: 'audio/bullet.mp3',
      autoLoad: true,
      autoPlay: false,
      multiShot: true,
      volume: 30,
      loop: true,
    });
 
    // ...
 
    // -- Mad Cow
    
 
});
 
soundManager.ontimeout(function() {
    var smLoadFailWarning = 'Oh snap! : ' + (soundManager.hasHTML5 ? 'The flash portion of ' : '') + 'SoundManager 2 was unable to start. ';
    console.log(smLoadFailWarning) ;
});