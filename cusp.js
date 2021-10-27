// period = a*unc + b*msr
function calcPeriod(a,unc,b,msr){
	period = -1
	period = a * unc + b * msr 
	return period
}

// noise: 0 or 1 => white AR(0) -> 0 red AR(1) -> 1
function cusp_mod(unc, msr, noise){
	var period = -1
	if (noise == 0) {
		a = 0.5637403
		b = 1.182448
		period = calcPeriod(a,unc,b,msr)
	}
	else if (noise == 1) {
		a = 0.609085
		b = 0.9239105
		period = calcPeriod(a,unc,b,msr)
	}

	return period
}