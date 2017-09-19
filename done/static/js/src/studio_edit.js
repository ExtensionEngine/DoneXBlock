function StudioEdit(runtime, element) {

    var $element = $(element);

    $element.find('.save-button').bind('click', function () {
        var handlerUrl = runtime.handlerUrl(element, 'studio_submit');

        var data = new FormData();
        data.append('display_type', $element.find('select[name=display_type]').val());

        runtime.notify('save', {state: 'start'});
        $.ajax({
            url: handlerUrl,
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false
        }).done(function (response) {
            runtime.notify('save', {state: 'end'});
        });
    });

    $element.find('.cancel-button').bind('click', function () {
        runtime.notify('cancel', {});
    });
}
