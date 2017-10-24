﻿tinymce.PluginManager.add('stopwords', function (editor, url) {

    editor.on('focusout', function (e) {
        var content = editor.getContent();
        var stopwords = ["planet", "mars"];
        for (var index = 0; index < stopwords.length; index++) {
            var currentWord = stopwords[index];
            var newWord = '<span style="color:#fff;background:red;">' + currentWord + '</span>';
            var idx = content.indexOf(currentWord);
            var lastidx = content.lastIndexOf(currentWord);
            var hasStopClass = content.substr(0, lastidx - 2).endsWith('red;');

            if (!hasStopClass) {
                var re = new RegExp(currentWord, "g");
                content = content.replace(re, newWord);
            }
        }

        tinymce.activeEditor.setContent(content);
    });

});