// Helper scope
if (typeof Helpers === 'undefined') {
  Helpers = {};
}

var languageText = {};

// expects an array: languageText['say.hello.to.me']['en'] = 'Say hello to me:)';
// ex.:
// getText('Say.Hello.To.Me') == 'say hello to me:)'; // lowercase
// getText('SAY.HELLO.TO.ME') == 'SAY HELLO TO ME:)'; // uppercase
// getText('Say.hello.to.me') == 'Say hello to me:)'; // uppercase first letter, rest lowercase
// getText('Say.Hello.To.Me') == 'Say Hello To Me:)'; // camelCase
// getText('SAy.hello.to.me') == 'Say hello To me:)'; // ignore case sensitivity

var _languageDeps = (Meteor.isClient) ? new Deps.Dependency() : null;
var currentLanguage = 'en';

// language = 'en'
Helpers.setLanguage = function (language) {
  if (language && language !== currentLanguage) {
    currentLanguage = language;
    if (Meteor.isClient) _languageDeps.changed();
  }
};



Helpers.language = function () {
  if (Meteor.isClient) _languageDeps.depend();
  return currentLanguage;
};

Helpers.setDictionary = function(dict) {
  languageText = dict;
};

Helpers.addDictionary = function(dict) {
  _.extend(languageText, dict);
};

// handleCase will mimic text Case making src same case as text
var handleCase = function (text, src) {
  // Return lowercase
  if (text == text.toLowerCase())
    return src.toLowerCase();
  // Return uppercase
  if (text == text.toUpperCase())
    return src.toUpperCase();
  // Return uppercase first letter, rest lowercase
  if (text.substr(1) == text.substr(1).toLowerCase())
    return src.substr(0, 1).toUpperCase() + src.substr(1).toLowerCase();
  // Return src withour changes
  if (text.substr(0, 2) == text.substr(0, 2).toUpperCase())
    return src;
  // Return CamelCase
  return src.replace(/( [a-z])/g, function ($1) {
    return $1.toUpperCase();
  });
};

/**
 *
 * @param {string} text
 * @param {string} [lang]
 * @return {string}
 */
Helpers.getText = function (text, lang) {
  var txt = text.toLowerCase();
  var langText = languageText && languageText[txt];
  var langKey = (typeof lang === 'string') ? lang : Helpers.language();
  return handleCase(text, (langText) ? ( (langText[langKey]) ? langText[langKey] : langText.en) : '[' + text + ']');
};


Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });


UI.registerHelper('urlBase',function() {

    var url;
    Meteor.call('urlBase',function (error, result) { 
          url=result;
          console.log("url "+result+' error -> '+error);    
         // alert("url "+result); 
    });
    return url;
   
    

  
});


UI.registerHelper('isCordova',function() {



    if (Meteor.isCordova) {


      //alert("Cordova");
      //  console.log("Cordova");
  
      if (Platform.isAndroid) {
            
        //     console.log('android');
            
  
    }

        if (Platform.isIos) {
       //    console.log('ios');            
        }



      return true;

    }else{
   //   console.log("WEB");
   //   alert("web");
      return false;
    }
  
});




UI.registerHelper('indexedArray', function(context, options) {
  if (context) {
    return context.map(function(item, index) {
      item._index = index + 1;
      return item;
    });
  }
});



UI.registerHelper('check', function(value1, value2, options) {
  if (value1== value2) {
    return true;
  }else{
    return false;
  }
});

UI.registerHelper('selected', function(value1, value2, options) {
  if (value1== value2) {
    return 'selected';
  }else{
    return '';
  }
});


UI.registerHelper('oculta',function(value,tam) {
  if(!tam){
    tam=5;
  }
  return value.substr(0,tam)+"********";
  
});


UI.registerHelper('truncate',function(value,tam) {
  if(!tam){
    tam=5;
  }
  return value.substr(0,tam)+"...";
  
});

UI.registerHelper('toLowerCase',function(value) {
  //console.log("to lowerCase "+JSON.stringify(value)); 
  return value.toLowerCase();
  
});

UI.registerHelper('saveAudio',function(id,url) {
  if (window.sessionStorage.getItem("audiosGravados["+id+"]") === null) {
    window.sessionStorage.setItem("audiosGravados["+id+"]",  url );                
  }

  
});
      
UI.registerHelper('getTomorrow', function() {
  var amanha= Date.UTC()+3600*24;
  d = new Date(amanha);
  dia=pad(d.getDate(),2);
  mes=pad(d.getMonth()+1,2);
  hora=pad(d.getHours(),2);


  return dia+"/"+mes+"/"+d.getFullYear();
       
    
});



UI.registerHelper('formatTime', function(data, formato) {
  
 // console.log("data a converter "+JSON.stringify(data));
  if(data== null ){
    return null;
  }
  d = new Date(data);

  //console.log("data a convertida "+JSON.stringify(d));
  dia=pad(d.getDate(),2);
  mes=pad(d.getMonth()+1,2);
  hora=pad(d.getHours(),2);
  minuto=pad(d.getMinutes(),2);
  
  if(dia== "NaN" ){
    return "";
  }else{
      switch (formato) {
        case "DD/MM/YYYY" :
            return dia+"/"+mes+"/"+d.getFullYear();
            break;
          default:  
            return dia+"/"+mes+"/"+d.getFullYear()+" "+hora+":"+minuto;
        } 
  }    
});


UI.registerHelper('idade' , function(data_nascimento) {
    var d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate();

    var dn = new Date(data_nascimento),
        ano_aniversario = dn.getFullYear(),
        mes_aniversario = dn.getMonth() + 1,
        dia_aniversario = dn.getDate();
    

        quantos_anos = ano_atual - ano_aniversario;

    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
        quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
});


UI.registerHelper('tem_menu', function() {

  if(lodash.includes(withoutHeader,Router.current().route.getName())){
    return false;
  }else{
    return true;
  }
});




function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

Password = {
 
  _pattern : /[a-zA-Z0-9_\-\+\.]/,
  
  
  _getRandomByte : function()
  {
    // http://caniuse.com/#feat=getrandomvalues
    if(window.crypto && window.crypto.getRandomValues) 
    {
      var result = new Uint8Array(1);
      window.crypto.getRandomValues(result);
      return result[0];
    }
    else if(window.msCrypto && window.msCrypto.getRandomValues) 
    {
      var result = new Uint8Array(1);
      window.msCrypto.getRandomValues(result);
      return result[0];
    }
    else
    {
      return Math.floor(Math.random() * 256);
    }
  },
  
  generate : function(length)
  {
    return Array.apply(null, {'length': length})
      .map(function()
      {
        var result;
        while(true) 
        {
          result = String.fromCharCode(this._getRandomByte());
          if(this._pattern.test(result))
          {
            return result;
          }
        }        
      }, this)
      .join('');  
  }    
    
};


