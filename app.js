import { phases } from "./data/curriculum.js";
import { principles, kernel } from "./data/principles.js";
import { scenarios } from "./data/scenarios.js";
import { DEFAULT_SETTINGS } from "./data/settings.js";

const KEY="wr01-school-v3";
const CONTACTS=["gauxarts@gmail.com","cyberjai2k25@gmail.com"];
const state=JSON.parse(localStorage.getItem(KEY)||"null")||{
  section:"dashboard",
  completed:{},
  notes:{},
  scenarioAnswers:{},
  settings:{...DEFAULT_SETTINGS},
  profile:{name:"",studentId:"",className:"Grade 12",goal:"",bio:""}
};
state.settings={...DEFAULT_SETTINGS,...state.settings};
state.profile={name:"",studentId:"",className:"Grade 12",goal:"",bio:"",...state.profile};

const lessons=phases.flatMap(p=>p.lessons.map(x=>({id:x[0],title:x[1],desc:x[2],tag:x[3],phase:p.title,phaseId:p.id,track:p.track})));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const pct=()=>Math.round(Object.values(state.completed).filter(Boolean).length/lessons.length*100);
const persist=()=>localStorage.setItem(KEY,JSON.stringify(state));
const save=()=>{if(state.settings.autoSave!==false)persist()};
const badge=t=>`<span class="badge ${t==="CANON"?"canon":t==="INFERRED"?"infer":t==="SAFETY"?"safe":"warn"}">${t}</span>`;

function setSection(s){state.section=s;save();render()}
function nextLesson(){return lessons.find(l=>!state.completed[l.id])||lessons[lessons.length-1]}

function shell(body){
 const nav=[["dashboard","Command Center"],["curriculum","Curriculum"],["principles","Principles"],["training","Recall Lab"],["scenarios","Scenario Lab"],["school","Online School"],["review","Daily Review"],["settings","Settings"],["contact","Doubts / Contact"]];
 return `<div class="app"><aside class="side"><div class="brand"><div class="micro">WR-01 / ACADEMY</div><h1>AYANOKOJI</h1><p>WHITE ROOM PROTOCOL</p></div><nav class="nav">${nav.map(([id,l])=>`<button class="${state.section===id?"active":""}" data-nav="${id}">${l}</button>`).join("")}</nav><div class="sidefoot">Local-first academy. Progress and profile data stay in this browser unless you export them.</div></aside><main class="main"><header class="top"><div><strong>${esc(nav.find(x=>x[0]===state.section)?.[1]||"Command Center")}</strong></div><div class="muted tiny">${esc(state.profile.name||"Student")} · ${pct()}% complete</div></header><section class="content">${body}<div class="footer">WR-01 • 2026 • MIT licensed • Fictional character-study framework</div></section></main></div>`;
}

function dashboard(){
 const n=nextLesson();
 return shell(`<div class="hero"><div class="micro">COMMAND CENTER</div><h2>Train the framework. Measure the result.</h2><p>Follow a structured online-school curriculum covering the observable Ayanokoji model: body, voice, observation, reasoning, emotion, social behavior, academics and strategic decision-making.</p><div class="actions" style="margin-top:18px"><button class="btn primary" data-open="${n.id}">Continue ${esc(n.title)}</button><button class="btn" data-nav="school">Go to online school</button><button class="btn" data-nav="settings">Student settings</button></div></div>
 <div class="grid"><div class="card"><div class="kpis"><div class="kpi"><div class="micro">Completion</div><strong>${pct()}%</strong></div><div class="kpi"><div class="micro">Lessons</div><strong>${lessons.length}</strong></div><div class="kpi"><div class="micro">Phases</div><strong>${phases.length}</strong></div><div class="kpi"><div class="micro">Doubts</div><strong>24/7</strong></div></div></div>
 <div class="card half"><div class="micro">MASTER KEY</div><h3 style="margin:7px 0 14px">Five-step kernel</h3><div class="timeline">${kernel.map((k,i)=>`<div class="step"><div class="num">${i+1}</div><div><strong>${k[0]}</strong><div class="tiny muted">${k[1]}</div></div><span class="badge">CORE</span></div>`).join("")}</div></div>
 <div class="card half"><div class="micro">NEXT LESSON</div><h3 style="margin:7px 0 7px">${esc(n.title)}</h3><p class="muted small">${esc(n.desc)}</p>${badge(n.tag)}<div style="margin-top:15px"><button class="btn primary" data-open="${n.id}">Open</button></div></div>
 <div class="card"><div class="notice"><strong>Operating rule:</strong> see clearly, separate facts from assumptions, regulate behavior, choose proportionately, execute, and update from evidence. “White Room” here is a fictional training theme—not a recommendation for harmful conditioning.</div></div></div>`);
}

