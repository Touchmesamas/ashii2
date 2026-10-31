/* ===== EDIT THESE (or just send me the details and I’ll fill them in) ===== */
const C={
  her:"Ashii",
  me:"Your Markii",
  photos:["ashii.jpeg", "baby.jpeg", "gf.jpeg"],          // up to 3 pictures
  music:"only.m4a",           // song file
  start:162,            // seconds into the song where it begins
  letter:[            // one letter per envelope (keep it at 3)
    "It’s officially November 1st, Happy 8th Monthsarry baby ko you're the best gf in the world thank you for still staying super love ko ikaw you're the greatest thing na dumating sa buhay ko iloveyou.",
    "My silly baby ashii man i hope to do it all with you very soon all the plans, first times, silly adventures and the freaky things man i wanna have do it all with you iloveyou 😝.",
    "Thank you for your smile, your patience, and for just being you. I’m so lucky it’s you I get to do this with. Here’s to more months, more memories, and more bitterness and sweetness. We'll always stick to each other forever okii, iloveyou my gf."
  ],
  sign:"Forever yours,",
  game:"",gameStart:0,
  caps:["Us","Silly Baby","My Best Ashii"],
  reasons:["i will kiss you forever everyday","we will do it man until you give up man bibig baby man hehe","i love you super very love ko ikaw you're my best gf in the world ashi"]
};
/* ========================================================================== */
const $=id=>document.getElementById(id);
const show=n=>{document.querySelectorAll(".scr").forEach((s,i)=>s.classList.toggle("on",i===n))};

/* floating halloween bits */
const bgf=(e2)=>{const e=e2||["🎃","👻","🦇","🕸️","🍬","💀","🕯️"],b=$("bg");for(let i=0;i<14;i++){const s=document.createElement("span");s.textContent=e[i%e.length];s.style.left=Math.random()*95+"%";s.style.fontSize=18+Math.random()*26+"px";s.style.animationDuration=12+Math.random()*14+"s";s.style.animationDelay=-Math.random()*20+"s";b.appendChild(s)}};bgf();

/* ===== synthesized halloween sounds (no files needed) ===== */
let ac,amb,bell,sq,st=0,nt=0;
function A(){ac=ac||new(window.AudioContext||window.webkitAudioContext)();if(ac.state==="suspended")ac.resume();return ac}
function note(f,d,type,v,t){const a=A(),o=a.createOscillator(),g=a.createGain();t=t||a.currentTime;o.type=type;o.frequency.value=f;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d)}
function ambient(){const a=A(),m=a.createGain();m.gain.value=.08;const lp=a.createBiquadFilter();lp.type="lowpass";lp.frequency.value=260;lp.connect(m);m.connect(a.destination);
  const os=[110,111.4,164.8].map(f=>{const o=a.createOscillator();o.type="sawtooth";o.frequency.value=f;o.connect(lp);o.start();return o});
  const l=a.createOscillator(),lg=a.createGain();l.frequency.value=.15;lg.gain.value=120;l.connect(lg);lg.connect(lp.frequency);l.start();os.push(l);
  nt=0;st=0;seq();amb={m,os}}
const B=[110,0,0,110,0,110,0,82.4,0,0,98,0,110,0,123.5,0],L=[440,0,523.3,440,0,415.3,440,0,493.9,0,466.2,493.9,0,440,0,0,440,0,523.3,440,0,415.3,440,0,622.3,587.3,523.3,493.9,466.2,440,415.3,0];
function kick(t){const a=A(),o=a.createOscillator(),g=a.createGain();o.frequency.setValueAtTime(220,t);o.frequency.exponentialRampToValueAtTime(60,t+.12);g.gain.setValueAtTime(.4,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+.2)}
let nz;function snare(t){const a=A();if(!nz){nz=a.createBuffer(1,a.sampleRate*.2|0,a.sampleRate);const d=nz.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1}const s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();s.buffer=nz;f.type="highpass";f.frequency.value=1500;g.gain.setValueAtTime(.25,t);g.gain.exponentialRampToValueAtTime(.001,t+.15);s.connect(f);f.connect(g);g.connect(a.destination);s.start(t)}
function seq(){const a=A();while(nt<a.currentTime+.3){if(!nt)nt=a.currentTime+.05;const i=st%32,d=30/(110+(TIME-tl)*3);if(B[i%16])note(B[i%16]*2,d*1.8,"triangle",.22,nt);if(L[i]){note(L[i],d*1.6,"square",.07,nt);note(L[i]*2,d*1.2,"triangle",.09,nt)}if(i%2)note(1800,.03,"square",.03,nt);if(i%8==0||i%16==6)kick(nt);if(i%8==4)snare(nt);if(i==0||i==16)note(1318.5,1.4,"sine",.08,nt);nt+=d;st++}sq=setTimeout(seq,100)}
function stopAmb(f=1.5){if(!amb)return;clearInterval(bell);clearTimeout(sq);const x=amb;x.m.gain.linearRampToValueAtTime(0,ac.currentTime+f);setTimeout(()=>x.os.forEach(o=>o.stop()),f*1000+100);amb=0}
const pop=()=>{note(700,.15,"sine",.2);note(1050,.12,"triangle",.15,A().currentTime+.05)};
const bad=()=>note(110,.4,"sawtooth",.15);
const win=()=>{const t=A().currentTime;[523,659,784,1047,1319,1568].forEach((f,i)=>{note(f,.7,"triangle",.3,t+i*.11);note(f*2,.5,"sine",.12,t+i*.11)});note(2093,1.3,"sine",.15,t+.7)};
const lose=()=>{const t=A().currentTime;[466,440,415,392].forEach((f,i)=>note(f,i==3?1.1:.4,"sawtooth",.13,t+i*.38));note(196,1.3,"sine",.3,t+1.1)};

