var marker_data = [
  {id: '02', name: 'AVM FRITZ!Box 5490', type: 'Wireless router', secure: true},
  {id: '10', name: 'Philips Hue Bridge', type: 'Smart home hub', secure: false},
  {id: '13', name: 'Nokia Body', type: 'Wi-Fi Scale', secure: true},
  {id: '34', name: 'Smart-me Smart Plug', type: 'Energy meter', secure: false},
  {id: '53', name: 'Piper Classic', type: 'Security system', secure: true}
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
      .attr('color', 'blue')
      .attr('value', 'Name: ' + marker_obj.name);
    $el.append($text_el);
    var $el_type = $('<a-text side="double" position="0.5 1 0.3" rotation="-90 0 0" />')
      .attr('color', 'blue')
      .attr('value', 'Type: ' + marker_obj.type);
    $el.append($el_type);

    var secure_color = marker_obj.secure ? 'green' : 'red';
    var secure_status = marker_obj.secure ? 'secure' : 'insecure';
    var $text_secure = $('<a-text side="double" position="0.5 1 0.6" rotation="-90 0 0" />')
      .attr('color', secure_color)
      .attr('value', 'Status: ' + secure_status);
    $el.append($text_secure);

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
        console.log('Status changed: visible');
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
