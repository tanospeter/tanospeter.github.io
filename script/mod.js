// resp:
// 0 - in bounds, can be robustly detected
// 1 - in bounds, cannot be robustly detected

function estimatePeriod(unc, msr, per, unit, noise) {  
  var range = getRangeOfParams()
  var uncMin = range.uncMin
  var uncMax = range.uncMax
  var msrMin = range.msrMin
  var msrMax = range.msrMax
  var lastPer = ''
  var comp = ''
  var resp = -1
  var data = -1
  

  if (isNaN(unc) || unc <= 0 ) {
    txt = "Either of the input parameters is missing or incorrect (<=0 or NaN)"
  }
  else if (isNaN(msr) || msr <= 0) {
    txt = "Either of the input parameters is missing or incorrect (<=0 or NaN)"
  }
  else if (isNaN(per)|| per <= 0) {
    txt = "Either of the input parameters is missing or incorrect (<=0 or NaN)"
  }
  else{    
    if (per < 2 * msr){
      txt = "The given sampling rate is probably insufficient to carry the period sought for."
      data = 0
      resp = 1
    }    
    else {  
      data = cusp_mod(unc, msr, noise)            
      if (data <= per) {
        txt = `Threshold period for noisy data: ${data} ${unit}. Thus, the period ${per} ${unit} can be robustly detected.`
        resp = 0
      }
      else {
        txt = `Threshold period for noisy data: ${data} ${unit}. Thus, the period ${per} ${unit} yrs cannot be robustly detected.`
        resp = 1
      }          
    }
  }
  return { unc, msr, per, data, resp, lastPer, txt }
}

