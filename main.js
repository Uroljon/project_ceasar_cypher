
var originalMessage;         //bu shifrlanuvchi oddiy matn
var decryptedMessage = "";  //bu de-shifrlangan matn   
var encryptedMessage = "";  //bu shifrlangan matn shifrlovchi sahifada    
var encryptedMessage2;       //bu shifrlangan matn deshifrlovchi sahifada
var key;                     //shifrlash uchun kalit
var key2;                    //de-shifrlash uchun kalit
let copyText1 = "";
let copyText2 = "";

//bu yerda lotin va kirill harflarni shifrlash uchun alfavit :
var alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v','w', 'x', 'y', 'z', 'A', 'B','C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V','W', 'X', 'Y', 'Z', ];
var alphaRus = [ 
'А',	'Б',	'В',	'Г',	'Д',	'Е',    'Ё',	'Ж',	'З',	'И',	'Й',	'К',	'Л',	'М',	'Н',	'О',	'П',
'Р',	'С',	'Т',	'У',	'Ф',	'Х',	'Ц',	'Ч',	'Ш',	'Щ',	'Ъ',	'Ы',	'Ь',	'Э',	'Ю',	'Я',    'Ғ',    'Қ',    'Ҳ',    'Ў',
'а',	'б',	'в',	'г',	'д',	'е',    'ё',	'ж',	'з',	'и',	'й',	'к',	'л',	'м',	'н',	'о',	'п',
'р',	'с',	'т',	'у',	'ф',	'х',	'ц',	'ч',	'ш',	'щ',	'ъ',	'ы',	'ь',	'э',	'ю',	'я',    'ғ',    'қ',    'ҳ',    'ў',
];

//bu yerda raqamni shifrlash uchun alfavit :
var digits =          ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' '];
var symbolForDigits = ['ø', 'þ', 'ð', 'ï', '¢', 'æ', '¿', 'Ç', 'µ', '‰', '±'];

//bu funksiya Matn ko'rinishidagi ma'lumotni qabul qilib, shifrlash uchun yuboradi :
document.getElementById('calculate').addEventListener("click", function(){        
originalMessage = document.getElementById('original').value;  
key = document.getElementById('key').value;
key = parseInt(key);
encrypt(originalMessage);
});
//bu funksiya Oynani tozalaydi :
document.getElementById('erase').addEventListener("click", function clear (){
document.getElementById('crypto-result').innerHTML = ' ';
});

/*shriftlash algoritmi :*/
function encrypt (string){
let mod; 
for(var i=0; i<string.length; i++){
for (var j = 0; j<alpha.length; j++){
    if(string[i] == alpha[j]){
        
        if( (j+key)>=52 ){ //kalit oshib ketib, alfavit tugab qolsa boshiga qaytadi. 52 - bu Lotin alifbosi harflari soni
            mod = (j+key)%52;  
            encryptedMessage += alpha[mod];
            break;            
            /*agar break ishlatilmasa, misol uchun kalit 52 bo'lsa mod=0 bo'ladi va encryptedMessage=a bo'ladi. keyin esa sikl tugamay pastga tushadi. keyin alpha[mod] ya'ni alpha[0+52] ni topolmaydi. chunki alpha[52] mavjud emas. eng katta indeks = 51.
            Xullas, bu funksiya kalit katta bo'lganda ishlaydi. Va aniq ishini bajaradi. Keyin pastdagi funksiyalarga xalaqit bermasligi uchun siklni yopib, keyingi harfga o'tkazib yuboradi !*/        
        }
        else if( (j+key)<0 ){ //kalit manfiy son bo'lsa moslashtirib oladi:
            // key = key%52;       globalni o'zgartirib yuboradi         
            mod = (j + (key%52 +52))%52;                    
            encryptedMessage += alpha[mod];
            break;                    
        }
        encryptedMessage += alpha[j+key];
    }
    /*simvollarni shriftamaydi: */
    else if((string.charCodeAt(i)>32 && string.charCodeAt(i)<=47) || (string.charCodeAt(i)>=58 && string.charCodeAt(i)<=64) || (string.charCodeAt(i)>=91 && string.charCodeAt(i)<=96 ) || (string.charCodeAt(i)>=123 && string.charCodeAt(i)<=126 )){
        encryptedMessage += string[i]; break;
    }
    /*new line ham shriftlanmaydi*/
    else if(string[i]===String.fromCharCode(10)) {
        encryptedMessage += String.fromCharCode(10); break;
    }               
} 
/*====raqamni va probelni shifrlayapti===*/
for( var k = 0; k<=10; k++){
    if( digits[k] === string[i] ){
        let temporarykey = key%11+11; //bu yerda temporarykey ni o'rniga haqiqiy key o'rnatilib ketgan ekan.Kalitni 11 ga mod qilib buzvorgan
        temporaryKey = (temporarykey+k)%11;
        encryptedMessage += symbolForDigits[temporaryKey];     
        break;    //break ni bu yerda ishlatsak ham ishlatmasak ham bo'ladi. Chunki undan keyin statement yo'q. Ta'sir qilmaydi. sikl tugaydi.      
    }        
}

/*kirill aalifbosi shifrlanyapti:*/        
for (var l = 0; l<alphaRus.length; l++){
    if(string[i] == alphaRus[l]){
        /*alfavit tugab qolsa boshiga qaytadi*/
        if( (l+key)>=74 ){
            mod = (l+key)%74;
            encryptedMessage += alphaRus[mod];
            break;            
                  
        }
        else if( (l+key)<0 ){   
            // key = key%74;       global o'zgaruvchiga teginma !      
            mod = (l + (key%74 + 74))%74;                    
            encryptedMessage += alphaRus[mod];
            break;                    
        }
        encryptedMessage += alphaRus[l+key];
    }
}


}
/*natijani chop etadi */
document.getElementById('crypto-result').innerText = encryptedMessage;
copyText1 = encryptedMessage;
encryptedMessage = '';
}

