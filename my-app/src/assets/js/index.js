var marker_data = [
  {id: '02', color: 'red'},
  {id: '10', color: 'blue'},
  {id: '13', color: 'green'},
  {id: '34', color: 'red'},
  {id: '53', color: 'blue'}
];

function add_marker_nodes() {
  var $scene = $('a-scene');
  for (var i = 0; i < marker_data.length; i++) {
    var marker_obj = marker_data[i];
    var $el = $('<a-marker/>')
      .attr('type', 'pattern')
      .attr('url', 'patterns/' + marker_obj.id + '.patt')
      .attr('id', 'marker-' + marker_obj.id);
    var $text_el = $('<a-text side="double" position="0.5 1 0" rotation="-90 0 0" />')
      .attr('color', marker_obj.color)
      .attr('value', 'Marker id: ' + marker_obj.id);

    $el.append($text_el);
    $scene.append($el);
  }
}

$(document).ready(function() {
  add_marker_nodes();
});
