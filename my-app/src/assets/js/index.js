var marker_data = [
  {id: '02', color: 'red'},
  {id: '10', color: 'blue'},
  {id: '13', color: 'green'},
  {id: '34', color: 'red'},
  {id: '53', color: 'blue'}
];

var state_found = false;

function add_marker_nodes() {
  var $scene = $('a-scene');
  for (var i = 0; i < marker_data.length; i++) {
    var marker_obj = marker_data[i];
    var $el = $('<a-marker/>')
      .attr('type', 'pattern')
      .attr('url', 'patterns/' + marker_obj.id + '.patt')
      .attr('id', 'marker-' + marker_obj.id)
      .attr('num_id', marker_obj.id);
    var $text_el = $('<a-text side="double" position="0.5 1 0" rotation="-90 0 0" />')
      .attr('color', marker_obj.color)
      .attr('value', 'Marker id: ' + marker_obj.id);

    $el.append($text_el);
    $scene.append($el);
  }
}

$(document).ready(function() {
  add_marker_nodes();

  window.setInterval(function() {
    var $marker = document.querySelector("a-marker");
    if ($marker.object3D.visible === true) {
      var mid = $marker.id;
      var mid_num = mid.slice(mid.length - 2, mid.length);
      console.log('Marker found: ' + mid_num);
      if (!state_found) {
        state_found = true;
        console.log('Status changed: visible')
      }
    }
    else {
      console.log('no');
      if (state_found) {
        console.log('Status changed: not visible')
      }
      state_found = false;
    }
  }, 1000);

});