/*cliboard uchun copy qiladi */
function copyShifrmatn(){   
var elem = document.createElement("textarea");
document.body.appendChild(elem);
elem.value = copyText1;
elem.select();
document.execCommand("copy");
document.body.removeChild(elem); 
}  

/*===========================================================================================================================================*/

//bu funksiya Shifr_Matnni qabul qilib, de-shifrlash uchun yuboradi :
document.getElementById('decypher').addEventListener("click", function(){        
encryptedMessage2 = document.getElementById('encrypted').value;  
key2 = document.getElementById('key2').value;
key2 = parseInt(key2);

decrypt(encryptedMessage2);
});
//bu funksiya Oynani tozalaydi :
document.getElementById('erase2').addEventListener("click", function clear (){
document.getElementById('decrypto-result').innerHTML = ' ';
});

/*de-shriftlash algoritmi :*/
function decrypt (string){
let mod; 
for(var i=0; i<string.length; i++){
for (var j = 0; j<alpha.length; j++){
if(string[i] == alpha[j]){
   
    if( (j-key2)<0 ){ // agar kalit juda katta bolib index manfiyga o'tib ketsa :
        // key2 = key2%52;    bu global key2 o'zgaruvchini qiymatini buzvoradi        
        mod = ((j-key2)%52 + 52)%52;
        decryptedMessage += alpha[mod];
        // alert(mod);

        //  To obtain a modulo in JavaScript, in place of a % n, use ((a % n ) + n ) % n.
        break;                    
    }
    else if( (j-key2)>=52 ){  //agar kalit manfiy bolsa, 52 talik alfavitga moslashtiradi :
        mod = (j-key2)%52;
        decryptedMessage += alpha[mod];
        break;                    
    }
    decryptedMessage += alpha[j-key2]; 
}
/*simvollarni shriftamaydi: */
else if((string.charCodeAt(i)>32 && string.charCodeAt(i)<=47) || (string.charCodeAt(i)>=58 && string.charCodeAt(i)<=64) || (string.charCodeAt(i)>=91 && string.charCodeAt(i)<=96 ) || (string.charCodeAt(i)>=123 && string.charCodeAt(i)<=126 )){
    decryptedMessage += string[i]; break;
}
/*new line is ignored*/
else if(string[i]===String.fromCharCode(10)) {
    decryptedMessage += String.fromCharCode(10); break;
}                
}
/*====raqamni va probelni de-shifrlayapti===*/
for( var k = 0; k<=10; k++){
if( string[i] === symbolForDigits[k] ){
    // key2 = key2%11;
    let temporaryKey2 = ((k-key2)%11+11)%11;
    decryptedMessage += digits[temporaryKey2];                
}                  
} 
/*kirill de-shifrovka*/
for (var j = 0; j<alphaRus.length; j++){
if(string[i] == alphaRus[j]){
     /*alfavit tugab qolsa ohiriga qaytadi*/
     if( (j-key2)<0 ){    
        // key2 = key2%74; bu global o'zgaruvchini o'zgartirib yuboradi
        mod = ((j-key2)%74 + 74)%74;
        decryptedMessage += alphaRus[mod];
        break;                    
    }
    else if( (j-key2)>=74 ){
        mod = (j-key2)%74;
        decryptedMessage += alphaRus[mod];
        break;                    
    }
    decryptedMessage += alphaRus[j-key2];
}
}
}
/*natijani chop etadi */
document.getElementById('decrypto-result').innerText = decryptedMessage;
copyText2 = decryptedMessage;
decryptedMessage = '';
}

/*cliboard uchun copy qiladi */
function copyDeshifr() {   
var elem = document.createElement("textarea");
document.body.appendChild(elem);
elem.value = copyText2;
elem.select();
document.execCommand("copy");
document.body.removeChild(elem); 
} 
/*====================switch================*/
document.getElementById('en').addEventListener("click", function(){
document.getElementById('encrypt').style.display = 'flex';
document.getElementById('encrypt').style.flexDirection = 'column';
this.style.backgroundColor = 'rgb(59, 67, 179)';
this.style.color = '#ffffff';
// document.getElementById('de').backgroundColor = 'white';
document.getElementById('decrypt').style.display = 'none';
document.getElementById('switch').setAttribute('style', 'margin-top: 0px;');

});

document.getElementById('de').addEventListener("click", function(){
document.getElementById('decrypt').style.display = 'flex';
document.getElementById('decrypt').style.flexDirection = 'column';
this.style.backgroundColor = 'rgb(59, 67, 179)';
this.style.color = '#ffffff';
// document.getElementById('en').backgroundColor = 'rgb(228, 228, 228)';
document.getElementById('encrypt').style.display = 'none';
document.getElementById('switch').setAttribute('style', 'margin-top: 0px;');
// alert("hello");
});

document.querySelectorAll('.sana').forEach((span)=>{
    span.innerText = new Date().getFullYear()
});