/* ===== minigame ===== */
const GOAL=18,TIME=25,LIVES=3;let sc=0,tl=TIME,run=0,sp,tm,lv=LIVES;
const field=$("field");
function upd(){$("sc").textContent="🎃 "+sc+"/"+GOAL;$("lv").textContent="❤️".repeat(lv)+"🖤".repeat(LIVES-lv);$("tm").textContent=tl;$("bi").style.width=tl/TIME*100+"%"}
const gm=new Audio();gm.addEventListener("loadedmetadata",()=>{if(C.gameStart&&gm.currentTime<1)gm.currentTime=C.gameStart});gm.addEventListener("ended",()=>{gm.currentTime=C.gameStart||0;gm.play().catch(()=>{})});
function gamePlay(){if(!gm.src)gm.src=C.game;gm.currentTime=C.gameStart||0;gm.play().catch(()=>{})}
function startGame(){sc=0;tl=TIME;lv=LIVES;run=1;if(C.game)gamePlay();else if(!amb)ambient();$("msg").classList.remove("on");field.querySelectorAll(".it").forEach(e=>e.remove());upd();loop();tm=setInterval(()=>{tl--;upd();if(tl<=0)end(0)},1000)}
function loop(){if(!run)return;spawn();sp=setTimeout(loop,Math.max(230,520-(TIME-tl)*16))}
function spawn(){if(!run)return;let b=Math.random()<.4;const e=document.createElement("div");
  e.className="it";e.textContent=b?(Math.random()<.5?"🦇":"💀"):"🎃";
  e.style.left=Math.random()*(field.clientWidth-60)+"px";e.style.setProperty("--h",field.clientHeight+90+"px");e.style.animationDuration=Math.max(1.1,2.2+Math.random()*1.2-(TIME-tl)*.05)+"s";
  e.onpointerdown=()=>{if(!run||e.d)return;e.d=1;e.style.animationPlayState="paused";e.classList.add("hit");setTimeout(()=>e.remove(),320);
    if(b){sc=Math.max(0,sc-1);lv--;bad();if(navigator.vibrate)navigator.vibrate(120)}else{sc++;pop()}upd();if(lv<=0)end(0);else if(sc>=GOAL)end(1)};
  e.onanimationend=()=>e.remove();if(!b&&Math.random()<.15)setTimeout(()=>{if(!e.d){b=1;e.textContent="🦇"}},500+Math.random()*500);field.appendChild(e)}
function end(w){run=0;stopAmb(.3);gm.pause();clearInterval(sp);clearInterval(tm);field.querySelectorAll(".it").forEach(e=>e.remove());
  if(w){win();setTimeout(()=>show(2),300);return}
  lose();$("mt").textContent="Boo! 👻";$("mp").textContent="The ghosts won this round. Try again, you got this!";$("msg").classList.add("on")}

$("go").onclick=()=>{unlock();A();primeMusic();show(1);startGame()};
/* unlock the music on the first tap so it can start by itself when the love letter opens */
function primeMusic(){if(!C.music&&!au.src)return;if(!au.src)au.src=C.music;au.volume=0;au.play().then(()=>{au.pause();au.currentTime=C.start||0}).catch(()=>{})}
function unlock(){if(navigator.audioSession){navigator.audioSession.type="playback";return}try{const n=4000,b=new ArrayBuffer(44+n*2),v=new DataView(b),w=(o,s)=>[...s].forEach((c,i)=>v.setUint8(o+i,c.charCodeAt(0)));w(0,"RIFF");v.setUint32(4,36+n*2,true);w(8,"WAVEfmt ");v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,8000,true);v.setUint32(28,16000,true);v.setUint16(32,2,true);v.setUint16(34,16,true);w(36,"data");v.setUint32(40,n*2,true);const s=new Audio(URL.createObjectURL(new Blob([b],{type:"audio/wav"})));s.loop=true;s.play().catch(()=>{})}catch(e){}}
$("rt").onclick=startGame;

