tinymce.PluginManager.add('stopwords', function (editor, url) {

    var stopwords = ["planet", "mars"];

    var allIndexesOf = function (val, content) {
        var idxs = [];
        while (content.indexOf(val) !== -1) {
            var idx = content.lastIndexOf(val);
            idxs.push(idx);
            content = content.substr(0, idx);
        }
        return idxs;
    };

    editor.on('focusout', function (e) {

        var content = editor.getContent();

        for (var index = 0; index < stopwords.length; index++) {

            var currentWord = stopwords[index];
            var newWord = '<span style="background:red;">' + currentWord + '</span>';

            var idxs = allIndexesOf(currentWord, content);
            for (var i = 0; i < idxs.length; i++) {
                var idx = idxs[i];
                var hasStopClass = content.substr(0, idx - 2).endsWith('red;');
                if (!hasStopClass) {
                    var wordLength = currentWord.length;
                    content = content.substr(0, idx) + newWord + content.substr(idx + wordLength);
                }
            }
        }

        tinymce.activeEditor.setContent(content);
    });

});