function curriculum(){
 return shell(`<div class="hero"><div class="micro">CURRICULUM</div><h2>11 phases / ${lessons.length} lessons</h2><p>Move sequentially. Mark a lesson complete only after you can explain it without notes and apply it in a normal situation.</p></div><div class="grid">${phases.map(p=>`<div class="card"><div class="micro">PHASE ${p.id} · ${p.track}</div><h3 style="margin:7px 0 6px">${esc(p.title)}</h3><div class="muted small" style="margin-bottom:14px">${esc(p.desc||"")}</div><div class="list">${p.lessons.map(x=>`<div class="row"><div><div class="title">${state.completed[x[0]]?"✓ ":""}${esc(x[1])}</div><div class="desc">${esc(x[2])}</div></div><div class="actions">${state.settings.showTags!==false?badge(x[3]):""}<button class="btn small" data-open="${x[0]}">${state.completed[x[0]]?"Review":"Learn"}</button></div></div>`).join("")}</div></div>`).join("")}</div>`);
}

function principlesPage(){
 return shell(`<div class="hero"><div class="micro">PRINCIPLES</div><h2>Compress the system.</h2><p>Memorize the operating principles; let them generate the detailed behavior.</p></div><div class="grid"><div class="card half"><div class="micro">15 CORE</div><ol>${principles.map(p=>`<li style="margin:10px 0;line-height:1.55">${esc(p)}</li>`).join("")}</ol></div><div class="card half"><div class="micro">KERNEL</div><div class="timeline">${kernel.map((x,i)=>`<div class="step"><div class="num">${i+1}</div><div><strong>${x[0]}</strong><div class="tiny muted">${x[1]}</div></div></div>`).join("")}</div></div></div>`);
}

function training(){
 const q=lessons[(new Date().getDate()+new Date().getMonth()+new Date().getFullYear())%lessons.length];
 return shell(`<div class="hero"><div class="micro">RECALL LAB</div><h2>Retrieve, don't reread.</h2><p>Try to explain the lesson from memory before revealing the reference. This is the fastest way to find what you actually know.</p></div><div class="card"><div class="micro">${esc(q.phase)}</div><h3 style="margin:7px 0">${esc(q.title)}</h3><p class="muted">${esc(q.desc)}</p><div class="notice">Before revealing: define the principle, explain what mistake it prevents, and give one school/life application.</div><button class="btn primary" style="margin-top:14px" data-reveal="${q.id}">Reveal reference</button><div id="reveal"></div></div>`);
}

function scenariosPage(){
 return shell(`<div class="hero"><div class="micro">SCENARIO LAB</div><h2>Practice under uncertainty.</h2><p>Choose the response that preserves evidence discipline, composure and proportionate action.</p></div>${scenarios.map(s=>`<div class="card" style="margin-bottom:16px"><div class="micro">SCENARIO</div><h3 style="margin:7px 0">${esc(s.title)}</h3><p class="muted">${esc(s.prompt)}</p><div class="list">${s.options.map(o=>`<button class="option" data-scenario="${s.id}" data-choice="${o[0]}">${esc(o[0])}. ${esc(o[1])}</button>`).join("")}</div><div id="result-${s.id}" style="margin-top:12px"></div></div>`).join("")}`);
}

