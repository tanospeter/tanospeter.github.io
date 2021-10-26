function findTimeStep(){
  id = false
  timeStep = 0
  document.timestepSelector.timestep.forEach(element => {
    if (element.checked) {
      id = element.id
      switch (id) {
        case "yr":
          timeStep = 1
          break;
        case "10yrs":
          timeStep = 10
          break;
        case "100yrs":
          timeStep = 100
          break;
        case "kyr":
          timeStep = 1000
          break;
        default:
          break;
      }
    }
  });
  return timeStep;
}

function findNoise(){
  id = false
  noise = -1
  document.noiseModel.noise.forEach(element => {
    if (element.checked) {
      id = element.id
      switch (id) {
        case "white":
          noise = 0
          break;
        case "red":
          noise = 1
          break;        
        default:
          break;
      }
    }
  });
  return noise;
}

function getRangeOfParams(){
  var uncMin = 0
  var uncMax = 1200
  var msrMin = 0
  var msrMax = 120
  console.log(uncMin,uncMax,msrMin,msrMax)
  
  return {uncMin, uncMax, msrMin, msrMax}
}

function checkParams(unc, msr, per){
  var range = getRangeOfParams()
  console.log(range)
  var resp = 0
  var txt = -1
  if (isNaN(unc) || unc < range.uncMin) {    
    //resp - 1
    txt = `Unc is empty or NaN or negative! [${range.uncMin}, ${range.uncMax}]`
    resp = 1
    alert(`Unc or MSR or Period is empty or NaN or negative!`)
  }
  else if (isNaN(msr) || msr < range.msrMin) {
    //resp - 2
    txt = `MSR is empty or NaN or negative! [${range.msrMin},${range.msrMax}[`
    resp = 2
    alert(`Unc or MSR or Period is empty or NaN or negative!`)
  }
  else if (isNaN(per)) {
    //resp - 3
    txt = "Period is empty or NaN or negative!"
    resp = 3
    alert(`Unc or MSR or Period is empty or NaN or negative!`)
  }

  return {txt, resp}
}

function scale(){
  var unc = document.getElementById("uncTextBox").value;
  unc = unc.replace(",", ".")
  unc = parseFloat(unc)
  var msr = document.getElementById("windowTextBox").value;
  msr = msr.replace(",", ".")
  msr = parseFloat(msr)        
  var per = document.getElementById("periodTextBox").value;
  per = per.replace(",", ".")
  per = parseFloat(per)
    
  var timeStep = findTimeStep()
  console.log(unc, msr, per, timeStep)
  
  unc = unc*timeStep
  msr = msr*timeStep
  per = per*timeStep
  
  unc = unc.toFixed(0);
  unc = parseInt(unc);
  msr = msr.toFixed(0);
  msr = parseInt(msr);
  per = per.toFixed(0);
  per = parseInt(per);
  
  console.log(unc, msr, per, timeStep)
   
  return {unc, msr, per}
} 

function makeOutput(no, res, unc, msr, per, noise, out1, out2, data){
  // kártya placeholder div
  var d1 = document.createElement("div")
  d1.className = "col-md-4"
  d1.style= "padding: 2px"
  
  // kártya div
  var d2 = document.createElement("div")
  d2.className = "jumbotron-white"
  
  // ikon jobb-fent
  var img = document.createElement("img")
  img.style = "position: absolute; top: 3%; right: 3%; max-width: 25%; max-height: 25%;"
  switch (res) {
    case 0:
      img.src = "images/check.png"    
      break;
    case 1:
      img.src = "images/x.png"    
      break;
    case 2:
      img.src = "images/warning.png"    
      break;
    case 3:
      img.src = "images/warning.png"    
      break;
    default:
      break;
  }

  // output számozás
  var h1 = document.createElement("h6")
  var h1txt = document.createTextNode(`#${no}`)
  h1.appendChild(h1txt)

  // input header
  var h2 = document.createElement("h7")
  var h2txt = document.createTextNode("Input:")
  h2.appendChild(h2txt)

  // input div
  var d3 = document.createElement("div")  
  d3.style = "padding-left: 5px"

  // input text
  var s1 = document.createElement("span")    
  var s1txt = document.createTextNode(`Chronological uncertainty: ${unc} yr`)    
  s1.appendChild(s1txt)
  s1.appendChild(document.createElement("br"))  
  var s1txt = document.createTextNode(`Mean sampling resolution: ${msr} yr/sample`)
  s1.appendChild(s1txt)
  s1.appendChild(document.createElement("br"))  
  var s1txt = document.createTextNode(`Period: ${per} yrs`)
  s1.appendChild(s1txt)
  s1.appendChild(document.createElement("br"))  
  var s1txt = document.createTextNode(`Noise: AR(${noise})`)
  s1.appendChild(s1txt)
  d3.appendChild(s1) // input text hozzáadása az input div hez

  // output header
  var h3 = document.createElement("h7")
  var h3txt = document.createTextNode("Output:")
  h3.appendChild(h3txt)
  
  // output div
  var d4 = document.createElement("div")
  d4.style = "padding-left: 5px"

  // output string1
  var s2 = document.createElement("div")
  var s2txt = document.createTextNode("Treshold period: ...") 
  s2.appendChild(s2txt)
  //d4.appendChild(s2)

  //output string2
  var d5 = document.createElement("div")
  d5.style = "padding-left: 5px;"
  var d5txt = document.createTextNode(out1)
  d5.appendChild(d5txt)
  

  d2.appendChild(img)
  d2.appendChild(h1)
  d2.appendChild(h2)
  d2.appendChild(d3)
  d2.appendChild(h3)
  //d2.appendChild(d4)
  d2.appendChild(d5)
  d1.appendChild(d2)
  var element = document.getElementById("results")
  element.appendChild(d1)
}

