const e=document.querySelector(".btn-calculate"),t=document.querySelector(".input-gross-income"),n=document.querySelector(".input-pension-contribution"),o=document.querySelector(".monthly-gross-income"),l=document.querySelector(".monthly-national-insurance"),a=document.querySelector(".monthly-income-tax"),i=document.querySelector(".monthly-net-income"),u=new class{calculateMonthlyNationalInsurance=function(e){return e<=12570?0:e<=50270?+((e-12570)*.1/12).toFixed(2):+((3770+(e-50270)*.2)/12).toFixed(2)}},c=new class{#e=function(e){return e>12570&&e<50271};#t=function(e){return e>=50271&&e<125141};#n=function(e){return e>=125141};#o=function(e,t){return(e-t)*.2};#l=function(e){let t=12570,n=50271;if(e>1e5){let o=(e-1e5)/2;t-=o,n-=o}let o=this.#o(n,t<0?0:t);return .4*(e-(n-1))+o};#a=function(e){return(e-125140)*.45+this.#l(125140)};calculateAnnualIncomeTax=function(e){return e<=12570?0:this.#e(e)?this.#o(e,12570):this.#n(e)?this.#a(e):this.#t(e)?this.#l(e):void 0}};e.addEventListener("click",function(e){if(e.preventDefault(),!(isNaN(t.value)&&isNaN(parseFloat(t))||0>+t.value?(alert("Please enter a valid Annual Income"),!1):!(isNaN(n.value)||0>+n.value)||(alert("Please enter a valid Monthly Pension Contribution"),!1)))return;let r=+t.value,s=+n.value,d=+(r/12).toFixed(2);o.textContent=`Your monthly gross income is: \xa3${d}`;let m=+(r-12*s).toFixed(2),h=u.calculateMonthlyNationalInsurance(r).toFixed(2);l.textContent=`Your monthly national insurance is: \xa3${h}`;let x=(c.calculateAnnualIncomeTax(m)/12).toFixed(2);a.textContent=`Your monthly income tax is: \xa3${x}`,i.textContent=`Your monthly net income is: \xa3${(d-h-x).toFixed(2)}`});
//# sourceMappingURL=index.ab1ab7bc.js.map