function school(){
 const done=lessons.filter(l=>state.completed[l.id]).length;
 const hours=Math.max(1,Math.round(done*0.45));
 const phase=Math.min(phases.length-1,Math.floor(done/4));
 return shell(`<div class="hero"><div class="micro">ONLINE SCHOOL</div><h2>WR-01 Academy</h2><p>Student dashboard, course progression, assignments, review sessions and instructor contact—designed like a lightweight online school.</p></div>
 <div class="grid"><div class="card half"><div class="micro">STUDENT</div><h3>${esc(state.profile.name||"Unnamed student")}</h3><p class="muted">${esc(state.profile.className)} · ID ${esc(state.profile.studentId||"not set")}</p><div class="progress"><span style="width:${pct()}%"></span></div><p class="tiny muted">${done}/${lessons.length} lessons complete · approx. ${hours} study-hours logged</p></div>
 <div class="card half"><div class="micro">CURRENT PHASE</div><h3>Phase ${phase}: ${esc(phases[phase].title)}</h3><p class="muted">${esc(phases[phase].track)}</p><button class="btn primary" data-nav="curriculum">Open curriculum</button></div>
 <div class="card"><div class="micro">COURSE CATALOG</div><div class="list">${phases.map(p=>`<div class="school-card"><div class="school-icon">${String(p.id).padStart(2,"0")}</div><div><strong>${esc(p.title)}</strong><div class="tiny muted">${esc(p.track)} · ${p.lessons.length} lessons</div></div><div class="actions"><button class="btn small" data-nav="curriculum">View</button></div></div>`).join("")}</div></div>
 <div class="card"><div class="micro">EXTERNAL STUDY</div><h3 style="margin:7px 0">Google resources</h3><div class="actions"><a class="btn" target="_blank" rel="noopener" href="https://classroom.google.com/">Google Classroom</a><a class="btn" target="_blank" rel="noopener" href="https://drive.google.com/">Google Drive</a><a class="btn" target="_blank" rel="noopener" href="https://www.google.com/">Google Search</a></div></div></div>`);
}

function review(){
 const d=new Date().toISOString().slice(0,10);
 return shell(`<div class="hero"><div class="micro">DAILY REVIEW</div><h2>Turn results into feedback.</h2><p>Keep the review factual and actionable.</p></div><div class="card"><div class="three"><div><div class="micro">01</div><h3>What happened?</h3><p class="tiny muted">Facts only.</p></div><div><div class="micro">02</div><h3>What did I do?</h3><p class="tiny muted">Behavior, not identity judgment.</p></div><div><div class="micro">03</div><h3>What changes?</h3><p class="tiny muted">One concrete adjustment.</p></div></div><textarea id="review-note" placeholder="Write today's review...">${esc(state.notes[d]||"")}</textarea><div class="actions" style="margin-top:12px"><button class="btn primary" data-save-review>Save review</button><span id="review-msg" class="muted tiny"></span></div></div>`);
}

function settings(){
 const s=state.settings,p=state.profile;
 return shell(`<div class="hero"><div class="micro">SETTINGS</div><h2>Academy configuration</h2><p>Everything here is local to this browser. Use backup tools before clearing browser data or switching devices.</p></div><div class="grid">
 <div class="card half"><div class="micro">STUDENT PROFILE</div><div class="two">
 <div class="field"><label>Name</label><input id="p-name" value="${esc(p.name)}"></div>
 <div class="field"><label>Student ID / User ID</label><input id="p-id" value="${esc(p.studentId)}" placeholder="e.g. WR01-JAI-001"></div>
 <div class="field"><label>Class</label><input id="p-class" value="${esc(p.className)}"></div>
 <div class="field"><label>Main goal</label><input id="p-goal" value="${esc(p.goal)}"></div>
 </div><div class="field" style="margin-top:12px"><label>Profile note</label><textarea id="p-bio" style="min-height:100px">${esc(p.bio)}</textarea></div><button class="btn primary" data-save-profile style="margin-top:12px">Save profile</button></div>
 <div class="card half"><div class="micro">UI / TRAINING</div><div class="list">
 <div class="field"><label>Theme</label><select id="set-theme"><option value="dark" ${s.theme==="dark"?"selected":""}>Dark</option><option value="light" ${s.theme==="light"?"selected":""}>Light</option></select></div>
 <div class="field"><label>Density</label><select id="set-density"><option value="comfortable" ${s.density==="comfortable"?"selected":""}>Comfortable</option><option value="compact" ${s.density==="compact"?"selected":""}>Compact</option></select></div>
 <div class="field"><label>Daily goal (minutes)</label><input id="set-goal" type="number" min="5" max="240" value="${s.dailyGoal}"></div>
 <label class="tiny"><input id="set-motion" type="checkbox" ${s.reducedMotion?"checked":""}> Reduced motion</label>
 <label class="tiny"><input id="set-tags" type="checkbox" ${s.showTags?"checked":""}> Show canon/inference/safety tags</label>
 <label class="tiny"><input id="set-auto" type="checkbox" ${s.autoSave?"checked":""}> Automatic local saving</label>
 <button class="btn primary" data-save-settings>Save settings</button></div></div>
 <div class="card"><div class="micro">DATA CONTROL</div><div class="actions"><button class="btn" data-export>Export JSON backup</button><label class="btn" for="import-file">Import JSON backup</label><input id="import-file" type="file" accept="application/json" hidden><button class="btn danger" data-reset>Reset all local data</button></div><p class="tiny muted" style="margin-bottom:0">Export creates a portable copy of your profile, progress, notes, scenario results and settings. Nothing is uploaded by this app.</p></div>
 <div class="card"><div class="micro">LICENSE & LINKS</div><p class="muted small">This project is released under the MIT License. See <a href="LICENSE" target="_blank">LICENSE</a>. The “White Room” naming is a fictional theme, not a recommendation for harmful conditioning or unsafe behavior.</p><div class="actions"><a class="btn" target="_blank" rel="noopener" href="https://github.com/">GitHub</a><a class="btn" target="_blank" rel="noopener" href="https://classroom.google.com/">Google Classroom</a><a class="btn" target="_blank" rel="noopener" href="https://drive.google.com/">Google Drive</a></div></div></div>`);
}

