$(function(){
  var fromObject;
  var toObject;

  //category filler code
  var $el = $('#categoryInput').val();
// console.log($el);
//first request for subcategory filling
$.ajax({
  url:$el+'.json'
}).done(function(value){
  let basicObject = value;
  // console.log(basicObject);
  //basic sub-category is filled
  var $basicFillSub = $('#subcategoryInput');
  $.each(basicObject,function(key,value){
    $basicFillSub.append($('<option></option>').attr('value',value).text(key));
  })
  //mass details to be filled in from and to input
  //second request for from and to filling
  var $subValue = $('#subcategoryInput').val();
  // console.log($subValue);
  $.ajax({
    url:'mass.json'
  }).done(function(massFiller){
    let massObject =  massFiller;
    // console.log(massObject);
    var $massOptions = $('#fromInput');
    var $massOption2 = $('#toInput');

    $.each(massObject,function(key,value){
      $massOptions.append($('<option></option>').attr('value',value).text(key));
    });
    $.each(massObject,function(key,value){
      $massOption2.append($('<option></option>').attr('value',value).text(key));
    });

  }).done(function(value){

    $('#subcategoryInput').on('input',function(e){
        console.log(e.target.value);
        $.ajax({
          url:e.target.value+'.json'
        }).done(function(value){

          let staticSubCatFiller = value;
          let staticFromObject = $('#fromInput');
          staticFromObject.html('');
          $.each(staticSubCatFiller,function(key,value){
            staticFromObject.append($('<option></option>').attr("value",value).text(key));
          });

          let staticToObject = $('#toInput');
          staticToObject.html('');
          $.each(staticSubCatFiller,function(key,value){
            staticToObject.append($('<option></option>').attr("value",value).text(key));
          });
          console.log(value);
        });
    });
    // let massSubCatValue =  Object.values(value);
    // $.each(massSubCatValue,function(key,value){


  });

});

//dynamic filling of values in boxes

$('#categoryInput').on('input',function(e){
  // console.log(e.target.value);
  //request for filling when there is change in input value in category
  $.ajax({
    url:e.target.value+'.json'
  }).done(function(value){
    let subObject = value;
    // console.log(subObject);
    var $sub = $('#subcategoryInput');
    $sub.html('');
    $.each(subObject,function(key,value){
      $sub.append($('<option></option>').attr('value',value).text(key));
    });
  }).done(function(subValue){
    // console.log(subValue);
    let subCatObject = Object.values(subValue);
//filling of from and to on change dynamically
    // console.log(subCatObject[0]);
    $.ajax({
      url:subCatObject[0]+'.json'
    }).done(function(value){

      let subFromFiller = value;
      let subFromObject = $('#fromInput');
      subFromObject.html('');
      $.each(subFromFiller,function(key,value){
        subFromObject.append($('<option></option>').attr("value",value).text(key));
      });
      let subToObject = $('#toInput');
      subToObject.html('');
      $.each(subFromFiller,function(key,value){
        subToObject.append($('<option></option>').attr("value",value).text(key));
      });

        // console.log(value);
    });

  });
  //second request to be made for filling the from and to




}); // end of sub category filling








//code for input
$('#forminput').keypress($.debounce(350,function(e){
  var pattern = /^\s*\d+$/;
  var alphabets = /[a-zA-Z]/g;
  var negative = /[-]/g;
  //also check for negative
  if(negative.test(e.target.value) || alphabets.test(e.target.value)){
      alert('Only Numbers are allowed');
  }
    else if(pattern.test(e.target.value)){
      var subCategoryValue = $('#subcategoryInput').val();
      console.log(subCategoryValue+'Details.json');
      $.ajax({
        url:subCategoryValue+'Details.json'
      }).done(function(user){
        console.log(user);
        //taken the both from and to values
        let fromValue = $('#fromInput').val();
        console.log(fromValue);
        let toValue = $('#toInput').val();
          console.log(toValue);
        fromObject = user[fromValue];
          console.log(fromObject);

        toObject = user[toValue];
          console.log(toObject);
          let output = document.getElementById('output');
          let inputValue = document.getElementById('forminput');



             output.innerHTML =`
                           <div class="card card-primary mb-2" style="color:white" id=${toObject['value']}>

                             <div class="card-block">
                               <h3>${toObject['value']}${toObject['Symbol']} :</h3>
                               <div id="valueOutput"></div>
                             </div>
                           </div>
             `;

             // console.log(Object.keys(fromObject[0])[1]);

             let valueOutput = document.getElementById('valueOutput');
             valueOutput.innerHTML = "<h4>"+inputValue.value*fromObject[toObject['value']]+"</h4>";


});
}
}));



});
