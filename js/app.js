'use strict';

//========================================================================================================================================================================================================
//Variables
//========================================================================================================================================================================================================

let horns = [];
let keywords = [];
let page;

//========================================================================================================================================================================================================
//Object and prototypes
//========================================================================================================================================================================================================

class Horn {
  constructor(obj) {
    this.title = obj.title;
    this.image_url = `<img src="${obj.image_url}">`;
    this.description = obj.description;
    this.keyword = obj.keyword;
    this.horns = obj.horns;
    horns.push(this);
  }
  keywording() {
    for( var i = 0; i < horns.length; i++){
      if (keywords.indexOf(horns[i].keyword) === -1) {
        keywords.push(horns[i].keyword);
        $('#keyword').append('<option class = "option"></option>');
        let $option = $('option[class="option"]');
        $option.text(horns[i].keyword);
        $option.attr('value', horns[i].keyword);
        $option.removeClass('option');
      }
    }
  }
}

//========================================================================================================================================================================================================
//Functions
//========================================================================================================================================================================================================

function toHtml(){
    for( var i = 0; i < horns.length; i++){
      let htmlTemplate = document.getElementById('template-for-horns').innerHTML;
      let templatedHorns = Handlebars.compile(htmlTemplate);
      $('.temp').append(templatedHorns(horns[i]));
    }
};

function readJSON (filepath){
  page = filepath;
  $.get(filepath, 'json')
  .then(data => {
    horns = [];
    data.forEach(imageObj => {
      new Horn(imageObj);
    })
  }).then(() => {
    keywords = [];
    horns.forEach(horny => {
      horny.keywording();
      horny.toHtml();
    })
  })
};

//========================================================================================================================================================================================================
//Event Listeners
//========================================================================================================================================================================================================

$('nav').on('click', 'button', function(event){
  $('main').empty();
  $('#keyword').empty().html('<option value="default">Filter by Keyword</option>');
  readJSON(`./data/${event.target.id}.json`);
  toHtml();
});

$('#page-1').on('click', function(){
  $('main').empty();
  $('#keyword').empty().html('<option value="default">Filter by Keyword</option>');
  readJSON(`./data/${event.target.id}.json`);
  toHtml();
});

$('#page-2').on('click', function(){
  $('main').empty();
  $('#keyword').empty().html('<option value="default">Filter by Keyword</option>');
  readJSON(`./data/${event.target.id}.json`);
  toHtml();
});

$("select").on("change", function(){
  let filter = $(this).children("option:selected").val();
  if(filter === 'default'){
    $('section').show();
  } else{
    keywords.forEach(element => {
      if(element !== filter){
        $('.' + element).hide();
      } else {
        $('.' + element).show();
      }
    })
  }
});

$('#letters').on('click', function(){
  horns.sort(function(a, b){
    if(a.title<b.title){
      return -1;
    }
    if(a.title>b.title){
      return 1;
    }
    return 0;
  })
})

$('#numbers').on('click', function(){
  horns.sort(function(a, b){
    if(a.horns<b.horns){
      return -1;
    }
    if(a.horns>b.horns){
      return 1;
    }
    return 0;
  })
})

//========================================================================================================================================================================================================
//Function Calls
//========================================================================================================================================================================================================

$(() => readJSON());