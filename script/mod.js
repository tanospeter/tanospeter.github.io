// resp:
// 0 - in bounds, can be robustly detected
// 1 - in bounds, cannot be robustly detected
// 2 - out of bounds, likely can be robustly detected
// 3 - out of bounds, cannot be robustly detected

function estimatePeriod(unc, msr, per, noise) {  
  var range = getRangeOfParams()
  var uncMin = range.uncMin
  var uncMax = range.uncMax
  var msrMin = range.msrMin
  var msrMax = range.msrMax
  var lastPer = ''
  var comp = ''
  var resp = -1
  

  if (isNaN(unc) || unc < uncMin) {
    txt = "Unc is empty or NaN or negative! [" + uncMin + "," + uncMax + "]"
  }
  else if (isNaN(msr) || msr < msrMin) {
    txt = "MSR is empty or NaN or negative! [0,75["
  }
  else if (isNaN(per)) {
    txt = "Period is empty or NaN or negative!"
  }
  else{    
    if (per < 2 * msr){
      txt = "The given sampling rate is probably insufficient to carry the period sought for."
      resp = 1
    }
    else if (unc > uncMax) {
      if (msr > msrMax) {          
        data = cusp_mod(uncMax, msrMax, noise)
        comp = compare(data, per)
        lastPer = `last modeled period ${data} at Unc = ${uncMax} and MSR = ${msrMax}`
        txt = "Out of model bounds, " + lastPer + "." + comp.txt
        resp = comp.resp      
      }
      else {   
        data = cusp_mod(uncMax, msr, noise)   
        comp = compare(data, per)
        lastPer = `last modeled period ${data} at Unc = ${uncMax} and MSR = ${msr}`
        txt = "Out of model bounds, " + lastPer + "."  + comp.txt
        resp = comp.resp
      }
    }
    else if (msr > msrMax) {  
      data = cusp_mod(unc, msrMax, noise)  
      comp = compare(data, per)
      lastPer = `last modeled period ${data} at Unc = ${unc} and MSR = ${msrMax}`
      txt = "Out of model bounds, " + lastPer + "."  + comp.txt
      resp = comp.resp
    }
    else {  
      data = cusp_mod(unc, msr, noise)
      if (data < 0) {
        comp = compare(data, per)
        txt = `Out of model bounds, modeled period < 0.${comp.txt}`
        resp = comp.resp
      }
      else {
        if (data <= per) {
          txt = "Threshold period for noisy data: " + data + " yrs. Thus, the period " + per + " yrs can be robustly detected."
          resp = 0
        }
        else {
          txt = "Threshold period for noisy data: " + data + " yrs. Thus, the period " + per + " yrs cannot be robustly detected."
          resp = 1
        }
      }    
    }
  }
  return { unc, msr, per, data, resp, lastPer, txt }
}


/*
function estimatePeriodRegi(unc, msr, per, noise) {  
  var range = getRangeOfParams()
  var uncMin = range.uncMin
  var uncMax = range.uncMax
  var msrMin = range.msrMin
  var msrMax = range.msrMax
  var lastPer = ''
  var comp = ''
  var resp = -1
  

  if (isNaN(unc) || unc < uncMin) {
    txt = "Unc is empty or NaN or negative! [" + uncMin + "," + uncMax + "]"
  }
  else if (isNaN(msr) || msr < msrMin) {
    txt = "MSR is empty or NaN or negative! [0,75["
  }
  else if (isNaN(per)) {
    txt = "Period is empty or NaN or negative!"
  }
  else if (unc > uncMax) {
    if (msr > msrMax) {      
      data = getPeriod(uncMax, msrMax, noise)
      comp = compare(data, per)
      lastPer = `last modeled period ${data} at Unc = ${uncMax} and MSR = ${msrMax}`
      txt = "Out of model bounds, " + lastPer + "." + comp.txt
      resp = comp.resp      
    }
    else {      
      data = getPeriod(uncMax, msr, noise)
      comp = compare(data, per)
      lastPer = `last modeled period ${data} at Unc = ${uncMax} and MSR = ${msr}`
      txt = "Out of model bounds, " + lastPer + "."  + comp.txt
      resp = comp.resp
    }
  }
  else if (msr > msrMax) {    
    data = getPeriod(unc, msrMax, noise)
    comp = compare(data, per)
    lastPer = `last modeled period ${data} at Unc = ${unc} and MSR = ${msrMax}`
    txt = "Out of model bounds, " + lastPer + "."  + comp.txt
    resp = comp.resp
  }
  else {    
    data = getPeriod(unc, msr, noise)
    if (data < 0) {
      comp = compare(data, per)
      txt = `Out of model bounds, modeled period < 0.${comp.txt}`
      resp = comp.resp
    }
    else{
      if (data <= per) {
        txt = "Threshold period for noisy data: " + data + " yrs\nThus, the period " + per + " yrs can be robustly detected."
        resp = 0
      }
      else {
        txt = "Threshold period for noisy data: " + data + " yrs\nThus, the period " + per + " yrs cannot be robustly detected."
        resp = 1
      }
    }    
  }
  return { unc, msr, per, data, resp, lastPer, txt }
}
*/

function compare(d, p) {
  var txt = "";
  if (d < p) {
    txt = "\n"
    resp = 2
  }
  else {
    txt = "\nThus, the period " + p + " yrs cannot be robustly detected."
    resp = 3
  }
  return {txt, resp}
}

function getPeriod(unc, msr, noise){
  var surfNoise = getSurface(noise)  
  return surfNoise["z"][surfNoise["y"].indexOf(msr)][surfNoise["x"].indexOf(unc)].toFixed(2)
}