function contact(){
 const subject=encodeURIComponent("WR-01 Academy Doubt");
 return shell(`<div class="hero"><div class="micro">DOUBTS / CONTACT</div><h2>Ask the instructor.</h2><p>Use either email address for curriculum doubts, technical issues or suggestions.</p></div><div class="grid"><div class="card half"><div class="micro">PRIMARY CONTACT</div><h3 style="margin:8px 0">gauxarts@gmail.com</h3><p class="muted small">General doubts and academy feedback.</p><a class="btn primary" href="mailto:gauxarts@gmail.com?subject=${subject}">Email now</a></div><div class="card half"><div class="micro">SECONDARY CONTACT</div><h3 style="margin:8px 0">cyberjai2k25@gmail.com</h3><p class="muted small">Technical or project-related doubts.</p><a class="btn primary" href="mailto:cyberjai2k25@gmail.com?subject=${subject}">Email now</a></div><div class="card"><div class="micro">DOUBT TEMPLATE</div><div class="notice">Include your module/lesson, the exact question or problem, what you tried, and (for technical issues) your browser/device. This makes replies faster.</div><div class="actions" style="margin-top:14px"><a class="btn" href="mailto:gauxarts@gmail.com?subject=${subject}">Write a doubt to gauxarts</a><a class="btn" href="mailto:cyberjai2k25@gmail.com?subject=${subject}">Write a technical doubt</a></div></div></div>`);
}

function lesson(id){
 const l=lessons.find(x=>x.id===id); if(!l)return;
 state.section="curriculum";save();
 document.querySelector("#app").innerHTML=shell(`<div class="hero"><div class="micro">${esc(l.phase)} · ${esc(l.track)} · ${esc(l.tag)}</div><h2>${esc(l.title)}</h2><p>${esc(l.desc)}</p></div><div class="grid"><div class="card half"><div class="micro">MASTERY METHOD</div><h3>Active recall</h3><p class="muted">Close the page. Explain the rule, name one failure mode it prevents and give one real-world application.</p><div class="notice">Canonical source status: ${esc(l.tag)}. The app does not treat inference as documented internal canon.</div></div><div class="card half"><div class="micro">STATUS</div><h3>${state.completed[id]?"Completed":"Not completed"}</h3><p class="muted">Complete only after you can reproduce the concept without notes.</p><div class="actions"><button class="btn primary" data-complete="${id}">${state.completed[id]?"Mark incomplete":"Mark complete"}</button><button class="btn" data-nav="curriculum">Back</button></div></div></div>`);
}