/* ===== letter + music ===== */
const au=new Audio();au.preload="auto";let fade;
au.addEventListener("ended",()=>{au.currentTime=C.start;au.play().catch(()=>{})});
au.addEventListener("loadedmetadata",()=>{if(C.start)au.currentTime=C.start});
function playMusic(){if(!C.music)return;if(au.src!==new URL(C.music,location.href).href&&!au.src.startsWith("blob:")||!au.src)au.src=C.music;
  au.volume=0;au.play().then(()=>{$("mus").classList.add("spin");clearInterval(fade);fade=setInterval(()=>{au.volume=Math.min(1,au.volume+.05);if(au.volume>=1)clearInterval(fade)},120)}).catch(()=>{});
  if(au.readyState>0&&Math.abs(au.currentTime-C.start)>1&&au.currentTime<1)au.currentTime=C.start}
$("mus").onclick=()=>{if(au.paused){au.play();$("mus").classList.add("spin")}else{au.pause();$("mus").classList.remove("spin")}};

const edit=location.hash==="#edit";
const sl=ms=>new Promise(r=>setTimeout(r,ms)),dn=()=>setTimeout(()=>scrollTo({top:1e5,behavior:"smooth"}),200);

function burst(x,y,a,n){if(document.documentElement.classList.contains("love"))a=["💗","💖","💕","✨","🌸"];for(let i=0;i<n;i++){const s=document.createElement("span"),g=Math.random()*6.28,r=60+Math.random()*100;s.className="bp";s.textContent=a[i%a.length];s.style.left=x+"px";s.style.top=y+"px";s.style.setProperty("--dx",Math.cos(g)*r+"px");s.style.setProperty("--dy",Math.sin(g)*r-40+"px");document.body.appendChild(s);setTimeout(()=>s.remove(),1000)}}

/* ===== photo inside each opened letter ===== */
function fillPhoto(m,i){m.innerHTML="";const u=C.photos[i];if(!u&&!edit)return;
  const d=document.createElement("div");d.className="pol";d.style.setProperty("--r",(i%2?3:-3)+"deg");d.style.animationDelay=".15s";
  d.innerHTML=(u?'<img alt="us">':'<div class="ph">📷<br>your photo<br>here</div>')+'<div class="cap">'+(C.caps[i]||"")+'</div>';if(u)d.querySelector("img").src=u;
  d.onclick=e=>{d.style.animationDelay="0s";d.classList.remove("wig");void d.offsetWidth;d.classList.add("wig");burst(e.clientX,e.clientY,["🧡","💜","✨"],7);pop()};
  m.appendChild(d)}
function renderPics(){document.querySelectorAll(".mcard .mp").forEach((m,i)=>fillPhoto(m,i))}

/* ===== "You did it" screen: tap the button -> full switch to the love monthsary letter ===== */
let going=0;
[$("open"),$("env")].forEach(b=>b.onclick=e=>{if(going)return;going=1;playMusic();burst(e.clientX,e.clientY,["🎃","✨","💗","🧡"],12);pop();toLove()});
async function toLove(){const f=$("fx");f.innerHTML="<span>💗</span>";f.classList.add("on");burst(innerWidth/2,innerHeight/2,["💗","💖","💕","✨"],16);
  await sl(900);openLetter();await sl(150);f.classList.remove("on");going=0}

function openLetter(){stopAmb();document.documentElement.classList.add("love");$("bg").innerHTML="";bgf(["💗","💖","🌸","🎀","💕","🌷","✨"]);
  $("lh").textContent="Happy Monthsary, "+C.her+"";$("lt").textContent="Tap the envelope 💌";
  $("ls").innerHTML=$("tr").innerHTML=$("fq").innerHTML="";
  const old=$("no");if(old&&old.parentNode===document.body)old.remove();
  buildEnvs();show(3);scrollTo(0,0);
  if(C.music||au.src){$("mus").style.display="block";if(au.paused)playMusic()}}

