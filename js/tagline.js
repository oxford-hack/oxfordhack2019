var delay0 = 1000;
var delay1 = 3000;
var animDur = 850;
var secondOffset = 25;
var frames = 18;

function mutate(start, end, p){
	if(p==0) return start;
	if(p==1) return end;
	var l1 = start.length;
	var l2 = end.length;
	var length = Math.round(l1 + (l2 - l1)*p);
	var out='';
	var middleDist = 1-2*Math.abs(0.5-p);
	for(var i=0;i<length;i++){
		//either select the correct char from start/end, or a random letter.
		var oob = p<0.5 ? i>=l1 : i>=l2;
		var prob = oob ? 1 : middleDist * 0.5; //bit of damping for effect
		if(Math.random() < prob)
			out+='abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
		else
			out+= p<0.5 ? start[i] : end[i];
	}
	return out;
}

function setText(percentage){
	var t1 = mutate('resources','pole', percentage);
	var t2 = mutate('hacking','punting', percentage);
	document.getElementById('slogan-word-1').innerText = t1;
	document.getElementById('slogan-word-2').innerText = t2;
}

function startAnim(dir){
	for(var i=0; i<frames; i++){
		var p = i/frames;
		setTimeout(setText.bind(this, dir ? p : 1-p), p * animDur);
	}
	setTimeout(function(){setText(dir ? 1 : 0)}, animDur);
	setTimeout(function(){startAnim(!dir)}, (dir ? delay0 : delay1)+animDur);
}

setTimeout(function(){startAnim(true)},delay1);
