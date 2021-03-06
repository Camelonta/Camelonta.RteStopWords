﻿tinymce.PluginManager.add('stopwords', function (editor, url) {

    function allIndexesOf(source, find) {
        var result = [];
        for (i = 0; i < source.length; ++i) {
            if (source.substring(i, i + find.length) == find) {
                result.push(i);
            }
        }
        return result;
    }

    function isLetter(c) {
        return c.toLowerCase() != c.toUpperCase();
    }

    $.get('/umbraco/surface/PartialSurface/GetStopwords', function (data) {
        editor.on('focusout', function (e) {
            var content = editor.getContent();

            // to compare differences
            var originalContent = content;
            var stopwords = data;
            var allIndexes = [];

            for (var index = 0; index < stopwords.length; index++) {
                var currentWord = stopwords[index];
                var indexes = allIndexesOf(content, currentWord);

                // check if the word is part of another word
                for (var i = 0; i < indexes.length; i++) {
                    var charBefore = content.charAt(indexes[i] - 1);
                    var charAfter = content.charAt(indexes[i] + currentWord.length);
                    if (!isLetter(charBefore) && !isLetter(charAfter)) {
                        var jsonObject = { index: indexes[i], currentWord: currentWord };
                        allIndexes.push(jsonObject);
                    }
                }
            }

            // implement the changes
            for (var i = allIndexes.length - 1; i >= 0; i--) {
                var index = allIndexes[i].index;
                var currentWord = allIndexes[i].currentWord;
                var s1 = content.substr(0, index);
                var s3 = content.substr(index + currentWord.length);
                var newWord = '<span style="color:#fff;background:red;">' + currentWord + '</span>';
                content = s1 + newWord + s3;

            }

            if (content != originalContent) {
                tinymce.activeEditor.setContent(content);
            }
        });
    })

});