/* ===== 3 envelopes: tap one, it opens and shows its picture + letter; the next one unlocks ===== */
function buildEnvs(){const box=$("envs"),N=C.letter.length;box.innerHTML="";
  C.letter.forEach((t,i)=>{const s=document.createElement("div");s.className="slot";
    s.innerHTML='<div class="ev'+(i?' lock':'')+'"><div class="eb"></div><div class="ef"></div><div class="es">💗</div><div class="en">'+(i+1)+' of '+N+'</div></div><div class="mcard"><div class="mp"></div><p class="ml"></p></div>';
    s.querySelector(".ml").textContent=t;fillPhoto(s.querySelector(".mp"),i);
    const ev=s.querySelector(".ev"),card=s.querySelector(".mcard");
    ev.onclick=async e=>{if(ev.classList.contains("lock")||ev.classList.contains("open"))return;
      ev.classList.add("open");burst(e.clientX||innerWidth/2,e.clientY||innerHeight/2,["💗","💌","✨"],10);pop();if(navigator.vibrate)navigator.vibrate(30);
      await sl(520);ev.style.display="none";card.classList.add("on");card.scrollIntoView({behavior:"smooth",block:"start"});
      const nx=box.querySelectorAll(".ev")[i+1];
      if(nx){nx.classList.remove("lock");$("lt").textContent="Now the next one 💌"}
      else{$("lt").textContent="";await sl(1200);finishLetters()}};
    box.appendChild(s)})}
async function finishLetters(){$("ls").innerHTML='<p class="sign">'+C.sign+'<br>'+C.me+' 💗</p>';dn();await sl(800);renderTreats()}

function renderTreats(){const t=$("tr");t.innerHTML='<p>Here is your treats my baby ashii </p><div id="cd"></div><div id="rs"></div>';let n=0;
  ["🍬","🍫","🍭"].forEach((c,i)=>{const b=document.createElement("button");b.className="cd";b.textContent=c;
    b.onclick=e=>{if(b.d)return;b.d=1;b.classList.add("on");pop();burst(e.clientX,e.clientY,["🧡","✨"],7);const r=document.createElement("p");r.className="rs";r.textContent=C.reasons[i];$("rs").appendChild(r);dn();if(++n==3)setTimeout(renderAsk,700)};$("cd").appendChild(b)})}

/* ===== YES / No: the No button runs away (it jumps to a random spot, never on top of YES) ===== */
function renderAsk(){const f=$("fq");f.innerHTML='<p>Will you be my trick-or-treat partner forever? dont even think about clicking "no"</p><div id="yn"><button class="btn" id="yes">YES 💖</button><button class="btn no" id="no">No</button></div>';dn();
  const no=$("no"),yes=$("yes");
  const flee=e=>{if(e&&e.cancelable)e.preventDefault();
    if(no.parentNode!==document.body)document.body.appendChild(no);
    const w=no.offsetWidth||84,h=no.offsetHeight||50,m=10,r=yes.getBoundingClientRect();let x,y,k=0;
    do{x=m+Math.random()*Math.max(1,innerWidth-w-2*m);y=m+Math.random()*Math.max(1,innerHeight-h-2*m);k++}
    while(k<15&&x<r.right+12&&x+w>r.left-12&&y<r.bottom+12&&y+h>r.top-12);
    no.style.position="fixed";no.style.margin="0";no.style.left=x+"px";no.style.top=y+"px";bad()};
  no.onpointerdown=flee;no.onclick=e=>e.preventDefault();
  no.onpointerenter=e=>{if(e.pointerType==="mouse")flee(e)};
  yes.onclick=()=>{no.remove();win();for(let i=0;i<7;i++)setTimeout(()=>burst(Math.random()*innerWidth,Math.random()*innerHeight*.7+60,["🎃","🧡","💜","👻","🦇","✨"],12),i*260);f.innerHTML='<h2>I knew it! </h2><p style="text-align:center">Happy monthsary, '+C.her+'. I love you more than all the candy in the world. 💖</p>';dn()}}

$("s3").addEventListener("pointerdown",e=>burst(e.clientX,e.clientY,["✨","🧡","🎃"],4));

/* ===== private preview panel: open with #edit or tap the moon 5 times ===== */
let mt=0;$("moon").onclick=()=>{if(++mt>=5){$("ed").classList.add("on");mt=0}};
if(edit)$("ed").classList.add("on");
document.querySelectorAll("#ed input[data-i]").forEach(i=>i.onchange=()=>{const f=i.files[0];if(f){C.photos[+i.dataset.i]=URL.createObjectURL(f);renderPics()}});
$("mf").onchange=e=>{const f=e.target.files[0];if(f){C.music=URL.createObjectURL(f);au.src=C.music;$("mus").style.display="block"}};
$("ms").oninput=e=>{C.start=+e.target.value||0};
$("skip").onclick=()=>{run=0;clearInterval(sp);clearInterval(tm);openLetter()};

                                                                                                                         
