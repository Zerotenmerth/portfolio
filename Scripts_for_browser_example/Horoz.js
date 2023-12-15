javascript:(/* @version 1.1 horoz reader @author Golden Dragon*/function() 
{
	const surname = document.querySelector("[attr-field-name='lName']").textContent;
	const name = document.querySelector("[attr-field-name='fName']").textContent;
	const mName = document.querySelector("[attr-field-name='mName']")?.textContent || '';
	const tf = document.getElementsByClassName('click-phone-edit')[0].textContent;
	const typeMail = document.querySelector("[attr-field-name='shipping_method']").textContent;
	const TTN = document.getElementsByClassName('m-right10 p-bot5 left block ng-binding')[0]?.textContent || '';
	let cityAtr = 'cityName'; 
	let departmentAtr;
switch(typeMail)
{
	case 'Укрпочта':
	cityAtr = 'city';
	departmentAtr= 'ukrposhta';
	break;
	case 'Новая Почта':
	departmentAtr= 'novaposhta';
	break;
	case 'Выдача в ROZETKA':
	departmentAtr= 'rozetkaDelivery';
	break;
}
 const deliveryObject = document.querySelector(`[attr-field-name='${cityAtr}']`).textContent;
 const deliveryDepartment = document.querySelector(`[ng-model='viewModel.${departmentAtr}Branch']`).querySelector("[attr-field-name='branchName']").textContent;


const massProducts= document.getElementsByClassName('price-to-order height-45px ng-scope ng-isolate-scope');
const products =[]; 
const countProducts=[]; 
const code = [];
let strProducts='';

for(let i=0; i<massProducts.length; i++){
    products.push(massProducts[i].getElementsByClassName('link-product-field ng-binding ng-scope')[0].textContent);
    code.push(massProducts[i].getElementsByClassName('ng-binding ng-scope')[1].textContent);
    countProducts.push(massProducts[i].getElementsByClassName('editing-hide ng-binding ng-scope')[0].textContent);
}

for(let j=0; j<products.length; j++)
{
	strProducts+=`${products[j]}\nКод:${code[j]} x ${countProducts[j]} шт\n`;
}


const text = `Заказ \n${strProducts}\n
ФИО: ${surname} ${name} ${mName}\n
Телефон: ${tf}\n
${typeMail} доставить в: ${deliveryObject}
${deliveryDepartment}\n
${TTN ? 'ТТН: '+TTN+'\n': ''}Оплачено!`;


prompt(`Хорозы`,text);
})()