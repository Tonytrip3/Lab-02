'use strict';
const images = [];
const keywords = [];

function Horn(obj){
  this.title= obj.title;
  this.image_url= obj.image_url;
  this.description= obj.description;
  this.keyword= obj.keyword;
  this.horns= obj.horns;
  images.push(this);
  if(!keywords.includes(this.keyword)){
    keywords.push(this.keyword)
  }
}

Horn.prototype.render = function(){
  $('main').append('<section class="clone"></section>');
  let $clone = $('section[class="clone"]');
  
  let photoTemplate = $('#photo-template').html();

  $clone.html(photoTemplate);

  $clone.find('h2').text(this.title);
  $clone.find('img').attr('src', this.image_url);
  $clone.find('p').text(this.description);

  $clone.removeClass('clone');
  $clone.attr('class', this.title);
  
}

function readJSON (){
  $.get('../data/page-1.json', 'json')
    .then(data => {
      data.forEach(element => {
        new Horn(element);
      
      });
    })
    .then(function(){
      images.forEach(image => {
        image.render();
      
      })
    })
    .then(function(){
      keywords.forEach(element => {
        $('select').append('<option class="buffer"></option>');
        let $buffer = $('option[class="buffer"]');

        $buffer.attr('value', element);
        $buffer.removeClass('buffer');
        $buffer.text(element);
      })
    })
  }

$("select").on("change", function(){
  let filter = $(this).children("option:selected").val();
  images.forEach(element => {
    if(element.keyword !== )
  })
})

readJSON();
console.log(keywords);