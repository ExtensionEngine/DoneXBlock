/* Dummy code to make sure events work in Workbench as well as
 * edx-platform*/
if (typeof Logger === 'undefined') {
    var Logger = {
        log: function(a, b) { return; }
    };
}

function update_knob(element, data) {
  if($('.done_onoffswitch-checkbox', element).prop("checked")) {
    $(".done_onoffswitch-switch", element).css("background-image", "url("+data['checked']+")");
    $(".done_onoffswitch-switch", element).css("background-color", "#018801;");
  } else {
    $(".done_onoffswitch-switch", element).css("background-image", "url("+data['unchecked']+")");
    $(".done_onoffswitch-switch", element).css("background-color", "#FFFFFF;");
  }
}

function addCheckIcon($element) {
    var icon = '<i class="fa fa-check-circle"></i>';
    $element.empty()
            .append(icon);
}


function DoneXBlock(runtime, element, data) {
    // Updating the xblock state every time it's initialized.
    $.ajax({
        url: runtime.handlerUrl(element, 'get_state'),
        method: 'GET',
        success: function (data) {
            $('.done_onoffswitch-checkbox', element).prop("checked", data.state);
            if (data.helpful != null) {
                $('.done-radio input[value="' + data.helpful + '"]', element).prop('checked', true);
            }
        }
    });

    if (data.align != "right") {
	$('.done_right_spacer', element).addClass("done_grow");
    }
    if (data.align != "left") {
	$('.done_left_spacer', element).addClass("done_grow");
    }

    update_knob(element, data);
    var handlerUrl = runtime.handlerUrl(element, 'toggle_button');

    $(function ($) {
	$('.done_onoffswitch', element).addClass("done_animated");
	$('.done_onoffswitch-checkbox', element).change(function(){
	    var isChecked = $('.done_onoffswitch-checkbox', element).prop("checked");
	    $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({'done':isChecked}),
            success: function() {
                var $element = $('.menu-item.active .accordion-nav .icon-container');
                isChecked ? addCheckIcon($element) : $element.empty();
            }
	    });
	    Logger.log("edx.done.toggled", {'done': isChecked});
	    update_knob(element, data);
    });
    $('.done-radio input[type=radio]').on('change', function(event) {
        var isChecked = event.target.checked;
        if(isChecked) {
            $.ajax({
                type: "POST",
                url: handlerUrl,
                data: JSON.stringify({'helpful': event.target.value}),
                success: function() {
                    var $element = $('.accordion-unit.active .icon-container');
                    addCheckIcon($element);
                }
            });
        }
    });
    });
}
