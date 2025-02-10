const country_code={
    "INR":"IN",
    "USD":"US",
    "AED":"AE",
    "AFN":"AF",
    "XCD":"AG",
    "ALL":"AL",
    "AMD":"AM",
    "ANG":"AN",
    "AOA":"AO",
    "ARS":"AR",
    "AUD":"AU",
    "BAM":"BA",
    "BBD":"BB",
    "BDT":"BD",
    "XOF":"BE",
    "BGN":"BG",
    "BHD":"BH",
    "BIF":"BI",
    "BMD":"BM",
    "BND":"BN",
    "RSD":"RS",
    "ZWL":"ZW",
    "ZMK":"ZM",
    "YER":"YE",
    "MAD":"EH",
    "XPF":"WF",
    "VND":"VN",
    "VUV":"VU",
    "VEF":"VE",
    "UZS":"UZ",
    "UYU":"UY",
    "GBP":"GB",
    "UAH":"UA",
    "UGX":"UG",
};

const droplist = document.querySelectorAll(".droplist select");
getButton=document.querySelector("form button");

fromcurrency = document.querySelector(".from select");
tocurrency=document.querySelector(".to select");
btn=document.querySelector("form button");

for(let i=0; i<droplist.length; i++){
    for(currcode in country_code){
        
        let selected;
        if(i==0){
            selected=currcode=="USD"? "selected":"";
        }else if(i==1){
            selected=currcode=="INR"? "selected":"";
        }
        let optiontag=`<option value="${currcode}" ${selected}>${currcode}</option>`;
        droplist[i].insertAdjacentHTML("beforeend",optiontag)
    }
  droplist[i].addEventListener("change", evt =>{
    loadFlag(evt.target);
  });
}

function loadFlag(element){
    for(code in country_code){
        if(code == element.value){
            let imgTag =element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`
        }
    }
}

window.addEventListener("load",()=>{
    getExchangeRate();
});

getButton.addEventListener("click",(evt)=>{
    evt.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".droplist .icon");
exchangeIcon.addEventListener("click",()=>{
let tempCode = fromcurrency.value;
fromcurrency.value=tocurrency.value;
tocurrency.value=tempCode;
loadFlag(fromcurrency);
loadFlag(tocurrency);
getExchangeRate();
});

function getExchangeRate(){
    const amount=document.querySelector(".amount input"); 
    const exchangeRateTxt=document.querySelector(".Exchange");
    let amountval=amount.value;
   if(amountval=="" || amountval=="0"){
    amount.value="1";
    amountval=1;
   }
   exchangeRateTxt.innerText = "Getting Exchange Rate..."
   let url=`https://v6.exchangerate-api.com/v6/beab15004f5d68f8d1d0f9e6/latest/${fromcurrency.value}`;
   fetch(url).then(responce=>responce.json()).then(result=>{
    let exchangerate=result.conversion_rates[tocurrency.value];
    let totalExchangeRate=(amountval*exchangerate).toFixed(2);
    const exchangeRateTxt=document.querySelector(".Exchange");
    exchangeRateTxt.innerText =`${amountval} ${fromcurrency.value}  =  ${totalExchangeRate} ${tocurrency.value} `;
   })
}
