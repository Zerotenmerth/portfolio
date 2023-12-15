javascript:(/* @version 1.7 @author Golden_Dragon @description GetInfoFromSales*/function() 
{
let id = document.getElementsByClassName('left ng-binding')[0].textContent.substring(7).replace('#', '№ ');
let surname = document.getElementsByClassName('click-editable')[0].textContent;
let typeMail = document.getElementsByClassName('stylized-select click-editable')[0].textContent;
let typeOfPayment = document.getElementsByClassName('stylized-select click-editable')[1].textContent;
let site = document.getElementsByClassName('wrapper-inner-form-column-container')[3].getElementsByClassName('stylized-select click-editable')[0].textContent;
let allcomment= document.getElementsByClassName('emulate-pre type-textarea click-editable')[1].textContent;
let totalSum=document.getElementsByClassName('nobr font-weight-600 ng-binding ng-scope')[3].textContent;
let TTN = document.getElementsByClassName('m-right10 p-bot5 left block ng-binding')[0]?.textContent || '';
let typeUkrPoshta = document.querySelector("[attr-field-name='typeUkrPoshta']")?.textContent || '';

let massProducts= document.getElementsByClassName('price-to-order height-45px ng-scope ng-isolate-scope');
let products =[]; 
let countProducts=[]; 
let strProducts='';

for(let i=0; i<massProducts.length; i++){
    products[i]= massProducts[i].getElementsByClassName('link-product-field ng-binding ng-scope')[0].textContent;
    countProducts[i]= massProducts[i].getElementsByClassName('editing-hide ng-binding ng-scope')[0].textContent;
}

for(let j=0; j<products.length; j++)
{
	strProducts+=`${products[j]} x ${countProducts[j]} шт\n`;
}

let market;
let epicenter =false;
if(allcomment.contains('Ep') || allcomment.contains('Ер'))
epicenter=true;

if(epicenter==true)
{
	market='Ep';
}else
{
	if(site=='Органайзик')
	{
		market='R';
	}
	if(site=='inbasket.com.ua')
	market=' ';
}

if(site=='')
market='тлф';

let comment='';
DisintegrationLine(allcomment);
function DisintegrationLine(line){
let specialArray = [{symbol:"#", className: 'commentary'}, {symbol:"$", className: 'payment-info'}, {symbol:"&", className: 'delivery'}];
specialArray.forEach((element)=>{element.index=line.indexOf(element.symbol)});
specialArray.sort(function (a, b) {
  if (a.index > b.index) {
    return 1;
  }
  if (a.index < b.index) {
    return -1;
  }
  return 0;
});

for(let i=0; i<specialArray.length; i++)
{
  if(specialArray[i].index!=-1)
  {
    let shortLine='';
        if(i==specialArray.length-1)
        {
            if(line.substring(specialArray[i].index+1).includes('\n'))
              shortLine=line.substring(specialArray[i].index+1, line.indexOf('\n'));
            else
              shortLine=line.substring(specialArray[i].index+1);
        }
    else
        shortLine=line.substring(specialArray[i].index+1, specialArray[i+1].index);
    specialArray[i].text=shortLine;
    comment+=shortLine;
  }else
        continue;
}

}

let resultOfPayment= 'ОПЛАЧЕНО';
         switch (typeOfPayment) {
            case 'Наложенный платеж':
                resultOfPayment ='НАЛОЖКА';
                break;

            case 'Безнал':
                resultOfPayment='ОПЛАЧЕНО';
                break;

            case 'ПромОплата':
                comment+=' промОплата!';
                break;
            default:
                comment+=' Кабинет розетки!';
                break;
        }

if(typeUkrPoshta=='Экспресс' && typeMail=='Укрпочта' && !comment.toLowerCase().includes('экспресс'))
comment+=' Экспресс!';

/*${typeMail}\n */
let text = `Заказ ${market} ${comment}\n
${id}\n
${TTN}\n
${strProducts}ФИО: ${surname}\n
Оплата: ${totalSum}\n
${resultOfPayment}\n
ГОТОВО К ОТПРАВКЕ`;

prompt(`Информация по заявке ${id}`,text);
})()