function runMod(){
  
  var scaled = scale()
  var unc = scaled.unc
  var msr = scaled.msr
  var per = scaled.per

  var noise = findNoise()
  //noise = parseInt(noise)  

  console.log(`unc=${unc}; msr=${msr}; per=${per}; noise=${noise}`)
  checked = checkParams(unc, msr, per)
  console.log(`Value of checkParams().txt: ${checked.txt}`)
  if (checked.resp == 0){
    var res = calcPeriod(unc, msr, per, noise)
    console.log(`Result of calcPeriod()-> ${JSON.stringify(res)}\nunc:${res.unc}, msr:${res.msr}, per:${res.per}, data:${res.data}, resp:${res.resp}, txt:\n${res.txt}`)
    var d = document.createElement("div")
    var s = document.createElement("p")        
    var node = document.createTextNode(res.txt)
    s.appendChild(node);
    d.appendChild(s);
    var element = document.getElementById("teszt")
    //element.appendChild(d)
    //makeOutput(1,res.resp,unc,msr,per, noise, res.txt)
    makeOutputNew(res.resp,unc,msr,per, noise, res.txt)
  }  
}

function makeOutputNew(res, unc, msr, per, noise, out1, out2, data){
  // sorszám
  let no = document.getElementById("counter").innerHTML
  no = parseInt(no)
  document.getElementById("counter").innerHTML=no+1
  //console.log(document.getElementById("counter").innerHTML)

  // kártya placeholder div
  var d1 = document.createElement("div")
  d1.className = "box"  
  
  // kártya div
  var d2 = document.createElement("div") 
  d2.className = "box-content"
  // ikon jobb-fent
  var img = document.createElement("img")
  img.style = "max-width: 5%; max-height: 5%;"
  switch (res) {
    case 0:
      img.src = "images/check.png"    
      break;
    case 1:
      img.src = "images/x.png"    
      break;
    case 2:
      img.src = "images/warning.png"    
      break;
    case 3:
      img.src = "images/warning.png"    
      break;
    default:
      break;
  }

  // output számozás
  var h1 = document.createElement("h4")
  var h1txt = document.createTextNode(`#${no}`)
  h1.appendChild(h1txt)

  // input header
  var h2 = document.createElement("p")
  var h2txt = document.createTextNode("Input:")
  h2.appendChild(h2txt)

  // input div
  var d3 = document.createElement("p")  
  //d3.style = "padding-left: 5px"

  // input text
  var s1 = document.createElement("span")    
  var s1txt = document.createTextNode(`Chronological uncertainty: ${unc} yr`)    
  s1.appendChild(s1txt)
  s1.appendChild(document.createElement("br"))  
  var s1txt = document.createTextNode(`Mean sampling resolution: ${msr} yr/sample`)
  s1.appendChild(s1txt)
  s1.appendChild(document.createElement("br"))  
  var s1txt = document.createTextNode(`Period: ${per} yrs`)
  s1.appendChild(s1txt)
  s1.appendChild(document.createElement("br"))  
  var s1txt = document.createTextNode(`Noise: AR(${noise})`)
  s1.appendChild(s1txt)
  d3.appendChild(s1) // input text hozzáadása az input div hez

  // output header
  var h3 = document.createElement("p")
  var h3txt = document.createTextNode("Output:")
  h3.appendChild(h3txt)
  
  // output div
  var d4 = document.createElement("p")
  //d4.style = "padding-left: 5px"

  // output string1
  var s2 = document.createElement("p")
  var s2txt = document.createTextNode("Treshold period: ...") 
  s2.appendChild(s2txt)
  //d4.appendChild(s2)

  //output string2
  var d5 = document.createElement("p")  
  var d5txt = document.createTextNode(out1)
  d5.appendChild(d5txt)
  

  d2.appendChild(img)
  d2.appendChild(h1)
  d2.appendChild(h2)
  d2.appendChild(d3)
  d2.appendChild(h3)
  //d2.appendChild(d4)
  d2.appendChild(d5)
  d1.appendChild(d2)
  var element = document.getElementById("results")
  element.appendChild(d1)
}

function clearOutput(){
  document.getElementById("results").innerHTML = ''
  document.getElementById("counter").innerHTML=1
}