function render(){
 let body;
 switch(state.section){case"curriculum":body=curriculum().replace(/^.*?<section class="content">/,"").replace(/<\/section><\/main><\/div>$/,"");break;default:body=null}
 if(state.section==="dashboard")document.querySelector("#app").innerHTML=dashboard();
 else if(state.section==="curriculum")document.querySelector("#app").innerHTML=curriculum();
 else if(state.section==="principles")document.querySelector("#app").innerHTML=principlesPage();
 else if(state.section==="training")document.querySelector("#app").innerHTML=training();
 else if(state.section==="scenarios")document.querySelector("#app").innerHTML=scenariosPage();
 else if(state.section==="school")document.querySelector("#app").innerHTML=school();
 else if(state.section==="review")document.querySelector("#app").innerHTML=review();
 else if(state.section==="settings")document.querySelector("#app").innerHTML=settings();
 else if(state.section==="contact")document.querySelector("#app").innerHTML=contact();
}
render();

document.addEventListener("click",async e=>{
 const nav=e.target.closest("[data-nav]"); if(nav){setSection(nav.dataset.nav);return}
 const open=e.target.closest("[data-open]"); if(open){lesson(open.dataset.open);return}
 const complete=e.target.closest("[data-complete]"); if(complete){const id=complete.dataset.complete;state.completed[id]=!state.completed[id];save();lesson(id);return}
 const reveal=e.target.closest("[data-reveal]"); if(reveal){const q=lessons.find(x=>x.id===reveal.dataset.reveal);document.querySelector("#reveal").innerHTML=`<div class="notice" style="margin-top:14px"><strong>${esc(q.title)}</strong><br>${esc(q.desc)}<br><br>${badge(q.tag)}</div>`;return}
 const sc=e.target.closest("[data-scenario]"); if(sc){const s=scenarios.find(x=>x.id===sc.dataset.scenario);const o=s.options.find(x=>x[0]===sc.dataset.choice);document.querySelector("#result-"+s.id).innerHTML=`<div class="notice"><strong>${o[2]==="correct"?"Correct":"Not the strongest response"}</strong><br>${esc(s.why)}</div>`;sc.parentElement.querySelectorAll(".option").forEach(b=>{const z=s.options.find(x=>x[0]===b.dataset.choice);b.classList.remove("correct","wrong");b.classList.add(z[2])});state.scenarioAnswers[s.id]=o[2]==="correct";save();return}
 if(e.target.closest("[data-save-review]")){const d=new Date().toISOString().slice(0,10);state.notes[d]=document.querySelector("#review-note").value;persist();const m=document.querySelector("#review-msg");m.textContent="Saved locally.";setTimeout(()=>m.textContent="",1500);return}
 if(e.target.closest("[data-save-profile]")){state.profile.name=document.querySelector("#p-name").value;state.profile.studentId=document.querySelector("#p-id").value;state.profile.className=document.querySelector("#p-class").value;state.profile.goal=document.querySelector("#p-goal").value;state.profile.bio=document.querySelector("#p-bio").value;persist();render();return}
 if(e.target.closest("[data-save-settings]")){state.settings.theme=document.querySelector("#set-theme").value;state.settings.density=document.querySelector("#set-density").value;state.settings.dailyGoal=Math.max(5,Math.min(240,Number(document.querySelector("#set-goal").value)||30));state.settings.reducedMotion=document.querySelector("#set-motion").checked;state.settings.showTags=document.querySelector("#set-tags").checked;state.settings.autoSave=document.querySelector("#set-auto").checked;persist();render();return}
 if(e.target.closest("[data-export]")){const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="wr01-backup.json";a.click();URL.revokeObjectURL(a.href);return}
 if(e.target.closest("[data-reset]")){if(confirm("Reset all WR-01 local data? This cannot be undone unless you have an export backup.")){localStorage.removeItem(KEY);location.reload()}return}
});
document.addEventListener("change",async e=>{
 if(e.target.id==="import-file"&&e.target.files?.[0]){try{const txt=await e.target.files[0].text();const data=JSON.parse(txt);if(!data.completed||!data.settings||!data.profile)throw new Error("Invalid backup");localStorage.setItem(KEY,JSON.stringify(data));alert("Backup imported. Reloading.");location.reload()}catch(err){alert("Import failed: "+err.message)}}
});